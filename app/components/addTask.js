import { addDoc, collection, Timestamp } from "firebase/firestore";
import UserData from "./userData";
import { db } from "@/config/firebase";
import { motion } from "framer-motion";
import Alerts from "./alerts";
import { useState } from "react";

export default function AddTask({userId, plan, users}) {
    const [notify, setNotify] = useState(false)
    const submiForm = async (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        const entries = Object.fromEntries(data.entries())
        if (entries.name == "" || entries.description == "" || entries.date == "") {
            alert("Please fill all fields")
            return
        }
        try {
            await addDoc(collection(db, "plan", plan, "tasks"), {
                name: entries.name,
                desc: entries.description,
                priority: Number(entries.priority),
                deadline: Timestamp.fromDate(new Date(entries.date)),
                isCompleted: false,
                givenTo: entries.visible == "public" ? (entries.user != "None" ? entries.user : "floater") : userId,
                givenBy: userId,
                completedBy: "",
                visibility: entries.visible,    
            })
            setNotify(true)
            setTimeout(() => {
                setNotify(false)
            }, 2000);
        } catch (error) {
            window.alert("Error adding task")
            console.log(error)
        }
        e.target.reset()
    }
    return (
        <>
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="w-full h-full px-4">
                    <h1 className="text-2xl">Add Task</h1>
                    <form className="flex flex-col gap-4 justify-center mt-4" onSubmit={submiForm}>
                        <div className="flex gap-4">
                            <div className="flex flex-col gap-1 items-start">
                                <p className="font-semibold">Name</p>
                                <input type="text" placeholder="Name" name="name" id="name" className=" p-2 rounded" />
                            </div>
                            <div className="flex flex-col gap-1 items-start">
                                <p className="font-semibold">Priority</p>
                                <select name="priority" className="border border-gray-300 p-2 rounded">
                                    <option value={1}>High</option>
                                    <option value={2}>Medium</option>
                                    <option value={3}>Low</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="flex gap-4 ">
                            <div className="flex flex-col gap-1 items-start">
                                <p className="font-semibold">Description</p>
                                <textarea type="text" placeholder="Description" name="description" id="description" className="resize-none border border-gray-200 p-2 rounded" />
                            </div>
                            <div className="flex flex-col gap-1 items-start">
                                <p className="font-semibold">Deadline</p>
                                <input type="date" placeholder="Name" id="date" name="date" className="border border-gray-300 p-2 rounded" />
                            </div> 
                        </div> 
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col gap-1 items-start ">
                                <p className="font-semibold">Given To</p>
                                <select name="user" defaultValue={"None"} className="border border-gray-300 p-1 rounded">
                                    {users.map((user) =>{
                                        return <option key={user} value={user}><UserData id={user} withEmail={true} /></option>
                                    })}
                                    <option value="None">Floater</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1 items-start ">
                                <p className="font-semibold">Visibility</p>
                                <select name="visible" defaultValue={"public"} className="border border-gray-300 p-1 rounded">
                                    <option value="public">Public</option>
                                    <option value="private">Private</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4 w-fit">Add Task</button>
                    </form>
            </motion.div>
            <Alerts message="Task Added Successfully" visible={notify} />
        </>
    )
}