import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/prismadb";
import { NextResponse, NextRequest } from "next/server";
import axios from "axios";
import { JobTransform } from "@/Hooks/ForJobAPI";

export async function GET(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const me = await db.user.findFirst({
      where: { clerkUserId: user.id },
    });

    if (!me?.SKill || !me.location) {
      return NextResponse.json({ message: "Missing skill or location" }, { status: 400 });
    }

    // Construct a query for internships
    const query = `${JobTransform(me.SKill)}+internship`;

    const response = await axios.get("https://serpapi.com/search", {
      params: {
        engine: "google_jobs",
        q: query,
        location: JobTransform(me.location),
        api_key: process.env.API_KEY,
      },
    });

    const allJobs = response.data?.jobs_results || [];

    // Filter results to include only internships
    const internshipJobs = allJobs.filter((job: any) => {
      const title = job.title?.toLowerCase() || "";
      const description = job.description?.toLowerCase() || "";
      const schedule = job.detected_extensions?.schedule_type?.toLowerCase() || "";

      return (
        title.includes("intern") ||
        description.includes("internship") ||
        schedule.includes("internship")
      );
    });

    return NextResponse.json({ internships: internshipJobs }, { status: 200 });

  } catch (error) {
    console.error("Error fetching internships:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
