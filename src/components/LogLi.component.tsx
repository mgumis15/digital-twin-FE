import React, { forwardRef } from "react"
import { Log,LogType } from "../interfaces/Log.interface"
import { NamedLabel } from "./NamedLabel.component"
export const LogLi =forwardRef((props:{log:Log,handleClick:Function},ref:React.Ref<HTMLDivElement>)=>{
    const moveToMap = ()=>{
        console.log("Move to map");
      }
    const log:Log=props.log
    const handleClick:Function=props.handleClick
    return(
        <div className={` flex flex-row flex-wrap gap-y-4 sm:flex-nowrap sm:justify-around text-center sm:items-center space-x-4 h-fit sm:h-16  border-2 p-4 m-2  rounded-md shadow-sm odd:bg-gray-50 cursor-pointer
        hover:shadow-sky-200 hover:border-sky-300 transition-colors ${(log.type===LogType.SUCCESS)?"border-green-400 shadow-green-200":(log.type===LogType.WARNING)?"border-red-400 shadow-red-200":""}
        `} ref={ref} onClick={()=>{handleClick()}} >
            <NamedLabel description="ID" text={log.id.toString() } styleClasses="" widthClass="w-12"/>
            <div className="hidden sm:block w-0.5 h-full bg-gray-500"></div>
            <NamedLabel description="Product ID" text={log.product_id.toString() } widthClass="w-24" styleClasses="sm:mr-auto"/>
            <div className="hidden sm:block w-0.5 h-full bg-gray-500"></div>

            <NamedLabel description="Created at" text={log.created_at.toString() } styleClasses=" " widthClass="w-48"/>
            <div className="hidden sm:block w-0.5 h-full bg-gray-500"></div>
            <NamedLabel description="Position" shortened={false} text={"x:"+log.localization.x.toString()+" y:"+log.localization.y.toString() } styleClasses=" "  clickHandler={moveToMap} widthClass="w-24"/>
            <div className="hidden sm:block w-0.5 h-full bg-gray-500"></div>
            <NamedLabel description="Type" text={LogType[log.type] } styleClasses=" font-bold" widthClass="w-28"/>

        </div>
    )
})