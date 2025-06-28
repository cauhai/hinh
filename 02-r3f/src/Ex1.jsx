import { Link } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'

const Ex1 = () => (
  <>
    <Link to="/">Home</Link>
    <Canvas>
      <mesh>
        <torusKnotGeometry />
        <meshNormalMaterial />
      </mesh>
      <mesh scale={0.5} position={[4, 0, 0]}>
        <torusKnotGeometry />
        <meshNormalMaterial />
      </mesh>
    </Canvas>
  </>
)

export default Ex1
