import { currentUser } from "@clerk/nextjs/server";
export const getUser=async()=>{
    const user=await currentUser()
    if(user)
    return user
    else return null
}