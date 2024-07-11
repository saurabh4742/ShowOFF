"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
// import { ScrollArea } from "@/components/ui/scroll-area"
import { SearchIcon } from "lucide-react"

export default function MessagePage() {
  return (
    <div className="w-full h-full flex flex-col">
      <header className="bg-background px-4 py-3 border-b flex items-center justify-between md:px-6">
        <h1 className="text-lg font-semibold">Messages</h1>
        {/* <Button variant="ghost" size="icon" className="rounded-full">
          <SearchIcon className="w-5 h-5" />
          <span className="sr-only">Search</span>
        </Button> */}
      </header>
      <div className="flex-1 overflow-auto bg-muted">
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Card className="bg-background p-4 flex items-center gap-4">
            <Avatar className="relative">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>CN</AvatarFallback>
              <span className="absolute bottom-0 right-0 bg-green-500 rounded-full w-3 h-3 border-2 border-background" />
            </Avatar>
            <div className="flex-1">
              <div className="font-medium">Olivia Davis</div>
              <div className="text-sm text-muted-foreground">Online</div>
            </div>
          </Card>
          <Card className="bg-background p-4 flex items-center gap-4">
            <Avatar className="relative">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>JP</AvatarFallback>
              <span className="absolute bottom-0 right-0 bg-green-500 rounded-full w-3 h-3 border-2 border-background" />
            </Avatar>
            <div className="flex-1">
              <div className="font-medium">Jared Palmer</div>
              <div className="text-sm text-muted-foreground">Online</div>
            </div>
          </Card>
          <Card className="bg-background p-4 flex items-center gap-4">
            <Avatar className="relative">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>ML</AvatarFallback>
              <span className="absolute bottom-0 right-0 bg-green-500 rounded-full w-3 h-3 border-2 border-background" />
            </Avatar>
            <div className="flex-1">
              <div className="font-medium">Max Leiter</div>
              <div className="text-sm text-muted-foreground">Online</div>
            </div>
          </Card>
          <Card className="bg-background p-4 flex items-center gap-4">
            <Avatar className="relative">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>SD</AvatarFallback>
              <span className="absolute bottom-0 right-0 bg-green-500 rounded-full w-3 h-3 border-2 border-background" />
            </Avatar>
            <div className="flex-1">
              <div className="font-medium">Shu Ding</div>
              <div className="text-sm text-muted-foreground">Online</div>
            </div>
          </Card>
          <Card className="bg-background p-4 flex items-center gap-4">
            <Avatar className="relative">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>CN</AvatarFallback>
              <span className="absolute bottom-0 right-0 bg-green-500 rounded-full w-3 h-3 border-2 border-background" />
            </Avatar>
            <div className="flex-1">
              <div className="font-medium">Colm Tuite</div>
              <div className="text-sm text-muted-foreground">Online</div>
            </div>
          </Card>
          <Card className="bg-background p-4 flex items-center gap-4">
            <Avatar className="relative">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>CN</AvatarFallback>
              <span className="absolute bottom-0 right-0 bg-green-500 rounded-full w-3 h-3 border-2 border-background" />
            </Avatar>
            <div className="flex-1">
              <div className="font-medium">Olivia Davis</div>
              <div className="text-sm text-muted-foreground">Online</div>
            </div>
          </Card>
          <Card className="bg-background p-4 flex items-center gap-4">
            <Avatar className="relative">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>JP</AvatarFallback>
              <span className="absolute bottom-0 right-0 bg-green-500 rounded-full w-3 h-3 border-2 border-background" />
            </Avatar>
            <div className="flex-1">
              <div className="font-medium">Jared Palmer</div>
              <div className="text-sm text-muted-foreground">Online</div>
            </div>
          </Card>
          <Card className="bg-background p-4 flex items-center gap-4">
            <Avatar className="relative">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>ML</AvatarFallback>
              <span className="absolute bottom-0 right-0 bg-green-500 rounded-full w-3 h-3 border-2 border-background" />
            </Avatar>
            <div className="flex-1">
              <div className="font-medium">Max Leiter</div>
              <div className="text-sm text-muted-foreground">Online</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}