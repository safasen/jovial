import { useEffect, useState } from "react";
import TaskComp from "./taskComp";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebase";

export default function Tasks({plan}) {
    const [tasks, setTasks] = useState(null)
    useEffect(()=> {
        async function fetchData(){
            await getDocs(query(collection(db, "plan", plan, "tasks"),where("visibility","==", "public"))).then((docs)=> {
                if (docs.empty) {
                    setTasks(null)
                }
                else {
                    const res = docs.docs.map((doc) => ({id: doc.id, ...doc.data()}))
                    setTasks(res)
                }
            })
        }
        fetchData()
    },[])
    return (
        <>
        <div>
            <h1 className="text-5xl">Tasks</h1>
            {tasks ? <TaskComp tasks={tasks} /> : <div className="text-center font-semibold">No tasks to show</div>}
        </div>
        </>
    )
}