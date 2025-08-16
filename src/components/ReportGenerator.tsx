import React from 'react';
import { DocumentArrowDownIcon, PrinterIcon } from '@heroicons/react/24/outline';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { DamageDetection } from '../types/damage';

interface ReportGeneratorProps {
  detections: DamageDetection[];
  imageSrc: string | null;
  riskLevel: string;
}

export const ReportGenerator: React.FC<ReportGeneratorProps> = ({ 
  detections, 
  imageSrc, 
  riskLevel 
}) => {
  const generatePDFReport = async () => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // 添加标题
    pdf.setFontSize(20);
    pdf.text('结构损伤检测报告', pageWidth / 2, 30, { align: 'center' });
    
    // 添加生成时间
    pdf.setFontSize(12);
    pdf.text(`生成时间: ${new Date().toLocaleString('zh-CN')}`, 20, 50);
    
    // 添加风险等级
    pdf.setFontSize(14);
    const riskColor = getRiskColor(riskLevel);
    pdf.setTextColor(riskColor.r, riskColor.g, riskColor.b);
    pdf.text(`风险等级: ${riskLevel}`, 20, 70);
    pdf.setTextColor(0, 0, 0);
    
    // 添加检测摘要
    pdf.setFontSize(12);
    pdf.text(`检测到的损伤总数: ${detections.length}`, 20, 90);
    
    let yPosition = 110;
    
    // 添加损伤详情
    if (detections.length > 0) {
      pdf.setFontSize(14);
      pdf.text('损伤详情:', 20, yPosition);
      yPosition += 20;
      
      detections.forEach((detection, index) => {
        if (yPosition > pageHeight - 40) {
          pdf.addPage();
          yPosition = 30;
        }
        
        pdf.setFontSize(10);
        pdf.text(`${index + 1}. ${detection.type}`, 25, yPosition);
        pdf.text(`   严重程度: ${detection.severity}`, 25, yPosition + 10);
        pdf.text(`   置信度: ${(detection.confidence * 100).toFixed(1)}%`, 25, yPosition + 20);
        pdf.text(`   位置: (${detection.bbox.x}, ${detection.bbox.y})`, 25, yPosition + 30);
        
        yPosition += 45;
      });
    }
    
    // 保存PDF
    pdf.save(`结构损伤检测报告_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case '严重风险': return { r: 239, g: 68, b: 68 };
      case '高风险': return { r: 245, g: 158, b: 11 };
      case '中等风险': return { r: 59, g: 130, b: 246 };
      default: return { r: 16, g: 185, b: 129 };
    }
  };

  const exportJSON = () => {
    const reportData = {
      timestamp: new Date().toISOString(),
      riskLevel,
      totalDetections: detections.length,
      detections: detections.map(d => ({
        type: d.type,
        severity: d.severity,
        confidence: d.confidence,
        position: d.bbox,
        recommendation: d.recommendation
      }))
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `damage_report_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const printReport = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">报告生成</h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={generatePDFReport}
            className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <DocumentArrowDownIcon className="w-5 h-5 mr-2" />
            导出PDF
          </button>
          
          <button
            onClick={exportJSON}
            className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <DocumentArrowDownIcon className="w-5 h-5 mr-2" />
            导出JSON
          </button>
          
          <button
            onClick={printReport}
            className="flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <PrinterIcon className="w-5 h-5 mr-2" />
            打印报告
          </button>
        </div>
        
        <div className="text-sm text-gray-600">
          <p>• PDF报告包含完整的检测结果和建议</p>
          <p>• JSON格式便于系统集成和数据分析</p>
          <p>• 打印功能支持生成纸质报告</p>
        </div>
      </div>
    </div>
  );
};