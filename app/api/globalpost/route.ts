import { db } from "@/utils/prismadb";
import { NextResponse, NextRequest } from "next/server";
export async function GET(req: NextRequest) {
  try {
    const Post = await db.post.findMany({where:{Type:"Global"},orderBy: {
        createdAt: 'desc'
      }});
      if(Post){
        console.log("Yes it have")
      }
    return NextResponse.json({ post: Post }, { status: 200 });
  } catch (error) {
    console.log("error from get current user");
    return NextResponse.json(error);
  }
}
