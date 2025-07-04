// copied from
// https://codesandbox.io/p/sandbox/0z8i2c?file=%2Fsrc%2FApp.js%3A19%2C4

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { RenderTexture, OrbitControls, PerspectiveCamera, Text, ContactShadows } from '@react-three/drei'
import { suspend } from 'suspend-react'
import { Link } from 'react-router-dom'

// https://github.com/pmndrs/assets
const inter = import('@pmndrs/assets/fonts/inter_regular.woff')

export default function Example3() {
  return (
    <>
      <Link to="/">Home</Link>
      <h2>Texture using text</h2>
      <p>Drag mouse to spin, scroll-wheel to zoom.</p>
      
      <div style={{ height: 400 }}>
        <Canvas camera={{ position: [5, 5, 5], fov: 25 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} />
          <Cube />
          <ContactShadows frames={1} position={[0, -0.5, 0]} blur={1} opacity={0.75} />
          <ContactShadows frames={1} position={[0, -0.5, 0]} blur={3} color="orange" />
          <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2.1} />
        </Canvas>
      </div>
    </>
  )
}

function Cube() {
  const textRef = useRef()
  useFrame((state) => (textRef.current.position.x = Math.sin(state.clock.elapsedTime / 2) * 10))
  return (
    <mesh>
      <boxGeometry />
      <meshStandardMaterial>
        <RenderTexture attach="map">
          <PerspectiveCamera makeDefault manual aspect={1 / 1} position={[0, 0, 5]} />
          <color attach="background" args={['fuchsia']} />
          <ambientLight intensity={Math.PI} />
          <Text font={suspend(inter).default} ref={textRef} fontSize={4} color="gold">
            Hallå eller!
          </Text>
        </RenderTexture>
      </meshStandardMaterial>
    </mesh>
  )
}
