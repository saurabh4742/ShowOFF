"use client"
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const  Page = () => {
    const router=useRouter();
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
  return (
    <div className='w-full min-h-screen flex flex-col justify-center items-center gap-5'>404 Page Not Found
    <Button variant="link" onClick={()=>{
        router.push("/")
    }}>Back To Home</Button>
    </div>
  )
}

export default  Page