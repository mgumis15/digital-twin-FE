import { Point } from "./Point.interface"
export interface Log{
    id: number,
    product_id: number,
    type: LogType,
    localization:Point,
    created_at: string,
    interfaceType:"Log"

}
export enum LogType{
    SUCCESS,
    WARNING
}