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
      // About Dheeraj - Experience and Background
      {
        content: "Dheeraj has over 6+ years of professional experience in Business Intelligence and Data Analytics. He specializes in transforming raw data into strategic business insights that drive decision-making and operational excellence.",
        category: "about_dheeraj",
        metadata: { topic: "experience" }
      },
      {
        content: "Dheeraj's expertise spans across industry-leading tools including Power BI, Tableau, Microsoft Fabric, SQL Server, PySpark, and advanced data analytics platforms. He is passionate about creating visually stunning, data-driven dashboards that tell compelling stories.",
        category: "about_dheeraj",
        metadata: { topic: "technical_skills" }
      },
      {
        content: "Dheeraj holds professional certifications including Tableau Desktop Specialist, Tableau Data Analyst, and Power BI Data Analyst Associate from Microsoft. These industry-recognized credentials validate his expertise in data analytics and business intelligence.",
        category: "about_dheeraj",
        metadata: { topic: "certifications_education" }
      },
      {
        content: "Dheeraj specializes in four core competencies: Data Storytelling (crafting compelling narratives from complex datasets), Predictive Analytics (forecasting trends and business outcomes with precision), Data Engineering (building robust data pipelines and infrastructure), and Dashboard Development (creating intuitive, interactive business intelligence solutions).",
        category: "about_dheeraj",
        metadata: { topic: "core_competencies" }
      },
      {
        content: "Dheeraj has successfully delivered multiple enterprise-level projects including: Enterprise Product Performance Daily Metrics (35% improvement in sales), Customer Behavior Analysis Report (28% increase in retention), Fully Filled Orders Report (42% reduction in inventory costs), Labor Budget and Workforce Utilization Report (50% faster executive reporting), and LoginPulse Analytics Dashboard (40% improvement in authentication monitoring).",
        category: "about_dheeraj",
        metadata: { topic: "projects_achievements" }
      },
      {
        content: "Dheeraj has worked with diverse industries and business types including Telecom Industry, E-commerce, IT Industry, Sales & Marketing, Finance and Banking, Healthcare, Manufacturing, Supply Chain Logistics, Media & Entertainment, and Education. He delivers customized BI solutions tailored to each industry's specific needs.",
        category: "about_dheeraj",
        metadata: { topic: "industry_experience" }
      },
      {
        content: "Dheeraj's technical toolkit includes Power BI Desktop and Service, Tableau Desktop and Cloud, SQL Server, Microsoft Fabric, PySpark, Python, AWS Redshift, Power Query, Tableau Prep, Power Automate, and web scraping technologies. He is committed to delivering actionable business insights through innovative data solutions and optimization strategies.",
        category: "about_dheeraj",
        metadata: { topic: "tools_technologies" }
      },
      
      // Business Intelligence Topics
      {
        content: "Business Intelligence (BI) is a technology-driven process for analyzing data and delivering actionable information to help executives, managers, and workers make informed business decisions. BI encompasses a variety of tools, applications, and methodologies that enable organizations to collect, store, access, and analyze data.",
        category: "business_intelligence",
        metadata: { topic: "bi_definition" }
      },
      {
        content: "Key BI tools include Power BI (Microsoft's business analytics solution), Tableau (known for powerful data visualization), QlikView, Looker, SAP BusinessObjects, and Microsoft Fabric. Each tool offers unique capabilities for creating interactive dashboards, reports, and data visualizations.",
        category: "business_intelligence",
        metadata: { topic: "bi_tools" }
      },
      {
        content: "Data modeling is the process of creating a data model for an information system. In BI, it involves designing star schemas, snowflake schemas, and data warehouses. Good data modeling includes fact tables (containing measurable metrics), dimension tables (containing descriptive attributes), and proper relationships that ensure efficient queries and accurate reporting.",
        category: "business_intelligence",
        metadata: { topic: "data_modeling" }
      },
      {
        content: "ETL (Extract, Transform, Load) is a process in data warehousing involving: Extract (pulling data from various sources like databases, APIs, files), Transform (cleaning, validating, and reshaping data to meet business requirements), and Load (inserting transformed data into target databases). Modern approaches also include ELT (Extract, Load, Transform) which loads raw data first then transforms it in the data warehouse.",
        category: "business_intelligence",
        metadata: { topic: "etl_process" }
      },
      {
        content: "KPIs (Key Performance Indicators) are measurable values demonstrating how effectively a company achieves key business objectives. Common KPIs include: revenue growth rate, customer acquisition cost (CAC), customer lifetime value (CLV), conversion rates, churn rate, net promoter score (NPS), and operational efficiency metrics.",
        category: "business_intelligence",
        metadata: { topic: "kpis_metrics" }
      },
      {
        content: "DAX (Data Analysis Expressions) is a formula language used in Power BI, Analysis Services, and Power Pivot. Key DAX concepts include: calculated columns (computed row-by-row), measures (dynamic aggregations), time intelligence functions (DATEADD, TOTALYTD), filter context (CALCULATE, FILTER), and common functions like SUM, AVERAGE, COUNT, DISTINCTCOUNT, and RELATED.",
        category: "business_intelligence",
        metadata: { topic: "dax_power_bi" }
      },
      {
        content: "Data visualization best practices include: choosing the right chart type (bar charts for comparisons, line charts for trends over time, pie charts for proportions, scatter plots for correlations), maintaining consistency in colors and fonts, avoiding chart junk and unnecessary decorations, using clear labels and titles, ensuring accessibility with color-blind friendly palettes, and providing context with annotations.",
        category: "business_intelligence",
        metadata: { topic: "data_visualization" }
      },
      {
        content: "A data warehouse is a centralized repository storing integrated data from multiple sources, designed for query and analysis rather than transaction processing. Key concepts include: Facts (measurable business metrics), Dimensions (descriptive attributes for analysis), Slowly Changing Dimensions (SCD Types 1, 2, 3 for handling historical changes), OLAP cubes (multidimensional data structures), and star/snowflake schema designs.",
        category: "business_intelligence",
        metadata: { topic: "data_warehouse" }
      },
      {
        content: "Power BI ecosystem includes: Power BI Desktop (free application for creating reports and dashboards), Power BI Service (cloud-based platform for sharing, collaboration, and scheduled refreshes), Power BI Mobile (apps for viewing reports on iOS/Android), Power BI Premium (dedicated capacity with advanced features), and Power BI Embedded (for embedding analytics in custom applications).",
        category: "business_intelligence",
        metadata: { topic: "power_bi_ecosystem" }
      },
      {
        content: "Common data sources for BI include: relational databases (SQL Server, MySQL, PostgreSQL, Oracle), cloud data warehouses (Snowflake, Azure Synapse Analytics, Amazon Redshift, Google BigQuery), file formats (Excel, CSV, JSON, XML), cloud services and APIs (Salesforce, Google Analytics, SharePoint), and streaming data sources (Azure Event Hub, Apache Kafka).",
        category: "business_intelligence",
        metadata: { topic: "data_sources" }
      },
      {
        content: "Tableau ecosystem includes: Tableau Desktop (authoring tool for creating visualizations), Tableau Server (on-premises platform for sharing), Tableau Cloud (cloud-based sharing platform), Tableau Prep (data preparation tool), Tableau Public (free platform for public visualizations), and Tableau Mobile (apps for mobile viewing).",
        category: "business_intelligence",
        metadata: { topic: "tableau_ecosystem" }
      },
      {
        content: "Microsoft Fabric is a unified analytics platform that brings together data engineering, data science, real-time analytics, and business intelligence. It includes OneLake (unified data lake), Data Factory (data integration), Synapse Data Engineering (Spark-based transformations), Synapse Data Warehouse (SQL-based warehouse), Synapse Data Science (ML and AI), Real-Time Analytics, and Power BI integration.",
        category: "business_intelligence",
        metadata: { topic: "microsoft_fabric" }
      },
      {
        content: "Data governance in BI involves establishing policies and procedures for data quality, security, privacy, and compliance. Key aspects include: data cataloging, metadata management, data lineage tracking, access control and Row-Level Security (RLS), data quality monitoring, regulatory compliance (GDPR, HIPAA), and master data management (MDM).",
        category: "business_intelligence",
        metadata: { topic: "data_governance" }
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
