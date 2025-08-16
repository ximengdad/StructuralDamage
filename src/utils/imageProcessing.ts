import { AnalysisResult, DetectionResult } from '../types/damage';
import { damageClasses, damageClassNames, severityLevels } from '../data/damageClasses';

export const processImage = async (imageFile: File): Promise<AnalysisResult> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // 模拟AI检测结果
        const mockDetections = generateMockDetections(img.width, img.height);
        const processedImageUrl = e.target?.result as string;
        
        const damageTypes = [...new Set(mockDetections.map(d => d.className))];
        const totalDamageArea = mockDetections.reduce((sum, d) => 
          sum + (d.bbox ? d.bbox.width * d.bbox.height : 0), 0
        );
        
        const maxSeverity = Math.max(...mockDetections.map(d => severityLevels[d.className] || 0));
        const riskLevel = getRiskLevel(maxSeverity, totalDamageArea, img.width * img.height);
        
        resolve({
          detections: mockDetections,
          processedImage: processedImageUrl,
          totalDamageArea,
          damageTypes,
          riskLevel
        });
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(imageFile);
  });
};

const generateMockDetections = (width: number, height: number): DetectionResult[] => {
  const detections: DetectionResult[] = [];
  const damageTypes = ['crack', 'rust', 'spalling_wconccor', 'exposedrebars', 'efflorescence'];
  
  // 生成随机检测结果
  const numDetections = Math.floor(Math.random() * 5) + 1;
  
  for (let i = 0; i < numDetections; i++) {
    const className = damageTypes[Math.floor(Math.random() * damageTypes.length)];
    const x = Math.floor(Math.random() * (width - 100));
    const y = Math.floor(Math.random() * (height - 100));
    const w = Math.floor(Math.random() * 150) + 50;
    const h = Math.floor(Math.random() * 150) + 50;
    
    detections.push({
      className,
      confidence: Math.random() * 0.4 + 0.6, // 60-100%
      bbox: {
        x: Math.max(0, x),
        y: Math.max(0, y),
        width: Math.min(w, width - x),
        height: Math.min(h, height - y)
      }
    });
  }
  
  return detections;
};

const getRiskLevel = (maxSeverity: number, damageArea: number, totalArea: number): 'low' | 'medium' | 'high' | 'critical' => {
  const damageRatio = damageArea / totalArea;
  
  if (maxSeverity >= 5 || damageRatio > 0.3) return 'critical';
  if (maxSeverity >= 4 || damageRatio > 0.2) return 'high';
  if (maxSeverity >= 3 || damageRatio > 0.1) return 'medium';
  return 'low';
};

export const downloadReport = (result: AnalysisResult, fileName: string) => {
  const report = {
    timestamp: new Date().toISOString(),
    fileName,
    analysis: {
      riskLevel: result.riskLevel,
      totalDamageTypes: result.damageTypes.length,
      detections: result.detections.map(d => ({
        type: damageClassNames[d.className] || d.className,
        confidence: Math.round(d.confidence * 100),
        severity: severityLevels[d.className] || 0
      }))
    }
  };
  
  const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `damage-report-${Date.now()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};