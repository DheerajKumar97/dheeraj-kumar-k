import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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

    // Format message for WhatsApp
    const whatsappMessage = `*New Contact from Website Chatbot*

*Name:* ${contactInfo.firstName} ${contactInfo.lastName}
*Email:* ${contactInfo.email}
*Phone:* ${contactInfo.phone}
*Business Type:* ${contactInfo.businessType}
*Subject:* ${contactInfo.subject}

*Message:*
${contactInfo.message}`;

    // WhatsApp number (remove + and any spaces/dashes)
    const whatsappNumber = "919080883289";
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Create WhatsApp link
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    console.log("Contact info received:", contactInfo);
    console.log("WhatsApp URL:", whatsappUrl);

    return new Response(
      JSON.stringify({ 
        success: true, 
        whatsappUrl,
        message: "Contact information processed successfully" 
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
