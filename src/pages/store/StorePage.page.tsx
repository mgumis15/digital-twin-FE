import { useState, useRef, useCallback } from "react"
import { ProductLi } from "../../components/ProductLi.component"
import { Search } from "../../components/Search.component"
import { ActivityIndicator } from "../../components/ActivityIndicator.component"
import { useItemsSearch } from "../../hooks/useItemsSearch.hook"
import { Modal } from "../../components/Modal.component"
import { Product } from "../../interfaces/Product.interface"
import { ProductModal } from "../../components/ProductModal.component"
export const StorePage = (): JSX.Element => {
    const ref = useRef(null)
    const [searchInput, setSearchInput] = useState<string>("")
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [choosenProduct, setChoosenProduct] = useState<Product | null>(null)
    const observer = useRef<HTMLDivElement>(null) as any

    const handleSearch = (e: string) => {
        setSearchInput(e)
        setPageNumber(1)
    }
    const {
        loading,
        error,
        items,
        hasMore
    } = useItemsSearch("http://localhost:4000/products?", searchInput, pageNumber)

    const openProductModal = (product: Product) => {
        setChoosenProduct(product)
        setOpenModal(true)
    }

    const lastItemElementRef = useCallback((node: any) => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPageNumber => prevPageNumber + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

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
                <Search searchInput={searchInput} handler={handleSearch} />
                {
                    items
                        .map((product, i) => {
                            if (i + 1 === items.length)
                                return <ProductLi ref={lastItemElementRef} key={i}
                                    product={product}
                                    handleClick={() => openProductModal(product)} />
                            else
                                return <ProductLi key={i} product={product}
                                    handleClick={() => openProductModal(product)} />
                        })
                }
                {loading && <ActivityIndicator />}
                {error && <h1>Error</h1>}
            </div>
        </div>
    )
}