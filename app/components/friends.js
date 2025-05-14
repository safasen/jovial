"use client"

import { db } from "@/config/firebase"
import { addDoc, collection, doc, getDocs, onSnapshot, query, runTransaction, serverTimestamp, where } from "firebase/firestore"
import { useEffect,useState } from "react"
import { User, Dot, CalendarPlus } from "lucide-react"

export default function Friends({friendId, userId, plan, member=true}) {
    const [friends, setFriends] = useState(null)
    useEffect(() => {
        const unsub = onSnapshot(doc(db, "users", friendId), (doc) => {
            setFriends(doc.data())
        })
        return () => unsub()
    }, [])

    const handleClick = async () => {
        try {
            const docRef = query(collection(db, "users", friendId, "notifications"), where("planId", "==", plan))
            const docSnap = await getDocs(docRef)
            if (docSnap.empty){
                await addDoc(collection(db, "users", friendId, "notifications"), {
                    type: "invite",
                    from: userId,
                    createdOn: serverTimestamp(),
                    planId: plan,
                }).then(() => console.log("Added")).catch((err) => console.log(err))
            }
            // runTransaction(db, async (transaction) => {
            //     const docRef = query(collection(db,"users", friendId, "notifications"), where("planId", "==", plan))
            //     const docSnap = await transaction.get(docRef).then((snap)=> {
            //         if (snap.exists()){
            //             console.log("Already sent")
            //         }
            //     }).catch((err) => {
            //         if (err.message.search("'path'") != -1) {
            //             console.log(err.message)
            //             const date = new Date()
            //             const id = date.getTime().toString()
            //             const ref = doc(db, "users", friendId, "notifications", id)
            //             transaction.set(ref, {
            //                 type: "invite",
            //                 from: userId,
            //                 createdOn: serverTimestamp(),
            //                 planId: plan,
            //             })
            //         }
            //     })

            // })
        } catch (error) {
            window,alert("Something went wrong")
            console.log("Transaction failed: ", error)
        }
    }
    return (
        <div className="bg-gray-100 p-4 flex justify-between items-center rounded-xl hover:bg-gray-200 transition duration-300">     
            <div className="flex gap-4 items-center">
                <User className="bg-gray-200 rounded-full p-2" size={32}/>
                <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{friends ? friends?.name[0].toUpperCase() + friends?.name.substring(1): "Loading"}</h3>
                    {/* <h3 className="font-semibold">Popye</h3> */}
                    <div style={{backgroundColor: friends?.lastLogout._compareTo(friends?.lastLogin) == -1 ? "#bbf7d0" : "#e5e7eb"}} className="text-xs bg-gree flex items-center text-gray-600 pr-2 rounded-sm"><Dot color={friends?.lastLogout._compareTo(friends?.lastLogin) == -1 ? "green": "gray"} />{friends?.lastLogout._compareTo(friends?.lastLogin) == -1 ? "Online": "Offline"}</div>
                </div>
            </div>
            {!member && <CalendarPlus onClick={handleClick} className="rounded-md text-gray-700 p-2 hover:bg-gray-200 cursor-pointer" size={32} />}
            
        </div>
    )
}