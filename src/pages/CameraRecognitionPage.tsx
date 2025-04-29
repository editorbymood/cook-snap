import React from 'react';
import CameraRecognition from '@/components/CameraRecognition';

const CameraRecognitionPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Food Recognition</h1>
      <CameraRecognition />
    </div>
  );
};

export default CameraRecognitionPage; 