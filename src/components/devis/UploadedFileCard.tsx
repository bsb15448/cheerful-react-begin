
import { Button } from "@/components/ui/button";
import { Trash2, Eye, FileText } from "lucide-react";

interface UploadedFileCardProps {
  file: File;
  onView: () => void;
  onRemove: () => void;
}

export const UploadedFileCard = ({ file, onView, onRemove }: UploadedFileCardProps) => {
  const fileSize = (file.size / 1024 / 1024).toFixed(2);
  const fileType = file.type.split('/')[1]?.toUpperCase() || 'FICHIER';
  
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/10 hover:bg-muted/20 transition-colors">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10">
          <FileText className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{file.name}</p>
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
            <span>{fileSize} MB</span>
            <span className="w-1 h-1 rounded-full bg-gray-400"></span>
            <span>{fileType}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={onView}
          title="Prévisualiser"
        >
          <Eye className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:text-destructive"
          onClick={onRemove}
          title="Supprimer"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
