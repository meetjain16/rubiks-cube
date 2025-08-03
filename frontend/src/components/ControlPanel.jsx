import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Shuffle, Play, RotateCcw, Upload, Loader2, Settings } from 'lucide-react';

const ControlPanel = ({ 
  onScramble, 
  onSolve, 
  onReset, 
  onImportNotation, 
  isAnimating, 
  isSolving,
  solveTime,
  selectedAlgorithm,
  setSelectedAlgorithm 
}) => {
  const [notationInput, setNotationInput] = useState('');

  const handleImport = () => {
    if (notationInput.trim()) {
      onImportNotation(notationInput.trim());
      setNotationInput('');
    }
  };

  const algorithms = [
    { 
      value: 'CFOP', 
      label: 'CFOP Method',
      description: 'Cross → F2L → OLL → PLL',
      difficulty: 'Advanced',
      avgMoves: '50-60'
    },
    { 
      value: 'Layer-by-Layer', 
      label: 'Layer-by-Layer',
      description: 'Bottom → Middle → Top',
      difficulty: 'Beginner',
      avgMoves: '70-100'
    },
    { 
      value: 'BFS', 
      label: 'BFS/DFS Search',
      description: 'Computer optimal search',
      difficulty: 'Optimal',
      avgMoves: '15-25'
    }
  ];

  const selectedAlgDetails = algorithms.find(alg => alg.value === selectedAlgorithm);

  const sampleScrambles = [
    "R U R' F R F' U F' U F R U R' F R F'",
    "D' F D' F' D F D F' R U R' U' R U' R'",
    "L' U' L U L F L' F' U' F U F' U F U F'",
  ];

  return (
    <div className="space-y-6">
      {/* Algorithm Selection */}
      <Card className="glass-card animate-fadein">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent flex items-center justify-center">
            <Settings className="w-5 h-5 mr-2 text-green-400" />
            Algorithm Selection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select value={selectedAlgorithm} onValueChange={setSelectedAlgorithm}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Select solving method" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-white/20">
              {algorithms.map((alg) => (
                <SelectItem 
                  key={alg.value} 
                  value={alg.value}
                  className="text-white hover:bg-white/10 focus:bg-white/10"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{alg.label}</span>
                    <span className="text-xs text-gray-400">{alg.description}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedAlgDetails && (
            <div className="bg-white/5 rounded-lg p-3 border border-white/10">
              <div className="flex justify-between items-center mb-2">
                <Badge variant="outline" className={`${
                  selectedAlgDetails.difficulty === 'Beginner' ? 'border-green-400 text-green-300' :
                  selectedAlgDetails.difficulty === 'Advanced' ? 'border-yellow-400 text-yellow-300' :
                  'border-purple-400 text-purple-300'
                }`}>
                  {selectedAlgDetails.difficulty}
                </Badge>
                <span className="text-sm text-gray-400">{selectedAlgDetails.avgMoves} moves</span>
              </div>
              <p className="text-sm text-gray-300">{selectedAlgDetails.description}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Main Controls */}
      <Card className="glass-card animate-fadein">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Cube Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={onScramble}
              disabled={isAnimating || isSolving}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 border-0 text-white font-medium transition-all duration-200 transform hover:scale-105"
            >
              <Shuffle className="w-4 h-4 mr-2" />
              Scramble
            </Button>
            
            <Button
              onClick={onSolve}
              disabled={isAnimating || isSolving}
              className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 border-0 text-white font-medium transition-all duration-200 transform hover:scale-105"
            >
              {isSolving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Solving...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Solve
                </>
              )}
            </Button>
          </div>

          <Button
            onClick={onReset}
            disabled={isAnimating || isSolving}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 border-0 text-white font-medium transition-all duration-200 transform hover:scale-105"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset to Solved
          </Button>

          {solveTime && (
            <div className="text-center">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Solved in {(solveTime / 1000).toFixed(2)}s using {selectedAlgorithm}
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Notation Import */}
      <Card className="glass-card animate-fadein">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-center text-gray-200">
            Import Notation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Enter moves (e.g., R U R' U' R U' R')"
              value={notationInput}
              onChange={(e) => setNotationInput(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400"
            />
            <Button
              onClick={handleImport}
              disabled={!notationInput.trim() || isAnimating || isSolving}
              className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 border-0 text-white font-medium transition-all duration-200"
            >
              <Upload className="w-4 h-4 mr-2" />
              Apply Moves
            </Button>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-400 font-medium">Sample Scrambles:</p>
            {sampleScrambles.map((scramble, index) => (
              <button
                key={index}
                onClick={() => setNotationInput(scramble)}
                className="w-full p-2 text-xs bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-white/20 text-left text-gray-300 hover:text-white transition-all duration-200"
              >
                {scramble}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ControlPanel;

// Add styles for glassmorphism and fade-in animation
// You can move these to a CSS/SCSS file if preferred
const style = document.createElement('style');
style.innerHTML = `
.glass-card {
  background: rgba(30, 41, 59, 0.45); /* slate-800 with opacity */
  border: 1.5px solid rgba(255,255,255,0.13);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  backdrop-filter: blur(18px) saturate(1.2);
  -webkit-backdrop-filter: blur(18px) saturate(1.2);
  border-radius: 1.25rem;
  transition: box-shadow 0.3s cubic-bezier(.4,0,.2,1), background 0.3s cubic-bezier(.4,0,.2,1);
}
.glass-card:hover {
  box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.22);
  background: rgba(30, 41, 59, 0.60);
}
.animate-fadein {
  animation: fadein 0.7s cubic-bezier(.4,0,.2,1);
}
@keyframes fadein {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
`;
if (typeof document !== 'undefined' && !document.getElementById('glass-card-style')) {
  style.id = 'glass-card-style';
  document.head.appendChild(style);
}