import { useState, useRef, useCallback } from "react"
import { Search } from "../../components/Search.component"
import { ActivityIndicator } from "../../components/ActivityIndicator.component"
import { useItemsSearch } from "../../hooks/useItemsSearch.hook"
import { Modal } from "../../components/Modal.component"
import { Log } from "../../interfaces/Log.interface"
import { LogModal } from "../../components/LogModal.component"
import { LogLi } from "../../components/LogLi.component"

export const LogsPage = (): JSX.Element => {
    const ref = useRef(null)
    const [searchInput, setSearchInput] = useState<string>("")
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [choosenLog, setChoosenLog] = useState<Log | null>(null)
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
    } = useItemsSearch("http://localhost:4000/logs?", searchInput, pageNumber)

    const openLogModal = (log: Log) => {
        setChoosenLog(log)
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
                    items
                        .map((log, i) => {
                            if (i + 1 === items.length)
                                return <LogLi ref={lastItemElementRef} key={i}
                                    log={log}
                                    handleClick={() => openLogModal(log)} />
                            else
                                return <LogLi key={i} log={log}
                                    handleClick={() => openLogModal(log)} />
                        })
                }
                {loading && <ActivityIndicator />}
                {error && <h1>Error</h1>}
            </div>
        </div>
    )
}