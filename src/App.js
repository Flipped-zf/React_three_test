import state from "./store.js"
import { useRef , useEffect , Suspense} from 'react'
import { Html } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import Content from './components/content'
import './components/CustomMaterial'
import Plane from './components/Plane'
import lerp from "lerp"
import Diamonds from "./diamonds/Diamonds"

function Startup() {
  const ref = useRef()
  useFrame(() => (ref.current.material.opacity = lerp(ref.current.material.opacity, 0, 0.025)))
  return <Plane ref={ref} color="#0e0e0f" position={[0, 0, 200]} scale={[100, 100, 1]} />
}

function App() {
  const scrollArea = useRef()
  const onScroll = (e) => {
    state.top.current = e.target.scrollTop
  }
  useEffect(() => void onScroll({ target: scrollArea.current }), [])
  return (
    <>
    <Canvas linear dpr={[1, 2]} orthographic camera={{ zoom: state.zoom, position: [0, 0, 500] }}>
      <Suspense fallback={<Html center className="loading" children="Loading..." />}>
        <Content />
        <Diamonds />
      </Suspense>
    </Canvas>
      <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
      {new Array(state.sections).fill().map((_, index) => (
          <div key={index} id={"0" + index} style={{ height: `${(state.pages / state.sections) * 100}vh` }} />
        ))}
      </div>
    </>
  );
}

export default App;
