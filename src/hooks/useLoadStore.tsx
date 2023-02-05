import { useEffect, useState } from "react";
export const useLoadStore = (from:string)=>{
    const [loading, setLoading]= useState(true)
    const [error, setError]= useState(true)
    const [products,setProducts]=useState<Array<any>>([])


    
    useEffect(()=>{
        setProducts([])
    },[])


    useEffect(()=>{
        setLoading(true)
        setError(false)
        setTimeout(()=>{
            fetch(from,{
                headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                }
            }).then(res=>{
                
                return res.json()
            }).then(data=>{
                console.log(data)
                setProducts(data.products)
                setLoading(false)
            })
        },1000)
    },[])

    return {loading,error,products}
}