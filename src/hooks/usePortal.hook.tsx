import  { useEffect, useRef } from 'react'

export const usePortal = () => {
    const portal = useRef(document.createElement("div"))

    useEffect(()=>{
        const current = portal.current
        document.body.appendChild(portal.current)
        return ()=>void document.body.removeChild(current)
    },[])
  return portal;
}
