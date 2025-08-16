import React from 'react';
import { AnalysisResult } from '../types/damage';
import { damageClassNames, severityLevels } from '../data/damageClasses';
import { AlertTriangle, CheckCircle, XCircle, AlertCircle, Download } from 'lucide-react';
import { downloadReport } from '../utils/imageProcessing';

interface ResultsPanelProps {
  result: AnalysisResult;
  fileName: string;
}

export const ResultsPanel: React.FC<ResultsPanelProps> = ({ result, fileName }) => {
  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'low': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'medium': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'high': return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'critical': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-700 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-orange-700 bg-orange-50 border-orange-200';
      case 'critical': return 'text-red-700 bg-red-50 border-red-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getRiskText = (level: string) => {
    switch (level) {
      case 'low': return '低风险';
      case 'medium': return '中等风险';
      case 'high': return '高风险';
      case 'critical': return '严重风险';
      default: return '未知风险';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">检测结果</h2>
        <button
          onClick={() => downloadReport(result, fileName)}
          className="btn btn-secondary"
        >
          <Download className="w-4 h-4 mr-2" />
          下载报告
        </button>
      </div>

      {/* 风险等级 */}
      <div className={`rounded-lg border p-4 mb-6 ${getRiskColor(result.riskLevel)}`}>
        <div className="flex items-center space-x-3">
          {getRiskIcon(result.riskLevel)}
          <div>
            <h3 className="font-semibold text-lg">
              整体风险等级: {getRiskText(result.riskLevel)}
            </h3>
            <p className="text-sm opacity-80">
              检测到 {result.detections.length} 处损伤，涉及 {result.damageTypes.length} 种损伤类型
            </p>
          </div>
        </div>
      </div>

      {/* 检测详情 */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">损伤详情</h3>
        
        {result.detections.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-500" />
            <p>未检测到明显的结构损伤</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {result.detections.map((detection, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-4 h-4 rounded-full border"
                      style={{ backgroundColor: result.damageTypes.includes(detection.className) ? 
                        `rgb(${severityLevels[detection.className] * 50}, ${255 - severityLevels[detection.className] * 40}, 100)` : 
                        '#gray' 
                      }}
                    />
                    <span className="font-medium text-gray-900">
                      {damageClassNames[detection.className] || detection.className}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">
                      置信度: {Math.round(detection.confidence * 100)}%
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      severityLevels[detection.className] >= 4 ? 'bg-red-100 text-red-800' :
                      severityLevels[detection.className] >= 3 ? 'bg-orange-100 text-orange-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      严重度: {severityLevels[detection.className] || 0}
                    </span>
                  </div>
                </div>
                
                {detection.bbox && (
                  <div className="text-sm text-gray-600">
                    位置: ({detection.bbox.x}, {detection.bbox.y}) 
                    尺寸: {detection.bbox.width} × {detection.bbox.height}px
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 建议 */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-2">处理建议</h4>
        <div className="text-sm text-blue-800 space-y-1">
          {result.riskLevel === 'critical' && (
            <p>• 立即停止使用该结构，联系专业工程师进行紧急评估</p>
          )}
          {result.riskLevel === 'high' && (
            <p>• 尽快安排专业检测，制定维修计划</p>
          )}
          {result.riskLevel === 'medium' && (
            <p>• 建议在下次定期维护时重点关注检测到的损伤</p>
          )}
          {result.riskLevel === 'low' && (
            <p>• 继续定期监测，暂无紧急处理需求</p>
          )}
          <p>• 建议保存此报告作为结构健康档案的一部分</p>
        </div>
      </div>
    </div>
  );
};