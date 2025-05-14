"use client"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import TaskBox from "./taskBox"
import { deleteDoc, doc, updateDoc } from "firebase/firestore"
import { db } from "@/config/firebase"
import { X } from "lucide-react"
export default function TaskGen({tasks=[], userId, plan}) {
    const [assigned, setAssigned] = useState(true)
    const [given, setGiven] = useState(false)
    const [privates, setPrivate] = useState(false)
    const [side,setSide] = useState(false)
    const [task, setTask] = useState({})
    const sideBar = (id) => {
            let task = tasks.filter((task) => task.id == id)[0];
            setTask(task)
            setSide(true)
    
    
        }
    
        const deleteTask = async () => {
            if (userId != task.givenBy ) {
                window.alert("You cannot delete this task")
                return
            }
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
    return (
        <>
        <div>
            <div className="border-b-2 border-gray-300 flex items-center gap-4 text-gray-500 font-semibold my-2">
                <div style={{color: assigned && "black",borderColor: assigned && "#9ca3af"}} className="p-2 border-b-2 border-white hover:border-gray-400 transition-colors ease-in cursor-pointer" onClick={()=> {setAssigned(true); setGiven(false); setPrivate(false)}}>Assigned</div>
                <div style={{color: given && "black",borderColor: given && "#9ca3af"}} className="p-2 border-b-2 border-white hover:border-gray-400 transition-colors ease-in cursor-pointer" onClick={()=> {setAssigned(false); setGiven(true); setPrivate(false)}}>Given</div>
                <div style={{color: privates && "black",borderColor: privates && "#9ca3af"}} className="p-2 border-b-2 border-white hover:border-gray-400 transition-colors ease-in cursor-pointer" onClick={()=> {setAssigned(false); setGiven(false); setPrivate(true)}}>Private</div>
            </div>
            <AnimatePresence initial={false}>
            {assigned && <motion.div initial={{opacity:0}} animate={{opacity:1}} key="assigned" className="space-y-2">
                    {tasks.filter((task)=> task.givenBy == userId && task.givenTo != userId).length ==0  ? <div  className="text-center mt-8 font-semibold">No tasks assigned by you</div> :tasks.filter((task)=> task.givenBy == userId && task.givenTo != userId).map((task,index) => {
                        return <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay: 0.1*index}} key={task.id} onClick={() => sideBar(task.id)} ><TaskBox keys={task.id} name={task.name} desc={task.desc} priority={task.priority} deadline={task.deadline.toDate()} isCompleted={task.isCompleted} /></motion.div>
                    })}
            </motion.div>}
            {given && <motion.div initial={{opacity:0}} animate={{opacity:1}} key="given" className="space-y-2">
                    {tasks.filter((task)=> task.givenTo == userId && task.givenBy != userId).length ==0  ? <div  className="text-center mt-8 font-semibold">No tasks given to you</div> :tasks.filter((task)=> task.givenTo == userId).sort((a,b) => a.isCompleted - b.isCompleted).map((task,index) => {
                        return <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay: 0.1*index}} key={task.id} onClick={() => sideBar(task.id)} ><TaskBox keys={task.id} name={task.name} desc={task.desc} priority={task.priority} deadline={task.deadline.toDate()} isCompleted={task.isCompleted} /></motion.div>
                    })}
            </motion.div>}
            {privates && <motion.div initial={{opacity:0}} animate={{opacity:1}} key="privates" className="space-y-2">
                    {tasks.filter((task)=> task.visibility == "private").length ==0  ? <div  className="text-center mt-8 font-semibold">No private tasks</div> :tasks.filter((task)=> task.visibility == "private").map((task,index) => {
                        return <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay: 0.1*index}} key={task.id} onClick={() => sideBar(task.id)} ><TaskBox keys={task.id} name={task.name} desc={task.desc} priority={task.priority} deadline={task.deadline.toDate()} isCompleted={task.isCompleted} /></motion.div>
                    })}
            </motion.div>}
            </AnimatePresence>
            
        </div>
        <AnimatePresence initial={false}>
        {side && <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} key="sideTask" className="fixed top-0 right-0 w-1/4 h-screen bg-white z-50">
            <div className="h-full p-4">
                <div className="flex justify-between items-start">
                    <h1 className="text-3xl font-bold">Task Details</h1>
                    <X onClick={() => setSide(false)} className="cursor-pointer rounded-md p-1 hover:bg-gray-200" size={30} />
                </div>
                <div className="flex flex-col h-full justify-between">
                    <div className="mt-4 space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg gap-2">
                            <h1 className="text-2xl font-bold">{task.name}</h1>
                            <p className="text-lg font-medium">{task.desc}</p>
                        </div>
                        <p className="bg-gray-50 p-4 rounded-lg text-lg font-semibold">Priority - {task.priority}</p>
                        <p className=" bg-gray-50 p-4 rounded-lg text-gray-500  font-semibold text-lg">Deadline - {task.deadline.toDate().toLocaleDateString()}</p>
                    </div>
                    <div className="flex flex-col mb-8 gap-2">
                        <button onClick={complete} className="bg-blue-500 text-white rounded-lg px-4 py-2">Complete</button>
                        <button onClick={deleteTask}  className=" bg-red-500 text-white rounded-lg px-4 py-2">Delete</button>
                    </div>
                </div>
            </div>
        </motion.div>}
        </AnimatePresence>
        </>
    )
}