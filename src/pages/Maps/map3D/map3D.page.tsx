import React, { useEffect, useRef, useState } from "react"
import { Canvas, useThree, Vector3 } from '@react-three/fiber'
import { Instances, Text, Instance, OrbitControls, Cone, RoundedBox, Text3D } from "@react-three/drei"
import { ActivityIndicator } from "../../../components/ActivityIndicator.component"
import { Package, Shelf, Size } from "../../../interfaces/Map.interfaces"
import { Point as IPoint } from "../../../interfaces/Point.interface"
import { group } from "console"
import { Product } from "../../../interfaces/Product.interface"
import { useLoadStore } from "../../../hooks/useLoadStore"
import { forEachChild } from "typescript"
import io from "socket.io-client"
import { Shape } from "three"
import { Modal } from "../../../components/Modal.component"
import { ProductModal } from "../../../components/ProductModal.component"

const socket = io("http://localhost:4001")

export const Map3D = (): JSX.Element => {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const products = useLoadStore("http://localhost:4000/products")
  const [truckPosition, setTruckPosition] = useState<IPoint>({ x: 1, y: 1 })
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [choosenProduct, setChoosenProduct] = useState<Product | null>(null)

  const openProductModal = (product: Product) => {
    setChoosenProduct(product)
    setOpenModal(true)
  }

  useEffect(() => {
    socket.on('connect', () => {
      console.log(`Connected ${socket.id}`)
      setIsConnected(true)
    })

    socket.on('disconnect', () => {
      setIsConnected(false)
    })
    socket.on('truckPosition', (position: any) => {
      setTruckPosition(position)
    })
    return () => {
      socket.off('connect')
      socket.off('disconnect')
    }
  }, [])

  return (
    <div className="bg-slate-900 h-screen overflow-hidden">
      <Modal.Frame open={openModal} onClose={() => {
        setChoosenProduct(null)
        setOpenModal(prevOpenModal => !prevOpenModal)
      }}>
        <Modal.Body>
          {
            choosenProduct ?
              (
                <ProductModal product={choosenProduct} />
              ) : ''
          }
        </Modal.Body>
      </Modal.Frame>
      <Canvas camera={{ fov: 45, position: [-12.5, 0, -25] }}>
        <pointLight color={"#fff"} position={[0, 7, 0]} intensity={0.7} />
        <pointLight color={"#fff"} position={[0, 7, 25]} intensity={0.5} />
        <pointLight color={"#fff"} position={[-25, 7, 0]} intensity={0.5} />
        <pointLight color={"#fff"} position={[-25, 7, 25]} intensity={0.7} />
        <OrbitControls
          zoomSpeed={1}
          target={[-12.5, 0, 8]}
          minZoom={80}
          maxZoom={80}
          enablePan={true}
          maxDistance={40}
          dampingFactor={0.05}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 4}
          position={[-12.5, 0, 0]}
        />

        <Robot position={truckPosition} />
        <Grid />
        {
          products.data
            .map((product: Product, i) => {
              return <ProductBox product={product} handleClick={() => openProductModal(product)} key={product.id} />
            })
        }
      </Canvas>
      {products.loading &&
        <div className="left-0 top-0 z-10 bg-black bg-opacity-80 fixed w-full h-full">
          <div className="relative top-1/2 scale-150">
            <ActivityIndicator />
          </div>
        </div>
      }
      {products.error && <h1>Error</h1>}
    </div>
  )
}
const ProductBox = (props: { product: Product, handleClick: Function }) => {
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  const product: Product = props.product

  return (
    <group key={"Product " + product.id} position={[-1 * (product.localization.x - 0.5), -0.5, product.localization.y - 0.5]}>
      <Text
        // scale={[0.5, 0.5, 0.5]}
        fontSize={0.3}
        rotation={[Math.PI / 2, Math.PI, 0]}
        position={[0, 0.52, 0]}
        color="black" // default
        anchorX="center" // default
        anchorY="middle" // default
        children={product.id}
        getObjectsByProperty={undefined}
        getVertexPosition={undefined} />

      <RoundedBox

        radius={0.1}
        onPointerOver={e => {
          e.stopPropagation()
          setHovered(true)
        }}
        onPointerLeave={e => {
          e.stopPropagation()
          setHovered(false)
        }}
        onPointerDown={e => {
          e.stopPropagation()
          props.handleClick()
          setClicked(true)
        }}

        getObjectsByProperty={undefined} getVertexPosition={undefined}    >

        <meshPhongMaterial color={hovered ? "#e69a3d" : "#eab676"} />
      </RoundedBox>
    </group>

  )


}
const Robot = (props: { position: IPoint }) => {
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const arrowShape = new Shape()
  arrowShape.lineTo(0.5, -0.5)
  arrowShape.lineTo(0, 0.5)
  arrowShape.lineTo(-0.5, -0.5)

  return (
    <Cone
      position={[-1 * (props.position.x - 0.5), 0, props.position.y - 0.5]}
      onPointerOver={f => setHovered(true)}
      onPointerLeave={f => setHovered(false)}
      onPointerDown={f => setClicked(true)}
      args={[0.5, 1, 2, 2]}
      rotation={[Math.PI / 2, Math.PI / 2, 0]} getObjectsByProperty={undefined} getVertexPosition={undefined}>
      <meshBasicMaterial color={hovered ? "#7dfcf6" : "#0ea5e9"} />
    </Cone>

  )
}
const Grid = ({ size = 25, lineWidth = 0.026, height = 0.5 }) => (
  // Renders a grid and crosses as instances

  <gridHelper args={[size, size, '#bbb', '#bbb']} position={[-12.5, -1, 12.5]} />

)