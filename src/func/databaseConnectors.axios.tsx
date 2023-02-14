import axios from "axios"
import { Log } from "../interfaces/Log.interface"
import { Product } from "../interfaces/Product.interface"

export function getPaginatedProducts(page: number, query: string) {
    return axios.get("http://localhost:4000/products", { params: { query: query, page: page } }).then(
        res => {
            console.log(res.data.data)
            return {
                nextPage: res.data.hasMore ? page + 1 : undefined,
                products: res.data.data as Product[]
            }
        }
    )
}

export function getPaginatedLogs(page: number, query: string) {
    return axios.get("http://localhost:4000/logs", { params: { query: query, page: page } }).then(
        res => {
            console.log(res.data.data)
            return {
                nextPage: res.data.hasMore ? page + 1 : undefined,
                data: res.data.data as Log[]
            }
        }
    )
}