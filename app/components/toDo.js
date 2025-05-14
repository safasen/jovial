import { db } from "@/config/firebase";
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, serverTimestamp, where } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";


export function ToDoBox({plan, userId}){
    const [todo, setToDo] = useState([])
    useEffect(() => {
        const res = onSnapshot(query(collection(db, "plan", plan, "toDo"),where("createdBy","==", userId)), (doc) => {
            if (doc.empty) {
                setToDo([])
                return
            }
            const data = doc.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            setToDo(data)
        })
        return () => res()
    },[])
    const formSubmit = async (e) => {
        e.preventDefault()
        const value = e.target[0].value
        if (value == "") {
            return
        }
        try {
            await addDoc(collection(db, "plan", plan, "toDo"), {
                name: value,
                createdAt: serverTimestamp(),
                createdBy: userId
            })
        } catch (error) {
            window.alert("Server error adding task")
        }
        e.target[0].value = ""

    }

    const deleteTask = async (id) => {
        try {
            await deleteDoc(doc(db, "plan", plan, "toDo", id))
        } catch (error) {
            window.alert("Error completing task")
        }
    }
    return (
        <div className="flex flex-col gap-2">
            <form onSubmit={formSubmit} className="flex items-center border-b-2 border-gray-300 gap-2 my-2">
                <Plus type="submit" size={30} className="p-2 rounded-t-md hover:bg-gray-100" />
                <input type="text" placeholder="Add a task..." className="border-0 focus:border-0 rounded-lg p-0 text-sm font-semibold" />
            </form>
            <AnimatePresence initial={false}>
            {todo.length >0 ? todo.map((to) => {
                return <motion.div initial={{opacity:0,scale:0.75}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.75}} key={to.id} className="flex items-center gap-2 p-2 bg-gray-100 rounded-lg">
                <input type="checkbox" onChange={()=> deleteTask(to.id)} value={to.id} name={to.id} className="w-4 h-4 " />
                <label htmlFor={to.id} className="text-sm font-semibold">{to.name}</label>
            </motion.div>}): <div className="text-center mt-4 font-semibold">No To-Do added</div>}
            </AnimatePresence>
        </div>
    )
}