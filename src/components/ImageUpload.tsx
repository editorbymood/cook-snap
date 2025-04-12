
import React, { useState, useRef } from "react";
import { Camera, Upload, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ImageUploadProps {
  onImageSelect: (image: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    if (!file.type.match('image.*')) {
      toast.error("Please select an image file (JPEG, PNG, etc.)");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image size should be less than 10MB");
      return;
    }

    onImageSelect(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const triggerCameraInput = () => {
    cameraInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  };

  return (
    <div 
      className={cn(
        "image-upload-area rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer",
        isDragging && "drag-active"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={triggerFileInput}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        accept="image/*" 
        className="hidden" 
        onChange={handleFileInputChange}
      />
      <input 
        type="file" 
        ref={cameraInputRef} 
        accept="image/*" 
        capture="environment"
        className="hidden" 
        onChange={handleFileInputChange}
      />

      <ImageIcon className="h-16 w-16 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold mb-2">Drag & drop image or click to browse</h3>
      <p className="text-muted-foreground text-sm max-w-sm text-center mb-6">
        Upload a food image to get recipe suggestions. JPEG, PNG or GIF up to 10MB.
      </p>
      
      <div className="flex flex-wrap justify-center gap-4">
        <Button onClick={(e) => { e.stopPropagation(); triggerFileInput(); }} variant="outline" className="flex gap-2">
          <Upload className="h-4 w-4" />
          <span>Upload Image</span>
        </Button>
        
        <Button onClick={(e) => { e.stopPropagation(); triggerCameraInput(); }} variant="outline" className="flex gap-2">
          <Camera className="h-4 w-4" />
          <span>Take Photo</span>
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
