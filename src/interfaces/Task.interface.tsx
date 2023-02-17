import { Coords } from "./Coords.interface"

export interface Task {
    id: number,
    product_id: number,
    type: "Destroy" | "Fetch" | "Check",
    localization: Coords
}