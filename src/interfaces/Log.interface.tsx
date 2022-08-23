export interface Log{
    id: number,
    product_id: number,
    type: LogType,
    localization_x: number,
    localization_y: number,
    created_at: string,
    interfaceType:"Log"

}
export enum LogType{
    SUCCESS,
    WARNING
}