"use client";
import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { MenuBar } from "../MenuBar";
import { SignedIn } from "@clerk/nextjs";
import ProfileCompletedOrNotWarn from "../ProfileCompletedOrNotWarn";
const Navbar = () => {
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0]);
  const router = useRouter();
  return (
    <div className="text-center shadow-lg rounded-b-xl flex items-center gap-1  sm:p-4 p-2 w-full justify-between ">
      <motion.span
        onClick={() => {
          router.push("/");
        }}
        className="text-primary text-xl sm:text-3xl font-extrabold cursor-pointer"
        drag="x"
        style={{ x, opacity }}
      >
        Show<span className="text-[#F59E0B]">OFF</span>
      </motion.span>
      <SignedIn><ProfileCompletedOrNotWarn value="Verification pending"/></SignedIn>
      <MenuBar />
    </div>
  );
};

export default Navbar;
