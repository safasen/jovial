import { useEffect, useState } from "react";
import UserAdd from "./userAdd";
import { addDoc, arrayUnion, collection, doc, getDoc, serverTimestamp, Timestamp, writeBatch } from "firebase/firestore";
import { db } from "@/config/firebase";
import Alerts from "./alerts";

export default function AddProject({userId}) {
    let people = [];
    const [peoples, setPeoples] = useState([])
    const [notify, setNotify] = useState(false)
    useEffect(() => {
        if (!userId) return
        async function fetchData() {
            await getDoc(doc(db, "users", userId)).then((doc) => {
                if (doc.exists()) {
                    setPeoples(doc.data().friends)
                }
            })
        } 
        fetchData()
    },[userId])

    const removeUser = (id) => {
        people = people.filter((user) => user !== id)
    }
    const submiForm = async (e) => {
        e.preventDefault()
        if (people.length == 0) {
            alert("Please select at least one person")
            return
        }
        const name = e.target[0].value
        const description = e.target[1].value
        const date = e.target[2].value
        if (name == "" || description == "" || date == "") {
            alert("Please fill all fields")
            return
        }
        await addDoc(collection(db, "plan"),{
            name: name,
            dailyFocusTime: Number(date),
            members: [userId],
            createdOn: serverTimestamp(),
            createdBy: userId
        }).then((docs) => {
            const batch = writeBatch(db)
            people.forEach((user) => {
                batch.set(doc(db, "users", user, "notifications", docs.id), {
                    type: "invite",
                    from: userId,
                    createdOn: serverTimestamp(),
                    planId: docs.id,
                })
            })
            batch.update(doc(db, "users", userId), {
                plans: arrayUnion(docs.id)
            })

            batch.commit()
            setNotify(true)
            setTimeout(() => {
                setNotify(false)
            }, 2000);
        }).catch((err)=> {
            console.log(err)
        })
        e.target.reset()
    }
    return (
        <>
        <div className="w-full h-full px-4">
            <h1 className="text-2xl">Add Plan</h1>
            <form className="flex flex-col gap-4 justify-center mt-4" onSubmit={submiForm}>
                <div className="flex flex-col gap-1 items-start">
                    <p className="font-semibold">Name</p>
                    <input type="text" placeholder="Name" id="Name" className="border border-gray-300 p-2 rounded" />
                </div>
                <div className="flex gap-4 ">
                    <div className="flex flex-col gap-1 items-start">
                        <p className="font-semibold">Description</p>
                        <textarea type="text" placeholder="Description" id="Description" className="resize-none border border-gray-300 p-2 rounded" />
                    </div>
                    <div className="flex flex-col gap-1 items-start">
                        <p className="font-semibold">Daily Focus Time{"(min)"}</p>
                        <input type="number" id="focus" className="border border-gray-300 p-2 rounded" />
                    </div> 
                </div> 
                
                <div className="flex flex-col gap-1 items-start ">
                    <p className="font-semibold">People</p>
                    <div className="flex flex-col gap-2 rounded-lg bg-gray-100 p-2 max-h-28 overflow-y-scroll">
                        {peoples.length > 0 ? peoples.map((user) => {
                            return <div className="rounded-sm text-left hover:bg-gray-200" key={user}  onClick={() => {!people.includes(user) ? people.push(user): removeUser(user)}} ><UserAdd id={user} /></div>}) : <div>Add some Friends</div>}
                    </div>
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4 w-fit">Add Plan</button>
            </form>
        </div>
        <Alerts message={"Plan Created"} visible={notify} />
        </>
    )
}