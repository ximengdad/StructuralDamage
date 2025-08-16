import React, { useCallback, useState } from 'react';
import { Upload, Image as ImageIcon, Zap, CheckCircle } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  isProcessing: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, isProcessing }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    if (imageFile) {
      onImageSelect(imageFile);
    }
  }, [onImageSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  }, [onImageSelect]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  return (
    <div
      className={`upload-zone ${isDragOver ? 'border-blue-500 bg-blue-50/80 scale-105' : ''} ${isProcessing ? 'pulse-glow' : ''}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div className="flex flex-col items-center space-y-6">
        <div className={`relative ${isProcessing ? 'float-animation' : ''}`}>
          <div className="p-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl shadow-lg">
            {isProcessing ? (
              <div className="relative">
                <div className="animate-spin w-10 h-10 border-3 border-white/30 border-t-white rounded-full" />
                <Zap className="absolute inset-0 w-6 h-6 text-white m-auto" />
              </div>
            ) : (
              <Upload className="w-10 h-10 text-white" />
            )}
          </div>
          {!isProcessing && (
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
        
        <div className="text-center max-w-md">
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            {isProcessing ? (
              <span className="gradient-text">AI正在分析图片...</span>
            ) : (
              '上传建筑图片进行智能检测'
            )}
          </h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {isProcessing ? (
              '我们的AI正在识别结构损伤，请稍候...'
            ) : (
              '支持拖拽上传或点击选择，我们将使用先进的AI技术为您识别16种不同类型的结构损伤'
            )}
          </p>
          
          {!isProcessing && (
            <label className="btn-primary cursor-pointer px-8 py-4 text-base">
              <ImageIcon className="w-5 h-5 mr-3" />
              选择图片文件
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
                disabled={isProcessing}
              />
            </label>
          )}
        </div>
        
        {!isProcessing && (
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>支持 JPG, PNG, GIF</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>最大 10MB</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>AI智能识别</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};