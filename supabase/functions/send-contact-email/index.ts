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

    // Send only the owner notification email (skip user confirmation due to domain verification)
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
      JSON.stringify({ success: true, ownerEmail: ownerEmailData }),
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
