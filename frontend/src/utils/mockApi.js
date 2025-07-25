// Mock API for Rubik's Cube Solver - Simulates multiple solving algorithms

export const mockSolverApi = {
  async solve(cubeState, algorithm = 'CFOP') {
    // Simulate processing time based on algorithm complexity
    const processingTimes = {
      'CFOP': 1500 + Math.random() * 2000,
      'Layer-by-Layer': 1000 + Math.random() * 1500, 
      'BFS': 3000 + Math.random() * 4000 // More time for optimal search
    };
    
    await new Promise(resolve => setTimeout(resolve, processingTimes[algorithm]));
    
    // Generate solution based on selected algorithm
    const solution = generateSolution(algorithm);
    
    return {
      algorithm: algorithm,
      steps: solution.steps,
      totalMoves: solution.steps.length,
      estimatedTime: solution.estimatedTime,
      phases: solution.phases
    };
  }
};

function generateSolution(algorithm) {
  switch(algorithm) {
    case 'CFOP':
      return generateCFOPSolution();
    case 'Layer-by-Layer':
      return generateLayerByLayerSolution();
    case 'BFS':
      return generateBFSSolution();
    default:
      return generateCFOPSolution();
  }
}

function generateCFOPSolution() {
  const phases = [
    {
      name: 'Cross',
      minMoves: 4,
      maxMoves: 8,
      description: 'Form white cross on bottom face',
      moveWeight: { 'D': 0.4, 'F': 0.2, 'R': 0.2, 'U': 0.1, 'L': 0.1 }
    },
    {
      name: 'F2L',
      minMoves: 16,
      maxMoves: 24,
      description: 'Complete first two layers simultaneously',
      moveWeight: { 'R': 0.3, 'U': 0.3, 'F': 0.2, 'L': 0.1, 'D': 0.1 }
    },
    {
      name: 'OLL',
      minMoves: 6,
      maxMoves: 12,
      description: 'Orient last layer to make top face uniform',
      moveWeight: { 'R': 0.25, 'U': 0.25, 'F': 0.25, 'L': 0.15, 'B': 0.1 }
    },
    {
      name: 'PLL',
      minMoves: 8,
      maxMoves: 15,
      description: 'Permute last layer pieces to final positions',
      moveWeight: { 'R': 0.3, 'U': 0.3, 'F': 0.2, 'L': 0.15, 'D': 0.05 }
    }
  ];

  return generatePhaseBasedSolution(phases);
}

function generateLayerByLayerSolution() {
  const phases = [
    {
      name: 'Bottom Cross',
      minMoves: 6,
      maxMoves: 12,
      description: 'Create white cross on bottom',
      moveWeight: { 'D': 0.4, 'F': 0.3, 'R': 0.15, 'L': 0.15 }
    },
    {
      name: 'Bottom Corners',
      minMoves: 8,
      maxMoves: 16,
      description: 'Position white corners in bottom layer',
      moveWeight: { 'R': 0.3, 'U': 0.3, 'D': 0.2, 'F': 0.2 }
    },
    {
      name: 'Middle Edges',
      minMoves: 12,
      maxMoves: 20,
      description: 'Insert middle layer edges',
      moveWeight: { 'R': 0.25, 'U': 0.25, 'F': 0.25, 'L': 0.25 }
    },
    {
      name: 'Top Cross',
      minMoves: 6,
      maxMoves: 12,
      description: 'Form cross on top face',
      moveWeight: { 'F': 0.3, 'R': 0.3, 'U': 0.2, 'L': 0.2 }
    },
    {
      name: 'Top Corners Orient',
      minMoves: 8,
      maxMoves: 16,
      description: 'Orient top layer corners',
      moveWeight: { 'R': 0.4, 'U': 0.3, 'F': 0.2, 'L': 0.1 }
    },
    {
      name: 'Top Layer Complete',
      minMoves: 6,
      maxMoves: 12,
      description: 'Complete the cube',
      moveWeight: { 'R': 0.3, 'U': 0.3, 'F': 0.2, 'L': 0.2 }
    }
  ];

  return generatePhaseBasedSolution(phases);
}

