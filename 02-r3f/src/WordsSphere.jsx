import * as THREE from 'three'
import { Link } from 'react-router-dom'
import { useRef, useState, useMemo, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Billboard, Text, TrackballControls } from '@react-three/drei'
import './WordsSphere.css'

function randomText() {
  const texts = ["kindness", "sympathy", "love", "patience", "humility", "generosity", "intelligence", "care" ]
  return texts[Math.floor(Math.random() * texts.length)]
}

function Word({ children, fontSize, ...props }) {
  const color = new THREE.Color()
  const fontProps = {} ///{ font: '/Inter-Bold.woff', fontSize: 2.5, letterSpacing: -0.05, lineHeight: 1, 'material-toneMapped': false }
  const ref = useRef()
  const [hovered, setHovered] = useState(false)
  const over = (e) => (e.stopPropagation(), setHovered(true))
  const out = () => setHovered(false)
  // Change the mouse cursor on hover¨
  useEffect(() => {
    if (hovered) document.body.style.cursor = 'pointer'
    return () => (document.body.style.cursor = 'auto')
  }, [hovered])
  // Tie component to the render-loop
  useFrame(({ camera }) => {
    /// this one eases the change in colour (i may not need)
    /// ref.current.material.color.lerp(color.set(hovered ? 'gold' : 'green'), 0.1)
    ref.current.material.color.set(hovered ? 'aqua' : 'gold')
  })
  return (
    <Billboard {...props}>
      <Text ref={ref} onPointerOver={over} onPointerOut={out} 
        onClick={() => console.log(`You clicked: ${ref?.current?.text}`)} 
        fontSize={fontSize} fontWeight={600}
        children={children} 
      />
    </Billboard>
  )
}

function Cloud({ radius, polarCount, equatorCount }) {
  // radius: of the sphere
  // polarCount: how many points on each longitude
  // equatorCount: how many longitudes
  // Create points with spherical distribution
  const words = useMemo(() => {
    const allWordsData = [/* position, text, size */]
    const spherical = new THREE.Spherical() // a point in spherical coordinates (r, θ, φ)
    const phiSpan = Math.PI / (polarCount + 1) // polar angle [0, PI]
    const thetaSpan = (Math.PI * 2) / equatorCount // equator (azimuthal) angle [0, 2PI]
    for (let p = 1; p < polarCount + 1; p++) {
      for (let t = 0; t < equatorCount; t++) {
        const point = spherical.set(radius, phiSpan * p, thetaSpan * t)
        allWordsData.push([
          new THREE.Vector3().setFromSpherical(point),
          randomText(),
          phiSpan * p,
        ])
      }
    }
    return allWordsData
  }, [radius, polarCount, equatorCount])
  return words.map(([pos, word, phi], index) => {
    // size grows from 0.5 (at pole) to max at equator, then shrinks back to other pole
    const size = (phi < Math.PI / 2) ? (0.5 + phi) : (0.5 + Math.PI - phi)
    return <Word
      key={index} position={pos}
      children={word} fontSize={size}
    /> })
}

const WordsSphere = () => (
  <>
    <Link to="/">Home</Link>
    <h2>Sphere of words</h2>
    <p>Drag mouse to spin, scroll-wheel to zoom.</p>
    <div className="universe">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 50], fov: 90 }}>
        <fog attach="fog" args={['salmon', 0, 90]} />
        <Suspense fallback={null}>
          <group rotation={[10, 10.5, 10]}>
            <Cloud radius={25} polarCount={12} equatorCount={18} />
          </group>
        </Suspense>
        <TrackballControls />
      </Canvas>
    </div>
  </>
  
)

export default WordsSphere