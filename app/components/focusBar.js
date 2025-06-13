import { db } from "@/config/firebase";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";


export default function FocusBar({progress, total,plan,userId}) {
    const [progressPercentages, setProgressPercentages] = useState(0);
    const d= new Date()
    const currentDate = (d.getMonth() + 1 < 10 ? ("0" + (d.getMonth() + 1).toString()) : (d.getMonth() + 1).toString())  + d.getDate().toString() + (d.getFullYear()).toString()
    useEffect(()=> {
        async function fetchData(){
            await getDocs(query(collection(db, "plan", plan, "focusPeriod"), where("user","==", userId),where("date","==",currentDate))).then((docs)=> {
                if (docs.docs.length > 0) {
                    setProgressPercentages(docs.docs[0].data().time)
                }else {
                    setProgressPercentages(0)
                }
            })
        }
        fetchData()

    },[plan])
    const progressPercentage = Math.round((progressPercentages / total) * 100) >= 100 ? 100 : Math.round((progressPercentages / total) * 100);
    const hours = Math.floor(progressPercentages / 60);
    const minutes = progressPercentages % 60;
    
    return (
        <>
        <div>
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-2 lg:gap-0 mb-4">
                <h2 className="text-3xl">Daily Goal</h2>
                <h1 className="text-2xl font-bold p-2 rounded-lg text-blue-500 w-fit bg-blue-100">{total < 60 ? total + " min" : Math.floor(total/60) + " hr " + total%60 + " min"}</h1>
            </div>
            <div className="relative h-16 rounded-lg bg-gray-400 text-white text-3xl">
                <h1 className="absolute top-4 left-4 z-10">{hours === 0 ? minutes + " min" : hours + " hr " + minutes + " min" }</h1>
                <div className="absolute rounded-lg h-16" style={{width : `${progressPercentage}%`, backgroundColor : `${progressPercentage >= 100 ? "green" : "black"}`}}></div>
            </div>
            
        </div>
        </>
    )
}