import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { points } from './globeData'

export function Globe() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Stars radius={100} depth={50} count={5000} factor={4} />
      {points.map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[0.05]} />
          <meshStandardMaterial color="hsl(var(--primary))" />
        </mesh>
      ))}
      <OrbitControls 
        autoRotate
        enableZoom={false}
        maxPolarAngle={Math.PI/2}
        minPolarAngle={Math.PI/2}
      />
    </Canvas>
  )
}