import { Coords } from "./Coords.interface"
interface Package {
    position: Coords
}

interface Shelf {
    startCords: Coords,
    shape: String,
    width: number,
    height: number
}

interface Size {
    w: number,
    h: number
}

export type { Package, Shelf, Size }