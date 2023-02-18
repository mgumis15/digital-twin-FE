import React, { forwardRef } from "react"
import { Product } from "../interfaces/Product.interface"
import { Task } from "../interfaces/Task.interface"
import { NamedLabel } from "./NamedLabel.component"
import { TruckIcon } from "./TruckIcon.component"
export const ProductLi = forwardRef((props: { product: Product, handleClick: Function, task: Task | null }, ref: React.Ref<HTMLDivElement>) => {
    const product: Product = props.product
    const task: Task | null = props.task
    const handleClick: Function = props.handleClick



    return (
        <div className={`flex flex-col space-y-5 sm:space-y-0 sm:flex-row sm:justify-start sm:align-middle sm:text-center sm:items-center sm:space-x-4 sm:h-16  border-2 p-4 m-2 rounded-md shadow-sm odd:bg-gray-50
        hover:shadow-sky-200 hover:border-sky-300 transition-colors cursor-pointer 
        `} ref={ref} onClick={() => { handleClick() }}>

            <NamedLabel description="ID" text={product.id.toString()} styleClasses=" font-bold" widthClass="w-18" />
            <NamedLabel description="Info" text={product.product_info} widthClass="sm:w-96 " />
            <div className=' w-full text-red-600 font-bold flex justify-around'>
                <TruckIcon type="Destroy" product={product} task={task} />
                <TruckIcon type="Fetch" product={product} task={task} />
                <TruckIcon type="Check" product={product} task={task} />
            </div>
        </div>
    )
})