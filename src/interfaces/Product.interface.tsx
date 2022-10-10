import { Point } from "./Point.interface"

export interface Product{
    id: number,
    product_info: string,
    qr_code: string,
    localization:Point,
    created_at: string,
    updated_at: string,
    interfaceType:"Product"
}