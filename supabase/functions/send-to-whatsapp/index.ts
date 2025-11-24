import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import nodemailer from "npm:nodemailer@6.9.7";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  businessType: string;
  subject: string;
  message: string;
}

const transporter = nodemailer.createTransport({
  host: Deno.env.get("SMTP_HOST") || "smtp.gmail.com",
  port: parseInt(Deno.env.get("SMTP_PORT") || "587"),
  secure: false, // true for 465, false for other ports
  auth: {
    user: Deno.env.get("SMTP_USER"),
    pass: Deno.env.get("SMTP_PASS"),
  },
});

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const contactInfo: ContactInfo = await req.json();

    // Validate required fields
    if (!contactInfo.firstName || !contactInfo.lastName || !contactInfo.email ||
      !contactInfo.phone || !contactInfo.businessType || !contactInfo.subject ||
      !contactInfo.message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send email using Nodemailer
    const info = await transporter.sendMail({
      from: `"Website Chatbot" <${Deno.env.get("SMTP_USER")}>`,
      to: "engineerdheeraj97@gmail.com",
      subject: `New Contact from ${contactInfo.firstName} ${contactInfo.lastName}`,
      html: `
        <h2>New Contact from Website Chatbot</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${contactInfo.firstName} ${contactInfo.lastName}</p>
          <p><strong>Email:</strong> ${contactInfo.email}</p>
          <p><strong>Phone:</strong> ${contactInfo.phone}</p>
          <p><strong>Business Type:</strong> ${contactInfo.businessType}</p>
          <p><strong>Subject:</strong> ${contactInfo.subject}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${contactInfo.message}</p>
        </div>
      `,
    });

    console.log("Nodemailer Response:", info);

    // Send confirmation email to the user
    try {
      const confirmationInfo = await transporter.sendMail({
        from: `"Team Dheeraj" <${Deno.env.get("SMTP_USER")}>`,
        to: contactInfo.email,
        subject: "✅ Request Successfully Submitted",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Hi ${contactInfo.firstName},</h2>
            <p style="color: #666; line-height: 1.6;">
              Thank you for reaching out! Your request has been successfully submitted to Dheeraj.
            </p>
            <p style="color: #666; line-height: 1.6;">
              Our team is reviewing the details and will get in touch with you as soon as possible.
            </p>
            <p style="color: #666; line-height: 1.6;">
              Warm regards,<br/>
              <strong>Team Dheeraj</strong>
            </p>
            <div style="margin: 30px 0; text-align: center;">
              <img src="https://i.postimg.cc/sfc5JVhn/my-banner.png" alt="Unicorn Data Analyst" style="width: 100%; max-width: 600px; height: auto; display: block; margin: 0 auto;" />
            </div>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;" />
            <div style="color: #888; font-size: 13px; line-height: 1.6;">
              <p style="margin: 10px 0;">
                You have received mail from <strong>Dheeraj Kumar K</strong>. Kindly go through the mail. 
                If you are interested to contact officially, please feel free to contact through 
                <a href="https://www.linkedin.com/in/dheerajkumar1997/" style="color: #0077B5; text-decoration: none; font-weight: bold;">LinkedIn</a>.
              </p>
            </div>
          </div>
        `,
      });
      console.log("Confirmation email sent to user:", confirmationInfo);
    } catch (confirmError) {
      console.error("Failed to send confirmation email to user:", confirmError);
      // Don't fail the whole request if confirmation email fails
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Email sent successfully",
        data: info
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("send-to-whatsapp error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
