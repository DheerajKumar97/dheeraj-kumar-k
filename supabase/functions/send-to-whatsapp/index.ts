import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  businessType: string;
  query: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const contactInfo: ContactInfo = await req.json();
    
    // Validate required fields
    if (!contactInfo.name || !contactInfo.email || 
        !contactInfo.phone || !contactInfo.businessType || !contactInfo.query) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactInfo.email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate phone starts with +
    if (!contactInfo.phone.startsWith('+')) {
      return new Response(
        JSON.stringify({ error: "Phone number must include country code starting with +" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate query length
    if (contactInfo.query.length < 30) {
      return new Response(
        JSON.stringify({ error: "Query must be at least 30 characters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send email using Resend
    const emailResponse = await resend.emails.send({
      from: "Website Chatbot <onboarding@resend.dev>",
      to: ["engineerdheeraj97@gmail.com"],
      subject: `New Contact Request from ${contactInfo.name}`,
      html: `
        <h2>New Contact Request from Website Chatbot</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${contactInfo.name}</p>
          <p><strong>Email:</strong> ${contactInfo.email}</p>
          <p><strong>Phone:</strong> ${contactInfo.phone}</p>
          <p><strong>Business Type:</strong> ${contactInfo.businessType}</p>
          <p><strong>Query/Message:</strong></p>
          <p style="white-space: pre-wrap;">${contactInfo.query}</p>
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
