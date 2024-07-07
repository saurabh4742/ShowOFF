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
import { ChooseSkill } from "@/components/ChooseSkill";
import { Check } from "lucide-react";
import { ChooseLocation } from "@/components/ChooseLocation";
import Profile from "@/components/Profile";
interface User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  clerkUserId: string | undefined;
  FirstName: string | undefined;
  LastName: string | undefined;
  SKill: string | undefined;
  LinkdinId: string | undefined;
  GithubId: string | undefined;
  newUser: boolean;
  location: string | undefined;
}
import { useToast } from "@/components/ui/use-toast"
export default function Page() {
  const { toast } = useToast()
  const [newuser, setNewUser] = useState(false);
  const [saving, setSaving] = React.useState(false);
  const [editing, setEditing] = React.useState(false);
  useEffect(() => {
    async function RegisterIfNot() {
      try {
        const res = await axios.post("/api/register");
      } catch (error) {
        console.log("error");
      }
    }
    async function getProfile() {
      try {
        const res = await axios.get("/api/getprofile");
        const user: User = res.data.user;
        setNewUser(user.newUser);      } catch (error) {
        console.log(error);
      }
    }
    getProfile();
    RegisterIfNot();
  }, []);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const form = useForm<z.infer<typeof PersonalDetailFormSchema>>({
    resolver: zodResolver(PersonalDetailFormSchema),
    defaultValues: {
      FirstName: "",
      LastName: "",
      SKill: "",
      LinkdinId: "",
      Location: "",
      GithubId: "",
    },
  });

  async function onSubmit(values: z.infer<typeof PersonalDetailFormSchema>) {
    try {
      const { FirstName, LastName, SKill, LinkdinId, GithubId, Location } =
        values;
      console.log(values);
      setSaving(true);
      const res = await axios.post("/api/profileupdate", {
        FirstName,
        LastName,
        SKill,
        Location,
        LinkdinId,
        GithubId,
      });
      form.reset();
      setSaving(false);
      setEditing(false);
      toast({
        variant:"default",
        title: "Notification",
        description: "Profile Updated",
      })
      window.location.reload();
    } catch (error) {
      setSaving(false);
      console.log("error");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] my-4  ">
      {!editing ? (
        <>
          <Profile editing={editing} setEditing={setEditing} />
        </>
      ) : (
        <Card className="sm:w-3/12 w-full m-2  ">
          <CardHeader className="font-semibold w-full justify-center flex items-center">
            
          <Button
          variant="secondary"
                onClick={() => {
                  setEditing(false);
                }}
                className="flex justify-center sm:w-8/12 rounded-none w-full items-center gap-2"
              >
                Switch to View 
              </Button>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3 "
              >
                <FormField
                  control={form.control}
                  name="FirstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Enter First Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="LastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Enter Last Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Location"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormControl>
                        <ChooseLocation
                          value={field.value}
                          onSelect={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="SKill"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormControl>
                        <ChooseSkill
                          value={field.value}
                          onSelect={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="LinkdinId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Enter LinkedIn Id" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="GithubId"
                  render={({ field }) => (
                    <FormItem className="overflow-auto sm:overflow-hidden">
                      <FormControl>
                        <Input placeholder="Enter Github Id" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex w-full justify-center">
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
                      <>
                        {newuser ? (
                          <>
                            Verify <Check />
                          </>
                        ) : (
                          <>Save</>
                        )}
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="flex-col w-full gap-2 justify-center"></CardFooter>
          <CardDescription className=" flex justify-center"></CardDescription>
        </Card>
      )}
    </div>
  );
}
