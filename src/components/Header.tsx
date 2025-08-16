import React from 'react';
import { BuildingOfficeIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
              <BuildingOfficeIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">结构损伤检测平台</h1>
              <p className="text-sm text-gray-500">AI驱动的建筑安全评估系统</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <ShieldCheckIcon className="w-5 h-5 text-green-500" />
            <span>系统正常运行</span>
          </div>
        </div>
      </div>
    </header>
  );
};