"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Props {
    className?: string;
    children: React.ReactNode;
    delay?: number;
    reverse?: boolean;
    id?: string; // Add id to Props interface
}

const Container = ({ children, className, delay = 0.2, reverse, id }: Props) => {
    return (
        <motion.div
            id={id} // Add the id prop here
            className={cn("w-full h-full", className)}
            initial={{ opacity: 0, y: reverse ? -20 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: delay, duration: 0.4, ease: "easeInOut" }}
        >
            {children}
        </motion.div>
    );
};

export default Container;
