import React, { useState } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ImageViewer } from './components/ImageViewer';
import { ResultsPanel } from './components/ResultsPanel';
import { AnalysisResult } from './types/damage';
import { processImage } from './utils/imageProcessing';
import { Building, Shield, Zap, Brain, Target, Award } from 'lucide-react';

function App() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageSelect = async (file: File) => {
    setIsProcessing(true);
    setFileName(file.name);
    
    try {
      const analysisResult = await processImage(file);
      setResult(analysisResult);
    } catch (error) {
      console.error('处理图片时出错:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!result ? (
          <div className="space-y-16">
            {/* 主标题区域 */}
            <div className="text-center animate-fade-in">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full text-blue-700 text-sm font-medium mb-6">
                <Brain className="w-4 h-4" />
                <span>AI驱动的智能检测技术</span>
              </div>
              <h2 className="text-5xl font-bold gradient-text mb-6 leading-tight">
                结构损伤智能识别平台
              </h2>
              <p className="text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
                采用先进的深度学习技术，精准识别建筑结构中的16种不同损伤类型，
                为您提供专业级的结构安全评估和风险分析报告
              </p>
            </div>

            {/* 功能特色卡片 */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="feature-card group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-xl text-gray-800 mb-3">闪电检测</h3>
                <p className="text-gray-600 leading-relaxed">
                  基于GPU加速的深度学习模型，3秒内完成图像分析，
                  快速识别裂缝、锈蚀、剥落等多种结构损伤
                </p>
              </div>
              
              <div className="feature-card group">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-xl text-gray-800 mb-3">精准识别</h3>
                <p className="text-gray-600 leading-relaxed">
                  识别16种损伤类型，平均准确率达95%以上，
                  提供像素级精确定位和置信度评估
                </p>
              </div>
              
              <div className="feature-card group">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-xl text-gray-800 mb-3">专业报告</h3>
                <p className="text-gray-600 leading-relaxed">
                  生成符合工程标准的详细检测报告，
                  包含风险评估、处理建议和可视化分析图表
                </p>
              </div>
            </div>

            {/* 上传区域 */}
            <div className="max-w-3xl mx-auto">
              <ImageUploader 
                onImageSelect={handleImageSelect} 
                isProcessing={isProcessing}
              />
            </div>

            {/* 支持的损伤类型展示 */}
            <div className="glass-card p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold gradient-text mb-3">
                  可检测的损伤类型
                </h3>
                <p className="text-gray-600">
                  我们的AI模型经过大量建筑图像训练，能够准确识别以下16种常见的结构损伤
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: '裂缝', color: 'from-red-400 to-red-500', icon: '🔴' },
                  { name: '活动裂缝', color: 'from-red-500 to-red-600', icon: '🔴' },
                  { name: '锈蚀', color: 'from-orange-400 to-orange-500', icon: '🟠' },
                  { name: '钢筋外露', color: 'from-red-600 to-red-700', icon: '🔴' },
                  { name: '剥落腐蚀', color: 'from-blue-400 to-blue-500', icon: '🔵' },
                  { name: '空鼓区域', color: 'from-indigo-400 to-indigo-500', icon: '🟣' },
                  { name: '空洞蜂窝', color: 'from-green-400 to-green-500', icon: '🟢' },
                  { name: '泛碱', color: 'from-green-600 to-green-700', icon: '🟢' },
                  { name: '湿斑风化', color: 'from-teal-400 to-teal-500', icon: '🔵' },
                  { name: '伸缩缝', color: 'from-yellow-400 to-yellow-500', icon: '🟡' },
                  { name: '支座', color: 'from-yellow-600 to-yellow-700', icon: '🟡' },
                  { name: '排水系统', color: 'from-sky-400 to-sky-500', icon: '🔵' },
                  { name: '模板残留', color: 'from-cyan-400 to-cyan-500', icon: '🔵' },
                  { name: '接缝胶带', color: 'from-cyan-500 to-cyan-600', icon: '🔵' },
                  { name: '涂鸦', color: 'from-pink-400 to-pink-500', icon: '🟣' },
                  { name: '设备', color: 'from-gray-400 to-gray-500', icon: '⚪' },
                ].map((type, index) => (
                  <div key={index} className="damage-tag group hover:scale-105 transition-all duration-200">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${type.color} mr-2 group-hover:animate-pulse`} />
                    <span className="text-gray-700 font-medium">{type.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 技术优势 */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 text-white">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-4">技术优势</h3>
                <p className="text-gray-300 text-lg">基于最新的计算机视觉和深度学习技术</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-2">95%+</div>
                  <div className="text-gray-300">识别准确率</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">16</div>
                  <div className="text-gray-300">损伤类型</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-400 mb-2">3s</div>
                  <div className="text-gray-300">检测速度</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-400 mb-2">24/7</div>
                  <div className="text-gray-300">在线服务</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-fade-in">
            {/* 返回按钮和标题 */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  setResult(null);
                  setFileName('');
                }}
                className="btn-secondary px-6 py-3 hover:scale-105 transition-transform"
              >
                ← 返回上传
              </button>
              <div className="text-center">
                <h2 className="text-3xl font-bold gradient-text">检测结果分析</h2>
                <p className="text-gray-600 mt-1">文件: {fileName}</p>
              </div>
              <div className="w-32"></div> {/* 占位符保持居中 */}
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <ImageViewer result={result} fileName={fileName} />
              <ResultsPanel result={result} fileName={fileName} />
            </div>
          </div>
        )}
      </main>

      {/* 页脚 */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Building className="w-6 h-6" />
              <span className="text-xl font-bold">结构损伤智能检测平台</span>
            </div>
            <p className="text-gray-300 mb-6">
              基于深度学习的建筑安全评估系统 | 让建筑检测更智能、更精准、更高效
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
              <span>© 2024 AI Detection Platform</span>
              <span>•</span>
              <span>技术支持: PyTorch + React</span>
              <span>•</span>
              <span>服务状态: 在线</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;