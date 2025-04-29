import React from "react";
import { NutritionalInfo as NutritionalInfoType } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface NutritionalInfoProps {
  info: NutritionalInfoType;
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

const NutritionalInfo: React.FC<NutritionalInfoProps> = ({ info }) => {
  const totalNutrients = info.protein + info.carbs + info.fat;
  
  const calculatePercentage = (value: number) => {
    return (value / totalNutrients) * 100;
  };

  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg">Nutritional Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center mb-4">
          <div className="text-3xl font-bold">{info.calories}</div>
          <div className="text-sm text-muted-foreground">calories per serving</div>
        </div>
        
        <div className="space-y-3">
          <NutrientBar 
            label="Protein" 
            value={info.protein} 
            unit="g" 
            percentage={calculatePercentage(info.protein)}
            color="bg-blue-500" 
            tooltip="Protein is essential for muscle building and repair."
          />
          
          <NutrientBar 
            label="Carbs" 
            value={info.carbs} 
            unit="g" 
            percentage={calculatePercentage(info.carbs)}
            color="bg-green-500" 
            tooltip="Carbohydrates are your body's main source of energy."
          />
          
          <NutrientBar 
            label="Fat" 
            value={info.fat} 
            unit="g" 
            percentage={calculatePercentage(info.fat)}
            color="bg-yellow-500" 
            tooltip="Healthy fats are important for hormone production and cell growth."
          />
          
          {info.fiber !== undefined && (
            <NutrientBar 
              label="Fiber" 
              value={info.fiber} 
              unit="g" 
              percentage={calculatePercentage(info.fiber)}
              color="bg-orange-500" 
              tooltip="Fiber aids digestion and helps maintain steady blood sugar levels."
            />
          )}
          
          {info.sugar !== undefined && (
            <NutrientBar 
              label="Sugar" 
              value={info.sugar} 
              unit="g" 
              percentage={calculatePercentage(info.sugar)}
              color="bg-red-500" 
              tooltip="The amount of natural and added sugars in this recipe."
            />
          )}
          
          {info.sodium !== undefined && (
            <NutrientBar 
              label="Sodium" 
              value={info.sodium} 
              unit="mg" 
              percentage={calculatePercentage(info.sodium)}
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
