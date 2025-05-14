"use client";
import { motion } from "framer-motion";
import FixedBar from "./components/fixedBar";

export default function Home() {
  return (
    <>
    <FixedBar />
    <main className="relative h-screen flex items-center flex-col text-center gap-8 bg-main">
      <div className="mt-40">
        <motion.div initial={{y: 10,opacity: 0}} animate={{y:0,opacity:1}} transition={{duration:0.2}} className="main-second max-w-5xl" >
          <h1 className="text-7xl font-semibold"><span className="opacity-50 transition-opacity ease-in hover:opacity-100">Re-invent</span> yourself
          </h1>
        </motion.div>
      </div>
      <div className="flex flex-col gap-8 items-center max-w-xl">
        <motion.h2 initial={{y:10,opacity: 0}} animate={{y:0,opacity:1}} transition={{duration:0.2, delay:0.1}}>Dive into a space where you can structure your thoughts all in one place</motion.h2>
        <motion.a initial={{opacity: 0}} animate={{opacity:1}} transition={{duration:0.2, delay: 0.2}} href="/signUp"><button className="bg-blue-500 text-xl px-4 text-white rounded-lg">Get Started</button></motion.a>
      </div>
      <motion.div initial={{y:10,opacity: 0}} animate={{y:0,opacity:1}} transition={{duration:0.2, delay: 0.3}} className="absolute flex justify-center gap-4 items-end bottom-12 w-screen ">
        <img src="/todoList.svg" alt="logo" className="w-80 h-80 bg-slate-100 rounded-lg" />
        <img src="/Work time.svg" alt="logo" className=" w-60 h-60 bg-slate-100 rounded-lg" />
        <img src="/Socialmedia.svg" alt="logo" className="w-60 h-60  bg-slate-100 rounded-lg" />
        <img src="/Notebook.svg" alt="logo" className="w-80 h-80 bg-slate-100 rounded-lg" />
      </motion.div>
    </main>
    </>
  );
}
