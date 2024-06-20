"use client";
import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { MenuBar } from "../MenuBar";
const Navbar = () => {
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0]);
  const router = useRouter();
  return (
    <div className="bg-background shadow-lg rounded-b-xl flex items-center  p-4 w-full justify-between ">
      <motion.span
        onClick={() => {
          router.push("/");
        }}
        className="text-primary text-xl sm:text-3xl font-extrabold cursor-pointer"
        drag="x"
        style={{ x, opacity }}
      >
        ShowOFF
      </motion.span>
      <MenuBar />
    </div>
  );
};

export default Navbar;
