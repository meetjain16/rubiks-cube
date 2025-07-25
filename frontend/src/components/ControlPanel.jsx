import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Shuffle, Play, RotateCcw, Upload, Loader2 } from 'lucide-react';

const ControlPanel = ({ 
  onScramble, 
  onSolve, 
  onReset, 
  onImportNotation, 
  isAnimating, 
  isSolving,
  solveTime 
}) => {
  const [notationInput, setNotationInput] = useState('');

  const handleImport = () => {
    if (notationInput.trim()) {
      onImportNotation(notationInput.trim());
      setNotationInput('');
    }
  };

  const sampleScrambles = [
    "R U R' F R F' U F' U F R U R' F R F'",
    "D' F D' F' D F D F' R U R' U' R U' R'",
    "L' U' L U L F L' F' U' F U F' U F U F'",
  ];

  return (
    <div className="space-y-6">
      {/* Main Controls */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
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
                Solved in {(solveTime / 1000).toFixed(2)}s
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Notation Import */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
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

      {/* Algorithm Info */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
        <CardContent className="p-4">
          <div className="text-center space-y-2">
            <h3 className="font-bold text-lg text-gray-200">Advanced Algorithms</h3>
            <div className="flex justify-center space-x-3">
              <Badge variant="outline" className="border-blue-400 text-blue-300">
                CFOP Method
              </Badge>
              <Badge variant="outline" className="border-purple-400 text-purple-300">
                Kociemba
              </Badge>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Utilizing Cross → F2L → OLL → PLL sequence with optimized move reduction
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ControlPanel;