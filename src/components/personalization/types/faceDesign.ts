
export interface FaceDesign {
  faceId: string;
  canvasImage: string;
  productName?: string;
  productId?: string;
  startingPrice?: string;
  isPersonalizable?: boolean;
  availableColors?: string[];
  selectedColor?: string;
  textElements: Array<{
    content: string;
    font: string;
    color: string;
    size: number;
    position?: { x: number; y: number };
    rotation?: number;
    style: {
      bold: boolean;
      italic: boolean;
      underline: boolean;
      align: string;
    };
  }>;
  uploadedImages: Array<{
    name: string;
    url: string;
    position?: { x: number; y: number };
    size?: { width: number; height: number };
    rotation?: number;
  }>;
}
