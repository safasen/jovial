"use client"

import { auth, db } from "@/config/firebase";
import { useAuth } from "@/context/authProvider";
import { signOut } from "firebase/auth";
import { arrayRemove, doc, getDoc, onSnapshot, runTransaction, writeBatch } from "firebase/firestore";
import {  useSearchParams ,useRouter, usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import ProjectName from "./projectName";
import { ChartBarStacked, ChevronsLeft, FileBadge2, Focus, Inbox, LayoutList, Menu, Notebook, PanelsTopLeft, Plus, Settings2, Users, Wind } from "lucide-react";
import AddProject from "./addProject";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { useSidebar } from "@/context/minimized";

export default function NavigateBar() {
    const user = useAuth() || null
    const {minimized, setMinimized} = useSidebar()
    const searchParams = useSearchParams()
    const path = usePathname()
    const plan = searchParams.get("project") || null
    const friends = searchParams.get("friends") || "false"
    const inbox = searchParams.get("inbox") || "false"
    const [project,setProject] = useState(null)
    const [addProject, setAddProject] = useState(false)
    useEffect(() => {
        if (!user) return
        const res = onSnapshot(doc(db, "users", user?.uid), (docs) => {
            const data = docs.data()
            setProject(data?.plans)
            router.push("?project=" + (data?.plans.length > 0 ? data?.plans[0] : "first"))
        })
        return () => res() //cleaning up
    }, [user?.uid])
    const router = useRouter()
    const createQuery = useCallback((name1,name2,value1,value2) => {
            const params = new URLSearchParams(searchParams)
            params.set(name1, value1)
            params.set(name2, value2)
            return params.toString()
        },[searchParams])
    
    const deleteProject = async (id) => {
        try {
            await runTransaction(db, async (transaction) => {
                const res = await transaction.get(doc(db, "plan", id))
                if (res.data().createdBy !== user.uid) {
                    window.alert("You are not the creator of this project")
                    return
                }
                res.data().members.forEach(async (member) => {
                    transaction.update(doc(db, "users", member), {
                        plans: arrayRemove(id)
                    })
                })
                transaction.delete(doc(db, "plan", id))
            })
            router.push("?project=" + (project[0] ? project[0] : "first"))
        }catch (error) {
            window.alert("Error deleting project")
        }
    }
    const logOut = async () => {
        try {
            const res = await signOut(auth)
            const response = await fetch("/api/signIn", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user.uid)
            })
            if (response.ok) {
                window.location.reload()
            } else {
                window.alert("High Server Load")
            }
        } catch (error) {
            window.alert("Something went wrong")
            console.log(error)
        }
        

    }
    return (
        <>       
        <div className={`fixed left-0 ${minimized ? "w-10 p-0 bg-gray-100 shadow-none" : "xl:w-1/5 w-72 p-2 bg-white shadow-md"} h-screen z-50 shadow-md transition-all duration-200`}>
            {minimized && <Menu onClick={()=> setMinimized(!minimized)} className="w-10 h-10 p-2 text-gray-500  rounded-r-lg cursor-pointer" />}
            {!minimized && <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mx-4 h-full max-w-5xl flex flex-col gap-4">
                <div className="flex items-center justify-between"><div className="text-2xl font-bold text-blue-700 flex items-center gap-2"><img src="/logo.png" alt="logo" className="w-12 h-12" />Jo.</div><ChevronsLeft className="text-gray-500 hover:bg-gray-100 p-1 rounded-md cursor-pointer" onClick={()=> setMinimized(!minimized)} size={30} /> </div>
                <div className="flex justify-between items-center gap-4 mb-2 ">
                    {user ? <div className="text-xl font-bold"><span className="text-slate-400">Hello, </span>{user?.displayName}</div>: <div className="text-xl font-bold">Loading</div>}
                    <button className="bg-blue-500 text-white rounded-lg" onClick={logOut} >Sign Out</button>
                </div>
                <div className="space-y-2">
                    <div onClick={()=> {router.push(path + "?" + createQuery("friends","inbox","false",inbox == "false"? "true": "false"))}} className="rounded-lg font-bold transition-all ease-in hover:bg-yellow-50 hover:text-yellow-800 p-2 cursor-pointer flex items-center gap-2"><Inbox size={20} />Inbox</div>
                    <div onClick={()=> {router.push(path + "?" + createQuery("inbox","friends","false",friends == "false"? "true": "false"))}} className="rounded-lg font-bold transition-all ease-in hover:bg-yellow-50 hover:text-yellow-800 p-2 cursor-pointer flex items-center gap-2"><Users size={20} />Friends</div>
                </div>
                <div className="text-sm font-normal flex justify-between items-center">Plans<Plus onClick={()=> setAddProject(true)} className="p-1 hover:bg-yellow-50 rounded-sm" size={24} /></div>
                {project && <div>
                    {project.map((item, index) => {
                        return (
                            <div className="flex flex-col font-extrabold gap-2" key={index}>
                                <div onClick={() => { router.push("?project=" + item) }} className="rounded-lg flex justify-between items-center transition-all ease-in hover:bg-yellow-50 p-1 cursor-pointer mainHover" style={{backgroundColor : plan == item ? "#fefce8" : ""}}><div className="flex items-center gap-2"><Notebook size={20} /><ProjectName id={item} /></div><div className=" rounded-lg hover:bg-yellow-100 p-1 z-10 onhover"><Settings2 size={20} onClick={() => deleteProject(item)} /></div></div>
                                <div className="ml-2 flex-col gap-2 font-bold w-full" style={{display: plan == item ? "flex" : "none"}}>
                                    <div onClick={()=> {router.push("?project=" + item +"&curr=overview")}} className="rounded-lg transition-all ease-in hover:bg-yellow-50 hover:text-yellow-800 p-2 cursor-pointer flex items-center gap-2"><PanelsTopLeft size={20} />Overview</div>
                                    <div onClick={()=> {router.push("?project=" + item +"&curr=analytics")}} className="rounded-lg transition-all ease-in hover:bg-yellow-50 hover:text-yellow-800 p-2 cursor-pointer flex items-center gap-2"><ChartBarStacked size={20} /> Analytics</div>
                                    <div onClick={()=> {router.push("?project=" + item +"&curr=tasks")}} className="rounded-lg transition-all ease-in hover:bg-yellow-50 hover:text-yellow-800 p-2 cursor-pointer flex items-center gap-2"><LayoutList size={20} /> Tasks</div>
                                    <div onClick={()=> {router.push("?project=" + item +"&curr=rankings")}} className="rounded-lg transition-all ease-in hover:bg-yellow-50 hover:text-yellow-800 p-2 cursor-pointer flex items-center gap-2"><FileBadge2 size={20} /> Rankings</div>
                                    <div onClick={()=> {router.push("?project=" + item +"&curr=focus")}} className="rounded-lg transition-all ease-in hover:bg-yellow-50 hover:text-yellow-800 p-2 cursor-pointer flex items-center gap-2"><Focus size={20} /> Focus Period</div>
                                </div>
                            </div>
                        )
                    })}
                </div>}
            </motion.div>}
        </div>
        <AnimatePresence initial={false}>
        {addProject && <motion.div exit={{opacity:0}} className="fixed w-screen h-screen top-0 left-0 z-50">
                <div className="flex w-full h-full justify-center items-center">
                    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="relative bg-white py-4 rounded-lg shadow-lg h-fit flex z-10 flex-col overflow-x-auto gap-4 min-w-60 w-1/3">
                        <AddProject userId={user?.uid} />           
                    </motion.div>
                </div>
                <div onClick={()=> setAddProject(false)} className="absolute w-full h-full top-0 left-0 z-0 bg-black opacity-50"></div>
        </motion.div>}
        </AnimatePresence>
        </>
    );
}