
import React from "react";
import { NutritionalInfo as NutritionalInfoType } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface NutritionalInfoProps {
  nutritionalInfo: NutritionalInfoType;
}

const NutrientBar: React.FC<{ 
  label: string; 
  value: number; 
  unit: string; 
  percentage: number;
  color: string;
}> = ({ label, value, unit, percentage, color }) => {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span className="font-medium">
          {value} {unit}
        </span>
      </div>
      <Progress 
        value={percentage} 
        className="h-2"
        indicatorClassName={color}
      />
    </div>
  );
};

const NutritionalInfo: React.FC<NutritionalInfoProps> = ({ nutritionalInfo }) => {
  const { calories, protein, carbs, fat, fiber, sugar } = nutritionalInfo;
  
  // Calculate macronutrient percentages (for visual representation)
  const total = protein + carbs + fat;
  const proteinPercentage = (protein / total) * 100;
  const carbsPercentage = (carbs / total) * 100;
  const fatPercentage = (fat / total) * 100;
  
  // Handle optional nutrients
  const fiberPercentage = fiber ? (fiber / total) * 35 : 0; // Arbitrary scale
  const sugarPercentage = sugar ? (sugar / total) * 35 : 0; // Arbitrary scale

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Nutritional Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center mb-4">
          <div className="text-3xl font-bold">{calories}</div>
          <div className="text-sm text-muted-foreground">calories per serving</div>
        </div>
        
        <div className="space-y-3">
          <NutrientBar 
            label="Protein" 
            value={protein} 
            unit="g" 
            percentage={proteinPercentage}
            color="bg-blue-500" 
          />
          
          <NutrientBar 
            label="Carbs" 
            value={carbs} 
            unit="g" 
            percentage={carbsPercentage}
            color="bg-green-500" 
          />
          
          <NutrientBar 
            label="Fat" 
            value={fat} 
            unit="g" 
            percentage={fatPercentage}
            color="bg-yellow-500" 
          />
          
          {fiber !== undefined && (
            <NutrientBar 
              label="Fiber" 
              value={fiber} 
              unit="g" 
              percentage={fiberPercentage}
              color="bg-orange-500" 
            />
          )}
          
          {sugar !== undefined && (
            <NutrientBar 
              label="Sugar" 
              value={sugar} 
              unit="g" 
              percentage={sugarPercentage}
              color="bg-red-500" 
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NutritionalInfo;
