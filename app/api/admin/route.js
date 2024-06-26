import connectToDB from "@/app/lib/dbConnect";
import Admin from "@/app/models/admin";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();

    const admin = await Admin.find();

    return NextResponse.json({ status: 200, result: admin });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      message: "Error retrieving certificates",
      error: err,
      status: 500,
    });
  }
}
             