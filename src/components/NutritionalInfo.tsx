import React from "react";
import { NutritionalInfo as NutritionalInfoType } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface NutritionalInfoProps {
  nutritionalInfo: NutritionalInfoType;
}

const NutrientBar: React.FC<{ 
  label: string; 
  value: number; 
  unit: string; 
  percentage: number;
  color: string;
  tooltip?: string;
}> = ({ label, value, unit, percentage, color, tooltip }) => {
  const content = (
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

  if (tooltip) {
    return (
      <div className="relative group">
        {content}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="absolute right-0 top-0 h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  }

  return content;
};

const NutritionalInfo: React.FC<NutritionalInfoProps> = ({ nutritionalInfo }) => {
  const { calories, protein, carbs, fat, fiber, sugar, sodium } = nutritionalInfo;
  
  const total = protein + carbs + fat;
  const proteinPercentage = (protein / total) * 100;
  const carbsPercentage = (carbs / total) * 100;
  const fatPercentage = (fat / total) * 100;
  
  const fiberPercentage = fiber ? (fiber / total) * 35 : 0;
  const sugarPercentage = sugar ? (sugar / total) * 35 : 0;
  const sodiumPercentage = sodium ? Math.min((sodium / 2300) * 100, 100) : 0;

  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
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
            tooltip="Protein is essential for muscle building and repair."
          />
          
          <NutrientBar 
            label="Carbs" 
            value={carbs} 
            unit="g" 
            percentage={carbsPercentage}
            color="bg-green-500" 
            tooltip="Carbohydrates are your body's main source of energy."
          />
          
          <NutrientBar 
            label="Fat" 
            value={fat} 
            unit="g" 
            percentage={fatPercentage}
            color="bg-yellow-500" 
            tooltip="Healthy fats are important for hormone production and cell growth."
          />
          
          {fiber !== undefined && (
            <NutrientBar 
              label="Fiber" 
              value={fiber} 
              unit="g" 
              percentage={fiberPercentage}
              color="bg-orange-500" 
              tooltip="Fiber aids digestion and helps maintain steady blood sugar levels."
            />
          )}
          
          {sugar !== undefined && (
            <NutrientBar 
              label="Sugar" 
              value={sugar} 
              unit="g" 
              percentage={sugarPercentage}
              color="bg-red-500" 
              tooltip="The amount of natural and added sugars in this recipe."
            />
          )}
          
          {sodium !== undefined && (
            <NutrientBar 
              label="Sodium" 
              value={sodium} 
              unit="mg" 
              percentage={sodiumPercentage}
              color="bg-purple-500" 
              tooltip="The recommended daily intake of sodium is less than 2,300mg."
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NutritionalInfo;
