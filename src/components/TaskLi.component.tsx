import { Task } from "../interfaces/Task.interface"
import { ReactComponent as TrashSolid } from '../assets/images/trash-solid.svg'
import { ReactComponent as EyeSolid } from '../assets/images/eye-solid.svg'
import { ReactComponent as FetchSolid } from '../assets/images/circle-arrow-down-solid.svg'
import { ReactComponent as RemoveSolid } from '../assets/images/ban-solid.svg'
import { NamedLabel } from "./NamedLabel.component"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { removeTask } from "../func/databaseConnectors.axios"
export const TaskLi = (props: { task: Task }) => {
    const queryClient = useQueryClient()

    const { status: removeStatus, mutate: removeTaskMutate } = useMutation({
        mutationFn: removeTask,
        onSuccess: newTask => {
            queryClient.invalidateQueries(["tasks"], { exact: true })
        },
        onError: err => {
            console.log(err)
        }

    })



    const getEventType = () => {
        switch (props.task.type) {
            case "Destroy":
                return <TrashSolid className=" scale-75 bg-opacity-0  fill-red-500 transition-colors h-8 rounded-full" title="Destroy" />
            case "Fetch":
                return <FetchSolid className=" scale-75 bg-opacity-0  fill-fuchsia-500 transition-colors h-8" title="Fetch" />
            case "Check":
                return <EyeSolid className=" scale-75 bg-opacity-0  fill-amber-500  transition-colors h-8" title="Check" />
            default:
                break
        }
    }
    return (
        <div className="flex flex-row w-full border-b-2 border-gray-200 align-middle text-center items-center justify-around first:bg-cyan-100">
            <div >
                <NamedLabel description="ID" text={props.task.product_id.toString()} styleClasses="w-full" widthClass="w-12" />
            </div>

            <div >{getEventType()}</div>
            <button onClick={() => {
                if (window.confirm('Are you sure you wish to delete this task?')) {
                    removeTaskMutate(props.task.id
                    )
                }
            }}
                disabled={removeStatus === "loading" ? true : false}
            >
                <RemoveSolid className="bg-opacity-0 scale-75 fill-red-700 transition-colors h-8" title="Check" />
            </button>
        </div>
    )
}