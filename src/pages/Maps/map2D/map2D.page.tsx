import React, { useEffect, useRef } from "react";
import robot from "../../../assets/images/robot.png"

interface Point {
    x: number,
    y: number
}

interface Shelf {
    upLeft: Point,
    upRight: Point,
    downLeft: Point,
    downRight: Point
}

const robotSize = 40
const image = new Image()
image.src = robot

function drawPoint (ctx: CanvasRenderingContext2D, point: Point, color: string) {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI)
    ctx.fill()
    ctx.closePath()
}

function drawPath (ctx: CanvasRenderingContext2D, path: Point[]) {
    ctx.fillStyle = "#ffffff"
    ctx.beginPath()
    ctx.moveTo(path[0].x, path[0].y)
    for(let i = 1; i < path.length; i++)
        ctx.lineTo(path[i].x, path[i].y)
    ctx.stroke()
    ctx.closePath()

    drawPoint(ctx, path[0], "#03fc98")
    drawPoint(ctx, path[path.length - 1], "#fc0373")
}

function drawShelfs (ctx: CanvasRenderingContext2D, shelfs: Shelf[]) {
    ctx.fillStyle = "#964B00"
    for(let shelf of shelfs) {
        ctx.beginPath()
        ctx.moveTo(shelf.upLeft.x, shelf.upLeft.y)
        ctx.lineTo(shelf.upRight.x, shelf.upRight.y)
        ctx.lineTo(shelf.downRight.x, shelf.downRight.y)
        ctx.lineTo(shelf.downLeft.x, shelf.downLeft.y)
        ctx.closePath()
        ctx.fill()
    }
}

function drawRobot (ctx: CanvasRenderingContext2D, point: Point) {
    ctx.drawImage(image, point.x - robotSize / 2, point.y - robotSize / 2, robotSize, robotSize)
}

function update (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, path: Point[], shelfs: Shelf[], i: number) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if(path.length > 1)
        drawPath(ctx, path)
    drawShelfs(ctx, shelfs)
    drawRobot(ctx, path[i])
    if(i < path.length - 1) {
        setTimeout(() => {
            update(canvas, ctx, path, shelfs, i + 1)
        }, 1000)
    }
}

export const Map2D = (): JSX.Element => {
    const h = 500
    const w = 1000
    let path: Point[] = []
    path.push({ x: 50, y: 100 })
    path.push({ x: 50, y: 200 })
    path.push({ x: 250, y: 200 })
    path.push({ x: 250, y: 300 })
    path.push({ x: 500, y: 300 })
    path.push({ x: 500, y: 400 })
    let shelfs: Shelf[] = []
    shelfs.push({
        upLeft: { x: 100, y: 50 },
        upRight: { x: 150, y: 50 },
        downLeft: { x: 100, y: 150 },
        downRight: { x: 150, y: 150 },
    })
    shelfs.push({
        upLeft: { x: 100, y: 250 },
        upRight: { x: 150, y: 250 },
        downLeft: { x: 100, y: 450 },
        downRight: { x: 150, y: 450 },
    })
    shelfs.push({
        upLeft: { x: 400, y: 50 },
        upRight: { x: 450, y: 50 },
        downLeft: { x: 400, y: 250 },
        downRight: { x: 450, y: 250 },
    })
    shelfs.push({
        upLeft: { x: 400, y: 350 },
        upRight: { x: 450, y: 350 },
        downLeft: { x: 400, y: 450 },
        downRight: { x: 450, y: 450 },
    })
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    useEffect(() => {
        const canvas = canvasRef.current
        if(canvas) {
            const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d')
            if(ctx) {
                update(canvas, ctx, path, shelfs, 0)
            }
        }
    })
    return (
        <div className="flex justify-center mt-10">
            <canvas className="border-2 border-solid border-black" width={ w } height={ h } ref={ canvasRef }></canvas>
        </div>
    )
}