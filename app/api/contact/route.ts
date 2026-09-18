import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, email, company, service, message } = await request.json().catch(() => ({}));

  if (![name, email, company, service, message].every((value) => typeof value === "string" && value.trim())) {
    return NextResponse.json({ success: false, error: "All fields are required." }, { status: 400 });
  }
  if (name.length > 100 || email.length > 160 || company.length > 140 || service.length > 100 || message.length > 4000 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ success: false, error: "Please check the details." }, { status: 400 });
  }

  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: "Alpha Narrative <onboarding@resend.dev>",
      to: "alphanarrativepro@gmail.com",
      subject: `New Alpha Narrative project brief from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nEngagement: ${service}\n\nBusiness need:\n${message}`,
    });
    if (result.error) throw new Error("Email delivery failed.");

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Could not send the message." }, { status: 500 });
  }
}
