import React, { useState,forwardRef } from "react"
import { Product } from "../pages/store/Product.interface"
import { NamedLabel } from "./NamedLabel.component"
export const ProductLi =forwardRef((props:{product:Product},ref:React.Ref<HTMLDivElement>)=>{
    const product:Product=props.product
    // const [expanded,setExpanded]=useState(false)
    // const expand=()=>{
    //     setExpanded(!expanded)
    //     console.log(expanded)
    // }
    return(
        <div className={`flex justify-start align-middle text-center items-center space-x-4 h-16  border-2 p-4 rounded-md shadow-sm odd:bg-gray-50
        hover:shadow-sky-200 hover:border-sky-300
        `} ref={ref}>
            
            {/* <img src="dropIcon.svg" alt="dropIcon" className="w-8 -rotate-90" onClick={expand}/> */}
            <NamedLabel description="ID" text={product.id.toString() } styleClasses="text-lg font-bold"></NamedLabel>
            <NamedLabel description="Info" text={product.product_info }></NamedLabel>
            {/* <p>{product.product_info} </p> */}
            {
                // expanded?(<p></p>):(<></>)
            }

        </div>
    )
})