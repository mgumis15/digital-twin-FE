/* eslint-disable */
import {ReactComponent as AnimatedIndicator } from '../assets/images/ActivityIndicator.svg'
export const ActivityIndicator =()=>{
    return(
        <div className=" w-full h-16 max-h-full flex items-center justify-center">
            <AnimatedIndicator className='h-12 w-12 animate-spin -z-10'/>
        </div>
    )

}