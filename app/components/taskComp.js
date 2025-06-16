import { Timestamp } from "firebase/firestore";
import TaskBox from "./taskBox";
import { motion } from "framer-motion";

export default function TaskComp({tasks}) {
    const d = new Date()
    return (
        <>
        <div className="grid grid-cols-3 gap-4 min-w-[940px] mt-8">
            <div className="p-2 bg-red-100 rounded-lg shadow-md">
                <h2 className="font-bold text-center">Overdue</h2>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg shadow-md">
                <h2 className="font-bold text-center">Ongoing</h2>
            </div>
            <div className="p-2 bg-green-100 rounded-lg shadow-md">
                <h2 className="font-bold text-center">Completed</h2>
            </div>
            <div className="bg-red-100 rounded-lg shadow-md p-2 space-y-2">
                {tasks.filter((task)=> task.isCompleted == false && task.deadline._compareTo(Timestamp.now()) == -1).length >0 ?
                tasks.filter((task)=> task.isCompleted == false && task.deadline._compareTo(Timestamp.now()) == -1).map((task, index) => {
                    return <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.1*index}}><TaskBox key={index} name={task.name} desc={task.desc} priority={task.priority} deadline={task.deadline.toDate()} forView={true} givenTo={task.givenTo} /></motion.div>
                }) : <div className="text-center font-bold">No task is Overdue</div>}
            </div>
            <div className="bg-blue-100 rounded-lg shadow-md p-2 space-y-2">
                {tasks.filter((task)=> task.isCompleted == false && task.deadline._compareTo(Timestamp.now()) == 1).length >0 ?
                tasks.filter((task)=> task.isCompleted == false && task.deadline._compareTo(Timestamp.now()) == 1).map((task, index) => {
                    return <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.1*index}}><TaskBox key={index} name={task.name} desc={task.desc} priority={task.priority} deadline={task.deadline.toDate()} forView={true} givenTo={task.givenTo} /></motion.div>
                }) : <div className="text-center font-bold">No ongoing task</div>}
            </div>
            <div className="bg-green-100 rounded-lg shadow-md p-2 space-y-2">
                {tasks.filter((task)=> task.isCompleted == true).length >0 ?
                tasks.filter((task)=> task.isCompleted == true).map((task, index) => {
                    return <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.1*index}}><TaskBox key={index} name={task.name} desc={task.desc} priority={task.priority} deadline={task.deadline.toDate()} forView={true} givenTo={task.completedBy} /></motion.div>
                }) : <div className="text-center font-bold">No completed task</div>}

            </div>
        </div>
        </>
    )
}