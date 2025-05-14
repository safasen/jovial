import { db } from "@/config/firebase"
import { doc, getDoc, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"

export default function ProjectName({id}) {
    const [data, setData] = useState(null)
    useEffect(() => {
        const res = onSnapshot(doc(db, "plan", id), (docs) => {
            const data = docs.data()
            setData(data)
        })
        return () => res() //cleaning up
    }, [])
    return (
        <>
        <div className="p-1">{data?.name}</div>
        </>
    )
}