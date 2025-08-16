import React, { useState, useEffect } from 'react';
import { ClockIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';

interface HistoryItem {
  id: string;
  timestamp: Date;
  imageName: string;
  detectionsCount: number;
  riskLevel: string;
  thumbnail: string;
}

interface HistoryPanelProps {
  onLoadHistory: (item: HistoryItem) => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ onLoadHistory }) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    // 从localStorage加载历史记录
    const savedHistory = localStorage.getItem('damageDetectionHistory');
    if (savedHistory) {
      const parsed = JSON.parse(savedHistory);
      setHistory(parsed.map((item: any) => ({
        ...item,
        timestamp: new Date(item.timestamp)
      })));
    }
  }, []);

  const saveToHistory = (item: Omit<HistoryItem, 'id' | 'timestamp'>) => {
    const newItem: HistoryItem = {
      ...item,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    
    const updatedHistory = [newItem, ...history].slice(0, 10); // 保留最近10条记录
    setHistory(updatedHistory);
    
    localStorage.setItem('damageDetectionHistory', JSON.stringify(updatedHistory));
  };

  const deleteHistoryItem = (id: string) => {
    const updatedHistory = history.filter(item => item.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem('damageDetectionHistory', JSON.stringify(updatedHistory));
  };

  const clearAllHistory = () => {
    setHistory([]);
    localStorage.removeItem('damageDetectionHistory');
  };

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case '严重风险': return 'text-red-600 bg-red-50';
      case '高风险': return 'text-orange-600 bg-orange-50';
      case '中等风险': return 'text-blue-600 bg-blue-50';
      default: return 'text-green-600 bg-green-50';
    }
  };

  // 暴露保存方法给父组件使用
  React.useImperativeHandle(React.createRef(), () => ({
    saveToHistory
  }));

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <ClockIcon className="w-5 h-5 mr-2" />
          检测历史
        </h3>
        {history.length > 0 && (
          <button
            onClick={clearAllHistory}
            className="text-sm text-red-600 hover:text-red-800"
          >
            清空历史
          </button>
        )}
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {history.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <ClockIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>暂无检测历史</p>
          </div>
        ) : (
          history.map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <img
                src={item.thumbnail}
                alt={item.imageName}
                className="w-12 h-12 object-cover rounded"
              />
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {item.imageName}
                </p>
                <p className="text-xs text-gray-500">
                  {item.timestamp.toLocaleString('zh-CN')}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-gray-600">
                    {item.detectionsCount} 个损伤
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${getRiskLevelColor(item.riskLevel)}`}>
                    {item.riskLevel}
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-1">
                <button
                  onClick={() => onLoadHistory(item)}
                  className="p-1 text-blue-600 hover:text-blue-800"
                  title="查看详情"
                >
                  <EyeIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteHistoryItem(item.id)}
                  className="p-1 text-red-600 hover:text-red-800"
                  title="删除记录"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};