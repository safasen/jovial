import { useEffect, useState } from "react";
import NotificationInvite from "./notification";
import NotificationReq from "./notificationReq";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/config/firebase";
import { MessagesSquare } from "lucide-react";

export default function Inbox({userId}) {
    const [data, setData] = useState([])
    useEffect(() => {
        if (!userId) return
        const res = onSnapshot(collection(db, "users", userId, "notifications"), (docs) => {
            if (docs.empty) {
                setData([])
            }
            const data = docs.docs.map((doc) => ({...doc.data(), id: doc.id}))
            setData(data)
        })
        return () => res()
    },[userId])
    return (
        <>
        <div className="h-full">
            <div className="flex items-center justify-between">
                <h1>Inbox</h1>
            </div>
            <div className="p-2 bg-gray-100 rounded-lg flex flex-col gap-2 h-full">
                {data.length > 0 ? data.map((notification) => {
                    if (notification.type == "request") {
                        return <NotificationReq userId={userId} sentUserId={notification.from} id={notification.id} key={notification.id} />
                    } else if (notification.type == "invite") {
                        return <NotificationInvite userId={userId} projectId={notification.planId} sentUserId={notification.from} id={notification.id} key={notification.id} />
                    }
                }) : <div className="flex flex-col text-gray-500 h-full justify-center items-center font-semibold"><MessagesSquare size={34} /> No notifications</div>}
            </div>
        </div>
        </>
    )
}