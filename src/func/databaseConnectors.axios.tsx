import axios from "axios"
import { Log } from "../interfaces/Log.interface"
import { Product } from "../interfaces/Product.interface"
import { Task } from "../interfaces/Task.interface"

export async function getPaginatedProducts(page: number, query: string) {
    const res = await axios.get("http://localhost:4000/products", { params: { query: query, page: page } })
    console.log(res.data.data)
    return {
        nextPage: res.data.hasMore ? page + 1 : undefined,
        products: res.data.data as Product[]
    }
}

export async function getPaginatedLogs(page: number, query: string) {
    const res = await axios.get("http://localhost:4000/logs", { params: { query: query, page: page } })
    console.log(res.data.data)
    return {
        nextPage: res.data.hasMore ? page + 1 : undefined,
        data: res.data.data as Log[]
    }
}

export async function getProducts() {
    const res = await axios.get("http://localhost:4000/products")
    console.log("All products", res.data)
    return {
        products: res.data.products as Product[]
    }
}

export async function sendTask(task: Task) {
    const res = await axios.post("http://localhost:4000/taskAdd", { task })
    return {
        data: res.data
    }
}