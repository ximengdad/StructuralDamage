import React, { useState } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ImageViewer } from './components/ImageViewer';
import { ResultsPanel } from './components/ResultsPanel';
import { AnalysisResult } from './types/damage';
import { processImage } from './utils/imageProcessing';
import { Building, Shield, Zap } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!result ? (
          <div className="space-y-8">
            {/* 功能介绍 */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                AI驱动的结构损伤检测
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
                上传建筑结构图片，我们的AI模型将自动识别并分类16种不同类型的损伤，
                为您提供专业的结构安全评估报告。
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="text-center p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">快速检测</h3>
                  <p className="text-gray-600 text-sm">
                    几秒钟内完成图像分析，快速识别结构损伤
                  </p>
                </div>
                
                <div className="text-center p-6">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">精准识别</h3>
                  <p className="text-gray-600 text-sm">
                    识别16种损伤类型，提供详细的风险评估
                  </p>
                </div>
                
                <div className="text-center p-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Building className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">专业报告</h3>
                  <p className="text-gray-600 text-sm">
                    生成详细的检测报告，支持下载保存
                  </p>
                </div>
              </div>
            </div>

            {/* 上传区域 */}
            <div className="max-w-2xl mx-auto">
              <ImageUploader 
                onImageSelect={handleImageSelect} 
                isProcessing={isProcessing}
              />
            </div>

            {/* 支持的损伤类型 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                可检测的损伤类型
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                {[
                  '裂缝', '活动裂缝', '锈蚀', '钢筋外露',
                  '剥落/混凝土腐蚀', '空鼓区域', '空洞/蜂窝', '泛碱',
                  '湿斑/风化', '伸缩缝', '支座', '排水系统',
                  '模板残留', '接缝胶带', '涂鸦', '设备'
                ].map((type, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                    <div className="w-3 h-3 bg-primary-500 rounded-full" />
                    <span className="text-gray-700">{type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* 返回按钮 */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  setResult(null);
                  setFileName('');
                }}
                className="btn btn-secondary"
              >
                ← 返回上传
              </button>
              <h2 className="text-2xl font-bold text-gray-900">检测结果</h2>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <ImageViewer result={result} fileName={fileName} />
              <ResultsPanel result={result} fileName={fileName} />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">
              结构损伤智能检测平台 - 基于深度学习的建筑安全评估系统
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;