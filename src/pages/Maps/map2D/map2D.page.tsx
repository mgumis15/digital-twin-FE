import React, { useEffect, useState } from "react"
import { Canvas } from '@react-three/fiber'
import { Text, OrbitControls, Cone, RoundedBox, Line, Plane } from "@react-three/drei"
import { ActivityIndicator } from "../../../components/ActivityIndicator.component"
import { Coords } from "../../../interfaces/Coords.interface"
import { Product } from "../../../interfaces/Product.interface"
import { useLoadStore } from "../../../hooks/useLoadStore"
import io from "socket.io-client"
import { Modal } from "../../../components/Modal.component"
import { ProductModal } from "../../../components/ProductModal.component"
import { useQuery } from "@tanstack/react-query"
import { getProducts, getTasks } from "../../../func/databaseConnectors.axios"
import { Task } from "../../../interfaces/Task.interface"

const socket = io("http://localhost:4001")

export const Map2D = (): JSX.Element => {
  const [truckPosition, setTruckPosition] = useState<Coords>({ x: 1, y: 1 })
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [choosenProduct, setChoosenProduct] = useState<Product | null>(null)
  const [choosenProductTask, setChoosenProductTask] = useState<Task | null>(null)

  const [currentPath, setcurrentPath] = useState<Coords[]>([])

  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: getProducts
  })

  const {
    data: tasks
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks()
  })

  const openProductModal = (product: Product) => {
    let task = tasks?.tasks?.find(task => task.task.product_id === product.id)
    if (task)
      setChoosenProductTask(task.task)
    else
      setChoosenProductTask(null)
    setChoosenProduct(product)
    setOpenModal(true)
  }

  useEffect(() => {
    if (choosenProduct) {
      let task = tasks?.tasks?.find(task => task.task.product_id === choosenProduct.id)
      if (task)
        setChoosenProductTask(task.task)
      else
        setChoosenProductTask(null)
    }
  }, [choosenProduct, tasks])

  useEffect(() => {
    socket.on('connect', () => {
      console.log(`Connected ${socket.id}`)
    })

    socket.on('disconnect', () => {
    })
    socket.on('truckPosition', (position: any) => {
      setTruckPosition(position)
    })
    socket.on('currentPath', (path: any) => {
      setTruckPosition(path)
    })
    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('truckPosition')
      socket.off('currentPath')
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
                <ProductModal product={choosenProduct} task={choosenProductTask} />
              ) : ''
          }
        </Modal.Body>
      </Modal.Frame>
      <Canvas camera={{ fov: 45, position: [-12.5, 15, -12.5] }}>
        <pointLight color={"#fff"} position={[0, 7, 0]} intensity={0.7} />
        <pointLight color={"#fff"} position={[0, 7, 25]} intensity={0.5} />
        <pointLight color={"#fff"} position={[-25, 7, 0]} intensity={0.5} />
        <pointLight color={"#fff"} position={[-25, 7, 25]} intensity={0.7} />
        <OrbitControls
          zoomSpeed={1}
          target={[-12.5, 15, 12.5]}
          minZoom={80}
          maxZoom={80}
          enablePan={true}
          maxDistance={50}
          dampingFactor={0.05}
          minPolarAngle={0}
          maxPolarAngle={0}
          position={[-12.5, 15, 12.5]}
        />
        <Path path={currentPath} />
        <Robot position={truckPosition} />
        <Grid />
        {
          productsQuery.data?.products
            .map((product: Product, i) => {
              return <ProductBox product={product} handleClick={() => openProductModal(product)} key={product.id} />
            })
        }
      </Canvas>
      {productsQuery.isLoading &&
        <div className="left-0 top-0 z-10 bg-black bg-opacity-80 fixed w-full h-full">
          <div className="relative top-1/2 scale-150">
            <ActivityIndicator />
          </div>
        </div>
      }
      {productsQuery.isError && <h1>Error</h1>}
    </div>
  )
}
const ProductBox = (props: { product: Product, handleClick: Function }) => {
  const [hovered, setHovered] = useState(false)

  const product: Product = props.product

  return (
    <group key={"Product " + product.id} position={[-1 * (product.localization.x - 0.5), -1, product.localization.y - 0.5]}>
      <Text
        fontSize={0.3}
        rotation={[Math.PI / 2, Math.PI, 0]}
        position={[0, 0.02, 0]}
        color="black"
        anchorX="center"
        anchorY="middle"
        children={product.id}
        getObjectsByProperty={undefined}
        getVertexPosition={undefined} />

      <Plane
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.95, 1, 0.95]}

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
        }}

        getObjectsByProperty={undefined} getVertexPosition={undefined}    >

        <meshPhongMaterial color={hovered ? "#e69a3d" : "#eab676"} />
      </Plane>
    </group>

  )
}
const Path = (props: { path: Coords[] }) => {
  const coords = props.path.map((coords) => [coords.x, 1, coords.y])
  return (
    <Line
      points={[[-0.5, -1, 1 - 0.5], [-0.5, -1, 12 - 0.5], [-1 * (0.5 + 10), -1, 12 - 0.5]]}
      color="red"
      lineWidth={3}
      dashed={false}
      getObjectsByProperty={undefined}
      forceSinglePass={undefined}
      getVertexPosition={undefined}

    />
  )

}
const Robot = (props: { position: Coords }) => {
  const [hovered, setHovered] = useState(false)
  return (
    <Cone
      position={[-1 * (props.position.x - 0.5), -0.95, props.position.y - 0.5]}
      onPointerOver={e => setHovered(true)}
      onPointerLeave={e => setHovered(false)}
      args={[0.5, 1, 2, 2]}
      rotation={[Math.PI / 2, Math.PI / 2, 0]} getObjectsByProperty={undefined} getVertexPosition={undefined}>
      <meshBasicMaterial color={hovered ? "#7dfcf6" : "#0ea5e9"} />
    </Cone>

  )
}
const Grid = ({ size = 25 }) => (
  <gridHelper args={[size, size, '#bbb', '#bbb']} position={[-12.5, -1, 12.5]} />

)