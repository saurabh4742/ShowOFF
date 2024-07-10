"use client";

import { JSX, SVGProps, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useParams } from "next/navigation";
import { SendIcon, SmileIcon } from "lucide-react";
import { EmojiPicker } from "./EmojiPicker";
interface MessageData {
  id: string;
  sender: string;
  receiver: string;
  message: string;
  attachmentUrl?: string;
  sentAt: Date;
}
type ChatSectionProps = {
  socket: any; // Replace with actual socket type
  username: string;
  imageUrl: string;
  onlineStatus: boolean;
  oldmessages: MessageData[];
};
export default function ChatSection({
  socket,
  username,
  imageUrl,
  onlineStatus,
  oldmessages,
}: ChatSectionProps) {
  const id = useParams<{ id: string }>().id;
  const inputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [newMessage, setNewMessage] = useState("");
  useEffect(() => {
    if (oldmessages && oldmessages.length > 0) {
      setMessages(oldmessages);
    }
  }, [oldmessages]);

  useEffect(() => {
    socket.on("receive_msg", (data: MessageData) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("receive_msg");
    };
  }, [socket, id]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      socket.emit("send_msg", newMessage);
      setNewMessage("");
    }
  };
  return (
    <div className="grid h-screen w-full bg-background">
      <div className="flex flex-col">
        <div className="flex flex-col justify-center items-center gap-1 border-b bg-muted/40 p-4">
          <div
            className={`rounded-full shadow-lg relative ${
              onlineStatus && `bg-primary p-0.5`
            } `}
          >
            <Avatar>
              <AvatarImage sizes={"40"} src={imageUrl} />
              <AvatarFallback>{}</AvatarFallback>
            </Avatar>
          </div>
          <h2 className="text-sm font-medium">{username}</h2>
        </div>
        <div className="flex-1 overflow-auto p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 flex items-start gap-3 ${
                message.receiver === id ? "justify-end" : "justify-start"
              }`}
            >
              <div className="flex flex-col gap-1">
                <div
                  className={`rounded-2xl px-4 py-2 ${
                    message.receiver === id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p>{message.message}</p>
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(message.sentAt).toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t bg-muted/40 p-4">
          <div className="relative flex items-center gap-2">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className=" w-full border rounded-lg flex items-center h-9 resize-none overflow-hidden bg-background"
            />
            <div className="absolute right-20 top-8   ">
              <EmojiPicker
                onChange={(value) => {
                  setNewMessage(newMessage + value);
                  if (inputRef.current) {
                    inputRef.current.focus();
                  }
                }}
              />
            </div>
            <Button onClick={handleSendMessage}>
              <SendIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
