import { useContext,createContext,useState } from "react";
import { createTaskRequest,getTasksRequest,deleteTaskRequest,getTaskRequest,updateTaskRequest } from "../api/task";

const TaskContext = createContext();

export const useTasks = () => {
    const context = useContext(TaskContext)
    if(!context){
        throw new Error("useTasks tem q estar no taskProvider")
    }
    return context;
}

export function TaskProvider({children}) {
    const [tasks,setTasks] = useState([]);
    const getTasks = async () => {
        try {
            const res = await getTasksRequest();
            setTasks(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    const getTask = async (id) => {
        try {
            const res = await getTaskRequest(id);
            return res.data
        } catch (error) {
            console.log(error);
        }
    }
    const updateTask = async (id,task) => {
        try {
            const res = await updateTaskRequest(id,task);
            return res.data
        } catch (error) {
            console.log(error);
        }
    }
    const createTask = async (task) => {
        try {
            await createTaskRequest(task)
        } catch (error) {
            console.log(error);
        }
    }
    const deleteTask = async (id) => {
        try {
            const res = await deleteTaskRequest(id);
            if(res.status==204) setTasks(tasks.filter(task => task._id != id))
        } catch (error) {
            console.log(error);
        }
    }
    return (<TaskContext.Provider value={{tasks,createTask,deleteTask,getTasks,getTask,updateTask}}>{children}</TaskContext.Provider>)
}