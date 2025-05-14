import { User } from "lucide-react";
import UserData from "./userData";
import { arrayUnion, deleteDoc, doc, writeBatch } from "firebase/firestore";
import { db } from "@/config/firebase";

export default function NotificationReq({userId, sentUserId, id}) {
    
    const accept = () => {
        const batch = writeBatch(db)
        const userRef = doc(db, "users", userId)
        batch.update(userRef, {
            friends: arrayUnion(sentUserId)
        })
        const sentUserRef = doc(db, "users", sentUserId)
        batch.update(sentUserRef, {
            friends: arrayUnion(userId)
        })
        const notificationRef = doc(db,"users", userId, "notifications", id)
        batch.delete(notificationRef)
        batch.commit().then(() => {
            console.log("Friend request accepted")
        }).catch((error) => {
            console.error("Error accepting friend request: ", error)
        })



    }
    const reject = async () => {
        const notificationRef = doc(db,"users", userId, "notification", id)
        await deleteDoc(notificationRef).then(() => {
            console.log("Friend request rejected")
        }).catch((error) => {
            console.error("Error rejecting friend request: ", error)
        })


    }
    return (
        <>
        <div className="bg-white p-2 rounded-lg">
            <div className="flex gap-4">
                <User size={40} strokeWidth={1} className="p-2 bg-gray-100 rounded-full" />
                <div>
                    <div className="font-medium"><span className="font-bold"><UserData id={sentUserId} /></span> has sent you friend request.</div>    
                    <div className="mt-2">
                        <button className="bg-blue-500 text-white px-4 py-1 rounded-lg mt-2" onClick={accept}>Accept</button>
                        <button className="border-black border px-4 py-1 rounded-lg mt-2 ml-2" onClick={reject}>Reject</button>
                    </div>
                </div>
            </div>
            
        </div>
        </>
    )
}