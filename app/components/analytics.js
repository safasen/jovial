import { db } from "@/config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import TaskData from "./taskData";
import { motion } from "framer-motion";
import dateGen from "./dateGen";

export default function Analytics({userId, plan, dailyTime}) {
    const [data, setdata] = useState(null)
    useEffect(()=> {
        async function fetchData(){
            await getDocs(query(collection(db, "plan", plan, "focusPeriod"),where("user","==", userId))).then((docs)=> {
                if (docs.empty) {
                    setdata([])
                }else {
                    let times = []
                    const res = docs.docs
                    array.forEach((k)=> {
                        if (res.find((d)=> (d.data().date) == k) == undefined) {
                            times.push({date:k, time:0})
                        }else {
                            times.push({date: k, time:res.find((d)=> (d.data().date) == k).data().time})
                        }
                    
                    })
                    setdata(times.reverse())
                }

            })
        }
        fetchData()
    },[])

    let array = dateGen()
    // let currentNum;
    // currentNum = new Date().getDate()
    // const currentMonth = new Date().getMonth() + 1;
    // let array = []
    // if (currentNum > 12) {
    //     while(array.length <12) {
    //         array.push(currentNum)
    //         currentNum--;
    //     }
    // }else if (currentNum < 12) {
    //     while(array.length <12) {
    //         if (currentNum ==0){
    //             if (currentMonth == 4 || currentMonth == 6 || currentMonth == 9 || currentMonth == 11) {
    //                 currentNum = 30;
    //             }else if (currentMonth == 2) {
    //                 currentNum = 28;
    //             }else {
    //                 currentNum = 31;
    //             }
    //         }
    //         array.push(currentNum)
    //         currentNum--;
    //     }
    // }
    // let times = []
    // const currentArray = [{date:"04152025", time:124},{date:"04162025", time:12},{date:"04222025", time:140}]
    // const d = new Date()
    // const currentDate = (d.getMonth() + 1 < 10 ? ("0" + (d.getMonth() + 1).toString()) : (d.getMonth() + 1).toString())  + d.getDate().toString() + (d.getFullYear()).toString()
    // console.log(currentArray.filter((k)=> k.date === currentDate))
    // if (data && data?.length != 0) {
    //     for (let i = 0; i < array.length; i++) {
    //         if (data.find((k)=> k.data().date.slice(2,4) === array[i].toString())== undefined) {
    //             times.push(0)
    //         }else{
    //             times.push(data.find((k)=> k.data().date.slice(2,4) === array[i].toString()).time)
    //         }
    
    //     }
    // }
    return (
        <>
        <div className="h-full">
            <h1 className="text-5xl">Analytics</h1>
            <div className="h-1/2 mt-4 rounded-lg bg-white p-4 flex flex-col gap-4">
                <h2 className="font-bold">{"Stats(Last 12 days)"}</h2>
                <div className="flex gap-8 rounded-lg h-3/4 items-end justify-center px-4">
                    {data && (data.length >0 ? data.map((k,i) => {
                        return (<motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay: 0.05*i}} className="h-full flex flex-col justify-end mainHover2" key={i}>
                            <p className="font-semibold text-center onhover2">{k.time}</p>
                            <div className="rounded-t-lg lg:w-10 md:w-8 xl:w-12 2xl:w-14" style={{height: `${Math.floor(((k.time+2)/200)*100)}%`, backgroundColor: k.time>=dailyTime ? "#2563eb" : "black" }}></div>
                            <p className="text-center font-medium">{k.date.slice(2,4)+ "/" + k.date.slice(0,2)}</p>
                        </motion.div>)
                    }): <div className="text-center">No data for the past 12 days</div>)}
                </div>
                <div className="font-semibold text-sm bg-blue text-center">Number of minutes focused</div>
            </div>
            <div className="mt-4">
                <TaskData userId={userId} plan={plan} />
            </div>
        </div>
        </>
    )
}