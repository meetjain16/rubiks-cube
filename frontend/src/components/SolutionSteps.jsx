import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ChevronLeft, ChevronRight, SkipBack, SkipForward, BookOpen } from 'lucide-react';

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
        <CardContent className="p-6 text-center space-y-3">
          <BookOpen className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-300">No Solution Yet</h3>
          <p className="text-gray-400">Scramble the cube and click solve to see step-by-step solution</p>
        </CardContent>
      </Card>
    );
  }

  const currentStepData = steps[currentStep];
  const progress = ((currentStep) / steps.length) * 100;
  const isCompleted = currentStep >= steps.length;

  // Group steps by phase for better organization
  const stepsByPhase = steps.reduce((acc, step, index) => {
    if (!acc[step.phase]) acc[step.phase] = [];
    acc[step.phase].push({ ...step, originalIndex: index });
    return acc;
  }, {});

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-center text-gray-200 flex items-center justify-center">
          <BookOpen className="w-5 h-5 mr-2" />
          Solution Guide
        </CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-400">
            <span>{isCompleted ? 'Complete!' : `Step ${currentStep + 1} of ${steps.length}`}</span>
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
        {currentStepData && !isCompleted && (
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Badge 
                  variant="outline" 
                  className="border-blue-400 text-blue-300 font-mono text-lg px-3 py-1"
                >
                  {currentStepData.move}
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {currentStepData.phase}
                </Badge>
              </div>
              <span className="text-xs text-gray-400">
                {currentStep + 1}/{steps.length}
              </span>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-white">{currentStepData.title || 'Next Move'}</h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                {currentStepData.description}
              </p>
              {currentStepData.tip && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-2 mt-2">
                  <p className="text-xs text-yellow-300">
                    💡 <strong>Tip:</strong> {currentStepData.tip}
                  </p>
                </div>
              )}
            </div>
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
              // Go to beginning
              for (let i = currentStep; i > 0; i--) {
                setTimeout(() => onStepBackward(), (currentStep - i) * 50);
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
              // Go to end (auto-solve remaining steps)
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

        {/* Steps Overview by Phase */}
        <div className="max-h-64 overflow-y-auto space-y-3">
          {Object.entries(stepsByPhase).map(([phase, phaseSteps]) => (
            <div key={phase} className="space-y-1">
              <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wide border-b border-white/10 pb-1">
                {phase}
              </h4>
              {phaseSteps.map((step) => {
                const stepIndex = step.originalIndex;
                return (
                  <div
                    key={stepIndex}
                    className={`flex justify-between items-center p-2 rounded text-sm transition-all duration-200 ${
                      stepIndex === currentStep
                        ? 'bg-blue-500/20 border border-blue-400/30 text-white'
                        : stepIndex < currentStep
                        ? 'bg-green-500/10 text-green-300'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    <span className="flex items-center space-x-2">
                      <span className="font-mono font-bold w-6 text-xs">{stepIndex + 1}.</span>
                      <span className="font-mono bg-white/10 px-2 py-1 rounded text-xs">
                        {step.move}
                      </span>
                      <span className="text-xs truncate max-w-[120px]">
                        {step.title || step.description?.substring(0, 20) + '...'}
                      </span>
                    </span>
                    {stepIndex < currentStep && (
                      <span className="text-green-400 text-xs">✓</span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {isCompleted && (
          <div className="text-center py-6 space-y-3">
            <div className="text-4xl mb-2">🎉</div>
            <h3 className="text-xl font-bold text-green-400 mb-2">Cube Solved!</h3>
            <p className="text-sm text-gray-300 mb-4">
              Completed in {steps.length} moves using advanced algorithms
            </p>
            <div className="flex justify-center space-x-4 text-xs text-gray-400">
              <span>Algorithm phases completed</span>
              <div className="flex space-x-2">
                {Object.keys(stepsByPhase).map(phase => (
                  <Badge key={phase} variant="outline" className="border-green-400 text-green-300">
                    {phase} ✓
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SolutionSteps;