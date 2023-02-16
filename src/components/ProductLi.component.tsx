import React, { forwardRef, useState } from "react"
import { Product } from "../interfaces/Product.interface"
import { Task } from "../interfaces/Task.interface"
import { NamedLabel } from "./NamedLabel.component"
import { TruckIcon } from "./TruckIcon.component"
export const ProductLi = forwardRef((props: { product: Product, handleClick: Function }, ref: React.Ref<HTMLDivElement>) => {
    const product: Product = props.product
    const handleClick: Function = props.handleClick
    const [task, setTask] = useState<Task | null>(null)
    const createTask = (type: "Destroy" | "Fetch" | "Check") => {
        setTask({
            id: null,
            product_id: props.product.id,
            type: type,
            localization: props.product.localization
        })
    }
    return (
        <div className={`flex flex-col space-y-5 sm:space-y-0 sm:flex-row sm:justify-start sm:align-middle sm:text-center sm:items-center sm:space-x-4 sm:h-16  border-2 p-4 m-2 rounded-md shadow-sm odd:bg-gray-50
        hover:shadow-sky-200 hover:border-sky-300 transition-colors cursor-pointer 
        `} ref={ref} onClick={() => { handleClick() }}>

            <NamedLabel description="ID" text={product.id.toString()} styleClasses=" font-bold" widthClass="w-18" />
            <NamedLabel description="Info" text={product.product_info} widthClass="sm:w-96 " />
            <div className=' w-full text-red-600 font-bold flex justify-around'>
                <TruckIcon type="Destroy" setTask={() => { createTask("Destroy") }} task={task} />
                <TruckIcon type="Fetch" setTask={() => { createTask("Fetch") }} task={task} />
                <TruckIcon type="Check" setTask={() => { createTask("Check") }} task={task} />
            </div>
        </div>
    )
})