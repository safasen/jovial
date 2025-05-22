import { User } from "lucide-react";
import UserData from "./userData";
import { arrayUnion, deleteDoc, doc, writeBatch } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useState } from "react";
import Alerts from "./alerts";

export default function NotificationInvite({userId, sentUserId, id, projectId}) {
    const [notify, setNotify] = useState(false)
    const accept = () => {
        const batch = writeBatch(db)
        const planRef = doc(db, "plan", projectId)
        batch.update(planRef, {
            members: arrayUnion(userId)
        })
        const userRef = doc(db, "users", userId)
        batch.update(userRef, {
            plans: arrayUnion(projectId)
        })
        const notifyRef = doc(db, "users", userId, "notifications", id)
        batch.delete(notifyRef)
        batch.commit().then(() => {
            setNotify(true)
            setTimeout(() => {
                setNotify(false)
            }, 2000);
        }).catch(async (error) => {
            window.alert("This project doesn't exist anymore")
            await deleteDoc(doc(db, "users", userId, "notifications", id))
        })
    }
    const reject = async () => {
        const notificationRef = doc(db,"users", userId, "notification", id)
        await deleteDoc(notificationRef).then(() => {
            console.log("Invitation rejected")
        }).catch((error) => {
            console.error("Error rejecting invitation: ", error)
        })

    }
    return (
        <>
        <div className="bg-white p-2 rounded-lg">
            <div className="flex gap-4">
                <User size={40} strokeWidth={1} className="p-2 bg-gray-100 rounded-full" />
                <div>
                    <div className="font-medium"><span className="font-bold"><UserData id={sentUserId} /></span> wants you to invite into his project.</div>    
                    <div className="mt-2">
                        <button className="bg-blue-500 text-white px-4 py-1 rounded-lg mt-2" onClick={accept} >Accept</button>
                        <button className="border-black border px-4 py-1 rounded-lg mt-2 ml-2" onClick={reject}>Reject</button>
                    </div>
                </div>
            </div>
            
        </div>
        <Alerts message={"Invitation accepted"} visible={notify}/>
        </>
    )
}