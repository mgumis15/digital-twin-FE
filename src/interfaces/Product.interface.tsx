import { Coords } from "./Coords.interface"

export interface Product {
    id: number,
    product_info: string,
    qr_code: string,
    localization: Coords,
    created_at: string,
    updated_at: string,
    interfaceType: "Product"
}