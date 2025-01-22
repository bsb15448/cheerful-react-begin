import { useEffect, useRef } from "react";
import { Canvas, Text, Rect } from "fabric";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { productZoneConfigs } from "./config/zoneConfig";
import { toast } from "sonner";

interface CanvasContainerProps {
  canvas: Canvas | null;
  setCanvas: (canvas: Canvas | null) => void;
  isMobile: boolean;
  text: string;
  selectedFont: string;
  onObjectDelete: () => void;
  selectedCategory: string | null;
}

const CanvasContainer = ({ 
  canvas, 
  setCanvas, 
  isMobile, 
  text, 
  selectedFont,
  onObjectDelete,
  selectedCategory 
}: CanvasContainerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);

  // Handle showing/hiding delete button
  const updateDeleteButton = (target: any) => {
    if (!deleteButtonRef.current || !canvas || !canvas.lowerCanvasEl) return;
    
    if (target) {
      const bound = target.getBoundingRect();
      const offset = canvas.calcOffset();
      
      // Position the delete button relative to the canvas container
      const canvasContainer = canvas.lowerCanvasEl.parentElement;
      if (!canvasContainer) return;
      
      const canvasRect = canvasContainer.getBoundingClientRect();
      const buttonLeft = bound.left + bound.width - 12;
      const buttonTop = bound.top - 12;
      
      deleteButtonRef.current.style.display = 'flex';
      deleteButtonRef.current.style.left = `${buttonLeft}px`;
      deleteButtonRef.current.style.top = `${buttonTop}px`;
    } else {
      deleteButtonRef.current.style.display = 'none';
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvasWidth = isMobile ? window.innerWidth - 32 : 500;
    const canvasHeight = isMobile ? window.innerHeight * 0.5 : 600;

    const fabricCanvas = new Canvas(canvasRef.current, {
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: "#f8f9fa",
      preserveObjectStacking: true,
    });

    // Find the selected product zone
    const productZone = productZoneConfigs.find(zone => zone.id === selectedCategory);

    if (productZone) {
      const clipRect = new Rect({
        width: productZone.zone.width,
        height: productZone.zone.height,
        left: productZone.zone.left,
        top: productZone.zone.top,
        absolutePositioned: true,
        fill: productZone.zone.backgroundColor,
        stroke: productZone.zone.borderColor,
        strokeWidth: productZone.zone.borderWidth,
        strokeDashArray: productZone.zone.borderStyle === 'dashed' ? [5, 5] : undefined,
        selectable: false,
        evented: false,
      });

      fabricCanvas.clipPath = clipRect;
      
      const borderRect = new Rect({
        width: productZone.zone.width,
        height: productZone.zone.height,
        left: productZone.zone.left,
        top: productZone.zone.top,
        fill: 'transparent',
        stroke: productZone.zone.borderColor,
        strokeWidth: productZone.zone.borderWidth,
        strokeDashArray: productZone.zone.borderStyle === 'dashed' ? [5, 5] : undefined,
        selectable: false,
        evented: false,
      });
      
      fabricCanvas.add(borderRect);
      fabricCanvas.sendObjectToBack(borderRect);

      const placeholderText = new Text("Tapez votre texte ici...", {
        left: productZone.zone.left + productZone.zone.width / 2,
        top: productZone.zone.top + productZone.zone.height / 2,
        fontSize: 20,
        fill: "#999999",
        fontFamily: selectedFont,
        originX: 'center',
        originY: 'center',
        selectable: false,
        opacity: 0.7
      });

      fabricCanvas.add(placeholderText);
    }

    // Add object selection event handlers
    fabricCanvas.on('selection:created', (e) => {
      updateDeleteButton(e.selected?.[0]);
    });

    fabricCanvas.on('selection:updated', (e) => {
      updateDeleteButton(e.selected?.[0]);
    });

    fabricCanvas.on('selection:cleared', () => {
      updateDeleteButton(null);
    });

    fabricCanvas.on('object:moving', (e) => {
      const obj = e.target;
      if (!obj || !productZone) return;

      const objBounds = obj.getBoundingRect();
      const zone = productZone.zone;

      const objCenterX = objBounds.left + objBounds.width / 2;
      const objCenterY = objBounds.top + objBounds.height / 2;

      const zoneLeft = zone.left;
      const zoneRight = zone.left + zone.width;
      const zoneTop = zone.top;
      const zoneBottom = zone.top + zone.height;

      if (objBounds.left < zoneLeft) {
        obj.set('left', obj.left + (zoneLeft - objBounds.left));
      }
      if (objBounds.top < zoneTop) {
        obj.set('top', obj.top + (zoneTop - objBounds.top));
      }
      if (objBounds.left + objBounds.width > zoneRight) {
        obj.set('left', obj.left - ((objBounds.left + objBounds.width) - zoneRight));
      }
      if (objBounds.top + objBounds.height > zoneBottom) {
        obj.set('top', obj.top - ((objBounds.top + objBounds.height) - zoneBottom));
      }

      updateDeleteButton(obj);
      fabricCanvas.renderAll();
    });

    fabricCanvas.on('object:scaling', (e) => {
      const obj = e.target;
      if (!obj || !productZone) return;

      const objBounds = obj.getBoundingRect();
      const zone = productZone.zone;
      
      const currentScaleX = obj.scaleX || 1;
      const currentScaleY = obj.scaleY || 1;

      const isWithinBounds = 
        objBounds.left >= zone.left &&
        objBounds.top >= zone.top &&
        objBounds.left + objBounds.width <= zone.left + zone.width &&
        objBounds.top + objBounds.height <= zone.top + zone.height;

      if (!isWithinBounds) {
        if (typeof obj.get('lastScaleX') === 'number') {
          obj.set('scaleX', obj.get('lastScaleX'));
        }
        if (typeof obj.get('lastScaleY') === 'number') {
          obj.set('scaleY', obj.get('lastScaleY'));
        }
      } else {
        obj.set('lastScaleX', currentScaleX);
        obj.set('lastScaleY', currentScaleY);
      }
      
      updateDeleteButton(obj);
      fabricCanvas.renderAll();
    });

    fabricCanvas.renderAll();
    setCanvas(fabricCanvas);

    return () => {
      fabricCanvas.dispose();
    };
  }, [isMobile, selectedFont, selectedCategory]);

  useEffect(() => {
    if (!canvas || !selectedCategory) return;

    const productZone = productZoneConfigs.find(zone => zone.id === selectedCategory);
    if (!productZone) return;

    const existingTexts = canvas.getObjects().filter(obj => obj instanceof Text);
    existingTexts.forEach(textObj => canvas.remove(textObj));

    if (text) {
      const fabricText = new Text(text, {
        left: productZone.zone.left + productZone.zone.width / 2,
        top: productZone.zone.top + productZone.zone.height / 2,
        fontSize: 16,
        fill: "#000000",
        fontFamily: selectedFont,
        originX: 'center',
        originY: 'center',
        hasControls: true,
        hasBorders: true,
        lockUniScaling: false,
        transparentCorners: false,
        cornerColor: 'rgba(102,153,255,0.5)',
        cornerSize: 12,
        padding: 5
      });

      canvas.add(fabricText);
      canvas.setActiveObject(fabricText);
    } else {
      const placeholderText = new Text("Tapez votre texte ici...", {
        left: productZone.zone.left + productZone.zone.width / 2,
        top: productZone.zone.top + productZone.zone.height / 2,
        fontSize: 20,
        fill: "#999999",
        fontFamily: selectedFont,
        originX: 'center',
        originY: 'center',
        selectable: false,
        opacity: 0.7
      });
      canvas.add(placeholderText);
    }

    canvas.renderAll();
  }, [text, canvas, selectedFont, selectedCategory]);

  const handleDeleteClick = () => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.remove(activeObject);
      canvas.renderAll();
      updateDeleteButton(null);
      onObjectDelete();
      toast.success("Élément supprimé");
    }
  };

  return (
    <Card className="p-4 lg:p-6">
      <div className="w-full flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden relative min-h-[600px]">
        <canvas 
          ref={canvasRef} 
          className="max-w-full touch-manipulation shadow-lg"
        />
        <button
          ref={deleteButtonRef}
          onClick={handleDeleteClick}
          className="absolute hidden items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 cursor-pointer shadow-lg transition-colors"
          style={{
            zIndex: 1000,
            transform: 'translate(50%, -50%)',
            display: 'none', // Initially hidden
          }}
          aria-label="Delete item"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </Card>
  );
};

export default CanvasContainer;
