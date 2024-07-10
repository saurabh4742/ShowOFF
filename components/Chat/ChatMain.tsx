"use client";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import ChatSection from "./ChatSection";
const socket: Socket = io("https://showoffsocketserver.onrender.com", { autoConnect: false });
interface MessageData {
  id: string;
  sender: string;
  receiver: string;
  message: string;
  attachmentUrl?: string; 
  sentAt:Date;
}
const ChatMain: React.FC = () => {
  const id = useParams<{ id: string }>().id;
  const { user } = useUser();
  const [username,setUsername]=useState("") 
  const [imageUrl,setImageurl]=useState("")
  const [onlineStatus,setOnlineStatus]=useState(false)
  const [oldmessages, setOldMessages] = useState<MessageData[]>([
  ])
  useEffect(() => {
    if (user?.id) {
      socket.connect();
      socket.emit("set_user_id", id);
      socket.emit("clerkuserId", user.id);
      socket.on("user-detail",(data:{username:string,imageUrl:string})=>{
        setUsername(data.username)
        setImageurl(data.imageUrl)
      })
      socket.on("All_chat_Solo",(data)=>{
        setOldMessages(data)
      })
      socket.emit("check_online_status");
      socket.on("online_status", (status) => {
        setOnlineStatus(status);
      });
      socket.on("user_disconnected", (data: { userId: string }) => {});
    }

    return () => {
      socket.off("All_chat_Solo")
      socket.off("online_status")
      socket.off("user-detail")
      socket.off("user_disconnected")
      socket.disconnect();
    };
  }, [id, user?.id]);
  return (
    <div>
      <ChatSection username={username} oldmessages={oldmessages} onlineStatus={onlineStatus} imageUrl={imageUrl} socket={socket} />
    </div>
  );
};

export default ChatMain;
