import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { usePortal } from "../hooks/usePortal.hook";
import {ReactComponent as XSolid } from '../assets/images/circle-xmark-solid.svg'

const Frame =(props:{children?:React.ReactNode;open:boolean;onClose:()=>void})=>{
    const container = useRef<HTMLDivElement>(null);
    const onOverlayClick = (e:React.MouseEvent)=>{
        if(!container.current?.contains(e.target as Node)) props.onClose()
    }
    const portal=usePortal();

    useEffect(() => {
        const onKeyPress = (e:KeyboardEvent)=>{
            if(e.key==="Escape" && props.open) props.onClose()
        }
        
        window.addEventListener("keydown",onKeyPress);
        return ()=>{
            window.removeEventListener("keydown",onKeyPress)
        }
    }, [props.onClose,props.open,props])

    useEffect(()=>{
        document.getElementById("root")?.setAttribute("aria-hidden",props.open.toString())
        portal.current?.setAttribute("aria-hidden",(!props.open).toString())
    },[props.open,portal])
    
    return ReactDOM.createPortal(
        <div className={`fixed inset-0 z-20  bg-gray-400 bg-opacity-50 ${props.open?`block`:`hidden`} `}  onClick={onOverlayClick}>

            <div className="fixed top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4  w-full  max-w-[90%] md:max-w-2xl " ref={container}>
            <XSolid className="absolute -right-3 -top-3 bg-white rounded-3xl fill-red-600 cursor-pointer shadow-xl hover:fill-red-300 transition-colors h-8" onClick={() => props.onClose()} title="Close"/>
                <div className="overflow-hidden bg-gray-700 rounded shadow-xl">
                    {props.children}
                </div>
            </div>
        </div>,
        portal.current
    )
}

const Body=(props:{children?:React.ReactNode})=>{
    return(<div className="p-4">{props.children}</div>);
}

export const Modal = {Frame,Body}