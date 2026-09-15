import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, email, company, service, message } = await request.json();

  if (![name, email, company, service, message].every((value) => typeof value === "string" && value.trim())) {
    return NextResponse.json({ success: false, error: "All fields are required." }, { status: 400 });
  }

  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "Alpha Narrative <onboarding@resend.dev>",
      to: "alphanarrativepro@gmail.com",
      subject: `New Alpha Narrative project brief from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nEngagement: ${service}\n\nBusiness need:\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
