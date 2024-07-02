import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { currentUser } from "@clerk/nextjs/server";
const f = createUploadthing();
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await currentUser()
 
      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { clerkUserId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.clerkUserId);
 
      console.log("file url", file.url);
        
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { fileUrl:file.url };
    }),
    attachment:f({ image: { maxFileSize: "4MB" },audio:{maxFileSize:"128MB"},video:{maxFileSize:"128MB"},pdf:{maxFileSize:"16MB"},text:{maxFileSize:"16MB"} })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { clerkUserId: "something" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.clerkUserId);
 
      console.log("file url", file.url);
        
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { fileUrl:file.url };
    })
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;