import React, { useState } from 'react';
import { Cog6ToothIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

interface SettingsPanelProps {
  onSettingsChange: (settings: DetectionSettings) => void;
}

export interface DetectionSettings {
  confidenceThreshold: number;
  enablePreprocessing: boolean;
  showBoundingBoxes: boolean;
  showConfidenceScores: boolean;
  autoSave: boolean;
  language: 'zh' | 'en';
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ onSettingsChange }) => {
  const [settings, setSettings] = useState<DetectionSettings>({
    confidenceThreshold: 0.5,
    enablePreprocessing: true,
    showBoundingBoxes: true,
    showConfidenceScores: true,
    autoSave: true,
    language: 'zh'
  });

  const handleSettingChange = (key: keyof DetectionSettings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Cog6ToothIcon className="w-5 h-5 mr-2" />
        检测设置
      </h3>

      <div className="space-y-6">
        {/* 置信度阈值 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            置信度阈值: {(settings.confidenceThreshold * 100).toFixed(0)}%
          </label>
          <input
            type="range"
            min="0.1"
            max="0.9"
            step="0.1"
            value={settings.confidenceThreshold}
            onChange={(e) => handleSettingChange('confidenceThreshold', parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>10%</span>
            <span>90%</span>
          </div>
        </div>

        {/* 开关设置 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              启用图像预处理
            </label>
            <button
              onClick={() => handleSettingChange('enablePreprocessing', !settings.enablePreprocessing)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.enablePreprocessing ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.enablePreprocessing ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              显示边界框
            </label>
            <button
              onClick={() => handleSettingChange('showBoundingBoxes', !settings.showBoundingBoxes)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.showBoundingBoxes ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.showBoundingBoxes ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              显示置信度分数
            </label>
            <button
              onClick={() => handleSettingChange('showConfidenceScores', !settings.showConfidenceScores)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.showConfidenceScores ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.showConfidenceScores ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              自动保存结果
            </label>
            <button
              onClick={() => handleSettingChange('autoSave', !settings.autoSave)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.autoSave ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.autoSave ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* 语言设置 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            界面语言
          </label>
          <select
            value={settings.language}
            onChange={(e) => handleSettingChange('language', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="zh">中文</option>
            <option value="en">English</option>
          </select>
        </div>

        {/* 重置按钮 */}
        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={() => {
              const defaultSettings: DetectionSettings = {
                confidenceThreshold: 0.5,
                enablePreprocessing: true,
                showBoundingBoxes: true,
                showConfidenceScores: true,
                autoSave: true,
                language: 'zh'
              };
              setSettings(defaultSettings);
              onSettingsChange(defaultSettings);
            }}
            className="w-full px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            重置为默认设置
          </button>
        </div>
      </div>
    </div>
  );
};