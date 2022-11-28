import React, { useEffect, useRef, useState } from "react";
import * as THREE from 'three'
import {Canvas, useFrame, ThreeElements} from '@react-three/fiber'
import {ActivityIndicator} from "../../../components/ActivityIndicator.component"

function Box(props: ThreeElements['mesh']) {
    const ref = useRef<THREE.Mesh>(null!)
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    return (
      <mesh
        {...props}
        ref={ref}
        scale={clicked ? 1.5 : 1}
        onClick={(event) => click(!clicked)}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      </mesh>
    )
  }

export const Map3D = (): JSX.Element => {
 

    return (
        <div className="bg-slate-900 h-screen overflow-hidden">
            <Canvas>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Box position={[-1.2, 0, 0]} />
                <mesh>
                    <planeGeometry args={[1,1]}/>
                    <meshStandardMaterial color={0xbbbbbb}/>
                </mesh>
            </Canvas>
        </div>
            )
}
