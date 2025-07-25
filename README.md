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
Most popular speedcubing method with 4 distinct phases:

1. **Cross (8 moves avg)**: Form white cross on bottom
2. **F2L (24 moves avg)**: First Two Layers simultaneously  
3. **OLL (12 moves avg)**: Orient Last Layer pieces
4. **PLL (15 moves avg)**: Permute Last Layer to completion

**Time Complexity**: O(1) with lookup tables  
**Space Complexity**: O(1) for algorithm storage
**Average Moves**: 50-60

### Layer-by-Layer Method
Intuitive beginner approach with clear progression:

1. **Bottom Cross**: White cross formation
2. **Bottom Corners**: Complete bottom layer
3. **Middle Edges**: Second layer completion
4. **Top Cross**: Form cross on top
5. **Orient Corners**: Fix corner orientations  
6. **Final Layer**: Complete cube solution

**Time Complexity**: O(n) where n is cube state complexity
**Space Complexity**: O(1)
**Average Moves**: 70-100

### BFS/DFS Search
Computer-optimal pathfinding approach:

1. **State Analysis**: Map current cube configuration
2. **Breadth-First Search**: Explore all possible moves
3. **Pruning**: Eliminate suboptimal branches
4. **Optimal Path**: Return shortest solution

**Time Complexity**: O(b^d) where b=18 moves, d=depth  
**Space Complexity**: O(b^d) for state storage
**Average Moves**: 15-25 (God's Number ≤ 20)

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