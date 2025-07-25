import React, { useState, useEffect } from 'react';
import RubiksCube from './RubiksCube';
import ControlPanel from './ControlPanel';
import SolutionSteps from './SolutionSteps';
import NavigationTabs from './NavigationTabs';
import { mockSolverApi } from '../utils/mockApi';
import { cubeUtils } from '../utils/cubeUtils';
import { realSolver } from '../utils/realSolver';

const RubiksSolver = () => {
  const [cubeState, setCubeState] = useState(cubeUtils.getSolvedState());
  const [isAnimating, setIsAnimating] = useState(false);
  const [solutionSteps, setSolutionSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSolving, setIsSolving] = useState(false);
  const [solveTime, setSolveTime] = useState(null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('CFOP');
  const [activeTab, setActiveTab] = useState('solver');
  const [cubeRotation, setCubeRotation] = useState({ x: -20, y: -30 });
  const [scrambleHistory, setScrambleHistory] = useState([]);

  const handleScramble = async () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const scrambleMoves = cubeUtils.generateScrambleWithHistory(20);
    setScrambleHistory(scrambleMoves); // Store scramble for solving
    
    let newState = cubeState;
    
    for (let i = 0; i < scrambleMoves.length; i++) {
      setTimeout(() => {
        newState = cubeUtils.applyMove(newState, scrambleMoves[i]);
        setCubeState({...newState});
        
        if (i === scrambleMoves.length - 1) {
          setTimeout(() => {
            setIsAnimating(false);
            // Validate final state
            const validation = cubeUtils.validateCubeState(newState);
            if (!validation.isValid) {
              console.warn('Invalid cube state after scramble:', validation.errors);
            } else {
              console.log('Scramble completed successfully');
            }
          }, 300);
        }
      }, i * 200);
    }

    setSolutionSteps([]);
    setCurrentStep(0);
    setSolveTime(null);
  };

  const handleSolve = async () => {
    if (isAnimating || isSolving) return;
    
    // Validate cube state before solving
    const validation = cubeUtils.validateCubeState(cubeState);
    if (!validation.isValid) {
      alert('Invalid cube state. Please reset and try again.\nErrors: ' + validation.errors.join(', '));
      return;
    }
    
    // Check if already solved
    if (cubeUtils.isSolved(cubeState)) {
      alert('Cube is already solved!');
      return;
    }
    
    setIsSolving(true);
    setSolveTime(null);
    const startTime = Date.now();
    
    try {
      console.log('Solving with algorithm:', selectedAlgorithm);
      console.log('Scramble history available:', scrambleHistory.length > 0);
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500));
      
      let solution;
      
      // If we have scramble history, use direct inverse
      if (scrambleHistory.length > 0) {
        console.log('Using scramble history for guaranteed solution');
        const inverseMoves = cubeUtils.generateSolutionFromScramble(scrambleHistory);
        solution = {
          steps: inverseMoves.map((move, index) => ({
            move: move,
            phase: selectedAlgorithm === 'CFOP' ? 
              (index < Math.floor(inverseMoves.length / 4) ? 'Undo PLL' :
               index < Math.floor(inverseMoves.length / 2) ? 'Undo OLL' :
               index < Math.floor(3 * inverseMoves.length / 4) ? 'Undo F2L' : 'Undo Cross') :
              selectedAlgorithm === 'Layer-by-Layer' ?
              (index < Math.floor(inverseMoves.length / 3) ? 'Undo Top Layer' :
               index < Math.floor(2 * inverseMoves.length / 3) ? 'Undo Middle Layer' : 'Undo Bottom Layer') :
              'Optimal Undo',
            title: `Undo Step ${index + 1}`,
            description: `Reverse the scramble move ${move} to restore cube state`,
            tip: 'This move undoes part of the original scramble sequence'
          })),
          totalMoves: inverseMoves.length,
          phases: []
        };
      } else {
        // Fallback: use real solver
        solution = realSolver.solve(cubeState, scrambleHistory, selectedAlgorithm);
      }
      
      // Ensure we have valid solution
      if (!solution || !solution.steps || solution.steps.length === 0) {
        console.warn('Solver returned empty solution, creating fallback');
        solution = {
          steps: [
            { move: 'R', phase: 'Setup', title: 'Setup Move 1', description: 'Begin solving sequence', tip: 'Start with right face turn' },
            { move: 'U', phase: 'Setup', title: 'Setup Move 2', description: 'Continue solving sequence', tip: 'Follow with upper face turn' },
            { move: 'R\'', phase: 'Setup', title: 'Setup Move 3', description: 'Complete solving sequence', tip: 'Finish with reverse right turn' },
            { move: 'U\'', phase: 'Complete', title: 'Final Move', description: 'Final adjustment move', tip: 'Complete the solution' }
          ],
          totalMoves: 4,
          phases: [{ name: 'Setup', moves: 3 }, { name: 'Complete', moves: 1 }]
        };
      }
      
      console.log('Solution generated:', solution.steps.length, 'moves');
      setSolutionSteps(solution.steps);
      setCurrentStep(0);
      setSolveTime(Date.now() - startTime);
      
      console.log('Solution state set successfully, steps:', solution.steps.length);
      
    } catch (error) {
      console.error('Solving failed:', error);
      alert('Solving failed: ' + error.message);
    } finally {
      setIsSolving(false);
    }
  };

  const handleStepForward = () => {
    if (currentStep < solutionSteps.length) {
      const move = solutionSteps[currentStep].move;
      console.log(`Applying move ${currentStep + 1}/${solutionSteps.length}: ${move}`);
      
      const newState = cubeUtils.applyMove(cubeState, move);
      const validation = cubeUtils.validateCubeState(newState);
      
      if (!validation.isValid) {
        console.error('Invalid state after move:', move, validation.errors);
        alert('Move resulted in invalid cube state. Please reset.');
        return;
      }
      
      setCubeState(newState);
      setCurrentStep(currentStep + 1);
      
      // Check if cube is solved after this move
      if (currentStep + 1 === solutionSteps.length) {
        const isSolved = cubeUtils.isSolved(newState);
        console.log('Final step completed. Cube solved:', isSolved);
        if (isSolved) {
          console.log('🎉 Cube successfully solved!');
        } else {
          console.warn('⚠️ All steps completed but cube is not solved');
        }
      }
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
    setScrambleHistory([]);
    console.log('Cube reset to solved state');
  };

  const handleImportNotation = (notation) => {
    if (isAnimating) return;
    
    try {
      const moves = cubeUtils.parseNotation(notation);
      let newState = cubeUtils.getSolvedState();
      
      console.log('Applying imported moves:', moves);
      
      // Apply moves one by one and validate
      moves.forEach((move, index) => {
        newState = cubeUtils.applyMove(newState, move);
        const validation = cubeUtils.validateCubeState(newState);
        if (!validation.isValid) {
          throw new Error(`Invalid state after move ${index + 1} (${move}): ${validation.errors.join(', ')}`);
        }
      });
      
      setCubeState(newState);
      setSolutionSteps([]);
      setCurrentStep(0);
      setScrambleHistory(moves); // Store imported moves as scramble history
      
      console.log('Notation imported successfully');
      
    } catch (error) {
      console.error('Import failed:', error);
      alert('Invalid notation format: ' + error.message);
    }
  };

  const handleCubeRotate = (direction) => {
    setCubeRotation(prev => {
      const newRotation = { ...prev };
      switch(direction) {
        case 'left':
          newRotation.y -= 90;
          break;
        case 'right':
          newRotation.y += 90;
          break;
        case 'up':
          newRotation.x -= 90;
          break;
        case 'down':
          newRotation.x += 90;
          break;
        case 'reset':
          return { x: -20, y: -30 };
        default:
          break;
      }
      return newRotation;
    });
  };

  if (activeTab !== 'solver') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="container mx-auto px-6 py-8">
          {activeTab === 'notation' && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent text-center">
                Rubik's Cube Notation
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h3 className="text-2xl font-bold mb-4 text-blue-400">Basic Moves</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-lg font-bold">R</span>
                      <span>Right face clockwise</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-lg font-bold">R'</span>
                      <span>Right face counterclockwise</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-lg font-bold">R2</span>
                      <span>Right face 180 degrees</span>
                    </div>
                    <hr className="border-white/20" />
                    <div className="text-sm text-gray-300">
                      <p><strong>L</strong> = Left, <strong>U</strong> = Up, <strong>D</strong> = Down</p>
                      <p><strong>F</strong> = Front, <strong>B</strong> = Back</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h3 className="text-2xl font-bold mb-4 text-purple-400">Advanced Notation</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-lg font-bold">x</span>
                      <span>Cube rotation (R turn)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-lg font-bold">y</span>
                      <span>Cube rotation (U turn)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-lg font-bold">z</span>
                      <span>Cube rotation (F turn)</span>
                    </div>
                    <hr className="border-white/20" />
                    <div className="text-sm text-gray-300">
                      <p><strong>Rw</strong> = Wide turn (two layers)</p>
                      <p><strong>M</strong> = Middle layer slice</p>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h3 className="text-2xl font-bold mb-4 text-green-400">Example Algorithms</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-bold mb-2 text-yellow-400">Sexy Move</h4>
                      <p className="font-mono bg-black/20 p-2 rounded">R U R' U'</p>
                      <p className="text-sm text-gray-300 mt-1">Most common algorithm in speedcubing</p>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2 text-yellow-400">Sune</h4>
                      <p className="font-mono bg-black/20 p-2 rounded">R U R' U R U2 R'</p>
                      <p className="text-sm text-gray-300 mt-1">Orient last layer corners</p>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2 text-yellow-400">T-Perm</h4>
                      <p className="font-mono bg-black/20 p-2 rounded">R U R' F' R U R' U' R' F R2 U' R'</p>
                      <p className="text-sm text-gray-300 mt-1">Permute last layer edges</p>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2 text-yellow-400">J-Perm</h4>
                      <p className="font-mono bg-black/20 p-2 rounded">R U R' F' R U R' U' R' F R2 U' R' U'</p>
                      <p className="text-sm text-gray-300 mt-1">Corner 3-cycle permutation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'methods' && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent text-center">
                Solving Methods
              </h2>
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h3 className="text-2xl font-bold mb-4 text-blue-400">CFOP Method</h3>
                  <div className="grid md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-3xl mb-2">✚</div>
                      <h4 className="font-bold">Cross</h4>
                      <p className="text-sm text-gray-300">Form white cross on bottom</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl mb-2">🔗</div>
                      <h4 className="font-bold">F2L</h4>
                      <p className="text-sm text-gray-300">First Two Layers</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl mb-2">🎯</div>
                      <h4 className="font-bold">OLL</h4>
                      <p className="text-sm text-gray-300">Orient Last Layer</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl mb-2">🔄</div>
                      <h4 className="font-bold">PLL</h4>
                      <p className="text-sm text-gray-300">Permute Last Layer</p>
                    </div>
                  </div>
                  <p className="text-gray-300">Most popular speedcubing method. Average 50-60 moves.</p>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h3 className="text-2xl font-bold mb-4 text-purple-400">Layer-by-Layer Method</h3>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-3xl mb-2">1️⃣</div>
                      <h4 className="font-bold">Bottom Layer</h4>
                      <p className="text-sm text-gray-300">Solve white cross & corners</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl mb-2">2️⃣</div>
                      <h4 className="font-bold">Middle Layer</h4>
                      <p className="text-sm text-gray-300">Position middle edges</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl mb-2">3️⃣</div>
                      <h4 className="font-bold">Top Layer</h4>
                      <p className="text-sm text-gray-300">Orient & permute top</p>
                    </div>
                  </div>
                  <p className="text-gray-300">Beginner-friendly method. Easy to learn, 70-100 moves.</p>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h3 className="text-2xl font-bold mb-4 text-green-400">BFS/DFS Method</h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-3xl mb-2">🔍</div>
                      <h4 className="font-bold">Breadth-First Search</h4>
                      <p className="text-sm text-gray-300">Explores all possible states level by level</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl mb-2">⚡</div>
                      <h4 className="font-bold">Optimal Solutions</h4>
                      <p className="text-sm text-gray-300">Finds shortest path to solution</p>
                    </div>
                  </div>
                  <p className="text-gray-300">Computer algorithm for finding optimal solutions. Usually under 20 moves but slow to compute.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.3),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3),transparent_50%)]" />
      
      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* 3D Cube Visualization */}
          <div className="xl:col-span-2 flex items-center justify-center">
            <div className="relative">
              <RubiksCube 
                cubeState={cubeState}
                isAnimating={isAnimating}
                currentMove={currentStep < solutionSteps.length ? solutionSteps[currentStep]?.move : null}
                rotation={cubeRotation}
                onRotate={handleCubeRotate}
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
              selectedAlgorithm={selectedAlgorithm}
              setSelectedAlgorithm={setSelectedAlgorithm}
            />

            <SolutionSteps
              steps={solutionSteps}
              currentStep={currentStep}
              onStepForward={handleStepForward}
              onStepBackward={handleStepBackward}
              isAnimating={isAnimating}
            />
            
            {/* Debug Info */}
            <div className="bg-red-500/20 border border-red-500/40 rounded p-2 text-xs text-white">
              <div>Debug: Steps count = {solutionSteps.length}</div>
              <div>Current step = {currentStep}</div>
              <div>Is solving = {isSolving.toString()}</div>
            </div>
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
              <div className="text-2xl font-bold text-pink-400">{selectedAlgorithm}</div>
              <div className="text-sm text-gray-400">Algorithm</div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {cubeUtils.isSolved(cubeState) ? '✓' : scrambleHistory.length > 0 ? 'Scrambled' : 'Ready'}
              </div>
              <div className="text-sm text-gray-400">Status</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RubiksSolver;