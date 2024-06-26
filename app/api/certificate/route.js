import connectToDB from "@/app/lib/dbConnect";
import Certificate from "@/app/models/certificate";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();

    const certificates = await Certificate.find().sort({ createdAt: -1 });

    return NextResponse.json({ status: 200, result: certificates });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      message: "Error retrieving certificates",
      error: err,
      status: 500,
    });
  }
}

export async function POST(req, res) {
  try {
    const body = await req.json();
    console.log(body);
    const certificate = new Certificate(body);
    // await certificate
    //   .save()
    //   .then((result) => {
    //     return NextResponse.json({
    //       message: "Certificate received",
    //       data: result,
    //       status: 201,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     return NextResponse.json({
    //       message: "Error saving certificate",
    //       error: err,
    //       status: 500,
    //     });
    //   });

    let respons = await certificate.save();
    return NextResponse.json({
      message: "Certificate received",
      data: respons,
      status: 201,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      message: "Error saving certificate",
      error: err,
      status: 500,
    });
  }
}
