"use client";
import Link from "next/link";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { JSX, SVGProps } from "react";
import {
  BriefcaseBusiness,
  Github,
  HomeIcon,
  LayoutDashboardIcon,
  LifeBuoy,
  LogIn,
  LogOut,
  MenuIcon,
  MessageCircleMore,
  SettingsIcon,
  User,
  Users,
} from "lucide-react";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  useUser,
} from "@clerk/nextjs";
import { ImYoutube } from "react-icons/im";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
export default function NewResponsiveNav() {
  const { user } = useUser();
  return (
    <div className="flex w-full flex-col bg-background">
      <header className="flex h-16 items-center justify-between border-b bg-card px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <span className="text-lg font-semibold text-primary">
              Show<span className="text-[#F59E0B]">OFF</span>
            </span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <MenuIcon className="h-6 w-6 transition-transform duration-300 group-[.open]:rotate-90" />
              <span className="sr-only">Toggle navigation</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 bg-card p-4">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-2"
                prefetch={false}
              >
                <span className="text-lg font-semibold text-primary">
                  Show<span className="text-[#F59E0B]">OFF</span>
                </span>
                {user?.id && (
              <Avatar>
                <AvatarImage src={user.imageUrl} />
                <AvatarFallback>
                  {user.firstName && user.firstName[0]}
                </AvatarFallback>
              </Avatar>
            )}
              </Link>
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="transition-transform duration-300 group-[.open]:rotate-45"
                >
                  <span className="sr-only">Close navigation</span>
                </Button>
              </SheetClose>
            </div>
            <nav className="mt-6 space-y-2">
              <Link
                href="/"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
                prefetch={false}
              >
                <HomeIcon className="h-5 w-5" />
                Home
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
                prefetch={false}
              >
                <LayoutDashboardIcon className="h-5 w-5" />
                Dashboard
              </Link>
<SignedIn>
<Link
                  href="/dashboard/jobs"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
                  prefetch={false}
                >
                  <BriefcaseBusiness className="h-5 w-5" />
                  Jobs
                </Link>
                <Link
                  href="/dashboard/github"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
                  prefetch={false}
                >
                  <Github className="h-5 w-5" />
                  Repositories
                </Link>
                <Link
                  href="/dashboard/youtube"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
                  prefetch={false}
                >
                  <ImYoutube className="h-5 w-5" />
                  Resources
                </Link>
                <Link
                  href="/member"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
                  prefetch={false}
                >
                  <Users className="h-5 w-5" />
                  Members
                </Link>
                <Link
                  href="/dashboard/youtube"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
                  prefetch={false}
                >
                  <MessageCircleMore className="h-5 w-5" />
                  Messages
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
                  prefetch={false}
                >
                  <SettingsIcon className="h-5 w-5" />
                  Profile
                </Link>
</SignedIn>
              <Link
                href="/contact"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
                prefetch={false}
              >
                <LifeBuoy className="h-5 w-5" />
                Contact Us
              </Link>
              <div className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground">
                <SignedOut>
                  <LogIn className="h-5 w-5" />
                  <SignInButton />
                </SignedOut>
                <SignedIn>
                  <LogOut className="h-5 w-5" />
                  <SignOutButton />
                </SignedIn>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuLink asChild>
              <Link
                href="/"
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                prefetch={false}
              >
                Home
              </Link>
            </NavigationMenuLink>
<SignedIn>
<NavigationMenuItem>
                <NavigationMenuTrigger>
                  <span className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    Features
                  </span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[200px] p-2">
                    <NavigationMenuLink asChild>
                      <Link
                        href="/dashboard"
                        className="group grid h-auto  items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                        prefetch={false}
                      >
                        <div className="text-sm flex justify-center items-center gap-1 font-medium leading-none group-hover:underline">
                          <LayoutDashboardIcon className="h-5 w-5" />
                          Dashboard
                        </div>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/dashboard/jobs"
                        className="group grid h-auto  items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                        prefetch={false}
                      >
                        <div className="text-sm flex justify-center items-center gap-1 font-medium leading-none group-hover:underline">
                          <BriefcaseBusiness className="h-5 w-5" />
                          Jobs
                        </div>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/dashboard/github"
                        className="group grid h-auto  items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                        prefetch={false}
                      >
                        <div className="text-sm flex justify-center items-center gap-1 font-medium leading-none group-hover:underline">
                          <Github className="h-5 w-5" />
                          Repositories
                        </div>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/dashboard/youtube"
                        className="group grid h-auto  items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                        prefetch={false}
                      >
                        <div className="text-sm flex justify-center items-center gap-1 font-medium leading-none group-hover:underline">
                          <ImYoutube className="h-5 w-5" />
                          Resources
                        </div>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/member"
                        className="group grid h-auto  items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                        prefetch={false}
                      >
                        <div className="text-sm flex justify-center items-center gap-1 font-medium leading-none group-hover:underline">
                          <Users className="h-5 w-5" /> Members
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            {/* issue */}
            <NavigationMenuLink asChild>
                <Link
                  href="/profile"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  prefetch={false}
                >
                  <User /> Profile
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link
                  href="/messages"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  prefetch={false}
                >
                  <MessageCircleMore />
                  Messages
                </Link>
              </NavigationMenuLink>
</SignedIn>
              <NavigationMenuLink asChild>
                <Link
                  href="/contact"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  prefetch={false}
                >
                  Contact Us
                </Link>
              </NavigationMenuLink>
            <NavigationMenuLink>
              <div className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                <SignedOut>
                  <LogIn className="mr-2 h-4 w-4" />
                  <SignInButton />
                </SignedOut>
                <SignedIn>
                  <LogOut className="mr-2 h-4 w-4" />
                  <SignOutButton />
                </SignedIn>
              </div>
            </NavigationMenuLink>
            {/* issue */}


          </NavigationMenuList>
        </NavigationMenu>
      </header>
      <main className="flex-1 p-4 md:p-6" />
    </div>
  );
}
