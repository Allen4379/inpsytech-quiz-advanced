import React, { useState, useRef } from 'react';
import { ArrowLeft, Upload, Wand2, Loader2, Download, Image as ImageIcon } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface ImageEditorProps {
  onBack: () => void;
}

const ImageEditor: React.FC<ImageEditorProps> = ({ onBack }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setGeneratedImage(null); // Reset generated image when new one uploads
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!selectedImage || !prompt) return;

    setIsLoading(true);
    try {
      // 1. Extract correct mime type (e.g., image/jpeg, image/png)
      const mimeType = selectedImage.split(';')[0].split(':')[1];
      // 2. Prepare Base64 string (remove data URL prefix)
      const base64Data = selectedImage.split(',')[1];
      
      // 3. Initialize API
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // 4. Call Gemini 2.5 Flash Image
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { 
              inlineData: { 
                data: base64Data, 
                mimeType: mimeType 
              } 
            },
            { text: prompt }
          ]
        }
      });

      // 5. Extract Result
      // The response for image generation usually comes in parts.
      let resultImage = null;
      if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
         for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
               resultImage = `data:image/png;base64,${part.inlineData.data}`;
               break;
            }
         }
      }
      
      if (resultImage) {
        setGeneratedImage(resultImage);
      } else {
        alert("AI 無法生成圖片，請嘗試不同的指令。");
      }

    } catch (error) {
      console.error("Generation failed:", error);
      alert("生成失敗，請檢查 API Key 或網路連線。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full animate-fade-in py-4 px-4 overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={onBack}
          className="p-2 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-white tracking-wide">靈視實驗室</h2>
          <p className="text-[10px] text-inpsy-purple tracking-widest uppercase">Powered by Gemini 2.5</p>
        </div>
      </div>

      {/* Main Work Area */}
      <div className="flex-1 flex flex-col space-y-4">
        
        {/* Image Preview / Upload Area */}
        <div 
          className="relative w-full aspect-square bg-black/30 rounded-2xl border-2 border-dashed border-inpsy-cyan/30 flex flex-col items-center justify-center overflow-hidden group hover:border-inpsy-cyan/60 transition-colors"
          onClick={() => !isLoading && fileInputRef.current?.click()}
        >
          {generatedImage ? (
            <img src={generatedImage} alt="Generated" className="w-full h-full object-contain animate-fade-in" />
          ) : selectedImage ? (
            <img src={selectedImage} alt="Original" className="w-full h-full object-contain opacity-80" />
          ) : (
            <div className="text-center p-6 cursor-pointer">
              <div className="w-16 h-16 bg-inpsy-cyan/10 rounded-full flex items-center justify-center mx-auto mb-3 border border-inpsy-cyan/20">
                 <Upload className="w-8 h-8 text-inpsy-cyan" />
              </div>
              <p className="text-sm text-gray-300 font-medium">點擊上傳圖片</p>
              <p className="text-xs text-gray-500 mt-1">建立連結 Upload Image</p>
            </div>
          )}
          
          {isLoading && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center z-20">
               <Loader2 className="w-12 h-12 text-inpsy-cyan animate-spin mb-3" />
               <p className="text-inpsy-cyan text-sm tracking-widest animate-pulse">GENERATING...</p>
            </div>
          )}

          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
            accept="image/*" 
            className="hidden" 
          />
        </div>

        {/* Controls */}
        <div className="space-y-4 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
           
           <div>
             <label className="text-xs text-inpsy-cyan font-semibold tracking-wider uppercase mb-2 block">
               指令 Prompt
             </label>
             <div className="relative">
                <input 
                  type="text" 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="例如：加上阿凡達風格的濾鏡..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-inpsy-cyan focus:ring-1 focus:ring-inpsy-cyan transition-all"
                />
                <Wand2 className="absolute right-3 top-3 w-4 h-4 text-gray-500" />
             </div>
           </div>

           {/* Action Buttons */}
           {generatedImage ? (
             <div className="flex gap-2">
                <button 
                  onClick={() => {
                    setGeneratedImage(null);
                    setPrompt('');
                    setSelectedImage(null);
                  }}
                  className="flex-1 py-3 bg-white/10 text-white rounded-xl font-medium text-sm hover:bg-white/20 transition-colors"
                >
                  重置 Reset
                </button>
                <a 
                  href={generatedImage} 
                  download="inpsy-vision.png"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-inpsy-cyan text-black rounded-xl font-bold text-sm hover:bg-white transition-colors shadow-bio"
                >
                  <Download className="w-4 h-4" />
                  下載 Download
                </a>
             </div>
           ) : (
             <button 
                onClick={handleGenerate}
                disabled={!selectedImage || !prompt || isLoading}
                className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-bio ${
                  !selectedImage || !prompt 
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-white/5' 
                    : 'bg-gradient-to-r from-inpsy-purple to-inpsy-cyan text-white hover:brightness-110 active:scale-[0.98]'
                }`}
             >
                <Wand2 className="w-4 h-4" />
                啟動靈視 Generate
             </button>
           )}
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;