import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/prismadb";
import { NextResponse,NextRequest } from "next/server";
export async function POST(req:NextRequest) {
    try {
        const {Comment}=await req.json();
        const user = await currentUser();
        if(user?.id){
            const existinguser=await db.user.findFirst({where:{
                clerkUserId:user.id
            }})
            if(existinguser){
                await db.post.create({
                    data:{
                        comment:Comment,
                        FirstName:existinguser.FirstName,
                        LastName:existinguser.LastName,
                        imageUrl:existinguser.imageUrl,
                        clerkuserId:user.id,
                        Type:"Global"
                    }
                })
                return NextResponse.json({message:"POST Created"},{status:200})
            }
        }
        return NextResponse.json({message:"Unauthorized"},{status:200})
    } catch (error) {
        console.log("error from get current user")
        return NextResponse.json(error)
    }
}
export async function GET(req:NextRequest) {
    try {
        const user = await currentUser();
        if(user?.id){
               const Post= await db.post.findMany({
                    where:{
                        clerkuserId:user.id
                    }
                })
                return NextResponse.json({post:Post},{status:200})
            }
        return NextResponse.json({message:"Unauthorized"},{status:200})
    } catch (error) {
        console.log("error from get current user")
        return NextResponse.json(error)
    }
}
export async function DELETE(req:NextRequest) {
    try {
        const {postId}=await req.json()
            await db.post.delete({where:{
                id:postId
            }})
        return NextResponse.json({message:"Deleted"},{status:200})
    } catch (error) {
        console.log("error from get current user")
        return NextResponse.json(error)
    }
}