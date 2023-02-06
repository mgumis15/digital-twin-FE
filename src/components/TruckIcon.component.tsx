
import {ReactComponent as TruckSolid } from '../assets/images/truck-solid.svg'
import {ReactComponent as TrashSolid } from '../assets/images/trash-solid.svg'
import {ReactComponent as EyeSolid } from '../assets/images/eye-solid.svg'
import {ReactComponent as FetchSolid } from '../assets/images/circle-arrow-down-solid.svg'



export const TruckIcon=(props:{type:string,handler:Function})=>{
   
    const getEventType=()=>{
        switch(props.type){
            case "Destroy":
                return <TrashSolid className="absolute -top-2 -left-3.5 scale-75 fill-red-500 cursor-pointer shadow-xl transition-colors h-8" title="Destroy"/>
            case "Fetch":
                return <FetchSolid className="absolute -top-2 -left-3.5 scale-75 fill-fuchsia-500 cursor-pointer shadow-xl transition-colors h-8" title="Fetch"/>
            case "Check":
                return <EyeSolid className="absolute -top-2 -left-3.5 scale-75 fill-amber-500 cursor-pointer shadow-xl transition-colors h-8" title="Check"/>
            default:
                break;
        }
    }
    return (   
     <div className='relative opacity-90 hover:opacity-100 hover:scale-110 transition-transform' title={props.type} onClick={(e)=>{e.stopPropagation(); props.handler()}}>
        <TruckSolid className=" fill-sky-400 cursor-pointer shadow-xltransition-colors h-8"/>
        {
            getEventType()
        }
        
     </div>
 )
 }