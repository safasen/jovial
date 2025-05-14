import { db } from "@/config/firebase";
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
    const token = await request.json();
    try {
        await setDoc(doc(db, "users", token.user), {
            name: token.name,
            email: token.email,
            friends: [],
            plans: [],
            tutorial: true,
            lastLogin: serverTimestamp(),
            lastLogout: serverTimestamp()
        }).catch((error) => {
            return NextResponse.error(error);
        });
        cookies().set("auth-token", token.user);
        return NextResponse.json({status: 200});
    }
    catch (error) {
        return NextResponse.error(error);
    }
}