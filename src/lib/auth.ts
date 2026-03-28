import { betterAuth, string } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";
// If your Prisma file is located elsewhere, you can change the path

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS,
  },
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  trustedOrigins: [process.env.APP_URL!],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "USER",
        required: true,
      },
      phone: {
        type: "string",
        required: false,
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      console.log({ user, url, token });
      const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;
      const info = await transporter.sendMail({
        from: '"prisma blog app" <prismablog@ph.com>',
        to: "yeahieakhan2018@gmail.com",
        subject: "Hello ✔",
        text: "Hello world?", // Plain-text version of the message
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Email Verification</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f7; font-family:Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f7; padding:20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; padding:40px;">
          
          <!-- Logo / App Name -->
          <tr>
            <td align="center" style="font-size:24px; font-weight:bold; color:#333;">
              Prisma Blog
            </td>
          </tr>

          <!-- Spacer -->
          <tr><td height="20"></td></tr>

          <!-- Title -->
          <tr>
            <td style="font-size:20px; font-weight:bold; color:#333;">
              Verify your email address
            </td>
          </tr>

          <!-- Spacer -->
          <tr><td height="10"></td></tr>

          <!-- Message -->
          <tr>
            <td style="font-size:16px; color:#555; line-height:1.5;">
              Thanks for signing up! Please confirm your email address by clicking the button below.
            </td>
          </tr>

          <!-- Spacer -->
          <tr><td height="30"></td></tr>

          <!-- Button -->
          <tr>
            <td align="center">
              <a href="${verificationUrl}" 
                 style="background-color:#4f46e5; color:#ffffff; padding:12px 24px; text-decoration:none; border-radius:6px; font-size:16px; display:inline-block;">
                Verify Email
              </a>
            </td>
          </tr>

          <!-- Spacer -->
          <tr><td height="30"></td></tr>

          <!-- Fallback -->
          <tr>
            <td style="font-size:14px; color:#777; line-height:1.5;">
              If the button above doesn’t work, copy and paste this link into your browser:
              <br/>
              <a href="{{VERIFICATION_URL}}" style="color:#4f46e5;">
              ${verificationUrl}
              </a>
            </td>
          </tr>

          <!-- Spacer -->
          <tr><td height="30"></td></tr>

          <!-- Footer -->
          <tr>
            <td style="font-size:12px; color:#aaa; text-align:center;">
              If you didn’t create an account, you can safely ignore this email.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`, // HTML version of the message
      });

      console.log("Message sent:", info.messageId);
    },
  },
});