function generateBFSSolution() {
  const phases = [
    {
      name: 'State Analysis',
      minMoves: 2,
      maxMoves: 4,
      description: 'Analyze current cube state',
      moveWeight: { 'R': 0.2, 'U': 0.2, 'F': 0.2, 'L': 0.2, 'D': 0.2 }
    },
    {
      name: 'Optimal Path Search',
      minMoves: 8,
      maxMoves: 15,
      description: 'Find shortest sequence using breadth-first search',
      moveWeight: { 'R': 0.2, 'U': 0.2, 'F': 0.2, 'L': 0.1, 'D': 0.1, 'B': 0.2 }
    },
    {
      name: 'Solution Execution',
      minMoves: 4,
      maxMoves: 8,
      description: 'Execute optimal move sequence',
      moveWeight: { 'R': 0.25, 'U': 0.25, 'F': 0.25, 'L': 0.25 }
    }
  ];

  return generatePhaseBasedSolution(phases);
}

function generatePhaseBasedSolution(phases) {
  const moves = ['R', 'L', 'U', 'D', 'F', 'B'];
  const modifiers = ['', "'", '2'];
  let allSteps = [];
  let phaseInfo = [];
  
  phases.forEach(phase => {
    const stepCount = Math.floor(Math.random() * (phase.maxMoves - phase.minMoves + 1)) + phase.minMoves;
    const phaseSteps = [];
    let lastMove = '';
    let lastAxis = '';
    
    for (let i = 0; i < stepCount; i++) {
      let move, axis;
      
      // Choose move based on phase weight or random if no weight
      if (phase.moveWeight) {
        move = weightedRandomChoice(phase.moveWeight);
      } else {
        // Avoid consecutive moves on same face or opposite faces
        do {
          move = moves[Math.floor(Math.random() * moves.length)];
          axis = getMoveAxis(move);
        } while (move === lastMove || axis === lastAxis);
      }
      
      const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
      const fullMove = move + modifier;
      
      phaseSteps.push({
        move: fullMove,
        phase: phase.name,
        title: getPhaseSpecificTitle(phase.name, i + 1, stepCount),
        description: getPhaseSpecificDescription(phase.name, fullMove, i + 1, stepCount),
        tip: getPhaseSpecificTip(phase.name, fullMove)
      });
      
      lastMove = move;
      lastAxis = axis;
    }
    
    allSteps = allSteps.concat(phaseSteps);
    phaseInfo.push({
      name: phase.name,
      moves: stepCount,
      description: phase.description
    });
  });

  return {
    steps: allSteps,
    phases: phaseInfo,
    estimatedTime: allSteps.length * 0.8 // seconds
  };
}

function weightedRandomChoice(weights) {
  const moves = Object.keys(weights);
  const values = Object.values(weights);
  const totalWeight = values.reduce((sum, weight) => sum + weight, 0);
  
  let random = Math.random() * totalWeight;
  
  for (let i = 0; i < moves.length; i++) {
    random -= values[i];
    if (random <= 0) {
      return moves[i];
    }
  }
  
  return moves[0]; // Fallback
}

function getMoveAxis(move) {
  const axes = {
    'R': 'x', 'L': 'x',
    'U': 'y', 'D': 'y',
    'F': 'z', 'B': 'z'
  };
  return axes[move];
}

function getPhaseSpecificTitle(phase, stepNum, totalSteps) {
  const titles = {
    'Cross': [
      'Position White Edge',
      'Align Cross Piece',
      'Complete Cross Formation',
      'Optimize Cross'
    ],
    'Bottom Cross': [
      'Find White Edge',
      'Move to Bottom',
      'Align With Center',
      'Complete Cross'
    ],
    'Bottom Corners': [
      'Locate White Corner',
      'Position Above Slot',
      'Insert Corner Piece',
      'Orient Corner Correctly'
    ],
    'F2L': [
      `F2L Pair ${Math.ceil(stepNum / 5)}`,
      'Pair Corner & Edge',
      'Insert F2L Pair',
      'Optimize Pair Insertion'
    ],
    'Middle Edges': [
      'Find Middle Edge',
      'Right-Hand Algorithm',
      'Left-Hand Algorithm', 
      'Edge Insertion'
    ],
    'OLL': [
      'Orient Edge Pieces',
      'OLL Algorithm',
      'Complete Top Face',
      'Final Orientation'
    ],
    'Top Cross': [
      'Form Top Cross',
      'Cross Algorithm',
      'Orient Top Edges',
      'Complete Cross'
    ],
    'Top Corners Orient': [
      'Right-Hand Corner',
      'Left-Hand Corner',
      'Corner Algorithm',
      'Orient All Corners'
    ],
    'PLL': [
      'Recognize PLL Case',
      'Execute PLL Algorithm',
      'Permute Corners',
      'Permute Edges'
    ],
    'Top Layer Complete': [
      'Final Adjustments',
      'Position Last Pieces',
      'Complete Algorithm',
      'Finish Cube'
    ],
    'State Analysis': [
      'Scan Cube State',
      'Identify Patterns',
      'Calculate Distance',
      'Plan Optimal Path'
    ],
    'Optimal Path Search': [
      'Search Level ' + Math.ceil(stepNum / 3),
      'Evaluate Positions',
      'Branch Pruning',
      'Path Optimization'
    ],
    'Solution Execution': [
      'Execute Optimal Move',
      'Apply Solution',
      'Verify State',
      'Complete Solution'
    ]
  };

  const phaseTitle = titles[phase] || ['Execute Move'];
  return phaseTitle[Math.floor(Math.random() * phaseTitle.length)];
}

