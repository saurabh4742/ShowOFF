import {
  BriefcaseBusiness,
  Earth,
  Github,
  LayoutDashboard,
  LifeBuoy,
  LogIn,
  LogOut,
  Menu,
  Settings,
  Trash2,
  User,
  Users,
  Zap,
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  useClerk,
  useUser,
} from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import ProfileCompletedOrNotWarn from "./ProfileCompletedOrNotWarn";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ImYoutube } from "react-icons/im";
export function MenuBar() {
  const { signOut} = useClerk();
  const {user}=useUser();
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-sm h-fit w-fit" variant="link">
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="flex justify-center items-center">{user?.id? <Avatar>
  <AvatarImage src={user.imageUrl} />
  <AvatarFallback>{user.firstName && user.firstName[0]}</AvatarFallback>
</Avatar>
:"My Account"}</DropdownMenuLabel>
        <SignedIn>
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => {
                router.push("/profile");
              }}
            >
              <User className="mr-2 h-4 w-4" />
              <span className="mr-2">Profile</span>
              <ProfileCompletedOrNotWarn value="verify now" />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                router.push("/dashboard");
              }}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span className="mr-2">Dashboard</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => {
                router.push("/dashboard/myposts");
              }}
            >
              <Zap className="mr-2 h-4 w-4" />
              <span className="mr-2">My Posts</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                router.push("/dashboard/globe");
              }}
            >
              <Earth className="mr-2 h-4 w-4" />
              <span className="mr-2">Global Feed</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                router.push("/member");
              }}
            ><Users className="mr-2 h-4 w-4" />
              <span className="mr-2">Members</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => {
                router.push("/dashboard/jobs");
              }}
            >
              <BriefcaseBusiness className="mr-2 h-4 w-4" />
              <span className="mr-2">Jobs</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                router.push("/dashboard/github");
              }}
            >
              <Github className="mr-2 h-4 w-4" />
              <span className="mr-2">Repositories</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                router.push("/dashboard/youtube");
              }}
            >
              <ImYoutube className="mr-2 h-4 w-4" />
              <span className="mr-2">Projects</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </SignedIn>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={()=>{
          router.push("https://github.com/saurabh4742")
        }}>
          <Github className="mr-2 h-4 w-4" />
          <span>@Saurabh_Anand</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            router.push("/contact");
          }}
        >
          <LifeBuoy className="mr-2 h-4 w-4" />
          <span>Contact us</span>
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
            <motion.div onClick={() => signOut({ redirectUrl: '/' })}
              className="w-fit h-fit"
              whileHover={{ scale: [1.1, 1.2, 1.1] }}
            >
              Sign out
            </motion.div>
          </SignedIn>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
