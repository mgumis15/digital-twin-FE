import React, { useEffect, useState } from "react"
import { Canvas } from '@react-three/fiber'
import { Text, OrbitControls, Cone, RoundedBox, Line } from "@react-three/drei"
import { ActivityIndicator } from "../../../components/ActivityIndicator.component"
import { Coords } from "../../../interfaces/Coords.interface"
import { Product } from "../../../interfaces/Product.interface"
import io from "socket.io-client"
import { Modal } from "../../../components/Modal.component"
import { ProductModal } from "../../../components/ProductModal.component"
import { getProducts, getTasks } from "../../../func/databaseConnectors.axios"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Task } from "../../../interfaces/Task.interface"
import { domain } from "../../../env/domain"

const socket = io(domain)

export const Map3D = (): JSX.Element => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [choosenProduct, setChoosenProduct] = useState<Product | null>(null)
  const [choosenProductTask, setChoosenProductTask] = useState<Task | null>(null)
  const [truckPosition, setTruckPosition] = useState<Coords>({ x: 1, y: 1 })
  const [truckRotation, setTruckRotation] = useState<[number, number, number]>([Math.PI / 2, Math.PI / 2, 0])
  const [currentPath, setCurrentPath] = useState<Coords[]>([{ x: 1, y: 1 }])
  const queryClient = useQueryClient()

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
    const task = tasks?.tasks?.find(task => task.task.product_id === product.id)
    if (task)
      setChoosenProductTask(task.task)
    else
      setChoosenProductTask(null)
    setChoosenProduct(product)
    setOpenModal(true)
  }
  useEffect(() => {
    if (choosenProduct) {
      const task = tasks?.tasks?.find(task => task.task.product_id === choosenProduct.id)
      if (task)
        setChoosenProductTask(task.task)
      else
        setChoosenProductTask(null)
    }
  }, [choosenProduct, tasks])

  useEffect(() => {
    socket.on('connect', () => {
      console.log("Connected to socket server")
    })
    socket.on('disconnect', () => {
      console.log("Disconnected from socket server")

    })
    socket.on('truckPosition', (pos: any) => {
      const position = pos as Coords

      setTruckPosition(prevPos => {
        if (prevPos.x !== position.x) {
          setTruckRotation([0, 0, Math.PI / 2 * (position.x - prevPos.x)])
        }
        if (prevPos.y !== position.y) {
          setTruckRotation([Math.PI / 2 * (position.y - prevPos.y), Math.PI / 2, 0])
        }
        return position
      })
    })
    socket.on('currentPath', (path: any) => {
      const pathCoords = path as Coords[]
      if (pathCoords.length === 0) {
        queryClient.invalidateQueries(["tasks"], { exact: true })
        setCurrentPath([{ x: 1, y: 1 }])
      } else
        setCurrentPath(pathCoords)
    })
    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('truckPosition')
      socket.off('currentPath')
    }
  }, [queryClient])

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
        <Path path={currentPath} />

        <Robot position={truckPosition} rotation={truckRotation} />
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
    <group key={"Product " + product.id} position={[-1 * (product.localization.x - 0.5), -0.5, product.localization.y - 0.5]}>
      <Text
        fontSize={0.3}
        rotation={[Math.PI / 2, Math.PI, 0]}
        position={[0, 0.52, 0]}
        color="black"
        anchorX="center"
        anchorY="middle"
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
          if (e.button === 0)
            props.handleClick()
        }}

        getObjectsByProperty={undefined} getVertexPosition={undefined}    >

        <meshPhongMaterial color={hovered ? "#e69a3d" : "#eab676"} />
      </RoundedBox>
    </group>

  )
}
const Path = (props: { path: Coords[] }) => {
  const coords = props.path.map((coords) => [-1 * (coords.x - 0.5), -0.3, (coords.y - 0.5)])
  return (
    <Line
      points={coords.flatMap(d => d)}
      color="red"
      lineWidth={3}
      dashed={false}
      getObjectsByProperty={undefined}
      forceSinglePass={undefined}
      getVertexPosition={undefined}

    />
  )

}
const Robot = (props: { position: Coords, rotation: [number, number, number] }) => {
  const [hovered, setHovered] = useState(false)
  return (
    <Cone
      position={[-1 * (props.position.x - 0.5), -0.2, props.position.y - 0.5]}
      onPointerOver={e => setHovered(true)}
      onPointerLeave={e => setHovered(false)}
      args={[0.5, 1, 2, 2]}
      rotation={props.rotation} getObjectsByProperty={undefined} getVertexPosition={undefined}>
      <meshBasicMaterial color={hovered ? "#7dfcf6" : "#0ea5e9"} />
    </Cone>

  )
}
const Grid = ({ size = 25 }) => (
  <gridHelper args={[size, size, '#bbb', '#bbb']} position={[-12.5, -1, 12.5]} />

)