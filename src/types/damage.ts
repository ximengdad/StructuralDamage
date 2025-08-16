export interface DamageClass {
  name: string;
  r: number;
  g: number;
  b: number;
  color: string;
}

export interface DetectionResult {
  className: string;
  confidence: number;
  bbox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  mask?: ImageData;
}

export interface AnalysisResult {
  detections: DetectionResult[];
  processedImage: string;
  totalDamageArea: number;
  damageTypes: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}