# 🤝 Contributing to Rubik's Cube Solver

Thank you for your interest in contributing to the Advanced Rubik's Cube Solver! This document provides guidelines and information for contributors.

## 🎯 How to Contribute

### Types of Contributions We Welcome

#### 🐛 Bug Reports
- Algorithm implementation errors
- UI/UX issues and inconsistencies  
- Performance problems
- Browser compatibility issues
- Documentation errors

#### ✨ Feature Requests
- New solving algorithms (Roux, ZZ, Petrus)
- Additional cube sizes (2×2, 4×4, 5×5)
- Advanced visualization features
- Educational content improvements
- Accessibility enhancements

#### 🔧 Code Contributions
- Algorithm optimizations
- UI component improvements
- Test coverage expansion
- Performance optimizations
- Documentation updates

## 🚀 Getting Started

### 1. Fork and Clone
```bash
# Fork the repository on GitHub
git clone https://github.com/yourusername/rubiks-cube-solver.git
cd rubiks-cube-solver
```

### 2. Set Up Development Environment
```bash
# Install backend dependencies
cd backend
pip install -r requirements.txt
pip install -r requirements-dev.txt

# Install frontend dependencies  
cd ../frontend
yarn install

# Start development servers
# Terminal 1: Backend
cd backend
uvicorn server:app --reload --port 8001

# Terminal 2: Frontend
cd frontend
yarn start
```

### 3. Create Feature Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

## 📝 Development Guidelines

### Code Style Standards

#### Frontend (React/JavaScript)
```javascript
// Use functional components with hooks
const CubeComponent = ({ cubeState, onMove }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Use descriptive variable names
  const handleCubeRotation = useCallback((direction) => {
    // Implementation
  }, []);
  
  return (
    <div className="cube-container">
      {/* Use semantic HTML and proper ARIA labels */}
    </div>
  );
};

// Export components as default
export default CubeComponent;
```

#### Backend (Python/FastAPI)
```python
# Use type hints for all functions
from typing import List, Optional
from pydantic import BaseModel

class CubeState(BaseModel):
    front: List[str]
    back: List[str]
    # ... other faces
    
class CubeSolver:
    """Comprehensive docstrings for all classes."""
    
    def solve_cube(
        self, 
        cube_state: CubeState, 
        algorithm: str = "CFOP"
    ) -> List[SolutionStep]:
        """
        Solve the Rubik's cube using specified algorithm.
        
        Args:
            cube_state: Current cube configuration
            algorithm: Solving method (CFOP, Layer-by-Layer, BFS)
            
        Returns:
            List of solution steps with descriptions
            
        Raises:
            ValidationError: If cube state is invalid
        """
        # Implementation
        pass
```

### Commit Message Guidelines

