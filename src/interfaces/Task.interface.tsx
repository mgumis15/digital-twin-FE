import { Coords } from "./Coords.interface"

export interface Task {
    id: number | null,
    product_id: number,
    type: "Destroy" | "Fetch" | "Check",
    localization: Coords
}