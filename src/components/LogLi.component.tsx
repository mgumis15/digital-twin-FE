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
        <div className={`flex flex-col sm:flex-row justify-around align-middle text-center items-center space-x-4 h-fit sm:h-16  border-2 p-4 m-2 rounded-md shadow-sm odd:bg-gray-50
        hover:shadow-sky-200 hover:border-sky-300 transition-colors ${(log.type===LogType.SUCCESS)?"border-green-400 shadow-green-200":(log.type===LogType.WARNING)?"border-red-400 shadow-red-200":""}
        `} ref={ref} onClick={()=>{handleClick()}}>
            <NamedLabel description="ID" text={log.id.toString() } styleClasses="text-lg font-bold"/>
            
            <NamedLabel description="Product ID" text={log.product_id.toString() }/>
            
            <NamedLabel description="Created at" text={log.created_at.toString() } styleClasses="text-lg font-bold"/>
            <NamedLabel description="Position" shortened={false} text={"x:"+log.localization_x.toString()+" y:"+log.localization_y.toString() } styleClasses="text-lg font-bold"  clickHandler={moveToMap}/>
            <NamedLabel description="Type" text={LogType[log.type] } styleClasses="text-lg font-bold" />

        </div>
    )
})