import { useEffect, useState } from "react"
import UserData from "./userData";
import { User } from "lucide-react";

export default function FocusRankings({focus, userId, member}) {
    const [data, setData] = useState([])
    useEffect(() => {
        let curr = []
        console.log(focus)
        member.forEach(user => {
            let time = 0
            let dailyTime = 0
            const d = new Date()
            const date = (d.getMonth() + 1 < 10 ? ("0" + (d.getMonth() + 1).toString()) : (d.getMonth() + 1).toString())  + (d.getDate() < 10 ? ("0" + (d.getDate()).toString()) : (d.getDate()).toString()) + (d.getFullYear()).toString()
            if (focus.filter((k)=> k.user == user).length >0) {
                focus.filter((k)=> k.user == user).forEach((k) => {
                    time += k.time
                    if (k.date == date) {
                        dailyTime = k.time
                    }
                })
            } else {
                time = 0
                dailyTime = 0
            }
            curr.push({userId:user, time: time, dailyTime: dailyTime})
            // dailyCurr.push({userId:user, time: dailyTime})
        });
        setData(curr)
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
    return (
        <>
        <div className="mt-8">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">Daily Rankings</h2>
                    <p className="text-sm font-light p-1 cursor-pointer hover:bg-gray-200">View all {">"}</p>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-2">
                    {data.length > 0 ? data.sort((a,b)=> b.dailyTime - a.dailyTime).slice(0,3).map((k,i) => {
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
                                <h2 className="font-bold">{k.dailyTime}</h2>
                                <p className="font-light">minutes focused</p>
                            </div>
                        </div>
                    </div>}): <div className="mt-4 font-semibold">Add some members.</div>}
                </div>
        </div>
        <div className="mt-8">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-semibold">Total Rankings</h2>
                            <p className="text-sm font-light p-1 cursor-pointer hover:bg-gray-200">View all {">"}</p>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-2">
                            {data.length > 0 ? data.sort((a,b)=> b.time - a.time).slice(0,3).map((k,i) => {
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
        </>
    )
}