function getPhaseSpecificDescription(phase, move, stepNum, totalSteps) {
  const descriptions = {
    'Cross': [
      `Rotate ${move} to position the white edge piece correctly in the bottom cross`,
      `Move ${move} to align this cross edge with its matching center color`,
      `Execute ${move} to complete another section of the white cross formation`,
      `Apply ${move} to optimize the cross structure for F2L preparation`
    ],
    'Bottom Cross': [
      `Turn ${move} to bring the white edge to the top layer for manipulation`,
      `Use ${move} to move the white edge piece toward the bottom layer`,
      `Rotate ${move} to align the edge piece with its matching center color`,
      `Apply ${move} to complete this section of the bottom white cross`
    ],
    'Bottom Corners': [
      `Move ${move} to position the white corner above its target slot`,
      `Execute ${move} using the right-hand algorithm to insert the corner`,
      `Apply ${move} to orient the white corner piece correctly`,
      `Turn ${move} to complete this corner of the bottom layer`
    ],
    'F2L': [
      `Rotate ${move} to pair the corner and edge pieces for F2L slot insertion`,
      `Use ${move} to set up the F2L pair in the top layer for easy insertion`,
      `Execute ${move} to insert the paired corner and edge into their F2L slot`,
      `Apply ${move} to optimize the F2L pair positioning efficiently`
    ],
    'Middle Edges': [
      `Turn ${move} to position the middle layer edge above its target slot`,
      `Execute ${move} as part of the right-hand algorithm for edge insertion`,
      `Apply ${move} using the left-hand algorithm to place this middle edge`,
      `Use ${move} to complete the insertion of this middle layer edge piece`
    ],
    'OLL': [
      `Apply ${move} as part of the OLL algorithm to orient top layer edges`,
      `Execute ${move} to continue the Orientation of Last Layer sequence`,
      `Turn ${move} to orient the remaining pieces on the top face`,
      `Use ${move} to complete the OLL and make the top face uniform`
    ],
    'Top Cross': [
      `Rotate ${move} to form the cross pattern on the top face`,
      `Execute ${move} using the cross algorithm to orient top edges`,
      `Apply ${move} to complete the formation of the top layer cross`,
      `Turn ${move} to finalize the cross before corner orientation`
    ],
    'Top Corners Orient': [
      `Use ${move} to position the corner for the orientation algorithm`,
      `Execute ${move} as part of the corner orientation sequence`,
      `Apply ${move} to rotate this corner until properly oriented`,
      `Turn ${move} to complete the orientation of all top corners`
    ],
    'PLL': [
      `Execute ${move} as part of the PLL algorithm to permute the last layer`,
      `Apply ${move} to swap corner pieces into their correct positions`,
      `Turn ${move} to move edge pieces to their final locations`,
      `Use ${move} to complete the Permutation of Last Layer`
    ],
    'Top Layer Complete': [
      `Apply ${move} to make final adjustments to the top layer`,
      `Execute ${move} to position the last pieces correctly`,
      `Turn ${move} to complete the final algorithm sequence`,
      `Use ${move} to finish solving the Rubik's cube completely`
    ],
    'State Analysis': [
      `Process ${move} to analyze the current cube configuration`,
      `Execute ${move} to identify key patterns in the cube state`,
      `Apply ${move} to calculate distance to the solved state`,
      `Use ${move} to determine the optimal solution path`
    ],
    'Optimal Path Search': [
      `Search ${move} at depth level ${Math.ceil(stepNum / 3)} for optimal solutions`,
      `Evaluate ${move} among possible next states in the search tree`,
      `Prune ${move} to eliminate suboptimal solution branches`,
      `Select ${move} as part of the shortest path to solution`
    ],
    'Solution Execution': [
      `Execute optimal move ${move} found by the search algorithm`,
      `Apply ${move} as part of the computer-generated solution sequence`,
      `Verify ${move} brings the cube closer to the solved state`,
      `Complete ${move} to finish the optimal solution path`
    ]
  };

  const phaseDescriptions = descriptions[phase] || [`Execute move ${move} to progress toward solution`];
  return phaseDescriptions[Math.floor(Math.random() * phaseDescriptions.length)];
}

