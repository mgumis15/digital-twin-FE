import { useState, useRef, useCallback } from "react"
import { Search } from "../../components/Search.component"
import { ActivityIndicator } from "../../components/ActivityIndicator.component"
import { Modal } from "../../components/Modal.component"
import { Log } from "../../interfaces/Log.interface"
import { LogModal } from "../../components/LogModal.component"
import { LogLi } from "../../components/LogLi.component"
import { useInfiniteQuery } from "@tanstack/react-query"
import { getPaginatedLogs } from "../../func/databaseConnectors.axios"

export const LogsPage = (): JSX.Element => {
    const ref = useRef(null)
    const [searchInput, setSearchInput] = useState<string>("")
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [choosenLog, setChoosenLog] = useState<Log | null>(null)
    const observer = useRef<HTMLDivElement>(null) as any

    const handleSearch = (e: string) => {
        setSearchInput(e)
    }

    const {
        error,
        data,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage
    } = useInfiniteQuery({
        queryKey: ["logs", "infinite", { query: searchInput }],
        queryFn: ({ pageParam = 1 }) => getPaginatedLogs(pageParam, searchInput),
        getNextPageParam: prevData => prevData?.nextPage
    })

    const openLogModal = (log: Log) => {
        setChoosenLog(log)
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
    }, [fetchNextPage, hasNextPage, isFetchingNextPage])

    return (
        <div ref={ref} className="w-full flex justify-center ">
            <Modal.Frame open={openModal} onClose={() => {
                setChoosenLog(null)
                setOpenModal(prevOpenModal => !prevOpenModal)
            }}>
                <Modal.Body>
                    {
                        choosenLog ?
                            (
                                <LogModal log={choosenLog} />
                            ) : ''
                    }
                </Modal.Body>
            </Modal.Frame>
            <div className="w-full lg:w-3/5 max-w-4xl">
                <h1 className="space-y-2 p-2 text-center text-3xl">Logs </h1>
                <Search searchInput={searchInput} handler={handleSearch} />
                {
                    data?.pages
                        .map((logsPages, j, pages) => logsPages.data.map((log, i, logs) => {
                            if (i + 1 === logs.length && j + 1 === pages.length)
                                return <LogLi ref={lastItemElementRef} key={i}
                                    log={log}
                                    handleClick={() => openLogModal(log)} />
                            else
                                return <LogLi key={i} log={log}
                                    handleClick={() => openLogModal(log)} />
                        }))

                }
                {isFetchingNextPage && <ActivityIndicator />}
                {error ? <h1>Error</h1> : ""}
            </div>
        </div>
    )
}