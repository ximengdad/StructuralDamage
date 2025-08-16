import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { DamageDetection } from '../types/damage';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

interface StatisticsPanelProps {
  detections: DamageDetection[];
}

export const StatisticsPanel: React.FC<StatisticsPanelProps> = ({ detections }) => {
  // 统计各类损伤数量
  const damageStats = detections.reduce((acc, detection) => {
    acc[detection.type] = (acc[detection.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 统计严重程度分布
  const severityStats = detections.reduce((acc, detection) => {
    acc[detection.severity] = (acc[detection.severity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const damageChartData = {
    labels: Object.keys(damageStats),
    datasets: [
      {
        data: Object.values(damageStats),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
          '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF',
          '#4BC0C0', '#FF6384', '#36A2EB', '#FFCE56'
        ],
        borderWidth: 2,
        borderColor: '#fff'
      }
    ]
  };

  const severityChartData = {
    labels: ['轻微', '中等', '严重'],
    datasets: [
      {
        label: '损伤数量',
        data: [
          severityStats['轻微'] || 0,
          severityStats['中等'] || 0,
          severityStats['严重'] || 0
        ],
        backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
        borderRadius: 4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true
        }
      }
    }
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">检测统计</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 损伤类型分布 */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-4">损伤类型分布</h4>
          <div className="h-64">
            {Object.keys(damageStats).length > 0 ? (
              <Doughnut data={damageChartData} options={chartOptions} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                暂无检测数据
              </div>
            )}
          </div>
        </div>

        {/* 严重程度分布 */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-4">严重程度分布</h4>
          <div className="h-64">
            {detections.length > 0 ? (
              <Bar data={severityChartData} options={barOptions} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                暂无检测数据
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 数据摘要 */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{detections.length}</div>
            <div className="text-sm text-gray-500">总检测数</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {detections.filter(d => d.severity === '严重').length}
            </div>
            <div className="text-sm text-gray-500">严重损伤</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {detections.filter(d => d.severity === '中等').length}
            </div>
            <div className="text-sm text-gray-500">中等损伤</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {detections.filter(d => d.severity === '轻微').length}
            </div>
            <div className="text-sm text-gray-500">轻微损伤</div>
          </div>
        </div>
      </div>
    </div>
  );
};