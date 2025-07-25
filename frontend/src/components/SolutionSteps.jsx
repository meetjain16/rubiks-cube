import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ChevronLeft, ChevronRight, SkipBack, SkipForward } from 'lucide-react';

const SolutionSteps = ({ 
  steps, 
  currentStep, 
  onStepForward, 
  onStepBackward, 
  isAnimating 
}) => {
  if (steps.length === 0) {
    return (
      <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
        <CardContent className="p-6 text-center">
          <p className="text-gray-400">Scramble the cube and solve to see step-by-step solution</p>
        </CardContent>
      </Card>
    );
  }

  const currentStepData = steps[currentStep];
  const progress = ((currentStep) / steps.length) * 100;

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-center text-gray-200">
          Solution Steps
        </CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-400">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Step Info */}
        {currentStepData && (
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <Badge 
                variant="outline" 
                className="border-blue-400 text-blue-300 font-mono text-lg"
              >
                {currentStepData.move}
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {currentStepData.phase}
              </Badge>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              {currentStepData.description}
            </p>
          </div>
        )}

        {/* Navigation Controls */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={onStepBackward}
            disabled={currentStep === 0 || isAnimating}
            className="bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-700 hover:to-gray-600 border-0 text-white font-medium transition-all duration-200"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>
          
          <Button
            onClick={onStepForward}
            disabled={currentStep >= steps.length || isAnimating}
            className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 border-0 text-white font-medium transition-all duration-200"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Quick Navigation */}
        <div className="flex justify-center space-x-2">
          <Button
            onClick={() => {
              for (let i = currentStep; i > 0; i--) {
                setTimeout(() => onStepBackward(), (currentStep - i) * 100);
              }
            }}
            disabled={currentStep === 0 || isAnimating}
            size="sm"
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <SkipBack className="w-4 h-4" />
          </Button>
          
          <Button
            onClick={() => {
              for (let i = currentStep; i < steps.length; i++) {
                setTimeout(() => onStepForward(), (i - currentStep) * 100);
              }
            }}
            disabled={currentStep >= steps.length || isAnimating}
            size="sm"
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <SkipForward className="w-4 h-4" />
          </Button>
        </div>

        {/* Steps Overview */}
        <div className="max-h-48 overflow-y-auto space-y-1">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex justify-between items-center p-2 rounded text-sm transition-all duration-200 ${
                index === currentStep
                  ? 'bg-blue-500/20 border border-blue-400/30 text-white'
                  : index < currentStep
                  ? 'bg-green-500/10 text-green-300'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              <span className="flex items-center space-x-2">
                <span className="font-mono font-bold w-8">{index + 1}.</span>
                <span className="font-mono bg-white/10 px-2 py-1 rounded text-xs">
                  {step.move}
                </span>
                <span>{step.phase}</span>
              </span>
              {index < currentStep && (
                <span className="text-green-400">✓</span>
              )}
            </div>
          ))}
        </div>

        {currentStep >= steps.length && (
          <div className="text-center py-4">
            <div className="text-2xl mb-2">🎉</div>
            <h3 className="text-lg font-bold text-green-400 mb-1">Cube Solved!</h3>
            <p className="text-sm text-gray-300">
              Completed in {steps.length} moves using advanced algorithms
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SolutionSteps;