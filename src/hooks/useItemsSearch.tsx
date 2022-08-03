import { useEffect, useState } from "react";
import { Product } from "../pages/store/Product.interface";
export const useItemsSearch = (query:string, pageNumber:number)=>{
    const [loading, setLoading]= useState(true)
    const [error, setError]= useState(true)
    const [items,setItems]=useState<Array<any>>([])
    const [hasMore,setHasMore]=useState<boolean>(true)


    
    useEffect(()=>{
        setItems([])
    },[query])


    useEffect(()=>{
        setLoading(true)
        setError(false)
        setTimeout(()=>{
            fetch("fakeData.json",{
                headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                }
            }).then(res=>{
                return res.json()
            }).then(data=>{
                setItems(prevItems=>{
                    
                    data=data.filter((item:any)=>{
                        return item.id.toString().startsWith(query) || item.product_info.includes(query)

                    })
                    if(items.length>=data.length) setHasMore(false)
                    else setHasMore(true)

                    
                   return [...prevItems,...data.slice(prevItems.length,prevItems.length+10)]
                })
                console.log(items.length,data.length)
                
                setLoading(false)
            })
        },1000)
    },[query,pageNumber])

    return {loading,error,items,hasMore}
}