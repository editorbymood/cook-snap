
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Upload, Camera as CameraIcon, Image as ImageIcon } from "lucide-react";
import Camera from "@/components/Camera";

interface ImageUploadProps {
  onImageSelect: (image: File) => void;
}

const ImageUploadNew: React.FC<ImageUploadProps> = ({ onImageSelect }) => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };
  
  const handleFile = (file: File) => {
    // Check if file is an image
    if (!file.type.match('image.*')) {
      toast.error("Please select an image file");
      return;
    }
    
    // Check if file is too large (10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File is too large. Please select an image under 10MB");
      return;
    }
    
    onImageSelect(file);
  };
  
  const openCamera = () => {
    // Check if camera is supported
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      toast.error("Camera not supported on your device or browser");
      return;
    }
    
    setIsCameraOpen(true);
  };
  
  const handleCameraCapture = (image: File) => {
    setIsCameraOpen(false);
    onImageSelect(image);
  };

  return (
    <>
      <div
        className={`
          border-2 border-dashed rounded-lg p-6 text-center transition-all
          ${dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="rounded-full bg-primary/10 p-3">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium text-lg">Upload a food image</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              Drag and drop an image, or click to browse
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="secondary" onClick={() => document.getElementById("file-upload")?.click()}>
              <ImageIcon className="h-4 w-4 mr-2" />
              Browse Files
            </Button>
            
            <Button variant="secondary" onClick={openCamera}>
              <CameraIcon className="h-4 w-4 mr-2" />
              Take Photo
            </Button>
            
            <input 
              id="file-upload" 
              type="file" 
              accept="image/*" 
              onChange={handleFileInput} 
              className="hidden" 
            />
          </div>
        </div>
      </div>
      
      {isCameraOpen && (
        <Camera 
          onCapture={handleCameraCapture}
          onClose={() => setIsCameraOpen(false)}
        />
      )}
    </>
  );
};

export default ImageUploadNew;
