
import { ReactComponent as TruckSolid } from '../assets/images/truck-solid.svg'
import { ReactComponent as TrashSolid } from '../assets/images/trash-solid.svg'
import { ReactComponent as EyeSolid } from '../assets/images/eye-solid.svg'
import { ReactComponent as FetchSolid } from '../assets/images/circle-arrow-down-solid.svg'
import { Task } from '../interfaces/Task.interface'
import { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { removeTask, sendTask } from '../func/databaseConnectors.axios'
import { Product } from '../interfaces/Product.interface'



export const TruckIcon = (props: { type: "Destroy" | "Fetch" | "Check", product: Product, task: Task | null }) => {
    const [active, setActive] = useState<boolean>(true)
    const [cancellable, setCancellable] = useState<boolean>(false)
    const queryClient = useQueryClient()

    const { status: addStatus, error: addError, mutate: addTaskMutate } = useMutation({
        mutationFn: sendTask,
        onSuccess: newTask => {
            queryClient.invalidateQueries(["tasks"], { exact: true })
        },
        onError: err => {
            console.log(err)
        }

    })

    const { status: removeStatus, error: removeError, mutate: removeTaskMutate } = useMutation({
        mutationFn: removeTask,
        onSuccess: newTask => {
            queryClient.invalidateQueries(["tasks"], { exact: true })
        },
        onError: err => {
            console.log(err)
        }

    })

    const createTask = () => {
        addTaskMutate({
            id: new Date().getTime(),
            product_id: props.product.id,
            type: props.type,
            localization: props.product.localization
        })
    }


    useEffect(() => {
        if (props.task) {
            if (props.task.type === props.type) {
                setActive(true)
                setCancellable(true)
            } else {
                setActive(false)
                setCancellable(false)
            }

        } else {
            setActive(true)
            setCancellable(false)
        }
    }, [props])

    const getEventType = () => {
        switch (props.type) {
            case "Destroy":
                return <TrashSolid className="absolute -top-2 -left-3.5 scale-75 fill-red-500 cursor-pointer shadow-xl transition-colors h-8 rounded-full" title="Destroy" />
            case "Fetch":
                return <FetchSolid className="absolute -top-2 -left-3.5 scale-75 fill-fuchsia-500 cursor-pointer shadow-xl transition-colors h-8" title="Fetch" />
            case "Check":
                return <EyeSolid className="absolute -top-2 -left-3.5 scale-75 fill-amber-500 cursor-pointer shadow-xl transition-colors h-8" title="Check" />
            default:
                break
        }
    }


    return (
        <button className={`relative opacity-90 hover:opacity-100 hover:scale-110 transition-transform rounded-sm 
        ${active ? "" : "opacity-30"}`}
            title={props.type}
            onClick={(e) => {
                e.stopPropagation()
                if (cancellable) {
                    if (props.task)
                        removeTaskMutate(props.task.id)
                }
                else
                    createTask()

            }}
            disabled={active ? false : true}>
            <TruckSolid className=" fill-sky-400 cursor-pointer shadow-xltransition-colors h-8" />
            {
                getEventType()
            }

        </button>
    )
}