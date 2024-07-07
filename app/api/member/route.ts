import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/prismadb";
import { NextResponse,NextRequest } from "next/server";
import AllMemebers from "@/components/Members/AllMembers";
export async function GET(req:NextRequest) {
    try {
        const AllMemebers=await db.user.findMany({
            where: {
                newUser: false,
            },
            select: {
                SKill:true,
                createdAt:true,
                imageUrl:true,
                clerkUserId: true,
                FirstName: true,
                LastName: true,
                followers: {
                    select: {
                        id: true,
                    },
                },
                followings: {
                    select: {
                        id: true,
                    },
                },
            },
        });
        console.log("existing user")
        return NextResponse.json({member:AllMemebers},{status:200})
    } catch (error) {
        console.log("error from get current user")
        return NextResponse.json(error)
    }
}