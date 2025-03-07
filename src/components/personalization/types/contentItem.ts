
export interface ContentItem {
  id: string;
  type: 'text' | 'image';
  content: string;
  side: string;
  color?: string;
  position?: { x: number; y: number };
  size?: { width: number; height: number };
  rotation?: number;
}
