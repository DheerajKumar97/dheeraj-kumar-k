import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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

    // Send email using Resend
    const emailResponse = await resend.emails.send({
      from: "Website Chatbot <onboarding@resend.dev>",
      to: ["engineerdheeraj97@gmail.com"], // Your email
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

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Email sent successfully"
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
