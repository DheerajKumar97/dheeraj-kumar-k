import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message }: ContactEmailRequest = await req.json();
    
    console.log("Processing contact form submission from:", email);

    // Send confirmation email to the user
    const userEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Dheeraj Portfolio <onboarding@resend.dev>",
        to: [email],
        subject: "Thank you for contacting us!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Thank you for reaching out!</h2>
            <p style="color: #666; line-height: 1.6; font-size: 16px;">
              Request sent to Dheeraj through the form you filled. Dheeraj and team will get back to you ASAP.
            </p>
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Your Message:</h3>
              <p style="color: #666;"><strong>Subject:</strong> ${subject}</p>
              <p style="color: #666; white-space: pre-wrap;">${message}</p>
            </div>
            <p style="color: #666;">
              Best regards,<br>
              <strong>Dheeraj and Team</strong>
            </p>
          </div>
        `,
      }),
    });

    const userEmailData = await userEmailResponse.json();
    console.log("Confirmation email sent to user:", userEmailData);

    // Send notification email to the owner
    const ownerEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Portfolio Contact Form <onboarding@resend.dev>",
        to: ["engineerdheeraj97@gmail.com"],
        subject: `New Contact Form Submission: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">New Contact Form Submission</h2>
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="color: #666;"><strong>Name:</strong> ${name}</p>
              <p style="color: #666;"><strong>Email:</strong> ${email}</p>
              <p style="color: #666;"><strong>Subject:</strong> ${subject}</p>
              <p style="color: #666;"><strong>Message:</strong></p>
              <p style="color: #666; white-space: pre-wrap;">${message}</p>
            </div>
            <p style="color: #888; font-size: 12px;">
              This email was sent from your portfolio contact form.
            </p>
          </div>
        `,
      }),
    });

    const ownerEmailData = await ownerEmailResponse.json();
    console.log("Notification email sent to owner:", ownerEmailData);

    return new Response(
      JSON.stringify({ 
        success: true, 
        userEmail: userEmailData,
        ownerEmail: ownerEmailData 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
