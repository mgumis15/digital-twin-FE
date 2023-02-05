import React, { useEffect, useRef, useState } from "react";
import * as THREE from 'three'
import {Canvas, useFrame, ThreeElements} from '@react-three/fiber'
import {Instances,Instance, OrbitControls,Environment,Lightformer, Cone,Box} from "@react-three/drei"
import {ActivityIndicator} from "../../../components/ActivityIndicator.component"
import {Package,Shelf,Size} from  "../../../interfaces/Map.interfaces"
import {Point} from "../../../interfaces/Point.interface"
import { group } from "console";
import {Product} from "../../../interfaces/Product.interface"
import { useLoadStore } from "../../../hooks/useLoadStore";
import { forEachChild } from "typescript";



export const Map3D = (): JSX.Element => {

  const  {
    loading,
    error,
    products
  }=useLoadStore("http://localhost:4000/products")

    return (
        <div className="bg-slate-900 h-screen overflow-hidden">
            <Canvas>
            <OrbitControls
              zoomSpeed={0.25}
              minZoom={100}
              maxZoom={140}
              enablePan={true}
              dampingFactor={0.05}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 4}
            />
            <axesHelper args={[5]} />
            <Robot/>
            <Grid/>
            {
              products
              .map((product:Product,i)=>{
                 return <ProductBox product={product} key={product.id}/>
              })
            }
            </Canvas>
            {loading && 
            <div>
              <div className="z-10  absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-150"><ActivityIndicator /></div>
            </div>
            }
            {error && <h1>Error</h1>}
        </div>
            )
}
const ProductBox=(props:{product:Product})=>{
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  const product:Product=props.product

  return(
    <Box 
      position={[product.localization.x, 0, product.localization.y]}
      onPointerOver={e => {
        e.stopPropagation();
        setHovered(true);
      } }
      onPointerLeave={e => {
        e.stopPropagation();
        setHovered(false);
      } }
      onPointerDown={e => {
        e.stopPropagation();
        console.log(product);
        setClicked(true);
      } } getObjectsByProperty={undefined} getVertexPosition={undefined}    >
        <meshBasicMaterial color={hovered?"#999999":"#555555"}/>
    </Box>
  )


}
const Robot=()=> {
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  return (
      <Cone 
      position={[0, 0, 0]}
      onPointerOver={f => setHovered(true)}
      onPointerLeave={f => setHovered(false)}
      onPointerDown={f => setClicked(true)}
      args={[0.5, 1, 20, 20]}
      rotation={[Math.PI / 2, 0, 0]} getObjectsByProperty={undefined} getVertexPosition={undefined}>
        <meshBasicMaterial color={hovered?"#999999":"#555555"}/>
      </Cone>
    
  )
}
const Grid = ({ size = 40, lineWidth = 0.026, height = 0.5 }) => (
  // Renders a grid and crosses as instances
  <Instances position={[size, -1.02, size]} getObjectsByProperty={undefined} getVertexPosition={undefined}>
    <planeGeometry args={[lineWidth, height]} />
    <meshBasicMaterial color="#999" />
    {Array.from({ length: size }, (_, y) =>
      Array.from({ length: size }, (_, x) => (
        <group key={x + ':' + y} position={[x * 2 - Math.floor(size / 2) * 2, -0.01, y * 2 - Math.floor(size / 2) * 2]}>
          <Instance rotation={[-Math.PI / 2, 0, 0]} getObjectsByProperty={undefined} />
          <Instance rotation={[-Math.PI / 2, 0, Math.PI / 2]} getObjectsByProperty={undefined} />
        </group>
      ))
    )}
    <gridHelper args={[size, 40, '#bbb', '#bbb']} position={[-size/2, -0.01, -size/2]} />
  </Instances>
)