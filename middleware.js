
import { onAuthStateChanged } from "firebase/auth";
import { NextResponse } from "next/server";
import { auth } from "./config/firebase";
import { cookies } from "next/headers";
export function middleware(request) {
    const url = request.url
    const response = NextResponse.next()
    // console.log(url)
    // onAuthStateChanged(auth, (user)=> {
    //     if (user) {
    //         response.cookies.set("auth-token", user.refreshToken)
    //     }else {
    //         response.cookies.delete("auth-token")
    //     }
    // })
    // if (url.includes("/signIn")){
    //     return response
    // }
    if (!request.cookies.has("auth-token")) {
        return NextResponse.redirect(new URL("/signIn", request.url))
    }
}

export const config = {
    matcher: '/user/:path*',
}