import { db } from "@/config/firebase"
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { useEffect, useRef, useState } from "react"
import Alerts from "./alerts"

export default function Clock({planId, userId}) {
    const [time, setTime] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const [confirmed, setConfirmed] = useState(false)
    const [notify, setNotify] = useState(false)
    const interval = useRef(null)
    const d = new Date();
    const currentDate = (d.getMonth() + 1 < 10 ? ("0" + (d.getMonth() + 1).toString()) : (d.getMonth() + 1).toString())  + (d.getDate() < 10 ? ("0" + (d.getDate()).toString()) : (d.getDate()).toString()) + (d.getFullYear()).toString()
    useEffect(() => {
        if (isPaused) {
            interval.current = setInterval(() => {
                setTime((prev) => prev + 1)
            }, 1000)
        }
        return () => clearInterval(interval.current)
    }, [isPaused])
    async function stopTime() {
        if (time < 60) {
            window.alert("You need to work for at least 1 minute")
            return
        }
        try {
            const quer = query(collection(db, "plan", planId, "focusPeriod"),where("date","==",currentDate),where("user","==",userId)) 
            const res = await getDocs(quer).then(async (docs) => {
                if (docs.docs.length > 0) {
                    const data = docs.docs[0].data()
                    const period = data.time + (Math.floor(time/60))
                    const docRef = doc(db, "plan", planId, "focusPeriod", docs.docs[0].id )
                    await updateDoc(docRef, {
                        time:period
                    })
                } else {
                    const docRef = collection(db, "plan", planId, "focusPeriod")
                    await addDoc(docRef, {
                        date: currentDate,
                        time: Math.floor(time/60),
                        user: userId
                    })
                }
            })
            setIsPaused(false)
            setTime(0)
            setNotify(true)
            setTimeout(() => {
                setNotify(false)
            }, 2000);
        } catch (error) {
            window.alert("Something went wrong")
            console.log(error)
        }
    }
    function reset() {
        setTime(0)
        setIsPaused(false)
    }
    function formatTime(){
        let seconds = time % 60
        let minutes = Math.floor(time / 60) % 60
        let hours = Math.floor(time / 3600)
        seconds = String(seconds).padStart(2, '0')
        minutes = String(minutes).padStart(2, '0')
        hours = String(hours).padStart(2, '0')
        return `${hours}:${minutes}:${seconds}`
    }
    return (
        <div className="flex flex-col gap-4 p-8 bg-white rounded-lg items-center shadow-lg w-1/3 min-w-72">
            <h1 className="mb-8">Clock</h1>
            <div className="text-5xl font-bold font-mono">{formatTime()}</div>
            <div className="flex gap-2 mt-4">
                <div onClick={()=> setIsPaused((prev)=> !prev)} className="px-2 py-1 text-sm font-medium text-gray-600 rounded-lg bg-gray-200 w-fit cursor-pointer" >{isPaused ? "Pause" : "Start"}</div>
                <div onClick={()=> setConfirmed(true)} className="px-2 py-1 text-sm font-medium text-red-600 rounded-lg bg-red-200 w-fit cursor-pointer">Reset</div>
                <div onClick={stopTime} className="px-2 py-1 text-sm font-medium text-blue-600 rounded-lg bg-blue-200 w-fit cursor-pointer">Complete</div>
            </div>
            <div className="fixed w-screen h-screen top-0 left-0 z-50" style={{ display: confirmed ? "block" : "none" }}>
                <div className="flex w-full h-full justify-center items-center text-center">
                    <div className="relative bg-white p-4 rounded-lg shadow-lg flex z-10 flex-col items-center gap-4 max-w-sm md:max-w-lg">
                        <h1 className="text-xl font-bold">Are you sure you want to reset the timer? Your progress will be lost</h1>
                        <div className="flex gap-2">
                            <div onClick={() => { setConfirmed(false); reset() }} className="px-2 py-1 text-sm font-medium text-red-600 rounded-lg bg-red-200 w-fit cursor-pointer">Yes</div>
                            <div onClick={() => setConfirmed(false)} className="px-2 py-1 text-sm font-medium text-blue-600 rounded-lg bg-blue-200 w-fit cursor-pointer">No</div>
                        </div>
                    </div>
                </div>
                {/* <div className="relative bg-white p-4 rounded-lg shadow-lg flex z-10 flex-col gap-4 max-w-sm">
                    <h1 className="text-xl font-bold">Are you sure you want to reset the timer? Your progress will be lost</h1>
                    <div className="flex gap-2">
                        <div onClick={() => { setConfirmed(false); reset() }} className="px-2 py-1 text-sm font-medium text-red-600 rounded-lg bg-red-200 w-fit cursor-pointer">Yes</div>
                        <div onClick={() => setConfirmed(false)} className="px-2 py-1 text-sm font-medium text-blue-600 rounded-lg bg-blue-200 w-fit cursor-pointer">No</div>
                    </div>
                </div> */}
                <div className="absolute w-full h-full top-0 left-0 z-0 bg-black opacity-50"></div>
            </div>
            <Alerts message="Focus Session Completed" visible={notify} />
        </div>
    )
}