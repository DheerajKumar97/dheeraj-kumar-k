import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, collectInfo } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are Dheeraj's AI assistant. Your role is to help collect contact information from visitors in a friendly, conversational manner.

You need to collect the following information:
- First Name
- Last Name  
- Email (must be from Gmail, Outlook, Yahoo, Zohomail, ProtonMail, or Titan domains)
- Phone Number (international format accepted)
- Business Type (must be one of: Telecom Industry, E-commerce, IT Industry, Sales & Marketing, Media & Entertainment, Travel & Tourism, Finance and Banking, Supply Chain Logistics & Inventory & Order Management, Health Care, Fitness & Recreation, Gaming Industry, Education Industry, Manufacturing, Procurement Management Solution, Social Media and Social Media Analysis, Other)
- Subject
- Message (minimum 60 characters)

Guidelines:
- Be friendly and conversational
- Ask for information naturally, not all at once
- Validate email domains when they provide email
- If they give invalid information, politely ask them to correct it
- Once you have all the information, use the submit_contact_info tool
- Keep responses concise and friendly`;

    const body: any = {
      model: "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
    };

    if (collectInfo) {
      body.tools = [
        {
          type: "function",
          function: {
            name: "submit_contact_info",
            description: "Submit the collected contact information when all required fields are provided",
            parameters: {
              type: "object",
              properties: {
                firstName: { type: "string", description: "User's first name" },
                lastName: { type: "string", description: "User's last name" },
                email: { 
                  type: "string", 
                  description: "User's email (must be from gmail.com, outlook.com, yahoo.com, zohomail.com, protonmail.com, or titan.email)" 
                },
                phone: { type: "string", description: "User's phone number" },
                businessType: { 
                  type: "string",
                  description: "Type of business",
                  enum: [
                    "Telecom Industry",
                    "E-commerce", 
                    "IT Industry",
                    "Sales & Marketing",
                    "Media & Entertainment",
                    "Travel & Tourism",
                    "Finance and Banking",
                    "Supply Chain Logistics & Inventory & Order Management",
                    "Health Care",
                    "Fitness & Recreation",
                    "Gaming Industry",
                    "Education Industry",
                    "Manufacturing",
                    "Procurement Management Solution",
                    "Social Media and Social Media Analysis",
                    "Other"
                  ]
                },
                subject: { type: "string", description: "Subject of inquiry (minimum 5 characters)" },
                message: { type: "string", description: "User's message (minimum 60 characters)" },
              },
              required: ["firstName", "lastName", "email", "phone", "businessType", "subject", "message"],
              additionalProperties: false,
            },
          },
        },
      ];
      body.tool_choice = { type: "function", function: { name: "submit_contact_info" } };
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    console.log("AI response:", data);

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("chat-bot error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
