"use client"
import { db } from "@/config/firebase"
import { collection, getDocs, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import UserData from "./userData"
import { User } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import LoadingUi from "./loadingUi"

export default function Rankings({plan,userId, member}) {
    const [rankings, setRankings] = useState([])
    const [daily, setDaily] = useState([])
    const [loading, setLoading] = useState(true)
    const [dailyview, setDailyView] = useState(false)
    const [totalview, setTotalView] = useState(false)
    
    useEffect(() => {
        async function fetchData() {
            let curr = []
            let dailyCurr = []
            member.forEach(async (user)=> {
                await getDocs(query(collection(db, "plan", plan, "focusPeriod"),where("user", "==",user))).then((docs) => {
                    if (docs.empty){
                        curr.push({userId:user, time: 0})
                        dailyCurr.push({userId:user, time: 0})
                    }else {
                        let time = 0
                        let dailyTime = 0
                        const d = new Date()
                        const date = (d.getMonth() + 1 < 10 ? ("0" + (d.getMonth() + 1).toString()) : (d.getMonth() + 1).toString())  + (d.getDate() < 10 ? ("0" + (d.getDate()).toString()) : (d.getDate()).toString()) + (d.getFullYear()).toString()
                        docs.docs.forEach((doc) => {
                            time += doc.data().time
                            if (doc.data().date == date) {
                                dailyTime = doc.data().time
                            }
                        })
                        curr.push({userId:user, time: time})
                        dailyCurr.push({userId:user, time: dailyTime})
                    }
                })
            })
            setTimeout(() => {
                setRankings(curr)
                setDaily(dailyCurr)
                setLoading(false)
            }, 1000);
        }
        fetchData()
    },[])

    const color = (i) => {
        if (i == 0) {
            return ["#a16207","#fef08a"]
        } else if (i == 2) {
            return ["#374151","#e5e7eb"]
        } else if (i == 1) {
            return ["#1d4ed8","#bfdbfe"]
        } else {
            return ["gray", "black" ]
        }
    }
    if (loading) {
        return (
            <LoadingUi />
        )
    }


    return (
        <>
        <div>
            <h1 className="text-5xl">Rankings</h1>
            <div className="mt-8">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">Daily Rankings</h2>
                    <p className="text-sm font-light p-1 cursor-pointer hover:bg-gray-200" onClick={()=> setDailyView(true)}>View all {">"}</p>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-2">
                    {daily.length > 0 ? daily.sort((a,b)=> b.time - a.time).slice(0,3).map((k,i) => {
                        return <div key={i} className="rounded-xl bg-white p-4">
                        <div className="border-b-2 border-gray-300 pb-4">
                            <h3 className="p-2 font-semibold rounded-lg w-fit"style={{color: color(i)[0], backgroundColor: color(i)[1]}}>#{i+1}</h3>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                            <div className=" flex items-center gap-2">
                                <User className="bg-gray-200 rounded-full p-2" size={32}/>
                                <h2 className="font-semibold"><UserData id={k.userId} /></h2>
                            </div>
                            <div className="text-center">
                                <h2 className="font-bold">{k.time}</h2>
                                <p className="font-light">minutes focused</p>
                            </div>
                        </div>
                    </div>}): <div className="mt-4 font-semibold">Add some members.</div>}
                </div>
            </div>
            <div className="mt-8">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">Total Rankings</h2>
                    <p className="text-sm font-light p-1 cursor-pointer hover:bg-gray-200" onClick={()=> setTotalView(true)}>View all {">"}</p>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-2">
                    {rankings.length > 0 ? rankings.sort((a,b)=> b.time - a.time).slice(0,3).map((k,i) => {
                        return <div key={i} className="rounded-xl bg-white p-4">
                        <div className="border-b-2 border-gray-300 pb-4">
                            <h3 className="p-2 font-semibold rounded-lg w-fit"style={{color: color(i)[0], backgroundColor: color(i)[1]}}>#{i+1}</h3>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                            <div className=" flex items-center gap-2">
                                <User className="bg-gray-200 rounded-full p-2" size={32}/>
                                <h2 className="font-semibold"><UserData id={k.userId} /></h2>
                            </div>
                            <div className="text-center">
                                <h2 className="font-bold">{k.time}</h2>
                                <p className="font-light">minutes focused</p>
                            </div>
                        </div>
                    </div>}): <div className="mt-4 font-semibold">Add some members.</div>}
                </div>
            </div>
            
        </div>
        <AnimatePresence initial={false}>
        {dailyview && (<motion.div exit={{opacity:0}} key="dailyview" className="fixed w-screen h-screen top-0 left-0 z-50">
                    <div className="flex w-full h-full justify-center items-center">
                        <motion.div initial={{opacity:0, scale:0.75}} animate={{opacity:1, scale:1}} className="relative bg-white p-4 rounded-lg shadow-lg h-fit flex z-10 flex-col gap-4 w-1/3">                          
                            {daily.sort((a,b) => b.time - a.time).map((k,i) => {
                                return <div key = {k.userId} className="flex justify-between items-center p-2 border-b-2 border-gray-200 text-lg font-semibold" style={{color: i+1==1 ? "#d97706" : "black"}}>
                                <div className="flex items-center gap-2 ">
                                    <div>{i+1}.</div>
                                    <div><UserData id={k.userId} /></div>
                                </div>
                                <div>{k.time + "min"}</div>
                            </div>})}   
                        </motion.div>           
                    </div>
                    <div onClick={()=> setDailyView(false)} className="absolute w-full h-full top-0 left-0 z-0 bg-black opacity-50"></div>
        </motion.div>)}
        {totalview && (<motion.div  exit={{opacity:0}} key="totalview" className="fixed w-screen h-screen top-0 left-0 z-50">
                    <div className="flex w-full h-full justify-center items-center">
                        <motion.div initial={{opacity:0, scale:0.75}} animate={{opacity:1, scale:1}} className="relative bg-white p-4 rounded-lg shadow-lg h-fit flex z-10 flex-col gap-4 w-1/3">                          
                            {rankings.sort((a,b) => b.time - a.time).map((k,i) => {
                                return <div key = {k.userId} className="flex justify-between items-center p-2 border-b-2 border-gray-200 text-lg font-semibold" style={{color: i+1==1 ? "#d97706" : "black"}}>
                                <div className="flex items-center gap-2 ">
                                    <div>{i+1}.</div>
                                    <div><UserData id={k.userId} /></div>
                                </div>
                                <div>{k.time + "min"}</div>
                            </div>})}   
                        </motion.div>           
                    </div>
                    <div onClick={()=> setTotalView(false)} className="absolute w-full h-full top-0 left-0 z-0 bg-black opacity-50"></div>
        </motion.div>)}
        
        </AnimatePresence>
        
        </>
    )
}