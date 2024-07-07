"use client";
import { BicepsFlexed, CalendarDays,  Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FC, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
interface User {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    clerkUserId: string | undefined;
    imageUrl: string;
    FirstName: string | undefined;
    LastName: string | undefined;
    SKill: string | undefined;
    LinkdinId: string | undefined;
    GithubId: string | undefined;
    newUser: boolean;
    location: string | undefined;
    followers: Follower[];
    followings: Following[];
  }
  
  interface Follower {
    id: string;
    clerkuserId: string;
    followedAt: Date;
    imageUrl: string;
  }
  interface Following {
    id: string;
    clerkuserId: string;
    followedAt: Date;
    imageUrl: string;
  }
interface MemberPormp{
    member:User
}
export const MemberCard: FC<MemberPormp> = ({ member }) => {
  const router = useRouter();
  return (
    <Card className="p-4 w-full">
      <CardContent className="w-full" >
        <div >
          <div className="flex items-center gap-1 ">
          <Avatar>
            <AvatarImage src={member.imageUrl} />
            <AvatarFallback>{}</AvatarFallback>
            
          </Avatar>
          <div className="flex  gap-2 items-center ">
                    <span className="text-xs ">{member.SKill}</span>
                  </div>
          
          </div> 
          <h4 className="text-sm font-semibold">@{member.FirstName && member.LastName && member.FirstName+"_"+member.LastName}</h4>
          <div className="w-full space-y-2 my-1">
          <div className="flex gap-1"><Button variant="outline" className="gap-1 text-sm ">Followers <span className="text-bold">{member.followers.length}</span></Button> 
          <Button variant="outline" className="text-sm gap-1 ">Following<span className="text-bold">{member.followings.length}</span></Button></div>
       
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined {new Date(member.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
