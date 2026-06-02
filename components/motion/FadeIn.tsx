"use client";

import { motion, type MotionProps, type Variants } from "framer-motion";
import { cn } from "@/lib/utils/cn";

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
} & Omit<MotionProps, "initial" | "animate" | "whileInView" | "viewport" | "transition">;

const variants: Variants = {
  hidden: (custom: { y: number }) => ({ opacity: 0, y: custom.y }),
  visible: { opacity: 1, y: 0 },
};

export default function FadeIn({
  children,
  className,
  delay = 0,
  y = 24,
  once = true,
  ...rest
}: FadeInProps) {
  return (
    <motion.div
      className={cn(className)}
      custom={{ y }}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
