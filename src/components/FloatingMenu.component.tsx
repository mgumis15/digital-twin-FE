import { useQuery } from "@tanstack/react-query"
import { getTasks } from "../func/databaseConnectors.axios"
import { TaskLi } from "./TaskLi.component"

export const FloatingMenu = (props: { open: boolean }) => {
    const {
        data: tasks
    } = useQuery({
        queryKey: ["tasks"],
        queryFn: () => getTasks()
    })



    return (
        <div className={`fixed rounded-md overflow-y-scroll w-64  h-64  ${props.open ? "border-2 scale-100" : " scale-0 after:hidden"} right-4 bottom-24 sm:right-44 sm:bottom-24 bg-white   border-sky-400 transform transition duration-150`} >
            {
                tasks?.tasks.map(task => <TaskLi key={"FloatMenuLi" + task.task.id} task={task.task} />)
            }
        </div >
    )
}