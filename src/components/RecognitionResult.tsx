
import React from "react";
import { RecognitionResult } from "@/types";
import { Button } from "@/components/ui/button";
import { Check, RefreshCw } from "lucide-react";

interface RecognitionResultProps {
  result: RecognitionResult;
  onConfirm: (foodName: string) => void;
  onRetry: () => void;
  isLoading: boolean;
}

const RecognitionResultComponent: React.FC<RecognitionResultProps> = ({
  result,
  onConfirm,
  onRetry,
  isLoading
}) => {
  return (
    <div className="border rounded-lg p-6 bg-card">
      <h2 className="text-xl font-semibold mb-4">Recognition Results</h2>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">{result.foodName}</span>
          <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
            {Math.round(result.confidence * 100)}% confident
          </span>
        </div>
        
        <Button 
          onClick={() => onConfirm(result.foodName)} 
          className="w-full mt-2 font-medium"
          disabled={isLoading}
        >
          <Check className="mr-2 h-4 w-4" />
          Use This Result
        </Button>
      </div>
      
      {result.possibleAlternatives && result.possibleAlternatives.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Other possibilities:</h3>
          <div className="space-y-2">
            {result.possibleAlternatives.map((alt, index) => (
              <Button 
                key={index} 
                variant="outline" 
                onClick={() => onConfirm(alt)} 
                className="w-full justify-between"
                disabled={isLoading}
              >
                {alt}
                <span className="text-muted-foreground">Select</span>
              </Button>
            ))}
          </div>
        </div>
      )}
      
      <Button 
        variant="outline" 
        onClick={onRetry} 
        className="w-full"
        disabled={isLoading}
      >
        <RefreshCw className="mr-2 h-4 w-4" />
        Try Another Image
      </Button>
    </div>
  );
};

export default RecognitionResultComponent;
