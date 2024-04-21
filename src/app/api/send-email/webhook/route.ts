import { NextResponse } from "next/server";
import { Resend } from "resend";

import { EmailTemplate } from "@/components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

let result: any;

export async function GET(req: Request, res: Response) {
  return NextResponse.json({
    message: "Course enrollment email sent successfully",
    result,
  });
}

export async function POST(req: Request, res: Response) {
  const data = await req.json();
  result = data;

  await resend.emails.send({
    from: "aaryan@buildfastwithai.com",
    to: ["aaryanpatel683@gmail.com"],
    subject: "New Course Enrollment",
    react: EmailTemplate({
      name: data.record.name,
      email: data.record.email,
      phone: data.record.phone,
    }),
    text: "New Course Enrollment Email",
  });

  return NextResponse.json(
    {
      message: "Course enrollment email sent successfully",
      data,
    },
    { status: 200 }
  );
}
