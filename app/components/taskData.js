import { db } from "@/config/firebase"
import { collection, doc, getDocs, or, query, where } from "firebase/firestore"
import { Target, CalendarCheck, CalendarCheck2, SquareSquare, Percent, CopyCheck } from "lucide-react"
import { useEffect, useState } from "react"

export default function TaskData({plan, userId}) {
    const [data, setData] = useState(null)
    useEffect(()=> {
        async function fetchData(){
            await getDocs(query(collection(db, "plan", plan, "tasks"),or(where("givenTo","==",userId),where("completedBy","==",userId)))).then((docs)=> {
                if (docs.empty) {
                    setData(null)
                }else {
                    let complete = 0;
                    let complete2 = 0
                    let given = docs.docs.filter((k)=> k.data().givenTo == userId)
                    const res = given.filter((k)=> k.data().isCompleted == true)
                    complete += res.length
                    let floater = docs.docs.filter((k)=> k.data().givenTo == "floater")
                    const res2 = floater.filter((k)=> k.data().isCompleted == true)
                    complete2 += res2.length
                    setData({completed: complete, complete2: complete2, totalGiven: given.length})             
                }
            })

        }
        fetchData()
    },[])
    return (
        <>
        <div className="bg-white p-4 rounded-lg">
            <h1 className="text-2xl font-semibold mb-4">Task Data</h1>
            {data ? <div className="font-semibold text-3xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-x-auto gap-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 col-span-2">
                    <div className="p-4 space-y-4 rounded-lg bg-gray-100">
                        <div className="flex gap-2 justify-between items-center">
                            <p className="text-xl">Tasks Given</p>
                            <Target size={36} color="blue" />
                        </div>
                        <p className="text-4xl">{data.totalGiven}</p>
                    </div>
                    <div className="p-4 space-y-4 rounded-lg bg-gray-100">
                        <div className="flex gap-2 justify-between items-center">
                            <p className="text-xl">Tasks completed</p>
                            <CalendarCheck2 size={36} color="green" />
                        </div>
                        <p className="text-4xl">{data.completed}</p>
                    </div>
                    <div className="p-4 space-y-4 rounded-lg bg-gray-100">
                        <div className="flex gap-2 justify-between items-center">
                            <p className="text-xl">Floater completed</p>
                            <SquareSquare size={36} color="blue" />
                        </div>
                        <p className="text-4xl">{data.complete2}</p>
                    </div>
                    <div className="p-4 space-y-4 rounded-lg bg-gray-100">
                        <div className="flex gap-2 justify-between items-center">
                            <p className="text-xl">Complete Percentage</p>
                            <Percent size={36} color="blue" />
                        </div>
                        <p className="text-4xl">{Math.round((data.completed/data.totalGiven)*100)}%</p>
                    </div>
                </div>
                <div className="p-4 flex flex-col justify-between space-y-4 col-span-2 lg:col-auto rounded-lg bg-gray-100">
                    <div className="flex gap-2 justify-between items-center">
                        <p className="text-xl">Total Tasks completed</p>
                        <CopyCheck size={36} color="red" />
                    </div>
                    <p className="text-6xl text-right">{data.completed + data.complete2}</p>
                </div>
            </div> : <div className="text-center">No data to Show</div>}
        </div>
        </>
    )
}