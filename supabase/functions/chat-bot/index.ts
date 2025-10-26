import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, collectInfo } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");
    
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) throw new Error("Supabase configuration missing");

    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Get the last user message
    const lastMessage = messages[messages.length - 1];
    const userQuery = lastMessage?.content || "";

    console.log("User query:", userQuery);

    // Generate embedding for the user's query
    let relevantContext = "";
    
    if (userQuery && !collectInfo) {
      try {
        const embeddingResponse = await fetch("https://ai.gateway.lovable.dev/v1/embeddings", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "text-embedding-004",
            input: userQuery,
          }),
        });

        if (embeddingResponse.ok) {
          const embeddingData = await embeddingResponse.json();
          const queryEmbedding = embeddingData.data[0].embedding;

          console.log("Query embedding generated, searching knowledge base...");

          // Search for similar content in knowledge base
          const { data: matches, error: matchError } = await supabase
            .rpc("match_knowledge", {
              query_embedding: queryEmbedding,
              match_threshold: 0.3,
              match_count: 5
            });

          if (matchError) {
            console.error("Error searching knowledge base:", matchError);
          } else if (matches && matches.length > 0) {
            console.log(`Found ${matches.length} relevant documents with similarities:`, 
              matches.map((m: any) => m.similarity));
            relevantContext = matches
              .map((match: any) => `${match.content}`)
              .join("\n\n");
          } else {
            console.log("No relevant documents found in knowledge base");
          }
        }
      } catch (error) {
        console.error("Error in RAG retrieval:", error);
      }
    }

    const systemPrompt = collectInfo 
      ? `You are Dheeraj's AI assistant. Your conversation flow follows these steps:

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
- If they give invalid information, politely ask them to correct it`
      : `You are Dheeraj's AI assistant, a RAG-based chatbot specialized in Business Intelligence and answering questions about Dheeraj.

${relevantContext ? `=== KNOWLEDGE BASE CONTEXT (USE THIS TO ANSWER) ===\n${relevantContext}\n=== END OF KNOWLEDGE BASE ===\n\n` : 'No specific context found in knowledge base.\n\n'}

CRITICAL INSTRUCTIONS:
- You MUST use the knowledge base context above to answer questions about Dheeraj and Business Intelligence
- Base ALL answers on the retrieved context when available
- If the context contains relevant information, use it directly in your response
- Answer questions about Dheeraj's expertise, skills, certifications, and experience using the context
- Answer questions about BI topics (Power BI, Tableau, ETL, KPIs, data modeling, etc.) using the context
- Be specific and detailed when you have relevant context
- If no relevant context is found, say "I don't have specific information about that, but I can connect you with Dheeraj to discuss further"
- Be friendly, professional, and conversational
- If users show interest in connecting with Dheeraj, ask if they'd like to leave their contact information`;

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
