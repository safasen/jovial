"use client"
import { Suspense } from "react"
import User from "../components/user"

export default function UserPage(){
    return (
        <Suspense fallback={<div className="flex justify-center items-center h-screen"><h1 className="text-4xl font-semibold">Loading...</h1></div>}>
            <User />
        </Suspense>
    )
}