import { Coords } from "./Coords.interface"
export interface Log {
    id: number,
    product_id: number,
    type: LogType,
    localization: Coords,
    created_at: string,
    interfaceType: "Log"

}
export enum LogType {
    SUCCESS,
    WARNING
}