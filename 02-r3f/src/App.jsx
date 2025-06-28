import { Link, Routes, Route } from 'react-router-dom'
import Ex1 from './Ex1'
import WordsSphere from './WordsSphere'
import './App.css'

const Home = () => (
  <>
    <h1>React Three Fiber - Home</h1>
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/ex1">Example 1 - Knot torus</Link></li>
        <li><Link to="/words">Words sphere</Link></li>
      </ul>
    </nav>
  </>
)

const NotFound = () => <h1>Not found</h1>

const App = () => (
  <div>
    <Routes>
      {/* Basic Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/ex1" element={<Ex1 />} />
      <Route path="/words" element={<WordsSphere />} />
      {/* Catch-all route for 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </div>
)

export default App
