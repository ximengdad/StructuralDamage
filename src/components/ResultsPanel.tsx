import React from 'react';
import { AnalysisResult } from '../types/damage';
import { damageClassNames, severityLevels } from '../data/damageClasses';
import { AlertTriangle, CheckCircle, XCircle, AlertCircle, Download, TrendingUp, Shield, Target } from 'lucide-react';
import { downloadReport } from '../utils/imageProcessing';

interface ResultsPanelProps {
  result: AnalysisResult;
  fileName: string;
}

export const ResultsPanel: React.FC<ResultsPanelProps> = ({ result, fileName }) => {
  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'low': return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'medium': return <AlertCircle className="w-6 h-6 text-yellow-500" />;
      case 'high': return <AlertTriangle className="w-6 h-6 text-orange-500" />;
      case 'critical': return <XCircle className="w-6 h-6 text-red-500" />;
      default: return <AlertCircle className="w-6 h-6 text-gray-500" />;
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'from-green-500 to-emerald-600 text-white';
      case 'medium': return 'from-yellow-500 to-orange-500 text-white';
      case 'high': return 'from-orange-500 to-red-500 text-white';
      case 'critical': return 'from-red-500 to-red-700 text-white';
      default: return 'from-gray-500 to-gray-600 text-white';
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

  const getSeverityColor = (severity: number) => {
    if (severity >= 4) return 'from-red-500 to-red-600';
    if (severity >= 3) return 'from-orange-500 to-orange-600';
    return 'from-yellow-500 to-yellow-600';
  };

  return (
    <div className="glass-card p-8 animate-slide-up">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold gradient-text">检测结果</h2>
        </div>
        <button
          onClick={() => downloadReport(result, fileName)}
          className="btn-primary px-6 py-3"
        >
          <Download className="w-4 h-4 mr-2" />
          下载报告
        </button>
      </div>

      {/* 风险等级卡片 */}
      <div className={`rounded-2xl bg-gradient-to-r ${getRiskColor(result.riskLevel)} p-6 mb-8 shadow-lg`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {getRiskIcon(result.riskLevel)}
            <div>
              <h3 className="font-bold text-xl mb-1">
                整体风险等级: {getRiskText(result.riskLevel)}
              </h3>
              <p className="opacity-90">
                检测到 <span className="font-semibold">{result.detections.length}</span> 处损伤，
                涉及 <span className="font-semibold">{result.damageTypes.length}</span> 种损伤类型
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold opacity-20">
              {result.riskLevel.toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      {/* 统计概览 */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
          <div className="flex items-center space-x-3">
            <Target className="w-8 h-8 text-blue-600" />
            <div>
              <div className="text-2xl font-bold text-blue-600">{result.detections.length}</div>
              <div className="text-sm text-blue-600/70">检测总数</div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-purple-600" />
            <div>
              <div className="text-2xl font-bold text-purple-600">{result.damageTypes.length}</div>
              <div className="text-sm text-purple-600/70">损伤类型</div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div>
              <div className="text-2xl font-bold text-green-600">
                {Math.round((result.detections.reduce((sum, d) => sum + d.confidence, 0) / result.detections.length) * 100) || 0}%
              </div>
              <div className="text-sm text-green-600/70">平均置信度</div>
            </div>
          </div>
        </div>
      </div>

      {/* 检测详情 */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
          <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
          <span>损伤详情</span>
        </h3>
        
        {result.detections.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">结构状况良好</h4>
            <p className="text-gray-600">未检测到明显的结构损伤</p>
          </div>
        ) : (
          <div className="space-y-4">
            {result.detections.map((detection, index) => (
              <div key={index} className="bg-white/60 backdrop-blur-sm border border-white/30 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div
                        className="w-4 h-4 rounded-full border-2 border-white shadow-lg"
                        style={{ 
                          backgroundColor: `hsl(${(severityLevels[detection.className] || 0) * 60}, 70%, 50%)` 
                        }}
                      />
                      <div className="absolute inset-0 rounded-full animate-ping opacity-30"
                        style={{ 
                          backgroundColor: `hsl(${(severityLevels[detection.className] || 0) * 60}, 70%, 50%)` 
                        }}
                      />
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800 text-lg">
                        {damageClassNames[detection.className] || detection.className}
                      </span>
                      <div className="text-sm text-gray-600">
                        检测编号: #{String(index + 1).padStart(3, '0')}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="text-sm text-gray-600">置信度</div>
                      <div className="text-lg font-bold text-gray-800">
                        {Math.round(detection.confidence * 100)}%
                      </div>
                    </div>
                    <div className={`px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r ${getSeverityColor(severityLevels[detection.className] || 0)} text-white shadow-sm`}>
                      严重度: {severityLevels[detection.className] || 0}
                    </div>
                  </div>
                </div>
                
                {detection.bbox && (
                  <div className="bg-gray-50/80 rounded-lg p-3 text-sm text-gray-600">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="font-medium">位置坐标:</span> ({detection.bbox.x}, {detection.bbox.y})
                      </div>
                      <div>
                        <span className="font-medium">区域大小:</span> {detection.bbox.width} × {detection.bbox.height}px
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 处理建议 */}
      <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
        <h4 className="font-bold text-blue-900 mb-4 flex items-center space-x-2">
          <Shield className="w-5 h-5" />
          <span>专业处理建议</span>
        </h4>
        <div className="space-y-3 text-sm text-blue-800">
          {result.riskLevel === 'critical' && (
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>⚠️ <strong>紧急处理：</strong>立即停止使用该结构，联系专业工程师进行紧急评估</p>
            </div>
          )}
          {result.riskLevel === 'high' && (
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>🔧 <strong>优先处理：</strong>尽快安排专业检测，制定详细的维修计划</p>
            </div>
          )}
          {result.riskLevel === 'medium' && (
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>📋 <strong>计划维护：</strong>建议在下次定期维护时重点关注检测到的损伤</p>
            </div>
          )}
          {result.riskLevel === 'low' && (
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <p>✅ <strong>持续监测：</strong>继续定期监测，暂无紧急处理需求</p>
            </div>
          )}
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <p>📄 <strong>档案管理：</strong>建议保存此报告作为结构健康档案的重要组成部分</p>
          </div>
        </div>
      </div>
    </div>
  );
};