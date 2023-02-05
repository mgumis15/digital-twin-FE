import { useEffect, useState } from "react";
export const useItemsSearch = (from:string,query:string, pageNumber:number)=>{
    const [loading, setLoading]= useState(true)
    const [error, setError]= useState(true)
    const [items,setItems]=useState<Array<any>>([])
    const [hasMore,setHasMore]=useState<boolean>(true)

    const controller = new AbortController()
    const signal=controller.signal
    
    useEffect(()=>{
        setItems([])
    },[query])

    const fetchData=()=>{
        fetch(from + new URLSearchParams({query:query,page:pageNumber.toString()}),{
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            method:'get',
            signal:signal
        }).then(res=>{
            return res.json()
        }).then(data=>{
            setItems(prevItems=>{
                setHasMore(data.hasMore)
                return [...prevItems,...data.data]
            })
            setLoading(false)
        })
    }
    useEffect(()=>{
        
        
        setLoading(true)
        setError(false)
        const fetchTimeout=setTimeout(fetchData,500);
        

        return ()=>clearTimeout(fetchTimeout)
            
    },[query,pageNumber])

    return {loading,error,items,hasMore}
}