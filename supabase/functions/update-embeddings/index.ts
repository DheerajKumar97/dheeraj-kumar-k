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

    // Get all knowledge items without embeddings
    const { data: items, error: fetchError } = await supabase
      .from("knowledge_base")
      .select("id, content")
      .is("embedding", null);

    if (fetchError) throw fetchError;

    console.log(`Found ${items?.length || 0} items without embeddings`);

    let updated = 0;
    for (const item of items || []) {
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
        console.error(`Failed to generate embedding for item ${item.id}`);
        continue;
      }

      const embeddingData = await embeddingResponse.json();
      const embedding = embeddingData.data[0].embedding;

      // Update the item with embedding
      const { error: updateError } = await supabase
        .from("knowledge_base")
        .update({ embedding: embedding })
        .eq("id", item.id);

      if (updateError) {
        console.error(`Error updating item ${item.id}:`, updateError);
      } else {
        updated++;
        console.log(`✓ Updated embedding for: ${item.content.substring(0, 50)}...`);
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: `Updated ${updated} embeddings` }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("update-embeddings error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
