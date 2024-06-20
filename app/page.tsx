"use client"
import { Button } from "@/components/ui/button";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { ImLinkedin } from "react-icons/im";
import { IoLogoYoutube } from "react-icons/io";
import { SiGithub, SiIndeed } from "react-icons/si";

export default function Home() {
  useEffect(()=>{
    async function RegisterIfNot() {
      try {
        const res = await axios.post("/api/register");
      } catch (error) {
        console.log("error");
      }
    }
    RegisterIfNot();
  },[])
  const router=useRouter();
  const Trynow=()=>{
    router.push("/dashboard")}
  return (
    <div className="flex pb-4 w-full justify-center pt-10   items-center flex-col gap-6">
      <span className="text-3xl sm:w-2/6 w-full text-center p-4 ">
        Welcome to the World of{" "}
        <span className="font-bold text-[#F59E0B]">Opportunities</span> with{" "}
        <span className="text-primary font-semibold">ShowOFF!</span>
      </span>
      <p className="text-xl sm:w-4/6  text-center text-[#172554] p-6">
        Our app is designed to help you find and recommend open internship and
        job opportunities tailored to your profile. We search across various
        platforms, including major ones like LinkedIn and Indeed, to bring you
        the best matches. Additionally, we provide GitHub links relevant to your
        profile, allowing you to access projects and resources to enhance your
        learning and growth.
      </p>
      <p className="text-xl font-bold sm:w-4/6 text-center p-4">
        Platform Supported
      </p>
      <div className=" sm:flex hidden items-center justify-between gap-4">
        <Button className="w-fit h-fit" variant="outline">
          <IoLogoYoutube size={30} />
        </Button>
        <Button className="w-fit h-fit" variant="outline">
          {" "}
          <SiGithub size={30} />{" "}
        </Button>
        <Button className="w-fit h-fit" variant="outline">
          <ImLinkedin size={30} />
        </Button>
        <Button className="w-fit h-fit" variant="outline">
        <SiIndeed size={30} />
        </Button>
        
      </div>
      <div className=" flex sm:hidden items-center justify-between gap-4">
        <Button className="w-fit h-fit" variant="outline">
          <IoLogoYoutube size={20} />
        </Button>
        <Button className="w-fit h-fit" variant="outline">
          {" "}
          <SiGithub size={20} />{" "}
        </Button>
        <Button className="w-fit h-fit" variant="outline">
          <ImLinkedin size={20} />
        </Button>
        <Button className="w-fit h-fit" variant="outline">
        <SiIndeed size={20} />
        </Button>
        
      </div>
      <div className="flex justify-center items-center">
        <Button onClick={Trynow} className="px-10">
          Try Now
        </Button>
      </div>
    </div>
  );
}
