import { db } from "@/config/firebase"
import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"

export default function UserData({id,withEmail = false}) {
    const [data, setData] = useState(null)
    useEffect(()=> {
        async function fetchData() {
            const res = await getDoc(doc(db, "users", id)).then((docs)=> {
                if (docs.exists()) {
                    setData(docs.data())
                }
            })
        }
        fetchData()
    },[])
    return (
        <>
        {data ? data?.name[0].toUpperCase() + data?.name.substring(1) + (withEmail ? "(" + data?.email + ")" : "") : "Loading"}
        </>
    )
}