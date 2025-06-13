import { useEffect, useState } from "react"
import Calendar from "./calender"
import FocusBar from "./focusBar"
import TaskBox from "./taskBox"
import { and, collection, deleteDoc, doc, onSnapshot, or, query, Timestamp, updateDoc, where } from "firebase/firestore"
import { db } from "@/config/firebase"
import Rankings from "./rankings"
import AddTask from "./addTask"
import { Cross, ListTodo, Plus, Target, UserRoundPlus, X } from "lucide-react"
import { animate, motion } from "framer-motion"
import { AnimatePresence } from "framer-motion"
import { ToDoBox } from "./toDo"
import TaskGen from "./taskGen"

export default function Overview({dailyTime, plan, userId, users}) {
    const [tasks, setTasks] = useState([])
    const [side,setSide] = useState(false)
    const [task, setTask] = useState({})
    const [openTask, setOpenTask] = useState(false)
    const [openToDo, setOpenToDo] = useState(false)
    const isRepeated = []
    useEffect(() => {
        const snapquery = collection(db, "plan", plan, "tasks")
        const res = onSnapshot(snapquery, (snapshot)=> {
            if (snapshot.empty) {
                setTasks([])
                return
            }
            const tasks = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            setTasks(tasks)
        })
        return () => res()
    },[plan])

    const sideBar = (id) => {
        let task = tasks.filter((task) => task.id == id)[0];
        setTask(task)
        setSide(true)


    }

    const deleteTask = async () => {
        try {
            await deleteDoc(doc(db, "plan", plan, "tasks", task.id))
            setSide(false)
        } catch (error) {
            window.alert("Error deleting task")
        }
    }

    const complete = async () => {
        try {
            await updateDoc(doc(db, "plan", plan, "tasks", task.id), {
                isCompleted: true,
                completedBy: userId,
            })
        } catch (error) {
            window.alert("Error completing task")
            
        }
    }
    // if (tasks.length > 0) {
    //     tasks.forEach((task) => {
    //         if (task.isRepeat.repeat == true) {
    //             isRepeated.push(task)
    //             tasks.splice(tasks.indexOf(task), 1)
    //         }
    //     })

    //     isRepeated.forEach((task) => {
    //         if (task.isRepeat.time == "daily" && task.isRepeat.lastCompleted)
    //     })
    // }

    

    return (
        <>
        <motion.div initial={{opacity:0}} animate={{opacity:1}}>
            <div className="flex justify-between items-center">
                <h1 className="text-5xl">Overview</h1>
                <div className="block md:hidden text-gray-500 space-x-4">
                    <ListTodo size={40} onClick={()=> {setOpenToDo(!openToDo)}} className="bg-gray-200 p-2 rounded-lg inline-block mr-2"  />
                </div>
            </div>
            <div className="grid grid-cols-5 gap-4 mt-8">
                <div className="p-4 bg-white col-span-5 md:col-span-3 rounded-xl shadow-sm">
                    <div className="flex justify-between items-center">
                        <h1>Tasks</h1>
                        <p className="p-1 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors ease-in cursor-pointer font-semibold flex items-center gap-2" onClick={() => {setOpenTask(true)}} ><Plus size={20} />Add Task</p>
                    </div>
                    <TaskGen tasks={tasks} userId={userId} plan={plan} />
                </div>
                <div className="hidden md:col-span-2 md:flex flex-col gap-4">
                    <div className="bg-white rounded-xl shadow-sm p-4 h-fit">
                        <h1>To-Do</h1>
                        <ToDoBox plan={plan} userId={userId} />
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-4 h-fit">
                        <h1>Focus Time</h1>
                        <FocusBar progress={100} total={dailyTime} plan={plan} userId={userId} />
                    </div>
                </div>
            </div>
        </motion.div>
        <AnimatePresence initial={false}>
        {openToDo && 
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} key="openTodo" className="fixed right-0 top-0 h-screen flex flex-col gap-4 bg-gray-50 w-80 p-4 z-50">
                    <div className="flex items-center justify-end"><X size={40} className="cursor-pointer p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-300 rounded-lg transition-colors ease-in" onClick={()=> setOpenToDo(false)} /></div>
                    <div className="bg-white rounded-xl shadow-sm p-4 h-fit">
                        <h1>To-Do</h1>
                        <ToDoBox plan={plan} userId={userId} />
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-4 h-fit">
                        <h1>Focus Time</h1>
                        <FocusBar progress={100} total={dailyTime} plan={plan} userId={userId} />
                    </div>
        </motion.div>}
        {openTask && (<motion.div exit={{opacity:0}} key="addTask" className="fixed w-screen h-screen top-0 left-0 z-50">
                    <div className="flex w-full h-full justify-center items-center">
                        <div className="relative bg-white py-4 rounded-lg shadow-lg h-fit flex z-10 flex-col gap-4 w-1/3">
                            <AddTask plan={plan} userId={userId} users={users} />               
                        </div>
                    </div>
                    <div onClick={()=> setOpenTask(false)} className="absolute w-full h-full top-0 left-0 z-0 bg-black opacity-50"></div>
        </motion.div>)}
        
        </AnimatePresence>
        </>
    )
}