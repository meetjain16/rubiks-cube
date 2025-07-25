// Utility functions for Rubik's Cube state management and operations

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

  // Generate a random scramble
  generateScramble(length = 20) {
    const moves = ['R', 'L', 'U', 'D', 'F', 'B'];
    const modifiers = ['', "'", '2'];
    const scramble = [];
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
      scramble.push(move + modifier);
      
      lastMove = move;
      lastAxis = axis;
    }
    
    return scramble;
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

  // Apply a single move to the cube state
  applyMove(cubeState, move) {
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
    }

    return newState;
  },

  // Rotate arrays clockwise
  rotateArrayClockwise(arr) {
    return [arr[6], arr[3], arr[0], arr[7], arr[4], arr[1], arr[8], arr[5], arr[2]];
  },

  // Individual face rotations (simplified versions for mock)
  rotateRight(state) {
    // Rotate right face clockwise
    state.right = this.rotateArrayClockwise(state.right);
    
    // Move adjacent edges
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
    for (const face in cubeState) {
      const faceArray = cubeState[face];
      const firstColor = faceArray[0];
      if (!faceArray.every(sticker => sticker === firstColor)) {
        return false;
      }
    }
    return true;
  },

  // Generate a realistic mixed state for demonstration
  generateMixedState() {
    let state = this.getSolvedState();
    const scrambleMoves = this.generateScramble(15);
    
    scrambleMoves.forEach(move => {
      state = this.applyMove(state, move);
    });
    
    return state;
  }
};