We use [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Types:
- `feat`: New feature
- `fix`: Bug fix  
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

#### Examples:
```
feat(solver): add Roux algorithm implementation

fix(ui): resolve cube rotation animation glitch

docs(readme): update installation instructions

test(algorithms): add CFOP algorithm test coverage
```

### Testing Requirements

#### Frontend Tests
```bash
# Run all tests
yarn test

# Run with coverage
yarn test --coverage

# Component testing example
import { render, screen, fireEvent } from '@testing-library/react';
import CubeComponent from './CubeComponent';

test('should rotate cube on button click', () => {
  const mockRotate = jest.fn();
  render(<CubeComponent onRotate={mockRotate} />);
  
  fireEvent.click(screen.getByText('Rotate Left'));
  expect(mockRotate).toHaveBeenCalledWith('left');
});
```

#### Backend Tests  
```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=.

# API testing example  
import pytest
from fastapi.testclient import TestClient
from server import app

client = TestClient(app)

def test_solve_cube_endpoint():
    cube_state = {
        "front": ["G"] * 9,
        # ... other faces
    }
    
    response = client.post("/api/solve", json={
        "cube_state": cube_state,
        "algorithm": "CFOP"
    })
    
    assert response.status_code == 200
    data = response.json()
    assert "steps" in data
    assert len(data["steps"]) > 0
```

## 🧮 Algorithm Implementation Guide

### Adding New Solving Algorithm

1. **Create Algorithm Class**
```python
# backend/algorithms/new_algorithm.py
class NewAlgorithm:
    def __init__(self):
        self.phases = ["Phase1", "Phase2", "Phase3"]
    
    def solve(self, cube_state: CubeState) -> List[SolutionStep]:
        """Implement your algorithm logic here."""
        pass
```

2. **Register Algorithm**
```python
# backend/solver_registry.py  
from algorithms.new_algorithm import NewAlgorithm

ALGORITHMS = {
    "CFOP": CFOPSolver,
    "Layer-by-Layer": LayerByLayerSolver,
    "BFS": BFSSolver,
    "NewAlgorithm": NewAlgorithm,  # Add here
}
```

3. **Update Frontend**
```javascript
// frontend/src/components/ControlPanel.jsx
const algorithms = [
  { value: 'CFOP', label: 'CFOP Method', /* ... */ },
  { value: 'Layer-by-Layer', label: 'Layer-by-Layer', /* ... */ },
  { value: 'BFS', label: 'BFS/DFS Search', /* ... */ },
  { value: 'NewAlgorithm', label: 'Your Algorithm', /* ... */ },
];
```

4. **Add Tests**
```python
def test_new_algorithm_solves_cube():
    solver = NewAlgorithm()
    scrambled_state = generate_scrambled_cube()
    
    solution = solver.solve(scrambled_state)
    
    assert len(solution) > 0
    assert verify_solution_correctness(scrambled_state, solution)
```

### Algorithm Performance Standards

All algorithm implementations must meet these criteria:

- **Correctness**: 100% of valid cube states must be solvable
- **Performance**: Solution generation within 5 seconds maximum
- **Memory**: Reasonable memory usage (< 100MB for search algorithms)  
- **Documentation**: Comprehensive docstrings explaining the approach

## 🎨 UI/UX Contribution Guidelines

### Design Principles
- **Accessibility First**: WCAG 2.1 AA compliance
- **Mobile Responsive**: Works on all device sizes
- **Performance**: Smooth 60fps animations
- **Intuitive**: Clear visual hierarchy and navigation

### Component Development
```jsx
// Use our design system components
import { Button, Card, Badge } from './ui';

const NewFeature = () => {
  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20">
      <CardHeader>
        <CardTitle>Feature Title</CardTitle>
      </CardHeader>
      <CardContent>
        <Button 
          className="bg-gradient-to-r from-blue-600 to-blue-500"
          onClick={handleAction}
        >
          Action Button
        </Button>
      </CardContent>
    </Card>
  );
};
```

### CSS Guidelines
- Use Tailwind CSS utility classes
- Follow the established color palette
- Implement smooth transitions (duration-200-300)
- Ensure proper contrast ratios
- Test on multiple screen sizes

## 🔍 Code Review Process

### Before Submitting PR

1. **Run Tests Locally**
   ```bash
   # Frontend
   cd frontend && yarn test
   
   # Backend  
   cd backend && pytest
   ```

2. **Check Code Quality**
   ```bash
   # Frontend linting
   yarn lint
   
   # Backend formatting
   black . && flake8 . && mypy .
   ```

3. **Test Manually**
   - Verify all affected functionality works
   - Test on different browsers/devices
   - Check accessibility with screen reader

### PR Requirements

- [ ] Clear description of changes
- [ ] Screenshots/videos for UI changes
- [ ] Tests added/updated for new functionality
- [ ] Documentation updated if needed
- [ ] No breaking changes (or clearly documented)
- [ ] Performance impact considered

### Review Checklist

Reviewers will check for:
- Code quality and adherence to style guides
- Test coverage for new functionality
- Performance implications
- Security considerations
- Accessibility compliance
- Documentation completeness

## 🐛 Bug Report Template

When reporting bugs, please include:

```markdown
**Bug Description**
A clear description of the bug.

**Steps to Reproduce**
1. Go to '...'
2. Click on '....'  
3. Scroll down to '....'
4. See error

**Expected Behavior**
What you expected to happen.

**Actual Behavior**  
What actually happened.

**Screenshots**
If applicable, add screenshots.

**Environment**
- OS: [e.g. macOS 12.0]
- Browser: [e.g. Chrome 96] 
- Device: [e.g. iPhone 13]
- App Version: [e.g. 1.2.0]

**Additional Context**
Any other context about the problem.
```

## 📋 Feature Request Template

```markdown
**Feature Summary**
Brief description of the feature.

**Problem Statement**
What problem does this solve?

**Proposed Solution**
Describe your proposed implementation.

**Alternatives Considered**
Other approaches you've thought about.

**Additional Context**
Mockups, examples, or related issues.

**Implementation Complexity**
Your assessment: Low/Medium/High

**User Value**
How valuable is this to users?
```

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- GitHub contributor statistics
- Special thanks for major features

## 📞 Getting Help

- **Discord**: [Join our dev community](#)
- **GitHub Issues**: For technical questions
- **Email**: dev@rubikssolver.com for sensitive issues

## 📜 Code of Conduct

This project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you're expected to uphold this code.

### Our Standards

- **Be Respectful**: Treat everyone with respect
- **Be Collaborative**: Help others learn and grow
- **Be Inclusive**: Welcome people of all backgrounds
- **Be Patient**: Remember everyone has different skill levels

---

Thank you for contributing to make this project better! 🎉