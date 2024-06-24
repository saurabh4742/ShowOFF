"use client";
import { AlertCircle, CalendarDays } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FC } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
interface Post {
    id: string;
    clerkuserId: string;
    comment: string;
    imageUrl: string;
    firstName?: string;
    lastName?: string;
    createdAt: Date;
  }
interface PostPromp {
  post: Post;
}

export const GlobalPostCard: FC<PostPromp> = ({ post }) => {
  return (
    <Card className="p-4 w-full">
      <CardContent className="w-full">
        <div >
          <Avatar>
            <AvatarImage src={post.imageUrl} />
            <AvatarFallback>{post.firstName && post.firstName[0]}</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">@{post.firstName}</h4>
            <p className="text-sm">{post.comment}</p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Created {new Date(post.createdAt).toLocaleString()}
              </span>
            </div>
            <Button 
            variant="ghost"
              onClick={() => {
                
              }}
            >
              <AlertCircle className="mr-2 h-4 w-4" />
              Report
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
