import { NextResponse } from "next/server";

let record = {};

export async function GET(req: Request, res: Response) {
  return NextResponse.json({
    message: "Course enrollment email sent successfully",
    data: record,
  });
}

export async function POST(req: Request, res: Response) {
  const data = await req.json();
  const user_info = {
    name: data.record.name,
    email: data.record.email,
    phone: data.record.phone,
  };
  record = user_info;

  return NextResponse.json(
    {
      message: "Course enrollment email sent successfully",
    },
    { status: 200 }
  );
}

// {
//   "message": "Course enrollment email sent successfully",
//   "data": {
//       "type": "INSERT",
//       "table": "course-customers",
//       "record": {
//           "id": "9605bd45-f674-4b0d-94fa-1cee2773b546",
//           "name": "test",
//           "email": "test@test.t",
//           "phone": "34235",
//           "price": null,
//           "created_at": "2024-02-28T09:59:49.804321+00:00",
//           "updated_at": null,
//           "isPurchased": null,
//           "hostedInvoiceUrl": null,
//           "stripeCheckoutId": null,
//           "stripeCustomerId": null
//       },
//       "schema": "public",
//       "old_record": null
//   }
// }