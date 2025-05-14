import { useState } from "react"
import UserData from "./userData"
export default function UserAdd({id}) {
    const [color, setColor] = useState("")
    return (
        <>
        <p onClick={()=> setColor(color === "" ? "#e5e7eb" : "")} className="px-2 cursor-pointer"  style={{backgroundColor: color}}>
            <UserData id={id} withEmail={true} />
        </p>
        </>
    )
}