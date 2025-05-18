import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const username = process.env.EMAIL_USERNAME;
    const password = process.env.EMAIL_PASSWORD;
    const { email, name, issue, fileurl } = await req.json();

    const transporter = nodemailer.createTransport({
      port: 500,
      debug: true,
      secure: false,
      service: "gmail",
      auth: {
        user: username,
        pass: password,
      },
    });

    // Email to company with user details
    const supportEmailTemplate = `
      <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 40px auto; background-color: #fff; border-radius: 10px; box-shadow: 0 0 15px rgba(0,0,0,0.1); overflow: hidden;">
          <div style="background-color: #372aac; color: white; padding: 20px; text-align: center;">
            <h2 style="margin: 0;">New User Issue Reported 🚨</h2>
          </div>
          <div style="padding: 30px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Issue:</strong></p>
            <p style="margin-left: 10px; color: #444;">${issue}</p>
            ${
              fileurl
                ? `<p style="margin-top: 20px;">
                    <a href="${fileurl}" style="padding: 10px 15px; background-color: #372aac; color: #fff; text-decoration: none; border-radius: 5px;">📎 View Attachment</a>
                  </p>`
                : ""
            }
          </div>
          <div style="background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 13px; color: #777;">
            © ${new Date().getFullYear()} ShowOFF. All rights reserved.
          </div>
        </div>
      </body>
    `;

    await transporter.sendMail({
      from: username,
      to: process.env.COMPANY_EMAIL_ID,
      replyTo: process.env.COMPANY_EMAIL_ID,
      subject: `Mail from ShowOFF users.`,
      ...(fileurl
        ? {
            attachments: [
              {
                filename: 'attachment',
                path: fileurl,
              },
            ],
          }
        : {}),
      html: supportEmailTemplate,
    });

    // Auto-response to user
    const responseTemplate = `
      <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 0; margin: 0;">
        <div style="max-width: 600px; margin: 40px auto; background-color: #fff; border-radius: 10px; box-shadow: 0 0 15px rgba(0,0,0,0.1); overflow: hidden;">
          <div style="background-color: #372aac; color: white; padding: 20px; text-align: center;">
            <h2 style="margin: 0;">You're Heard 💜</h2>
          </div>
          <div style="padding: 30px; color: #333;">
            <p style="font-size: 16px;">Hey <strong>${name}</strong>,</p>
            <p style="font-size: 16px;">
              Your voice matters to us more than you know. 💌<br/>
              We’re incredibly grateful you took the time to share your issue with us.
            </p>
            <p style="font-size: 16px;">
              You're not just a user — you’re a part of the <strong style="color: #372aac;">ShowOFF family</strong>, and we’ve got your back!
            </p>
            <p style="font-size: 16px;">
              Sit back, grab your favorite snack 🍫, and we’ll take it from here.<br/>
              Our team is already on it and you’ll hear from us soon!
            </p>
            <p style="font-size: 16px; font-weight: bold; color: #372aac;">
              You're amazing. Don't forget that. 💪
            </p>
          </div>
          <div style="background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 13px; color: #777;">
            © ${new Date().getFullYear()} ShowOFF. Always here for you.
          </div>
        </div>
      </body>
    `;

    await transporter.sendMail({
      from: username,
      to: email,
      replyTo: email,
      subject: `ShowOFF Customer Support`,
      html: responseTemplate,
    });

    return new NextResponse(
      JSON.stringify({ message: "Your 📧 mail has been sent." }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Mail sending error:", error);
    return new NextResponse(JSON.stringify({ message: "Server error." }), {
      status: 501,
    });
  }
}
