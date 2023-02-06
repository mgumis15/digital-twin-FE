import { useEffect, useState } from "react";
export const useLoadStore = (from:string)=>{
    const [loading, setLoading]= useState(true)
    const [error, setError]= useState(true)
    const [data,setData]=useState<Array<any>>([])


    
    useEffect(()=>{
        setData([])
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
            }).then(resData=>{
                console.log(resData)
                
                if(resData.products)
                    setData(resData.products)
                else
                    setData(resData)
                setLoading(false)
            })
        },1000)
    },[])

    return {loading,error,data}
}