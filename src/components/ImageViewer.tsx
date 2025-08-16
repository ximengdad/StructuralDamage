import React, { useRef, useEffect } from 'react';
import { AnalysisResult } from '../types/damage';
import { DetectionSettings } from './SettingsPanel';
import { damageClasses } from '../data/damageClasses';

interface ImageViewerProps {
  result: AnalysisResult;
  fileName: string;
}
  settings: DetectionSettings;

export const ImageViewer: React.FC<ImageViewerProps> = ({ 
  imageSrc, 
  detections, 
  isProcessing, 
  settings 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (result.processedImage && canvasRef.current && imageRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = imageRef.current;

      img.onload = () => {
      detections
        .filter(detection => detection.confidence >= settings.confidenceThreshold)
        .forEach((detection) => {
        canvas.height = img.naturalHeight;
        
        if (ctx) {
          // 绘制原图
          ctx.drawImage(img, 0, 0);
          
          // 绘制检测框
          result.detections.forEach((detection) => {
            if (detection.bbox) {
              const damageClass = damageClasses.find(dc => dc.name === detection.className);
              const color = damageClass?.color || '#FF0000';
              
              ctx.strokeStyle = color;
              ctx.lineWidth = 3;
              ctx.strokeRect(
                detection.bbox.x,
                detection.bbox.y,
                detection.bbox.width,
        if (settings.showBoundingBoxes) {
          // 设置边界框样式
          ctx.strokeStyle = getSeverityColor(severity);
          ctx.lineWidth = 2;
          ctx.setLineDash([]);
          
          // 绘制边界框
          ctx.strokeRect(bbox.x, bbox.y, bbox.width, bbox.height);
        }
        
        if (settings.showConfidenceScores) {
          // 绘制标签背景
          const label = `${type} (${(confidence * 100).toFixed(1)}%)`;
          ctx.font = '12px Arial';
          const textMetrics = ctx.measureText(label);
          const textWidth = textMetrics.width;
          const textHeight = 16;
          
          ctx.fillStyle = getSeverityColor(severity);
          ctx.fillRect(bbox.x, bbox.y - textHeight - 4, textWidth + 8, textHeight + 4);
          
          // 绘制标签文字
          ctx.fillStyle = 'white';
          ctx.fillText(label, bbox.x + 4, bbox.y - 6);
        }
  useEffect(() => {
    drawDetections();
  }, [detections, settings]);

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