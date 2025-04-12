
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Camera as CameraIcon, RefreshCw, X } from "lucide-react";
import { toast } from "sonner";

interface CameraProps {
  onCapture: (image: File) => void;
  onClose: () => void;
}

const Camera: React.FC<CameraProps> = ({ onCapture, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    // Check if the device has multiple cameras
    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      navigator.mediaDevices.enumerateDevices()
        .then(devices => {
          const videoDevices = devices.filter(device => device.kind === 'videoinput');
          setHasMultipleCameras(videoDevices.length > 1);
        })
        .catch(err => {
          console.error("Error checking cameras:", err);
        });
    }
  }, []);

  useEffect(() => {
    startCamera();
    
    return () => {
      // Clean up on unmount
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [facingMode]);

  const startCamera = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      toast.error("Camera not supported on your device or browser");
      return;
    }

    try {
      // Stop any existing stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode }
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraOpen(true);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast.error("Could not access camera. Please check permissions.");
    }
  };

  const toggleCamera = () => {
    setFacingMode(prev => (prev === "user" ? "environment" : "user"));
  };

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw the current video frame on the canvas
    const context = canvas.getContext('2d');
    if (!context) return;
    
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convert canvas to file
    canvas.toBlob((blob) => {
      if (!blob) {
        toast.error("Failed to capture image");
        return;
      }
      
      const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
      onCapture(file);
      
      // Clean up
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      setIsCameraOpen(false);
    }, "image/jpeg", 0.8);
  };

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-lg font-medium">Take a Photo</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center bg-black">
        <video 
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="h-full w-full object-cover"
        />
        
        <canvas ref={canvasRef} className="hidden" />
      </div>
      
      <div className="p-4 flex justify-center gap-4">
        {hasMultipleCameras && (
          <Button variant="outline" size="icon" onClick={toggleCamera}>
            <RefreshCw className="h-5 w-5" />
          </Button>
        )}
        
        <Button 
          className="h-16 w-16 rounded-full"
          onClick={captureImage}
          disabled={!isCameraOpen}
        >
          <CameraIcon className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default Camera;
