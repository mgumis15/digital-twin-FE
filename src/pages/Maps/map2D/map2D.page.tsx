import React, { useEffect, useRef, useState } from "react"
import robot from "../../../assets/images/robot.png"
import packageImg from "../../../assets/images/package.png"
import { ActivityIndicator } from "../../../components/ActivityIndicator.component"
import { Point } from "../../../interfaces/Point.interface"
import { Package, Shelf, Size } from "../../../interfaces/Map.interfaces"

const robotSize = 40
const robotImage = new Image()
robotImage.src = robot
const packageImage = new Image()
packageImage.src = packageImg

export const Map2D = (): JSX.Element => {
    const [isFetched, setIsFetched] = useState<Boolean>(false)
    const [isError, setIsError] = useState<Boolean>(false)
    const [size, setSize] = useState<Size>({ w: 0, h: 0 })
    const [choosen, setChoosen] = useState<Package | null>(null)
    const [overPackage, setOverPackage] = useState<Boolean>(false)
    const [shelfs, setShelfs] = useState<Shelf[]>([])
    const [packages, setPackages] = useState<Package[]>([])

    function packageIntersection(packages: Package[], point: Point): Package | null {
        for (let pack of packages) {
            if (Math.abs(point.x - pack.position.x) <= 20 && Math.abs(point.y - pack.position.y) <= 20)
                return pack
        }
        return null
    }

    function drawPoint(ctx: CanvasRenderingContext2D, point: Point, color: string) {
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI)
        ctx.fill()
        ctx.closePath()
    }

    function drawPath(ctx: CanvasRenderingContext2D, path: Point[]) {
        ctx.strokeStyle = "#000000"
        ctx.beginPath()
        ctx.moveTo(path[0].x, path[0].y)
        for (let i = 1; i < path.length; i++)
            ctx.lineTo(path[i].x, path[i].y)
        ctx.stroke()
        ctx.closePath()

        drawPoint(ctx, path[0], "#03fc98")
        drawPoint(ctx, path[path.length - 1], "#fc0373")
    }

    function drawShelfs(ctx: CanvasRenderingContext2D, shelfs: Shelf[]) {
        ctx.fillStyle = "#964B00"
        for (let shelf of shelfs) {
            if (shelf.shape === "rectangular") {
                const { x, y } = shelf.startPoint
                ctx.beginPath()
                ctx.rect(x, y, shelf.width, shelf.height)
                ctx.closePath()
                ctx.fill()
            }
        }
    }

    function drawFrame(ctx: CanvasRenderingContext2D, shelf: Shelf) {
        ctx.strokeStyle = "#03fc35"
        const { x, y } = shelf.startPoint
        ctx.beginPath()
        ctx.rect(x, y, shelf.width, shelf.height)
        ctx.closePath()
        ctx.stroke()
    }

    function drawPackages(ctx: CanvasRenderingContext2D, packages: Package[]) {
        for (let pack of packages) {
            if (JSON.stringify(pack) === JSON.stringify(choosen)) {
                let shelf: Shelf = {
                    startPoint: { x: pack.position.x - robotSize / 2, y: pack.position.y - robotSize / 2 },
                    shape: "rectangular",
                    width: robotSize,
                    height: robotSize
                }
                drawFrame(ctx, shelf)
            }
            ctx.drawImage(packageImage, pack.position.x - robotSize / 2, pack.position.y - robotSize / 2, robotSize, robotSize)
        }
    }

    function drawRobot(ctx: CanvasRenderingContext2D, point: Point) {
        ctx.drawImage(robotImage, point.x - robotSize / 2, point.y - robotSize / 2, robotSize, robotSize)
    }

    function update(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, path: Point[], shelfs: Shelf[], packages: Package[], i: number) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        if (path.length > 1)
            drawPath(ctx, path)
        drawShelfs(ctx, shelfs)
        drawPackages(ctx, packages)
        drawRobot(ctx, path[i])
    }

    function canvasClick(e: React.MouseEvent<HTMLCanvasElement>) {
        const canvas = canvasRef.current
        if (canvas) {
            const mousePos: Point = {
                x: e.clientX - canvas.offsetLeft,
                y: e.clientY - canvas.offsetTop
            }
            setChoosen(packageIntersection(packages, mousePos))
        }
    }

    function canvasMove(e: React.MouseEvent<HTMLCanvasElement>) {
        const canvas = canvasRef.current
        if (canvas) {
            const mousePos: Point = {
                x: e.clientX - canvas.offsetLeft,
                y: e.clientY - canvas.offsetTop
            }
            if (packageIntersection(packages, mousePos))
                setOverPackage(true)
            else
                setOverPackage(false)
        }
    }

    let path: Point[] = []
    path.push({ x: 50, y: 100 })
    path.push({ x: 50, y: 200 })
    path.push({ x: 250, y: 200 })
    path.push({ x: 250, y: 300 })
    path.push({ x: 500, y: 300 })
    path.push({ x: 500, y: 400 })

    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    useEffect(() => {
        const canvas = canvasRef.current
        if (canvas) {
            const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d')
            if (ctx)
                update(canvas, ctx, path, shelfs, packages, Math.floor(Math.random() * path.length))
        }
    })

    useEffect(() => {
        loadUsers()
    }, [])

    const loadUsers = () => fetch("http://localhost:4000/store")
        .then(res => res.json())
        .then(
            (result) => {
                setTimeout(() => {
                    setIsFetched(true)
                    setSize(result.size)
                    setPackages(result.packages)
                    setShelfs(result.shelfs)
                    return result
                }, 500)
            },
            (error) => {
                console.log(error.message)
                setIsError(true)
            }
        )
        .catch((error) => {
            console.log(error.message)
            setIsError(true)
        })

    function pickUpPackage() {
        if (choosen) {
            alert(`Robot picking package: x = ${choosen.position.x} y = ${choosen.position.y}`)
            console.log("send request")
        }
    }

    return (
        <div className="flex justify-around flex-wrap mt-10 px-10 gap-10">
            {isFetched ?
                <>
                    <canvas className="border-2 border-solid border-black" style={{ cursor: overPackage ? "pointer" : "auto" }} width={size.w} height={size.h} ref={canvasRef} onMouseDown={canvasClick} onMouseMove={canvasMove}></canvas>
                    <div className="flex-1 justify-center items-center">
                        <>
                            {choosen === null ?
                                <div className="flex justify-center items-center">NO SELECTED PRODUCT</div>
                                :
                                <div className="flex flex-col">
                                    <div className="">x: {choosen.position.x}</div>
                                    <div className="">y: {choosen.position.y}</div>
                                    <button className="w-1/2 bg-gray-600" onClick={pickUpPackage}>TAKE</button>
                                </div>
                            }
                        </>
                    </div>
                </> : isError ? <div>Error occured</div> : <ActivityIndicator />}
        </div>
    )
}
