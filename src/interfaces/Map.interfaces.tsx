import { Point } from "../interfaces/Point.interface"
interface Package {
    position: Point
}

interface Shelf {
    startPoint: Point,
    shape: String,
    width: number,
    height: number
}

interface Size {
    w: number,
    h: number
}

export type { Package, Shelf, Size }