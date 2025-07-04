import { Link, Routes, Route } from 'react-router-dom'
import Example1 from './Example1'
import Example2 from './Example2'
import Example3 from './Example3'
import Example4 from './Example4'
import WordsSphere from './WordsSphere'
import './App.css'

const NotFound = () => <h1>Page not found</h1>
const Home = () => (
  <>
    <h1>React Three Fiber - Home</h1>
    <nav>
      <ul>
        <li><Link to="/ex1">Example 1 - Knot torus</Link></li>
        <li><Link to="/ex2">Example 2 - With lightings and orbit controls</Link></li>
        <li><Link to="/ex3">Example 3 - Texture with text</Link></li>
        <li><Link to="/ex4">Example 4 - A thousand boxes</Link></li>
        <li><Link to="/words">Words on a sphere</Link></li>
      </ul>
    </nav>
  </>
)

const App = () => (
  <div>
    <Routes>
      {/* Basic Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/ex1" element={<Example1 />} />
      <Route path="/ex2" element={<Example2 />} />
      <Route path="/ex3" element={<Example3 />} />
      <Route path="/ex4" element={<Example4 />} />
      <Route path="/words" element={<WordsSphere />} />
      {/* Catch-all route for 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </div>
)

export default App
