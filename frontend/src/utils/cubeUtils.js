// Enhanced Utility functions for Rubik's Cube state management and validation

export const cubeUtils = {
  // Get a solved cube state
  getSolvedState() {
    return {
      front: ['G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G'],  // Green
      back: ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B'],   // Blue
      right: ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'],  // Red
      left: ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],   // Orange
      top: ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],    // White
      bottom: ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y']  // Yellow
    };
  },

  // Enhanced cube state validation
  validateCubeState(cubeState) {
    const errors = [];
    const validColors = ['W', 'Y', 'R', 'O', 'G', 'B'];
    const faceNames = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    const colorCounts = { W: 0, Y: 0, R: 0, O: 0, G: 0, B: 0 };
    
    // Check structure
    if (!cubeState || typeof cubeState !== 'object') {
      errors.push('Cube state must be an object');
      return { isValid: false, errors };
    }

    // Check all faces exist and have correct structure
    for (const face of faceNames) {
      if (!cubeState[face]) {
        errors.push(`Missing face: ${face}`);
        continue;
      }
      
      if (!Array.isArray(cubeState[face])) {
        errors.push(`Face ${face} must be an array`);
        continue;
      }
      
      if (cubeState[face].length !== 9) {
        errors.push(`Face ${face} must have exactly 9 stickers, has ${cubeState[face].length}`);
        continue;
      }
      
      // Check each sticker color
      cubeState[face].forEach((color, index) => {
        if (!validColors.includes(color)) {
          errors.push(`Invalid color "${color}" on ${face} position ${index}`);
        } else {
          colorCounts[color]++;
        }
      });
    }
    
    // Check color distribution (each color should appear exactly 9 times)
    for (const color of validColors) {
      if (colorCounts[color] !== 9) {
        errors.push(`Color ${color} appears ${colorCounts[color]} times, should be 9`);
      }
    }
    
    // Check if cube is physically possible (more complex validation)
    const physicalValidation = this.validateCubePhysics(cubeState);
    if (!physicalValidation.isValid) {
      errors.push(...physicalValidation.errors);
    }
    
    return {
      isValid: errors.length === 0,
      errors: errors,
      colorCounts: colorCounts
    };
  },

  // Validate cube physics (basic checks)
  validateCubePhysics(cubeState) {
    const errors = [];
    
    // Check center pieces (position 4 on each face should be the expected color)
    const expectedCenters = {
      front: 'G', back: 'B', right: 'R', 
      left: 'O', top: 'W', bottom: 'Y'
    };
    
    for (const [face, expectedColor] of Object.entries(expectedCenters)) {
      if (cubeState[face] && cubeState[face][4] !== expectedColor) {
        errors.push(`Center piece on ${face} face should be ${expectedColor}, found ${cubeState[face][4]}`);
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors: errors
    };
  },

  // Generate a scramble with tracking
  generateScrambleWithHistory(length = 20) {
    const moves = ['R', 'L', 'U', 'D', 'F', 'B'];
    const modifiers = ['', "'", '2'];
    const scrambleMoves = [];
    let lastMove = '';
    let lastAxis = '';

    for (let i = 0; i < length; i++) {
      let move, axis;
      
      // Avoid consecutive moves on the same face or opposite faces
      do {
        move = moves[Math.floor(Math.random() * moves.length)];
        axis = this.getMoveAxis(move);
      } while (move === lastMove || axis === lastAxis);
      
      const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
      const fullMove = move + modifier;
      scrambleMoves.push(fullMove);
      
      lastMove = move;
      lastAxis = axis;
    }
    
    return scrambleMoves;
  },

  // Get the axis of a move (to avoid conflicting consecutive moves)
  getMoveAxis(move) {
    const axes = {
      'R': 'x', 'L': 'x',
      'U': 'y', 'D': 'y',
      'F': 'z', 'B': 'z'
    };
    return axes[move];
  },

  // Apply a single move to the cube state with validation
  applyMove(cubeState, move) {
    const validation = this.validateCubeState(cubeState);
    if (!validation.isValid) {
      console.warn('Invalid cube state before move:', validation.errors);
      return cubeState; // Return original state if invalid
    }

    const newState = JSON.parse(JSON.stringify(cubeState)); // Deep clone
    
    const baseMoveMap = {
      'R': () => this.rotateRight(newState),
      'L': () => this.rotateLeft(newState),
      'U': () => this.rotateUp(newState),
      'D': () => this.rotateDown(newState),
      'F': () => this.rotateFront(newState),
      'B': () => this.rotateBack(newState)
    };

    const baseMove = move.replace(/['2]/g, '');
    const modifier = move.replace(/[RLUDFB]/g, '');

    if (baseMoveMap[baseMove]) {
      if (modifier === '') {
        baseMoveMap[baseMove]();
      } else if (modifier === "'") {
        // Counterclockwise = 3 clockwise rotations
        baseMoveMap[baseMove]();
        baseMoveMap[baseMove]();
        baseMoveMap[baseMove]();
      } else if (modifier === '2') {
        // Double turn = 2 clockwise rotations
        baseMoveMap[baseMove]();
        baseMoveMap[baseMove]();
      }
    } else {
      console.warn(`Unknown move: ${move}`);
      return cubeState;
    }

    // Validate the result
    const resultValidation = this.validateCubeState(newState);
    if (!resultValidation.isValid) {
      console.warn('Invalid cube state after move:', resultValidation.errors);
      return cubeState; // Return original state if result is invalid
    }

    return newState;
  },

  // Rotate arrays clockwise (corrected implementation)
  rotateArrayClockwise(arr) {
    // For a 3x3 grid numbered 0-8:
    // 0 1 2    6 3 0
    // 3 4 5 -> 7 4 1
    // 6 7 8    8 5 2
    return [arr[6], arr[3], arr[0], arr[7], arr[4], arr[1], arr[8], arr[5], arr[2]];
  },

  // Enhanced face rotations with proper edge handling
  rotateRight(state) {
    // Rotate right face clockwise
    state.right = this.rotateArrayClockwise(state.right);
    
    // Move adjacent edges (corrected edge positions)
    const temp = [state.front[2], state.front[5], state.front[8]];
    [state.front[2], state.front[5], state.front[8]] = [state.bottom[2], state.bottom[5], state.bottom[8]];
    [state.bottom[2], state.bottom[5], state.bottom[8]] = [state.back[6], state.back[3], state.back[0]];
    [state.back[6], state.back[3], state.back[0]] = [state.top[2], state.top[5], state.top[8]];
    [state.top[2], state.top[5], state.top[8]] = temp;
  },

  rotateLeft(state) {
    // Rotate left face clockwise
    state.left = this.rotateArrayClockwise(state.left);
    
    // Move adjacent edges (opposite of right)
    const temp = [state.front[0], state.front[3], state.front[6]];
    [state.front[0], state.front[3], state.front[6]] = [state.top[0], state.top[3], state.top[6]];
    [state.top[0], state.top[3], state.top[6]] = [state.back[8], state.back[5], state.back[2]];
    [state.back[8], state.back[5], state.back[2]] = [state.bottom[0], state.bottom[3], state.bottom[6]];
    [state.bottom[0], state.bottom[3], state.bottom[6]] = temp;
  },

  rotateUp(state) {
    // Rotate top face clockwise
    state.top = this.rotateArrayClockwise(state.top);
    
    // Move adjacent edges
    const temp = [state.front[0], state.front[1], state.front[2]];
    [state.front[0], state.front[1], state.front[2]] = [state.right[0], state.right[1], state.right[2]];
    [state.right[0], state.right[1], state.right[2]] = [state.back[0], state.back[1], state.back[2]];
    [state.back[0], state.back[1], state.back[2]] = [state.left[0], state.left[1], state.left[2]];
    [state.left[0], state.left[1], state.left[2]] = temp;
  },

  rotateDown(state) {
    // Rotate bottom face clockwise
    state.bottom = this.rotateArrayClockwise(state.bottom);
    
    // Move adjacent edges (opposite of up)
    const temp = [state.front[6], state.front[7], state.front[8]];
    [state.front[6], state.front[7], state.front[8]] = [state.left[6], state.left[7], state.left[8]];
    [state.left[6], state.left[7], state.left[8]] = [state.back[6], state.back[7], state.back[8]];
    [state.back[6], state.back[7], state.back[8]] = [state.right[6], state.right[7], state.right[8]];
    [state.right[6], state.right[7], state.right[8]] = temp;
  },

  rotateFront(state) {
    // Rotate front face clockwise
    state.front = this.rotateArrayClockwise(state.front);
    
    // Move adjacent edges
    const temp = [state.top[6], state.top[7], state.top[8]];
    [state.top[6], state.top[7], state.top[8]] = [state.left[8], state.left[5], state.left[2]];
    [state.left[8], state.left[5], state.left[2]] = [state.bottom[2], state.bottom[1], state.bottom[0]];
    [state.bottom[2], state.bottom[1], state.bottom[0]] = [state.right[0], state.right[3], state.right[6]];
    [state.right[0], state.right[3], state.right[6]] = temp;
  },

  rotateBack(state) {
    // Rotate back face clockwise
    state.back = this.rotateArrayClockwise(state.back);
    
    // Move adjacent edges (opposite of front)
    const temp = [state.top[0], state.top[1], state.top[2]];
    [state.top[0], state.top[1], state.top[2]] = [state.right[2], state.right[5], state.right[8]];
    [state.right[2], state.right[5], state.right[8]] = [state.bottom[8], state.bottom[7], state.bottom[6]];
    [state.bottom[8], state.bottom[7], state.bottom[6]] = [state.left[6], state.left[3], state.left[0]];
    [state.left[6], state.left[3], state.left[0]] = temp;
  },

  // Get the inverse of a move
  getInverseMove(move) {
    const baseMove = move.replace(/['2]/g, '');
    const modifier = move.replace(/[RLUDFB]/g, '');
    
    if (modifier === '') {
      return baseMove + "'";
    } else if (modifier === "'") {
      return baseMove;
    } else if (modifier === '2') {
      return baseMove + '2';
    }
    
    return move;
  },

  // Parse notation string into move array
  parseNotation(notation) {
    const moves = notation.trim().split(/\s+/);
    const validMovePattern = /^[RLUDFB](['2]?)$/;
    
    return moves.filter(move => {
      if (!validMovePattern.test(move)) {
        throw new Error(`Invalid move: ${move}`);
      }
      return true;
    });
  },

  // Check if cube is solved
  isSolved(cubeState) {
    const validation = this.validateCubeState(cubeState);
    if (!validation.isValid) {
      return false;
    }

    for (const face in cubeState) {
      const faceArray = cubeState[face];
      const firstColor = faceArray[0];
      if (!faceArray.every(sticker => sticker === firstColor)) {
        return false;
      }
    }
    return true;
  },

  // Generate solution by reversing scramble moves
  generateSolutionFromScramble(scrambleMoves) {
    if (!scrambleMoves || scrambleMoves.length === 0) {
      return [];
    }
    
    // Reverse the scramble moves and invert each one
    const solutionMoves = scrambleMoves
      .slice()
      .reverse()
      .map(move => this.getInverseMove(move));
    
    return solutionMoves;
  },

  // Apply a sequence of moves to cube state
  applyMoveSequence(cubeState, moves) {
    let currentState = cubeState;
    
    for (const move of moves) {
      currentState = this.applyMove(currentState, move);
    }
    
    return currentState;
  },

  // Generate a realistic mixed state for demonstration
  generateMixedState() {
    let state = this.getSolvedState();
    const scrambleMoves = this.generateScrambleWithHistory(15);
    
    scrambleMoves.forEach(move => {
      state = this.applyMove(state, move);
    });
    
    return {
      state: state,
      scrambleMoves: scrambleMoves
    };
  },

  // Debug function to print cube state
  printCubeState(cubeState) {
    console.log('Cube State:');
    console.log('Top (White):', cubeState.top);
    console.log('Front (Green):', cubeState.front);
    console.log('Right (Red):', cubeState.right);
    console.log('Back (Blue):', cubeState.back);
    console.log('Left (Orange):', cubeState.left);
    console.log('Bottom (Yellow):', cubeState.bottom);
    
    const validation = this.validateCubeState(cubeState);
    console.log('Validation:', validation);
  },

  // Check if two cube states are equal
  areStatesEqual(state1, state2) {
    const faces = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    
    for (const face of faces) {
      if (!state1[face] || !state2[face]) return false;
      
      for (let i = 0; i < 9; i++) {
        if (state1[face][i] !== state2[face][i]) {
          return false;
        }
      }
    }
    
    return true;
  }
};