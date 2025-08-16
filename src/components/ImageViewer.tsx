import React, { useRef, useEffect } from 'react';
import { AnalysisResult } from '../types/damage';
import { damageClasses } from '../data/damageClasses';

interface ImageViewerProps {
  result: AnalysisResult;
  fileName: string;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({ result, fileName }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (result.processedImage && canvasRef.current && imageRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = imageRef.current;

      img.onload = () => {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        
        if (ctx) {
          // 绘制原图
          ctx.drawImage(img, 0, 0);
          
          // 绘制检测框
          result.detections.forEach((detection) => {
            if (detection.bbox) {
              const damageClass = damageClasses.find(dc => dc.name === detection.className);
              const color = damageClass?.color || '#FF0000';
              
              // 绘制边界框
              ctx.strokeStyle = color;
              ctx.lineWidth = 3;
              ctx.strokeRect(
                detection.bbox.x,
                detection.bbox.y,
                detection.bbox.width,
                detection.bbox.height
              );
              
              // 绘制标签背景
              const label = `${detection.className} (${Math.round(detection.confidence * 100)}%)`;
              ctx.font = '14px Arial';
              const textMetrics = ctx.measureText(label);
              const textWidth = textMetrics.width;
              const textHeight = 18;
              
              ctx.fillStyle = color;
              ctx.fillRect(
                detection.bbox.x, 
                detection.bbox.y - textHeight - 4, 
                textWidth + 8, 
                textHeight + 4
              );
              
              // 绘制标签文字
              ctx.fillStyle = 'white';
              ctx.fillText(label, detection.bbox.x + 4, detection.bbox.y - 6);
            }
          });
        }
      };
      
      img.src = result.processedImage;
    }
  }, [result]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">检测图像</h2>
        <span className="text-sm text-gray-600">{fileName}</span>
      </div>
      
      <div className="relative">
        <img
          ref={imageRef}
          src={result.processedImage}
          alt="Original"
          className="hidden"
        />
        <canvas
          ref={canvasRef}
          className="max-w-full h-auto border rounded-lg shadow-sm"
        />
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p>图像中的彩色框标识了检测到的损伤区域，每种颜色代表不同类型的损伤。</p>
      </div>
    </div>
  );
};