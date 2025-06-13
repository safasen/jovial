"use client"
import { useAuth } from "@/context/authProvider"
import FriendsSide from "../components/friendsSide"
import Calendar from "../components/calender"
import Overview from "../components/overview"
import { usePathname, useSearchParams } from "next/navigation"
import FocusPeriod from "../components/focusPeriod"
import Analytics from "../components/analytics"
import Tasks from "../components/tasks"
import LoadingUi from "../components/loadingUi"
import { useCallback, useEffect, useState } from "react"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "@/config/firebase"
import Inbox from "../components/inbox"
import { motion } from "framer-motion"
import { AnimatePresence } from "framer-motion"
import Rankings from "../components/rankings"
import { useSidebar } from "@/context/minimized"

export default function User(){
    const currentUser = useAuth() || null
    const [data, setData] = useState(null)
    const searchparams = useSearchParams()
    const path = usePathname()
    const curr = searchparams.get("curr") || "overview"
    const plan = searchparams.get("project") || "loading"
    const friends = searchparams.get("friends") || false
    const inbox = searchparams.get("inbox") || false
    const {minimized, setMinimized} = useSidebar()
    // console.log(path + "?" + createQuery("sort","asc"))
    useEffect(() => {
        if (plan == "loading" || plan == "first") {
            return
        }
        const res = onSnapshot(doc(db, "plan", plan), (doc) => {
            setData(doc.data())
        })

        return () => res()
    },[plan])
    // const [currentUser, setUser] = useState(null);
    
    // useEffect(()=> {
    //     const unsub = onAuthStateChanged(auth, initializeUser)
    //     return unsub                             //cleaning up
    // },[])
    
    // async function initializeUser(user) {
    //     if (user) {
    //         setUser({ ...user })
    //     }
    // }
    
    if (plan == "first") {
        return (
            <>
            <div className="grid grid-cols-5 bg-yellow-50">
                <div></div>
                <div className="col-span-4 flex justify-center items-center h-screen">
                    <h1 className="text-5xl font-semibold">Start by making your first plan</h1>
                </div>
            </div>
            
            <motion.div layout transition={{duration:0.2}} key="friends" className="fixed top-0 h-full w-1/4 bg-white shadow-lg z-50 p-4" style={{right: friends=="true"? 0: "-25%"}}><FriendsSide  userId = {currentUser?.uid} plan={plan} users={data?.members} /></motion.div>
            <motion.div layout transition={{duration:0.2}} key="inbox" className="fixed top-0 h-full w-1/4 bg-white shadow-lg z-50 p-4" style={{right: inbox=="true"? 0: "-25%"}}><Inbox userId={currentUser?.uid} /></motion.div>
            </>
        )
    } else if (plan == "loading" || data == null) {
        return (
            <>
            <LoadingUi />
            </>
        ) 
    }
    return (
        <>
        <div className="grid grid-cols-5 bg-gray-100 overflow-x-hidden">
            <div className=""></div>
            <motion.div layout transition={{duration:0.2}} className={`${!minimized ? "col-span-5 ml-2 xl:col-span-4" : "col-span-5 xl:ml-12 ml-2" } p-12 h-screen overflow-y-scroll`}>
                {/* <h1>{currentUser?.displayName}</h1> */}
                {/* <FriendsSide /> */}
                {curr =="overview" && <Overview dailyTime={data?.dailyFocusTime} plan={plan} userId={currentUser?.uid} users={data?.members} />}
                {curr == "analytics" && <Analytics userId={currentUser?.uid} plan={plan} dailyTime={data?.dailyFocusTime} />}
                {curr == "tasks" && <Tasks plan={plan}  />}
                {curr == "rankings" && <Rankings plan={plan} userId={currentUser?.uid} member={data?.members} />}
                {curr == "focus" && <FocusPeriod planId={plan} userId={currentUser?.uid} />}
            </motion.div>
        </div>
        <motion.div layout transition={{duration:0.2}} key="friends" className="fixed top-0 h-full w-1/4 bg-white shadow-lg z-50 p-4" style={{right: friends=="true"? 0: "-25%"}}><FriendsSide  userId = {currentUser?.uid} plan={plan} users={data?.members} /></motion.div>
        <motion.div layout transition={{duration:0.2}} key="inbox" className="fixed top-0 h-full w-1/4 bg-white shadow-lg z-50 p-4" style={{right: inbox=="true"? 0: "-25%"}}><Inbox userId={currentUser?.uid} /></motion.div>
        
        </>
        
    )
}