import { motion, AnimatePresence } from "framer-motion";

export default function Alerts({message, visible}) {
    return (
        <AnimatePresence>
            {visible && <motion.div key="alert" initial={{scale:0.75, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.75, opacity:0}} className="fixed top-0 left-0 w-screen flex justify-center items-center mt-4 ">
                <p className="rounded-xl w-fit py-2 px-4 bg-gray-800 text-white z-50">{message}</p>
            </motion.div>}
        </AnimatePresence>
    )
}