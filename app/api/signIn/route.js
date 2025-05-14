import { auth, db } from "@/config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(request) {
    const token = await request.json();
    try {
        await updateDoc(doc(db, "users", token), {
            lastLogin: serverTimestamp()
        }).catch((error) => {
            return NextResponse.error(error);
        });
        cookies().set("auth-token", token);
        return NextResponse.json({status: 200});
    }
    catch (error) {
        return NextResponse.error(error);
    }
}

export async function DELETE(request) {
    const user = await request.json();
    try {
        await updateDoc(doc(db, "users", user), {
            lastLogout: serverTimestamp()
        }).catch((error) => {
            return NextResponse.error(error);
        });
        cookies().delete("auth-token");
        return NextResponse.json({status: 200});
    }
    catch (error) {
        return NextResponse.error(error);
    }
}