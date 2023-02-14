import { useState, useRef, useCallback } from "react"
import { ProductLi } from "../../components/ProductLi.component"
import { Search } from "../../components/Search.component"
import { ActivityIndicator } from "../../components/ActivityIndicator.component"
import { Modal } from "../../components/Modal.component"
import { Product } from "../../interfaces/Product.interface"
import { ProductModal } from "../../components/ProductModal.component"
import { useInfiniteQuery } from "@tanstack/react-query"
import { getPaginatedProducts } from "../../func/databaseConnectors.axios"
export const StorePage = (): JSX.Element => {
    const ref = useRef(null)
    const [searchInput, setSearchInput] = useState<string>("")
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [choosenProduct, setChoosenProduct] = useState<Product | null>(null)
    const observer = useRef<HTMLDivElement>(null) as any

    const {
        status,
        error,
        data,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage
    } = useInfiniteQuery({
        queryKey: ["products", "infinite", { query: searchInput }],
        queryFn: ({ pageParam = 1 }) => getPaginatedProducts(pageParam, searchInput),
        getNextPageParam: prevData => prevData?.nextPage
    })


    const openProductModal = (product: Product) => {
        setChoosenProduct(product)
        setOpenModal(true)
    }

    const lastItemElementRef = useCallback((node: any) => {
        if (isFetchingNextPage) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasNextPage) {
                fetchNextPage()
            }
        })
        if (node) observer.current.observe(node)

    }, [hasNextPage, isFetchingNextPage])

    return (
        <div ref={ref} className="w-full flex justify-center">
            <Modal.Frame open={openModal} onClose={() => {
                setChoosenProduct(null)
                setOpenModal(prevOpenModal => !prevOpenModal)
            }}>
                <Modal.Body>
                    {
                        choosenProduct ?
                            (
                                <ProductModal product={choosenProduct} />
                            ) : ''
                    }
                </Modal.Body>
            </Modal.Frame>
            <div className="w-full lg:w-3/5 max-w-4xl ">
                <h1 className="space-y-2 p-2 text-center text-3xl">Products </h1>
                <Search searchInput={searchInput} handler={(e: string) => setSearchInput(e)} />
                {
                    data?.pages
                        .map((porductsPage, j, pages) => porductsPage.products.map((product, i, products) => {
                            if (i + 1 === products.length && j + 1 === pages.length)
                                return <ProductLi ref={lastItemElementRef} key={i}
                                    product={product}
                                    handleClick={() => openProductModal(product)} />
                            else
                                return <ProductLi key={i} product={product}
                                    handleClick={() => openProductModal(product)} />
                        }))

                }
                {isFetchingNextPage && <ActivityIndicator />}
                {error ? <h1>Error</h1> : ""}

            </div>
        </div>
    )
}