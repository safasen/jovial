"use client"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "@/config/firebase"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
export default function SignUp() {
    const router = useRouter()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const name = e.target[0].value
        const email = e.target[1].value
        const password = e.target[2].value
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
                updateProfile(userCredential.user, {
                    displayName: name
                })
                const response = await fetch("/api/signUp", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({name: name, email: email, user: userCredential.user.uid})
                })
                if (response.ok) {
                    router.push("/user")
                } else {
                    window.alert("High Server Load")
                }
            }) 
            
        } catch (error) {
            window.alert("High Server Load. Please try again later")
            console.log(error)
        }
    }
    return (
        <div className="bg-white h-screen grid grid-cols-1 lg:grid-cols-2">
            <div className="w-full h-full hidden lg:block">
                <img src="/todoList.svg" alt="logo" className=" bg-gray-100 w-full h-full  object-cover" />
            </div>
            <motion.div initial={{opacity: 0}} animate={{opacity:1}} transition={{duration:0.2}} className="flex flex-col justify-center items-center gap-2">
                <a href="/"><div className="text-blue-700 font-bold text-3xl mb-8">Jo.</div></a>
                <form initial={{opacity: 0}} animate={{opacity:1}} transition={{duration:0.2}} onSubmit={handleSubmit} className="flex flex-col justify-center gap-4">
                    <h1 className="text-3xl font-bold text-center mb-8">Sign Up</h1>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-semibold">Name</p>
                        <input type="text" placeholder="Name" required />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-semibold">Email</p>
                        <input type="email" placeholder="Email" required pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-semibold">Password</p>
                        <input type="password" placeholder="Password" required minLength={4} />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white rounded-lg">Sign Up</button>
                </form>
                <div className="text-sm font-semibold flex items-center">
                    <p>Already a User?</p>
                    <a href="/signIn"><button className="text-blue-700">Sign In</button></a>
                </div> 
            </motion.div>
        </div>
    )
}