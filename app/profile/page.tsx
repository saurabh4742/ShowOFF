"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PersonalDetailFormSchema } from "@/ZodSchema/zodSchema";
import { z } from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { ChooseSkill } from "@/components/ChooseSkill";
import {  Edit2, Eye, UserRoundCheck } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { ImGithub, ImLinkedin } from "react-icons/im";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
interface User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  clerkUserId: string | null;
  FirstName: string | null;
  LastName: string | null;
  SKill: string | null;
  LinkdinId: string | null;
  GithubId: string | null;
  newUser: boolean;
}
export default function Page() {
  
  const router=useRouter()
  const [firstName, setFirstName] = useState<string|null>("");
  const [lastName, setLastName] = useState<string|null>("");
  const [skill, setSkill] = useState<string|null>("");
  const [linkedinId, setLinkedinId] = useState<string|null>("");
  const [githubId, setGithubId] = useState<string|null>("");
  const { user } = useUser();
  const [saving, setSaving] = React.useState(false);
  const [editing, setEditing] = React.useState(false);
  const [value, setValue] = React.useState("");
  useEffect(()=>{
    async function RegisterIfNot() {
      try {
        const res = await axios.post("/api/register");
      } catch (error) {
        console.log("error");
      }
    }
    async function getProfile() {
      try {
        const res=await axios.get("/api/getprofile");
        const user:User=res.data.user
        setFirstName(user.FirstName)
        setLastName(user.LastName)
        setGithubId(user.GithubId)
        setLinkedinId(user.LinkdinId)
        setSkill(user.SKill)
        
      } catch (error) {
        console.log(error)
      }
    }
    getProfile()
    RegisterIfNot();
  },[])
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const form = useForm<z.infer<typeof PersonalDetailFormSchema>>({
    resolver: zodResolver(PersonalDetailFormSchema),
    defaultValues: {
      FirstName: "",
      LastName: "",
      SKill: value,
      LinkdinId: "",
      GithubId: "",
    },
  });

  async function onSubmit(values: z.infer<typeof PersonalDetailFormSchema>) {
    try {
      const { FirstName, LastName, SKill, LinkdinId, GithubId } = values;
      console.log(values);
      setSaving(true);
      const res = await axios.post("/api/profileupdate", {
        FirstName,
        LastName,
        SKill,
        LinkdinId,
        GithubId,
      });
      form.reset()
      setSaving(false);
      await user?.update({firstName:FirstName,lastName:LastName})
      router.refresh()
      toast.success("Register Succesfuly");
    } catch (error) {
      setSaving(false);
      console.log("error");
    }
  }

  return (
    <div className="flex h-[100vh] my-4 justify-center items-center">
      {firstName? <Card className="sm:w-4/12 w-full m-2  ">
        <CardHeader className="font-semibold w-full justify-center flex items-center">
          <UserRoundCheck />
          {!editing?<Button className="flex justify-center items-center gap-2" variant="secondary" onClick={()=>{
            setEditing(true);
          }}>Switch to edit<Edit2/></Button> :<Button onClick={()=>{
            setEditing(false)
          }} className="flex justify-center items-center gap-2" variant="secondary">Switch to view <Eye/></Button>}
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 ">
              <FormField
                control={form.control}
                name="FirstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name: </FormLabel>
                    {editing?<><FormControl>
                      <Input placeholder="Enter First Name" {...field} />
                    </FormControl>
                    <FormMessage /></>:<span className="text-primary">{firstName}</span>}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="LastName"
                render={({ field }) => (
                  <FormItem >
                    <FormLabel>Last Name: </FormLabel>
                    {editing?<><FormControl>
                      <Input placeholder="Enter Last Name" {...field} />
                    </FormControl>
                    <FormMessage /></>:<span  className="text-primary">{lastName}</span>}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="SKill"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Skill</FormLabel>
                    {editing?<><FormControl>
                      <ChooseSkill
                        value={field.value}
                        onSelect={field.onChange}
                      />
                    </FormControl>
                    <FormMessage /></>:<Label  className="text-primary">{skill}</Label>}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="LinkdinId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel><ImLinkedin size={18}/></FormLabel>
                    {editing?<><FormControl>
                      <Input placeholder="Enter LinkedIn Id" {...field} />
                    </FormControl>
                    <FormMessage /></>:<Label  className="text-primary">{linkedinId}</Label>}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="GithubId"
                render={({ field }) => (
                  <FormItem className="overflow-auto sm:overflow-hidden" >
                    <FormLabel><ImGithub size={18}/></FormLabel>
                    {editing?<><FormControl>
                      <Input placeholder="Enter Github Id" {...field} />
                    </FormControl>
                    <FormMessage /></>:<Label  className=" scroll text-primary">{githubId}</Label>}
                  </FormItem>
                )}
              />
              {editing && <div className="flex w-full justify-center">
                <Button
                  disabled={saving}
                  className="w-full"
                  size="lg"
                  type="submit"
                >
                  {saving ? (
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  ) : (
                    <>Save</>
                  )}
                </Button>
              </div>}
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex-col w-full gap-2 justify-center"></CardFooter>
        <CardDescription className=" flex justify-center"></CardDescription>
      </Card>:<><svg
                      aria-hidden="true"
                      className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg></>}
    </div>
  );
}
