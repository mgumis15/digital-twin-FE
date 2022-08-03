import {  useState, useRef, useCallback } from "react"
import { ProductLi } from "../../components/ProductLi.component"
import { Search } from "../../components/Search.component"
import { ActivityIndicator } from "../../components/ActivityIndicator.component"
import { useItemsSearch } from "../../hooks/useItemsSearch"
export const Store =():JSX.Element=>{
    const ref = useRef(null);
    // const [products,setProducts]=useState<Array<Product>>([])
    const [searchInput,setSearchInput]=useState<string>("")
    const [pageNumber,setPageNumber]=useState<number>(1)

    const handleSearch=(e:string)=>{
        setSearchInput(e)
        setPageNumber(1)
    }
    const {
        loading,
        error,
        items,
        hasMore
    }=useItemsSearch(searchInput,pageNumber)
    
    const observer = useRef<HTMLDivElement>(null) as any

    const lastItemElementRef = useCallback((node:any)=>{
        if(loading)return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries=>{
            if(entries[0].isIntersecting &&hasMore){
                setPageNumber(prevPageNumber=>prevPageNumber+1)
            }
        })
        if(node)observer.current.observe(node)
        console.log("node:",node, hasMore)
    },[loading,hasMore])
    
       return(
        <div ref={ref}>
            <h1 className="space-y-2 p-2 text-center text-3xl">Products </h1>
            <Search searchInput={searchInput} handler={handleSearch}/>
            {
                items
                .map((product,i)=>{
                    if(i+1===items.length) return<ProductLi ref={lastItemElementRef} key={i} product={product}></ProductLi>
                    else return <ProductLi key={i} product={product}></ProductLi>
                })
            }
            {loading && <ActivityIndicator/>}
            {error && <h1>Error</h1>}
        </div>
    )
}