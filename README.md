# 🧊 Advanced Rubik's Cube Solver

[![React](https://img.shields.io/badge/React-19.0.0-blue?logo=react)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110.1-green?logo=fastapi)](https://fastapi.tiangolo.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green?logo=mongodb)](https://mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A sophisticated Rubik's Cube solver featuring advanced algorithms, 3D visualization, and comprehensive educational content. Built for the algorithmic challenge competition, this application demonstrates state-of-the-art problem-solving approaches and efficient data structures.

## 🎯 Project Overview

This project implements a complete Rubik's Cube solving system that can solve any scrambled 3×3 cube using multiple algorithms including CFOP, Layer-by-Layer, and computer-optimized search methods. The application features a beautiful 3D interface, step-by-step guidance, and educational resources.

### 🏆 Key Features

#### 🧮 **Algorithm Implementation**
- **CFOP Method**: Cross → F2L → OLL → PLL (Advanced speedcubing method)
- **Layer-by-Layer**: Beginner-friendly approach (Bottom → Middle → Top)
- **BFS/DFS Search**: Computer-optimal solutions (≤20 moves guaranteed)

#### 🎨 **3D Interactive Visualization** 
- Realistic cube rendering with CSS 3D transforms
- Manual rotation controls (no auto-spin distraction)
- Smooth animations for moves and solving process
- Responsive design for all screen sizes

#### 🎓 **Educational Content**
- Complete notation guide (R, U, F, L, D, B with modifiers)
- Algorithm explanations with visual breakdowns  
- Step-by-step solving tutorials
- Tips and tricks for each solving phase

#### 🔧 **Advanced Features**
- Comprehensive cube state validation
- Import/export cube states using standard notation
- Real-time solving with detailed progress tracking
- Multiple sample scrambles for testing
- Performance metrics (move count, solve time)

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and Yarn
- Python 3.8+ with pip
- MongoDB 5.0+
- Modern web browser with CSS 3D transform support

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rubiks-cube-solver
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   yarn install
   ```

4. **Set up environment variables**
   ```bash
   # Backend (.env)
   MONGO_URL=mongodb://localhost:27017
   DB_NAME=rubiks_solver
   
   # Frontend (.env) 
   REACT_APP_BACKEND_URL=http://localhost:8001
   ```

5. **Start the services**
   ```bash
   # Start MongoDB
   mongod
   
   # Start backend (from backend directory)
   uvicorn server:app --host 0.0.0.0 --port 8001 --reload
   
   # Start frontend (from frontend directory) 
   yarn start
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8001
   - API Documentation: http://localhost:8001/docs

## 📱 Usage Guide

### Basic Operations

1. **Scramble the Cube**
   - Click "Scramble" to generate a random 20-move scramble
   - The cube will animate each move for visual feedback

2. **Select Solving Algorithm**
   - Choose from CFOP (Advanced), Layer-by-Layer (Beginner), or BFS (Optimal)
   - Each algorithm provides different approaches and educational value

3. **Solve the Cube**  
   - Click "Solve" to generate step-by-step solution
   - Use Next/Previous buttons to follow along
   - View detailed descriptions for each move

4. **Manual Cube Rotation**
   - Use directional arrows to examine all faces
   - Reset view button returns to default angle

### Advanced Features

#### Import Custom Scrambles
```
R U R' U' R U R' F R F' U F' U F
```
Enter any valid move sequence to set up specific cube states.

#### Notation Guide
- **Basic moves**: R, L, U, D, F, B (clockwise turns)
- **Inverse moves**: R', L', U', D', F', B' (counterclockwise)  
- **Double turns**: R2, L2, U2, D2, F2, B2 (180° rotations)

## 🏗️ Architecture

### Frontend Stack
- **React 19**: Component-based UI with hooks
- **Tailwind CSS**: Utility-first styling with custom design system
- **Lucide Icons**: Beautiful, customizable SVG icons
- **CSS 3D Transforms**: Hardware-accelerated cube visualization

### Backend Stack  
- **FastAPI**: High-performance async API framework
- **Motor**: Async MongoDB driver for Python
- **Pydantic**: Data validation and serialization
- **Uvicorn**: Lightning-fast ASGI server

### Database Schema
```javascript
// Solving Session
{
  id: ObjectId,
  algorithm: "CFOP" | "Layer-by-Layer" | "BFS",
  scramble: ["R", "U", "R'", ...],
  solution: [
    {
      move: "R",
      phase: "Cross", 
      description: "Position white edge piece",
      timestamp: Date
    }
  ],
  solveTime: Number, // milliseconds
  createdAt: Date
}
```

## 🧪 Algorithms Deep Dive

### CFOP Method (Cross, F2L, OLL, PLL)

The **CFOP method** is the most popular speedcubing method worldwide, used by the majority of competitive speedcubers including world record holders. Developed by Jessica Fridrich in the 1980s, it revolutionized competitive cubing.

#### 🎯 **Method Overview**
CFOP breaks the solve into 4 distinct, optimized phases that can be executed with incredible speed through pattern recognition and muscle memory.

#### **Phase 1: Cross (4-8 moves)**
*"The foundation determines the house"*

**Objective**: Create a white cross on the bottom face with edges properly aligned to their center colors.

**Key Concepts**:
- **Inspection Time**: Plan the entire cross during 15-second inspection
- **Color Neutral**: Advanced cubers solve cross on any color, not just white
- **Efficiency**: Sub-8 move crosses are standard for competitive solving
- **Setup**: Cross solutions should set up easy F2L pairs

**Advanced Techniques**:
- **X-Cross**: Solve cross + first F2L pair simultaneously
- **XX-Cross**: Solve cross + two F2L pairs (rare but powerful)
- **Multi-Cross**: Having backup cross solutions ready

**Learning Timeline**: 1-2 weeks to master basic cross, months for advanced planning

#### **Phase 2: F2L - First Two Layers (16-24 moves)**
*"The most important and complex phase"*

**Objective**: Simultaneously solve corner-edge pairs and insert them into the bottom two layers.

**Core Approach**:
- **Pair Formation**: Match white corners with their corresponding middle-layer edges
- **Slot Insertion**: Insert paired pieces using efficient algorithms
- **Look-ahead**: Locate next pair while solving current one

**F2L Cases**:
- **41 Standard Cases**: All possible corner-edge pair configurations
- **Advanced F2L**: Multi-slotting, pseudo-slotting, winter variation
- **X2Y**: Advanced techniques like ZBLS, VLS for last slot

**Efficiency Tips**:
- Minimize cube rotations (aim for <2 per solve)
- Use empty slots strategically for pair manipulation
- Learn to solve pairs in any slot, not just front-right

**Learning Timeline**: 3-6 months for basic F2L, 1-2 years for advanced look-ahead

#### **Phase 3: OLL - Orientation of Last Layer (8-15 moves)**
*"Making the top face uniform"*

**Objective**: Orient all last layer pieces so the top face shows a single color.

**Algorithm Sets**:
- **2-Look OLL**: 10 algorithms (beginner-friendly)
  - 4 Edge orientation algorithms
  - 7 Corner orientation algorithms  
- **Full OLL**: 57 algorithms (competitive standard)

**Recognition Patterns**:
- **Edge Patterns**: Line, L-shape, dot, cross
- **Corner Patterns**: Various orientations and positions
- **Advanced**: COLL (42 algs), OLLCP (331 algs)

**Optimization**:
- **Algorithm Choice**: Multiple algorithms for same case based on next step
- **Fingertricks**: Specific finger movements for speed
- **Recognition Speed**: Pattern identification in <0.5 seconds

**Learning Timeline**: 2-3 months for full OLL, years to master all variants

#### **Phase 4: PLL - Permutation of Last Layer (8-17 moves)**
*"The final arrangement"*

**Objective**: Position all last layer pieces to their correct locations.

**Algorithm Categories**:
- **2-Look PLL**: 6 algorithms (corners first, then edges)
- **Full PLL**: 21 algorithms
  - **Corner Permutations**: A-perm, E-perm, Y-perm, etc.
  - **Edge Permutations**: U-perm, Z-perm, H-perm, etc.
  - **Both**: T-perm, J-perm, R-perm, etc.

**Advanced PLL Systems**:
- **1LLL**: One-Look Last Layer (3,915 algorithms!)
- **ZBLL**: Zborowski-Bruchem Last Layer (493 algorithms)
- **PLL Recognition**: Using "headlights" and block patterns

**Speed Techniques**:
- **Double-flicks**: R U R' U' executed as single motion
- **AUF Prediction**: Knowing final U moves before completing PLL
- **Angle Preparation**: Setting up optimal hand positions

**Learning Timeline**: 1-2 months for full PLL, lifetime to master all variants

#### 📊 **CFOP Performance Metrics**

| Metric | Beginner | Intermediate | Advanced | World Class |
|--------|----------|--------------|----------|-------------|
| **Average Time** | 45-60s | 20-30s | 12-18s | 6-10s |
| **Cross Time** | 8-12s | 3-5s | 2-3s | 1-2s |
| **F2L Time** | 25-35s | 12-18s | 7-10s | 3-5s |
| **Last Layer** | 12-15s | 5-7s | 3-5s | 2-3s |
| **TPS** | 2-3 | 4-6 | 6-8 | 8-12 |

**Famous CFOP Users**: Feliks Zemdegs, Max Park, Tymon Kolasiński, Yusheng Du

---

### Layer-by-Layer Method (Beginner's Method)

The **Layer-by-Layer method** is the most intuitive and widely taught approach for beginners. Developed for educational purposes, it mirrors how most people naturally think about solving the cube.

#### 🎯 **Method Philosophy**
"Solve one layer completely before moving to the next" - this approach provides clear progress indicators and logical progression that beginners can easily understand and remember.

#### **Phase 1: Bottom Cross (4-12 moves)**
*"Building the foundation"*

**Objective**: Create a white cross on the bottom face with correct edge alignment.

**Teaching Approach**:
- **Daisy Method**: First create a "daisy" (white cross) on top, then flip to bottom
- **Direct Method**: Build cross directly on bottom (more advanced)
- **Edge-by-Edge**: Solve one edge at a time with clear algorithms

**Key Learning Points**:
- Understanding face rotations and their effects
- Recognizing edge pieces vs corner pieces
- Learning basic notation (R, U, F, etc.)

**Common Algorithms**:
```
Edge to Bottom: F R U' R' F'
Edge Flip: R U R' U' F' U F
```

**Learning Timeline**: 1-3 days for basic understanding

#### **Phase 2: Bottom Corners (8-20 moves)**
*"Completing the first layer"*

**Objective**: Position and orient all white corners to complete the bottom layer.

**The "Right-Hand Algorithm"**: `R U R' U'`
- Most important algorithm in beginner method
- Repeated until corner is correctly positioned and oriented
- Teaches fundamental finger movements

**Position Recognition**:
- White sticker on top: Apply algorithm once
- White sticker on front: Apply algorithm twice  
- White sticker on right: Apply algorithm three times

**Learning Points**:
- Patience and persistence (may require many repetitions)
- Understanding that algorithms affect multiple pieces
- Building muscle memory for basic moves

**Learning Timeline**: 3-7 days to become comfortable

#### **Phase 3: Middle Layer Edges (12-24 moves)**
*"The bridge between layers"*

**Objective**: Position the four middle layer edge pieces without disrupting the solved bottom layer.

**Right-Hand Algorithm**: `R U R' U' F' U F`
**Left-Hand Algorithm**: `L' U' L U F U' F'`

**Strategy**:
- Find edge piece in top layer without yellow sticker
- Determine if it goes to right or left middle position
- Apply appropriate algorithm to insert edge

**Advanced Concepts Introduced**:
- **Setup Moves**: Positioning the cube before applying algorithms
- **Recognition**: Identifying where pieces belong
- **Patience**: This phase often takes longest for beginners

**Learning Timeline**: 1-2 weeks to master confidently

#### **Phase 4: Top Cross (4-12 moves)**
*"The beginning of the end"*

**Objective**: Create a yellow cross on the top face (orientation only, not positioning).

**The Cross Algorithm**: `F R U R' U' F'`

**Pattern Progression**:
1. **Dot**: No yellow edges correctly oriented
2. **L-Shape**: Two adjacent yellow edges correct
3. **Line**: Two opposite yellow edges correct  
4. **Cross**: All four yellow edges oriented

**Key Teaching**:
- Hold L-shape in left hand when applying algorithm
- Algorithm may need to be repeated multiple times
- This is orientation only - edges may not be positioned correctly

**Learning Timeline**: 2-3 days once middle layer is mastered

#### **Phase 5: Top Layer Completion (16-32 moves)**
*"The grand finale"*

**Sub-Phase 5a: Orient Yellow Corners**
**Sune Algorithm**: `R U R' U R U2 R'`

**Process**:
- Keep any correctly oriented corner in back-right
- Apply Sune algorithm to orient remaining corners
- May require multiple applications per corner

**Sub-Phase 5b: Position Yellow Corners**  
**Corner 3-Cycle**: `R' F R F' (R' F R F') (R' F R F')`

**Sub-Phase 5c: Position Yellow Edges**
**Edge 4-Cycle**: `R U' R F R F' U R'`

**Advanced Beginner Techniques**:
- **2-Look PLL**: Learning just 6 algorithms instead of many
- **Algorithm Variations**: Multiple ways to achieve same result
- **Efficiency Improvements**: Reducing total move count

#### 📊 **Layer-by-Layer Performance Metrics**

| Phase | Beginner | Improved | Optimized |
|-------|----------|----------|-----------|
| **Bottom Cross** | 15-25 moves | 8-15 moves | 6-12 moves |
| **Bottom Corners** | 20-40 moves | 15-25 moves | 12-20 moves |
| **Middle Edges** | 30-50 moves | 20-35 moves | 16-28 moves |
| **Top Cross** | 8-16 moves | 6-12 moves | 4-8 moves |
| **Top Complete** | 40-80 moves | 25-50 moves | 20-40 moves |
| **Total Average** | 90-150 moves | 60-100 moves | 50-80 moves |

**Why Learn This Method**:
- **Intuitive**: Matches natural problem-solving approach
- **Educational**: Teaches cube mechanics and basic algorithms
- **Foundation**: Concepts transfer to advanced methods
- **Achievable**: Anyone can learn to solve consistently

**Transition Path**: Most cubers learn Layer-by-Layer first, then transition to CFOP for speed improvement.

---

### BFS/DFS Search (Computer Optimal)

The **BFS/DFS approach** represents the cutting edge of computational cube solving, utilizing advanced algorithms to find mathematically optimal solutions.

#### 🎯 **Method Philosophy**  
"Find the shortest possible path" - This method prioritizes optimality over human intuition, often producing non-intuitive but mathematically perfect solutions.

#### **Algorithm Foundation: Graph Theory**

The Rubik's Cube can be represented as a **massive graph** where:
- **Vertices**: Each possible cube state (43,252,003,274,489,856,000 total)
- **Edges**: Valid moves connecting states (18 moves from each state)
- **Goal**: Find shortest path from current state to solved state

#### **Phase 1: State Representation & Hashing**
*"Mapping the infinite"*

**Cube State Encoding**:
```python
# Compact representation using integers
state_hash = encode_cube_state(cube)  # 64-bit integer
position_in_graph = hash_to_position(state_hash)
```

**Advanced Representations**:
- **Facelet Notation**: 54 individual stickers
- **Permutation Arrays**: Track piece positions and orientations  
- **Kociemba Coordinates**: Two-phase reduction coordinates
- **Pattern Databases**: Precomputed distance tables

#### **Phase 2: Breadth-First Search Implementation**
*"Exploring all possibilities systematically"*

**BFS Algorithm**:
```
1. Start from current cube state
2. Generate all possible moves (18 options)
3. Check each resulting state:
   - Is it solved? Return path
   - Already visited? Skip
   - Add to queue for next level
4. Repeat until solution found
```

**Optimizations**:
- **Bidirectional Search**: Search from both start and goal
- **A* Search**: Use heuristics to guide search
- **IDA* (Iterative Deepening A*)**: Memory-efficient optimal search

**Memory Management**:
- **Closed Set**: Track visited states (huge memory requirement)
- **Hash Tables**: Fast state lookup and duplicate detection
- **State Compression**: Reduce memory footprint per state

#### **Phase 3: Advanced Pruning Techniques**
*"Eliminating the impossible"*

**Pruning Strategies**:
- **Pattern Databases**: Precomputed minimum distances for subgroups
- **Corner Database**: Minimum moves to solve all corners
- **Edge Database**: Minimum moves to solve all edges
- **Admissible Heuristics**: Lower bounds that never overestimate

**Kociemba's Two-Phase Algorithm**:
1. **Phase 1**: Reach "nice" group (corners oriented, edges in M/E slices)
2. **Phase 2**: Solve within the nice group using table lookups

**Mathematical Foundation**:
- **Group Theory**: Rubik's Cube as permutation group
- **Coset Decomposition**: Breaking problem into smaller subproblems
- **Symmetry Reduction**: Using cube symmetries to reduce search space

#### **Phase 4: Implementation Challenges**
*"Real-world computational limits"*

**Performance Considerations**:
- **Time Complexity**: O(b^d) where b=18, d≤20
- **Space Complexity**: Exponential memory requirements
- **Cache Efficiency**: Optimizing memory access patterns
- **Parallel Processing**: Multi-threaded search algorithms

**Engineering Solutions**:
- **Incremental Deepening**: Search depth 1, then 2, then 3...
- **Transposition Tables**: Cache previously computed positions
- **Move Ordering**: Try likely-good moves first
- **Early Termination**: Stop when "good enough" solution found

#### **God's Number and Mathematical Proof**

**Historic Achievement**: In 2010, computer scientists proved that every possible Rubik's Cube configuration can be solved in **20 moves or fewer**.

**Proof Process**:
- **Massive Computation**: 35 CPU-years of computation time
- **Symmetry Reduction**: Reduced 43 quintillion positions to 2.2 billion classes
- **Distributed Computing**: Google's processing power
- **Exhaustive Verification**: Checked every possible position

**Distribution of Optimal Solutions**:
```
Moves Required | Number of Positions | Percentage
0             | 1                   | 0.00%
1             | 18                  | 0.00%
...           | ...                 | ...
15            | 1.23 × 10¹³         | 28.0%
16            | 1.68 × 10¹³         | 38.9%
17            | 1.20 × 10¹³         | 27.7%
18            | 2.24 × 10¹²         | 5.2%
19            | 4.90 × 10¹⁰         | 0.1%
20            | 4.90 × 10⁷          | 0.0001%
```

#### **Practical Implementation Variants**

**1. Kociemba's Algorithm (Most Practical)**
- **Average**: 18-25 moves
- **Speed**: Solutions in milliseconds
- **Memory**: Reasonable (few MB)
- **Used by**: Most online solvers and apps

**2. Optimal Solvers (Research/Competition)**
- **Moves**: 15-20 moves guaranteed optimal
- **Speed**: Seconds to hours depending on position
- **Memory**: Gigabytes of precomputed tables
- **Used by**: Fewest Moves Competition, research

**3. Near-Optimal Heuristics**
- **Moves**: 20-30 moves
- **Speed**: Instant
- **Memory**: Minimal
- **Used by**: Mobile apps, embedded systems

#### 📊 **BFS/DFS Performance Comparison**

| Algorithm | Avg Moves | Solve Time | Memory | Optimality |
|-----------|-----------|------------|---------|------------|
| **Pure BFS** | 15-20 | Hours/Days | 100+ GB | Guaranteed |
| **Kociemba** | 18-25 | 10-100ms | 1-5 MB | Very Good |
| **IDA*** | 15-20 | 1-60s | <1 MB | Guaranteed |
| **Pattern DB** | 16-22 | 100-500ms | 10-50 MB | Excellent |

#### **Real-World Applications**

**Competition Use**:
- **Fewest Moves Competition**: Find absolute minimum moves
- **Analysis Tools**: Study optimal solutions vs human methods
- **Training**: Generate position-specific optimal sequences

**Research Applications**:
- **Algorithm Development**: Benchmark for new methods
- **Mathematical Study**: Understanding cube group structure  
- **Optimization**: General search algorithm improvements

**Educational Value**:
- **Computer Science**: Demonstrates search algorithms, hashing, optimization
- **Mathematics**: Group theory, combinatorics, graph theory
- **Problem Solving**: Systematic vs intuitive approaches

#### **Learning Path for BFS/DFS Understanding**

**Prerequisites**:
- Basic programming knowledge (Python/Java/C++)
- Understanding of data structures (queues, hash tables)
- Graph theory fundamentals

**Implementation Progression**:
1. **Simple BFS**: Naive breadth-first search (toy problems)
2. **State Representation**: Efficient cube encoding/decoding
3. **Pruning**: Pattern databases and heuristics
4. **Kociemba**: Two-phase algorithm implementation
5. **Optimization**: Memory management and speed improvements

**Why Study Computer Methods**:
- **Benchmark**: Understanding theoretical limits
- **Insight**: How computers "think" about cube solving
- **Innovation**: Inspiring new human-solving techniques
- **Education**: Practical application of CS algorithms

## 🎨 UI Components

### Core Components

#### `RubiksCube.jsx`
3D cube visualization with manual rotation controls
```jsx
<RubiksCube 
  cubeState={state}
  rotation={rotation}
  onRotate={handleRotate}
  isAnimating={isAnimating}
/>
```

#### `SolutionSteps.jsx`  
Step-by-step solving interface with progress tracking
```jsx
<SolutionSteps
  steps={solutionSteps}
  currentStep={currentStep}
  onStepForward={handleStepForward}
  onStepBackward={handleStepBackward}
/>
```

#### `ControlPanel.jsx`
Algorithm selection and cube manipulation controls
```jsx
<ControlPanel
  selectedAlgorithm={algorithm}
  onAlgorithmChange={setAlgorithm}
  onScramble={handleScramble}
  onSolve={handleSolve}
/>
```

### Design System

#### Color Palette
- **Primary**: Blue gradient (from-blue-600 to-blue-500)
- **Secondary**: Purple gradient (from-purple-600 to-purple-500) 
- **Accent**: Pink to purple gradient
- **Background**: Dark gradient (slate-900 to purple-900)

#### Typography
- **Headers**: 4xl-6xl font sizes with gradient text effects
- **Body**: Default system font stack with proper line height
- **Code**: Monaco/Menlo monospace for move notation

## 🧪 Testing

### Validation Tests
The application includes comprehensive cube state validation:

```javascript
// Validate cube structure and physics
const validation = cubeUtils.validateCubeState(cubeState);
if (!validation.isValid) {
  console.error('Invalid state:', validation.errors);
}
```

### Test Scenarios
- Valid move sequences and notation parsing
- Cube state consistency after operations  
- Algorithm correctness and completion
- Edge cases and error handling

### Manual Testing Checklist
- [ ] Scramble generates valid random states
- [ ] All three algorithms produce working solutions
- [ ] Step navigation works bidirectionally
- [ ] Notation import handles invalid input gracefully
- [ ] Cube rotation controls respond smoothly
- [ ] Mobile responsiveness across devices

## 🚀 Deployment

### Production Build
```bash
# Build frontend
cd frontend
yarn build

# Backend is ready for production with uvicorn
cd ../backend  
uvicorn server:app --host 0.0.0.0 --port 8001
```

### Environment Variables
```bash
# Production backend
MONGO_URL=mongodb://prod-server:27017
DB_NAME=rubiks_solver_prod

# Production frontend
REACT_APP_BACKEND_URL=https://api.rubikssolver.com
```

### Docker Deployment
```dockerfile
# Multi-stage build for optimized production image
FROM node:18 AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN yarn install
COPY frontend/ ./
RUN yarn build

FROM python:3.9-slim AS backend
WORKDIR /app/backend
COPY backend/requirements.txt ./
RUN pip install -r requirements.txt
COPY backend/ ./
COPY --from=frontend-build /app/frontend/build ../frontend/build
EXPOSE 8001
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8001"]
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)  
5. Open a Pull Request

### Code Standards
- **JavaScript/React**: ESLint + Prettier configuration
- **Python**: Black formatting + flake8 linting
- **Commits**: Conventional Commits specification
- **Testing**: All new features require corresponding tests

## 🐛 Known Issues & Roadmap

### Current Issues
- [ ] Step-by-step navigation timing in React state updates
- [ ] Mobile touch gesture support for cube rotation
- [ ] Algorithm performance optimization for larger cubes

### Planned Features  
- [ ] 2×2 and 4×4 cube support
- [ ] Custom algorithm import/export
- [ ] Solving session history and analytics
- [ ] Multiplayer solving competitions
- [ ] VR/AR cube manipulation interface

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Authors

- **E1 by Emergent** - Initial development and architecture
- Built for the Algorithmic Challenge Competition 2025

## 🙏 Acknowledgments

- Rubik's Cube community for algorithmic insights
- React and FastAPI communities for excellent documentation
- CSS 3D transform tutorials and examples
- Speedcubing community for algorithm references

---

**⭐ Star this repository if you find it helpful!**

For questions, issues, or feature requests, please open an issue on GitHub.