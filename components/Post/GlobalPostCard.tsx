"use client";
import { AlertCircle, CalendarDays, Eye, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FC } from "react";
import { Card, CardContent } from "../ui/card";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
interface Post {
    id: string;
    userId: string;
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
  const router = useRouter();
  return (
    <Card className="p-2 w-full">
      <CardContent >
        <div >
          <Avatar>
            <AvatarImage src={post.imageUrl} />
            <AvatarFallback>{}</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">@{post.firstName && post.lastName && post.firstName+post.lastName}</h4>
            <p className="text-sm">{post.comment}</p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Created {new Date(post.createdAt).toLocaleDateString()}
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
