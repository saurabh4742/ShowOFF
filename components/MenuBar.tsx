import {
  Github,
  LifeBuoy,
  LogIn,
  LogOut,
  Menu,
  Settings,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  useUser,
} from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export function MenuBar() {
  const router=useRouter();
  const { user } = useUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-sm h-fit w-fit" variant="link"><Menu /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        {user?.id && <DropdownMenuGroup><DropdownMenuItem onClick={()=>{
          router.push("/profile")
        }} >
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem><DropdownMenuItem  onClick={()=>{
          router.push("/settings")
        }}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>}
        <DropdownMenuSeparator />
        <DropdownMenuItem  >
          <Github className="mr-2 h-4 w-4" />
          <span >GitHub</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={()=>{
          router.push("/support")
        }}>
          <LifeBuoy className="mr-2 h-4 w-4" />
          <span>Support</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          
          <SignedOut>
          <LogIn className="mr-2 h-4 w-4" />
            <motion.div
              className="w-fit h-fit"
              whileHover={{ scale: [1.1, 1.2, 1.1] }}
            >
              {" "}
              
                <SignInButton />
              
            </motion.div>
          </SignedOut>
          <SignedIn>
          <LogOut className="mr-2 h-4 w-4" />
            <motion.div
              className="w-fit h-fit"
              whileHover={{ scale: [1.1, 1.2, 1.1] }}
            >
              
                <SignOutButton />
            
            </motion.div>
          </SignedIn>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
