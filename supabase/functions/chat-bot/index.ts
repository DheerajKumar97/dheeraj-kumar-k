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
      ? `You are Dheeraj's AI assistant collecting contact information.

CRITICAL RULES FOR COLLECTING INFORMATION:
- You MUST collect ALL 5 REQUIRED FIELDS before submitting:
  1. Name (full name)
  2. Email (valid email address)
  3. Phone Number (must include country code, format: +XX XXXXXXXXXX)
  4. Business Type (ask user to select from: Telecom Industry, E-commerce, IT Industry, Sales & Marketing, Media & Entertainment, Travel & Tourism, Finance and Banking, Supply Chain Logistics & Inventory & Order Management, Health Care, Fitness & Recreation, Gaming Industry, Education Industry, Manufacturing, Procurement Management Solution, Social Media and Social Media Analysis, Other)
  5. Query/Message (what they want to discuss with Dheeraj - minimum 30 characters)

COLLECTION PROCESS:
- Ask for fields naturally, one or two at a time
- ALL fields are MANDATORY - do not skip any
- For phone number, explicitly ask for country code (e.g., "+91 for India, +1 for USA")
- Validate email format
- For Business Type, provide the list of options for them to choose from
- ONLY use the submit_contact_info tool when you have collected ALL 5 fields
- If information is invalid or incomplete, politely ask them to provide it correctly

VALIDATION:
- Email must be valid format (contain @ and domain)
- Phone must include country code starting with +
- Query must be at least 30 characters
- Business Type must be from the provided list
- Name cannot be empty

Be friendly, conversational, and professional while collecting this information.`
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
            description: "Submit the collected contact information when ALL 5 required fields are provided and validated",
            parameters: {
              type: "object",
              properties: {
                name: { 
                  type: "string", 
                  description: "User's full name (minimum 2 characters)" 
                },
                email: { 
                  type: "string", 
                  description: "User's valid email address" 
                },
                phone: { 
                  type: "string", 
                  description: "User's phone number with country code (e.g., +91 9876543210)" 
                },
                businessType: { 
                  type: "string",
                  description: "Type of business the user is in",
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
                query: { 
                  type: "string", 
                  description: "User's query or what they want to discuss with Dheeraj (minimum 30 characters)" 
                },
              },
              required: ["name", "email", "phone", "businessType", "query"],
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
