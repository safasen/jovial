import { dateConv } from "./dateConv"
import { User } from "lucide-react";
import UserData from "./userData";

export default function TaskBox({keys,forView=false, name,desc,priority,deadline, givenTo, isCompleted=false}) {
    const priorityColor  = () => {
        if (priority == 1) {
            return ["text-red-600 bg-red-200","High"]
        }
        else if (priority == 2) {
            return ["text-yellow-600 bg-yellow-200","Medium"]
        } else if (priority == 3) {
            return ["text-green-600 bg-green-200","Low"]
        } else {
            return ["text-gray-600 bg-gray-200","None"]
        }
    }
    let date;
    if (deadline){
        date = dateConv(deadline.getDate(), deadline.getMonth() + 1, deadline.getYear())
    }
    return (
        <>
        <div className="flex flex-col justify-between p-4 bg-gray-100 rounded-xl shadow-sm gap-8">
            <div className="flex flex-col gap-1">
                <div className="flex justify-between">
                    <h3 className="text-lg font-semibold">{name}</h3>
                    {forView && (<div className="text-sm flex items-center text-gray-500">
                    <User className="bg-gray-200 rounded-full p-1" size={20} />
                    <span className="text-gray-500 ml-2">{givenTo == "floater" ? "Floater" : <UserData id={givenTo} />}</span>
                    </div>)}
                    {isCompleted && <p className={`px-2 py-1 text-sm font-medium  rounded-lg text-green-600 bg-green-200 h-fit w-fit`}>Completed</p>}                 
                </div>
                <p className="text-sm">{desc}</p>
            </div>            
                
            <div className="flex justify-between items-center">
                <p className={`px-2 py-1 text-sm font-medium  rounded-lg ${priorityColor()[0]} w-fit`}>{priorityColor()[1]}</p>
                <p className="text-gray-500 text-sm">{date}</p>
            </div>
        </div>
        </>
    )

}