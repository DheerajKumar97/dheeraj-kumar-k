import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const knowledgeData = [
  {
    content: "Dheeraj is a Business Intelligence expert with extensive experience in data analytics, visualization, and reporting. He specializes in Power BI, Tableau, SQL, and Python for data analysis.",
    category: "about_dheeraj"
  },
  {
    content: "Dheeraj has expertise in creating interactive dashboards, data modeling, ETL processes, and data warehousing. He helps businesses make data-driven decisions through insightful analytics.",
    category: "about_dheeraj"
  },
  {
    content: "Business Intelligence (BI) is a technology-driven process for analyzing data and presenting actionable information to help executives, managers, and workers make informed business decisions.",
    category: "business_intelligence"
  },
  {
    content: "Power BI is a business analytics service by Microsoft that provides interactive visualizations and business intelligence capabilities with an interface simple enough for end users to create their own reports and dashboards.",
    category: "business_intelligence"
  },
  {
    content: "Tableau is a visual analytics platform transforming the way we use data to solve problems, empowering people and organizations to make the most of their data.",
    category: "business_intelligence"
  },
  {
    content: "Data visualization is the graphical representation of information and data. By using visual elements like charts, graphs, and maps, data visualization tools provide an accessible way to see and understand trends, outliers, and patterns in data.",
    category: "business_intelligence"
  },
  {
    content: "ETL (Extract, Transform, Load) is a data integration process that combines data from multiple sources into a single, consistent data store that is loaded into a data warehouse or other target system.",
    category: "business_intelligence"
  },
  {
    content: "A data warehouse is a central repository of integrated data from one or more disparate sources. They store current and historical data and are used for creating analytical reports for workers throughout the enterprise.",
    category: "business_intelligence"
  },
  {
    content: "KPIs (Key Performance Indicators) are measurable values that demonstrate how effectively a company is achieving key business objectives. Organizations use KPIs to evaluate their success at reaching targets.",
    category: "business_intelligence"
  },
  {
    content: "Data analytics involves examining data sets to draw conclusions about the information they contain. It is used to enable better business decision-making and includes techniques like descriptive, diagnostic, predictive, and prescriptive analytics.",
    category: "business_intelligence"
  }
];

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !LOVABLE_API_KEY) {
      throw new Error("Missing required environment variables");
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    console.log("Starting knowledge base seeding...");

    for (const item of knowledgeData) {
      console.log(`Processing: ${item.content.substring(0, 50)}...`);

      // Generate embedding
      const embeddingResponse = await fetch("https://ai.gateway.lovable.dev/v1/embeddings", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "text-embedding-004",
          input: item.content,
        }),
      });

      if (!embeddingResponse.ok) {
        console.error("Failed to generate embedding for:", item.content.substring(0, 50));
        continue;
      }

      const embeddingData = await embeddingResponse.json();
      const embedding = embeddingData.data[0].embedding;

      // Insert into knowledge base
      const { error } = await supabase
        .from("knowledge_base")
        .insert({
          content: item.content,
          category: item.category,
          embedding: JSON.stringify(embedding),
          metadata: { source: "seed" }
        });

      if (error) {
        console.error("Error inserting:", error);
      } else {
        console.log("Successfully inserted:", item.content.substring(0, 50));
      }
    }

    return new Response(
      JSON.stringify({ message: "Knowledge base seeded successfully", count: knowledgeData.length }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("seed-knowledge error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
