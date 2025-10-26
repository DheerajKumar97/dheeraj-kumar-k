import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // Knowledge base content about Dheeraj and Business Intelligence
    const knowledgeItems = [
      {
        content: "Dheeraj is a Data Analytics and Business Intelligence expert with 8+ years of experience in developing enterprise-level BI solutions, data warehousing, and advanced analytics.",
        category: "about_dheeraj",
        metadata: { topic: "professional_summary" }
      },
      {
        content: "Dheeraj specializes in Power BI, Tableau, SQL, Python, and advanced data visualization techniques. He has expertise in building interactive dashboards, DAX calculations, and data modeling.",
        category: "about_dheeraj",
        metadata: { topic: "technical_skills" }
      },
      {
        content: "Dheeraj has worked across various industries including Telecom, E-commerce, IT, Sales & Marketing, Finance and Banking, Healthcare, and Manufacturing, delivering data-driven solutions.",
        category: "about_dheeraj",
        metadata: { topic: "industry_experience" }
      },
      {
        content: "Business Intelligence (BI) is a technology-driven process for analyzing data and delivering actionable information to help executives, managers, and workers make informed business decisions. BI encompasses a variety of tools, applications, and methodologies.",
        category: "business_intelligence",
        metadata: { topic: "bi_definition" }
      },
      {
        content: "Key BI tools include Power BI, Tableau, QlikView, Looker, and SAP BusinessObjects. Power BI is Microsoft's business analytics solution for creating interactive visualizations and business intelligence capabilities. Tableau is known for its powerful data visualization and analytics capabilities.",
        category: "business_intelligence",
        metadata: { topic: "bi_tools" }
      },
      {
        content: "Data modeling is the process of creating a data model for an information system. In BI, it involves designing star schemas, snowflake schemas, and data warehouses. Good data modeling ensures efficient queries and accurate reporting.",
        category: "business_intelligence",
        metadata: { topic: "data_modeling" }
      },
      {
        content: "ETL (Extract, Transform, Load) is a process in data warehousing that involves extracting data from various sources, transforming it to fit operational needs, and loading it into the target database. Modern approaches also include ELT (Extract, Load, Transform).",
        category: "business_intelligence",
        metadata: { topic: "etl_process" }
      },
      {
        content: "KPIs (Key Performance Indicators) are measurable values that demonstrate how effectively a company is achieving key business objectives. Common KPIs include revenue growth rate, customer acquisition cost, customer lifetime value, and conversion rates.",
        category: "business_intelligence",
        metadata: { topic: "kpis_metrics" }
      },
      {
        content: "DAX (Data Analysis Expressions) is a formula language used in Power BI, Analysis Services, and Power Pivot. It includes functions for calculations, aggregations, and data manipulation. Common DAX functions include CALCULATE, FILTER, SUM, AVERAGE, and time intelligence functions.",
        category: "business_intelligence",
        metadata: { topic: "dax_power_bi" }
      },
      {
        content: "Data visualization best practices include choosing the right chart type for your data, maintaining consistency in colors and fonts, avoiding chart junk, using clear labels, and ensuring accessibility. Bar charts for comparisons, line charts for trends, and pie charts for proportions.",
        category: "business_intelligence",
        metadata: { topic: "data_visualization" }
      },
      {
        content: "Dheeraj holds professional certifications including Microsoft Power BI Data Analyst, Tableau Desktop Specialist, and Tableau Certified Analyst. He continuously updates his skills with the latest BI technologies.",
        category: "about_dheeraj",
        metadata: { topic: "certifications" }
      },
      {
        content: "A data warehouse is a centralized repository that stores integrated data from multiple sources. It's designed for query and analysis rather than transaction processing. Key concepts include facts, dimensions, slowly changing dimensions (SCD), and OLAP cubes.",
        category: "business_intelligence",
        metadata: { topic: "data_warehouse" }
      },
      {
        content: "Dheeraj can help businesses transform their data into actionable insights. Whether you need dashboard development, data pipeline creation, or advanced analytics, he provides customized BI solutions tailored to your business needs.",
        category: "about_dheeraj",
        metadata: { topic: "services" }
      },
      {
        content: "Power BI Desktop is a free application for creating reports and dashboards. Power BI Service is the cloud-based platform for sharing and collaboration. Power BI Mobile apps allow viewing reports on mobile devices. Power BI Premium provides dedicated capacity and advanced features.",
        category: "business_intelligence",
        metadata: { topic: "power_bi_ecosystem" }
      },
      {
        content: "Common data sources for BI include SQL databases (SQL Server, MySQL, PostgreSQL), cloud data warehouses (Snowflake, Azure Synapse, Amazon Redshift), Excel files, CSV files, APIs, and cloud services like Salesforce and Google Analytics.",
        category: "business_intelligence",
        metadata: { topic: "data_sources" }
      }
    ];

    console.log(`Starting to seed ${knowledgeItems.length} knowledge items...`);

    // Generate embeddings and insert knowledge items
    for (const item of knowledgeItems) {
      // Generate embedding using Lovable AI
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
        console.error(`Failed to generate embedding for: ${item.content.substring(0, 50)}...`);
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
          embedding: embedding,
          metadata: item.metadata,
        });

      if (error) {
        console.error("Error inserting knowledge:", error);
      } else {
        console.log(`✓ Inserted: ${item.content.substring(0, 50)}...`);
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: `Successfully seeded ${knowledgeItems.length} knowledge items` }),
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
