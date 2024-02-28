import { NextResponse } from "next/server";

let record = {
  data: {
    email: "abc@123.com",
  },
};

export async function GET(req: Request, res: Response) {
  return NextResponse.json({
    message: "Course enrollment email sent successfully",
    data: record,
  });
}

export async function POST(req: Request, res: Response) {
  const data = await req.json();
  record = data;

  return NextResponse.json(
    {
      message: "Course enrollment email sent successfully",
    },
    { status: 200 }
  );
}
