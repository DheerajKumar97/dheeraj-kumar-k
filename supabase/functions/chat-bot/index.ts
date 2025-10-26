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

    const systemPrompt = `You are Dheeraj's AI assistant. Your conversation flow follows these steps:

STEP 1: The user has already been introduced to Dheeraj and asked "Are you interested to connect with Dheeraj?"

STEP 2: If user says YES (or shows interest):
- Start collecting contact information naturally and conversationally
- YOU MUST COLLECT ALL 7 REQUIRED FIELDS:
  1. First Name
  2. Last Name  
  3. Email (must be from Gmail, Outlook, Yahoo, Zohomail, ProtonMail, or Titan domains)
  4. Phone Number (international format accepted)
  5. Business Type - MANDATORY (ask "What type of business are you in?" and offer these options: Telecom Industry, E-commerce, IT Industry, Sales & Marketing, Media & Entertainment, Travel & Tourism, Finance and Banking, Supply Chain Logistics & Inventory & Order Management, Health Care, Fitness & Recreation, Gaming Industry, Education Industry, Manufacturing, Procurement Management Solution, Social Media and Social Media Analysis, Other)
  6. Subject (ask "What would you like to discuss with Dheeraj?")
  7. Message (ask "Please tell me more about your needs or project" - must be minimum 60 characters)

IMPORTANT RULES:
- Ask for fields one or two at a time, naturally
- DO NOT skip business type, subject, or message
- ONLY use the submit_contact_info tool when you have collected ALL 7 fields
- Validate email domains when provided
- If user provides invalid info, ask them to correct it

STEP 3: If user says NO (or declines):
- Respond with: "Thank you for visiting our page! If you're looking to grow your business using the power of your data, reach out to us — Dheeraj is here to help you turn data into real insights which helps you to make your Business Decisions."
- Do not ask for any contact information

Guidelines:
- Be friendly and conversational
- Keep responses concise and friendly
- If they give invalid information, politely ask them to correct it`;

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
