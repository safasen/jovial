import { User, UserPlus, UserSearch, X } from "lucide-react"
import Friends from "./friends"
import { useEffect, useState } from "react"
import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, Timestamp, where } from "firebase/firestore"
import LoadingBox from "./loadingBox"
import { db } from "@/config/firebase"
import Alerts from "./alerts"
export default function FriendsSide({userId, plan, users}) {
    const [friends, setFriends] = useState(null)
    const [search, setSearch] = useState(null)
    const [open, setOpen] = useState(false)
    const [notify, setNotify] = useState(false)
    useEffect(()=> {
        if (userId == null) {
            return
        }
        async function fetchData(){
            await getDoc(doc(db, "users", userId)).then((doc) => {
                if (doc.exists()) {
                    setFriends(doc.data().friends)
                }
            })
        }
        fetchData()
    },[userId])

    async function searchHandle(e){
        e.preventDefault()
        const value = e.target[0].value
        if (value == "") {
            return
        }
        const res = await getDocs(query(collection(db, "users"),where("email","==", value))).then((docs) => {
            if (docs.docs.length > 0) {
                const user = docs.docs.map((doc) =>({...doc.data(), id: doc.id}))
                setSearch(user[0])
            } else {
                setSearch("not-found")
            }
        })
    }

    const addUser = async () => {
        if (search == null) {
            return
        }
        await addDoc(collection(db, "users",search.id, "notifications"), {
            type: "request",
            from: userId,
            createdOn: serverTimestamp(),
        }).then(() => {
            setNotify(true)
            setTimeout(() => {
                setNotify(false)
            }, 2000);
        } ).catch((err) => console.log(err))
    }


    return (
        <>
        <div>
            <div className="flex items-center justify-between">
                <h1>Friends</h1>
            </div>
            
            <form className="flex flex-col items-end justify-center gap-2 relative mt-4" onSubmit={searchHandle}>
                <input type="text" placeholder="Search" className=" w-full p-2" />
                <button type="submit" className="absolute bg-blue-500 text-white p-1 px-2 mr-1 rounded-lg" ><UserSearch size={24} /></button>
            </form>
            {search && (search != "not-found" ? <><div className="flex justify-between my-2 text-sm text-gray-500 px-2">User <X className="cursor-pointer p-1 rounded-md hover:bg-gray-200" size={24} onClick={()=>{setSearch(null)}} /></div><div className="bg-gray-100 p-4 rounded-lg mt-2 flex justify-between transition duration-300">     
                <div className="flex gap-4 items-center">
                    <User className="bg-gray-200 rounded-full p-2" size={32}/>
                    <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{search.name[0].toUpperCase() + search.name.substring(1)}</h3>
                        {/* <h3 className="font-semibold">Popye</h3> */}
                    </div>

                </div>
                {!friends.includes(search?.id) && <UserPlus onClick={addUser} className="bg-gray-200 rounded-lg p-2 hover:bg-gray-300 cursor-pointer" size={32} />}  
            </div></> :<><div className="flex justify-between my-2 text-sm text-gray-500 px-2">User <X className="cursor-pointer p-1 rounded-md hover:bg-gray-200" size={24} onClick={()=> setSearch(null)} /></div><div className="flex justify-center my-2 text-sm text-gray-500 px-2">No such user exist</div></>)}
            <div className="mt-4 mb-2 text-sm text-gray-500 px-2">Friends</div> 
            <div className="space-y-2 w-full h-full">
            {friends ? friends.map((friend) => {
                return <Friends key={friend} friendId={friend} userId={userId} plan={plan} member={plan == "first" || plan =="loading" ? true : (users.includes(friend) ? true: false)}  />
            }  ) : <LoadingBox /> }
            </div>          
        </div>
        <Alerts message={"Friend request sent"} visible={notify} />
        </>
    )
}