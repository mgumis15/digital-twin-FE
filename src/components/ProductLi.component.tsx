import React, { forwardRef } from "react"
import { Product } from "../interfaces/Product.interface"
import { NamedLabel } from "./NamedLabel.component"
export const ProductLi =forwardRef((props:{product:Product,handleClick:Function},ref:React.Ref<HTMLDivElement>)=>{
    const product:Product=props.product
    const handleClick:Function=props.handleClick
    return(
        <div className={`flex justify-start align-middle text-center items-center space-x-4 h-16  border-2 p-4 m-2 rounded-md shadow-sm odd:bg-gray-50
        hover:shadow-sky-200 hover:border-sky-300 transition-colors cursor-pointer
        `} ref={ref} onClick={()=>{handleClick()}}>
            
            <NamedLabel description="ID" text={product.id.toString() } styleClasses=" font-bold" widthClass="w-18"/>
            <NamedLabel description="Info" text={product.product_info } widthClass="w-96"/>

        </div>
    )
})