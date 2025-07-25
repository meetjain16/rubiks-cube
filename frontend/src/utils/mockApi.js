// Mock API for Rubik's Cube Solver - Simulates advanced CFOP/Kociemba algorithms

export const mockSolverApi = {
  async solve(cubeState) {
    // Simulate processing time for advanced algorithm
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2000));
    
    // Generate realistic solution steps based on CFOP method
    const solution = generateCFOPSolution();
    
    return {
      algorithm: 'CFOP + Kociemba Optimization',
      steps: solution.steps,
      totalMoves: solution.steps.length,
      estimatedTime: solution.estimatedTime,
      phases: solution.phases
    };
  }
};

function generateCFOPSolution() {
  const moves = ['R', 'L', 'U', 'D', 'F', 'B'];
  const modifiers = ['', "'", '2'];
  
  const phases = [
    {
      name: 'Cross',
      minMoves: 4,
      maxMoves: 8,
      description: 'Forming the white cross on the bottom'
    },
    {
      name: 'F2L',
      minMoves: 12,
      maxMoves: 20,
      description: 'First Two Layers - pairing corners with edges'
    },
    {
      name: 'OLL',
      minMoves: 8,
      maxMoves: 15,
      description: 'Orientation of Last Layer - making top face uniform'
    },
    {
      name: 'PLL',
      minMoves: 6,
      maxMoves: 12,
      description: 'Permutation of Last Layer - positioning final pieces'
    }
  ];

  let allSteps = [];
  let phaseInfo = [];
  
  phases.forEach(phase => {
    const stepCount = Math.floor(Math.random() * (phase.maxMoves - phase.minMoves + 1)) + phase.minMoves;
    const phaseSteps = [];
    
    for (let i = 0; i < stepCount; i++) {
      const move = moves[Math.floor(Math.random() * moves.length)];
      const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
      const fullMove = move + modifier;
      
      phaseSteps.push({
        move: fullMove,
        phase: phase.name,
        description: getPhaseSpecificDescription(phase.name, fullMove, i + 1, stepCount)
      });
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

function getPhaseSpecificDescription(phase, move, stepNum, totalSteps) {
  const descriptions = {
    'Cross': [
      `Positioning white edge piece with ${move}`,
      `Aligning cross edge to correct center`,
      `Completing white cross formation`,
      `Optimizing cross piece placement`
    ],
    'F2L': [
      `Pairing corner-edge for slot ${Math.ceil(stepNum / 5)}`,
      `Inserting F2L pair into position`,
      `Setting up efficient corner-edge pairing`,
      `Completing First Two Layers section`
    ],
    'OLL': [
      `Applying OLL algorithm pattern recognition`,
      `Orienting last layer pieces`,
      `Executing advanced OLL sequence`,
      `Achieving uniform top face coloring`
    ],
    'PLL': [
      `Recognizing PLL case pattern`,
      `Permuting last layer corners`,
      `Positioning final edge pieces`,
      `Executing PLL algorithm sequence`
    ]
  };

  const phaseDescriptions = descriptions[phase] || ['Executing move'];
  return phaseDescriptions[Math.floor(Math.random() * phaseDescriptions.length)];
}

// Additional mock data for realistic scrambles and states
export const mockScrambles = [
  "R U R' F R F' U F' U F R U R' F R F'",
  "D' F D' F' D F D F' R U R' U' R U' R'",
  "L' U' L U L F L' F' U' F U F' U F U F'",
  "B' U' F' R2 F U' B U2 R2 U R2 U' F' U F",
  "R' F R U' R' F' R2 U' R' U' R U R' F R F'",
  "U' R U2 R' D R' U' R D' R' U R' U R2 U' R'",
  "F R U' R' U' R U R' F' R U R' U' R' F R F'",
  "R U R' U R U2 R' F R U R' U' F' U F R U R' U' F'",
];

export const expertAlgorithms = {
  CFOP: {
    phases: ['Cross', 'F2L', 'OLL', 'PLL'],
    averageMoves: 55,
    description: 'Cross, First 2 Layers, Orientation of Last Layer, Permutation of Last Layer'
  },
  Kociemba: {
    phases: ['Phase 1', 'Phase 2'],
    averageMoves: 22,
    description: 'Two-phase algorithm for optimal solutions under 20 moves'
  },
  ZZ: {
    phases: ['EOLine', 'F2L', 'LL'],
    averageMoves: 50,
    description: 'Edge Orientation, Line, First 2 Layers, Last Layer'
  }
};