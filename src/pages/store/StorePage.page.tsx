import { useState, useRef, useCallback, useEffect } from "react"
import { ProductLi } from "../../components/ProductLi.component"
import { Search } from "../../components/Search.component"
import { ActivityIndicator } from "../../components/ActivityIndicator.component"
import { Modal } from "../../components/Modal.component"
import { Product } from "../../interfaces/Product.interface"
import { ProductModal } from "../../components/ProductModal.component"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { getPaginatedProducts, getTasks } from "../../func/databaseConnectors.axios"
import { Task } from "../../interfaces/Task.interface"
export const StorePage = (): JSX.Element => {
    const ref = useRef(null)
    const [searchInput, setSearchInput] = useState<string>("")
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [choosenProduct, setChoosenProduct] = useState<Product | null>(null)
    const [choosenProductTask, setChoosenProductTask] = useState<Task | null>(null)
    const observer = useRef<HTMLDivElement>(null) as any
    const {
        error,
        data: dataProducts,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage
    } = useInfiniteQuery({
        queryKey: ["products", "infinite", { query: searchInput }],
        queryFn: ({ pageParam = 1 }) => getPaginatedProducts(pageParam, searchInput),
        getNextPageParam: prevData => prevData?.nextPage
    })

    const {
        data: tasks
    } = useQuery({
        queryKey: ["tasks"],
        queryFn: () => getTasks()
    })

    useEffect(() => {
        if (choosenProduct) {
            const task = tasks?.tasks?.find(task => task.task.product_id === choosenProduct.id)
            if (task)
                setChoosenProductTask(task.task)
            else
                setChoosenProductTask(null)
        }
    }, [choosenProduct, tasks])

    const openProductModal = (product: Product) => {
        const task = tasks?.tasks?.find(task => task.task.product_id === product.id)
        if (task)
            setChoosenProductTask(task.task)
        else
            setChoosenProductTask(null)
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

    }, [hasNextPage, isFetchingNextPage, fetchNextPage])

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
                                <ProductModal product={choosenProduct} task={choosenProductTask} />
                            ) : ''
                    }
                </Modal.Body>
            </Modal.Frame>
            <div className="w-full lg:w-3/5 max-w-4xl ">
                <h1 className="space-y-2 p-2 text-center text-3xl">Products </h1>
                <Search searchInput={searchInput} handler={(e: string) => setSearchInput(e)} />
                {
                    dataProducts?.pages
                        .map((porductsPage, j, pages) => porductsPage.products.map((product, i, products) => {
                            const task = tasks?.tasks?.find(task => task.task.product_id === product.id)?.task

                            if (i + 1 === products.length && j + 1 === pages.length)

                                return <ProductLi ref={lastItemElementRef} key={i}
                                    product={product}
                                    handleClick={() => openProductModal(product)}
                                    task={task ? task : null}
                                />
                            else
                                return <ProductLi key={i} product={product}
                                    handleClick={() => openProductModal(product)}
                                    task={task ? task : null}
                                />
                        }))

                }
                {isFetchingNextPage && <ActivityIndicator />}
                {error ? <h1>Error</h1> : ""}

            </div>
        </div>
    )
}