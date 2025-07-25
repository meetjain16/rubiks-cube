import React, { useState, useEffect } from 'react';
import RubiksCube from './RubiksCube';
import ControlPanel from './ControlPanel';
import SolutionSteps from './SolutionSteps';
import { mockSolverApi } from '../utils/mockApi';
import { cubeUtils } from '../utils/cubeUtils';

const RubiksSolver = () => {
  const [cubeState, setCubeState] = useState(cubeUtils.getSolvedState());
  const [isAnimating, setIsAnimating] = useState(false);
  const [solutionSteps, setSolutionSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSolving, setIsSolving] = useState(false);
  const [solveTime, setSolveTime] = useState(null);

  const handleScramble = async () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const scrambleMoves = cubeUtils.generateScramble(20);
    let newState = cubeState;
    
    for (let i = 0; i < scrambleMoves.length; i++) {
      setTimeout(() => {
        newState = cubeUtils.applyMove(newState, scrambleMoves[i]);
        setCubeState({...newState});
        
        if (i === scrambleMoves.length - 1) {
          setTimeout(() => setIsAnimating(false), 300);
        }
      }, i * 200);
    }
  };

  const handleSolve = async () => {
    if (isAnimating || isSolving) return;
    
    setIsSolving(true);
    setSolveTime(null);
    const startTime = Date.now();
    
    try {
      const solution = await mockSolverApi.solve(cubeState);
      setSolutionSteps(solution.steps);
      setCurrentStep(0);
      setSolveTime(Date.now() - startTime);
    } catch (error) {
      console.error('Solving failed:', error);
    } finally {
      setIsSolving(false);
    }
  };

  const handleStepForward = () => {
    if (currentStep < solutionSteps.length) {
      const move = solutionSteps[currentStep].move;
      const newState = cubeUtils.applyMove(cubeState, move);
      setCubeState(newState);
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStepBackward = () => {
    if (currentStep > 0) {
      const prevMove = solutionSteps[currentStep - 1].move;
      const inverseMove = cubeUtils.getInverseMove(prevMove);
      const newState = cubeUtils.applyMove(cubeState, inverseMove);
      setCubeState(newState);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCubeState(cubeUtils.getSolvedState());
    setSolutionSteps([]);
    setCurrentStep(0);
    setSolveTime(null);
  };

  const handleImportNotation = (notation) => {
    if (isAnimating) return;
    
    try {
      const moves = cubeUtils.parseNotation(notation);
      let newState = cubeUtils.getSolvedState();
      
      moves.forEach(move => {
        newState = cubeUtils.applyMove(newState, move);
      });
      
      setCubeState(newState);
      setSolutionSteps([]);
      setCurrentStep(0);
    } catch (error) {
      alert('Invalid notation format');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.3),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3),transparent_50%)]" />
      
      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4 tracking-tight">
            Rubik's Cube Solver
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Advanced CFOP & Kociemba Algorithm Implementation with 3D Interactive Visualization
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* 3D Cube Visualization */}
          <div className="xl:col-span-2 flex items-center justify-center">
            <div className="relative">
              <RubiksCube 
                cubeState={cubeState}
                isAnimating={isAnimating}
                currentMove={currentStep < solutionSteps.length ? solutionSteps[currentStep]?.move : null}
              />
            </div>
          </div>

          {/* Control Panel */}
          <div className="space-y-6">
            <ControlPanel
              onScramble={handleScramble}
              onSolve={handleSolve}
              onReset={handleReset}
              onImportNotation={handleImportNotation}
              isAnimating={isAnimating}
              isSolving={isSolving}
              solveTime={solveTime}
            />

            <SolutionSteps
              steps={solutionSteps}
              currentStep={currentStep}
              onStepForward={handleStepForward}
              onStepBackward={handleStepBackward}
              isAnimating={isAnimating}
            />
          </div>
        </div>

        {/* Statistics Footer */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 bg-white/10 backdrop-blur-lg rounded-2xl px-8 py-4 border border-white/20">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{solutionSteps.length}</div>
              <div className="text-sm text-gray-400">Total Moves</div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">
                {solveTime ? `${(solveTime / 1000).toFixed(2)}s` : '--'}
              </div>
              <div className="text-sm text-gray-400">Solve Time</div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-400">CFOP+</div>
              <div className="text-sm text-gray-400">Algorithm</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RubiksSolver;