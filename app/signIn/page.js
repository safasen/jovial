"use client";
import { auth } from "@/config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import LoadingUi from "../components/loadingUi";
export default function SignIn(){
    const [loading,setLoading] = useState(false)
    const router = useRouter()
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const email = e.target[0].value
        const password = e.target[1].value
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            const res = await fetch("/api/signIn", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(response.user.uid)
            })
            if (res.ok) {
                router.push("/user")
            }else {
                window.alert("High Server Load. Please try again later")
            }
        } catch (error) {
            setLoading(false)
            window.alert("Invalid email or password")

        }
        // fetch("/api/signIn", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({email, password})
        // }).then(async (res) => {
        //     if (res.ok) {
        //         // const response = await res.json()
        //         router.push("/user")
                
        //     }
        //     else {
        //         alert("Invalid email or password")
        //     }
        // })
    }
    if (loading) {
        return (
            <LoadingUi />
        )
    }
    return (
        <>
        <div className="bg-white h-screen grid grid-cols-2">
            <img src="/Work time.svg" alt="logo" className="m-10 bg-gray-100 rounded-lg" />
            <motion.div initial={{opacity: 0}} animate={{opacity:1}} transition={{duration:0.2}} className="flex flex-col justify-center items-center gap-2 bg-white">
                <a href="/"><div className="text-blue-700 font-bold text-3xl mb-8">Jo.</div></a>
                <form onSubmit={handleSubmit} className=" flex flex-col justify-center gap-4">
                    <h1 className="text-2xl font-bold text-center mb-8">Sign In</h1>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-semibold">Email</p>
                        <input type="email" placeholder="User Email" required pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-semibold">Password</p>
                        <input type="password" placeholder="Password" required minLength={4}/>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white rounded-lg mt-2">Sign In</button>
                </form>
                <div className="text-sm font-semibold flex items-center">
                    <p>New User?</p>
                    <a href="/signUp"><button className="text-blue-700">Sign Up</button></a>
                </div>  
            </motion.div>
        </div>

        </>
    )
}