function getPhaseSpecificTip(phase, move) {
  const tips = {
    'Cross': [
      'Try to solve the cross in 8 moves or fewer for efficient solves',
      'Look for opportunities to solve multiple cross edges simultaneously',
      'Practice cross solutions that set up easy F2L pairs'
    ],
    'Bottom Cross': [
      'Always check that edge colors match their adjacent center pieces',
      'Use the "daisy" method: make a flower pattern on top, then flip down',
      'Learn to solve the cross intuitively without algorithms'
    ],
    'Bottom Corners': [
      'The white sticker can be on top, front, or right of the corner piece',
      'Use R-U-R\'-U\' repeatedly until the corner is in correct position',
      'Position the corner above its target slot before inserting'
    ],
    'F2L': [
      'Look ahead to the next F2L pair while solving the current one',
      'Learn different F2L cases to reduce cube rotations',
      'Practice pairing corner and edge in the top layer efficiently'
    ],
    'Middle Edges': [
      'Right algorithm: R-U-R\'-U\'-F\'-U-F for right-side insertion',
      'Left algorithm: L\'-U\'-L-U-F-U\'-F\' for left-side insertion',
      'Position the edge above the slot where it needs to go'
    ],
    'OLL': [
      'There are 57 different OLL cases - learn common ones first',
      'Focus on 2-look OLL: edges first, then corners',
      'Practice recognition by looking at the top sticker patterns'
    ],
    'Top Cross': [
      'Use F-R-U-R\'-U\'-F\' algorithm to progress through cross states',
      'Three possible states: dot, L-shape, line, then cross',
      'Hold the L-shape in your left hand when applying the algorithm'
    ],
    'Top Corners Orient': [
      'Use R-U-R\'-U-R-U2-R\' (Sune) for most corner orientations',
      'Hold the correctly oriented corner in back-right position',
      'May need to repeat the algorithm multiple times'
    ],
    'PLL': [
      'There are 21 PLL cases - start with T-perm and J-perm',
      'Learn 2-look PLL: corners first, then edges',
      'Practice recognition by looking at headlight patterns'
    ],
    'Top Layer Complete': [
      'Double-check all pieces are in correct positions',
      'A solved cube has each face showing only one color',
      'Congratulations on completing the solve!'
    ],
    'State Analysis': [
      'Computer algorithms can find optimal solutions in under 20 moves',
      'Each position is analyzed for distance to solved state',
      'BFS guarantees the shortest possible solution'
    ],
    'Optimal Path Search': [
      'Search explores millions of possible cube states',
      'Pruning techniques eliminate impossible branches',
      'God\'s Number is 20 - any position can be solved in 20 moves or fewer'
    ],
    'Solution Execution': [
      'This solution is mathematically optimal',
      'Computer-generated solutions are often non-intuitive',
      'Optimal solutions prioritize move count over human logic'
    ]
  };

  const phaseTips = tips[phase] || ['Focus on accurate execution of each move'];
  return phaseTips[Math.floor(Math.random() * phaseTips.length)];
}

// Export additional mock data
export const mockScrambles = [
  "R U R' F R F' U F' U F R U R' F R F'",
  "D' F D' F' D F D F' R U R' U' R U' R'",
  "L' U' L U L F L' F' U' F U F' U F U F'",
  "B' U' F' R2 F U' B U2 R2 U R2 U' F' U F",
  "R' F R U' R' F' R2 U' R' U' R U R' F R F'",
];

export const expertAlgorithms = {
  CFOP: {
    phases: ['Cross', 'F2L', 'OLL', 'PLL'],
    averageMoves: 55,
    description: 'Advanced speedcubing method'
  },
  'Layer-by-Layer': {
    phases: ['Bottom Cross', 'Bottom Corners', 'Middle Edges', 'Top Cross', 'Top Corners Orient', 'Top Layer Complete'],
    averageMoves: 75,
    description: 'Beginner-friendly approach'
  },
  BFS: {
    phases: ['State Analysis', 'Optimal Path Search', 'Solution Execution'],
    averageMoves: 20,
    description: 'Computer optimal solution'
  }
};