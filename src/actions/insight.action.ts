import { createClient } from "@/lib/supabase/client";

export async function getTotalQuizzes() {
  const supabase = createClient();
  const { data, error } = await supabase.from("quiz").select("id");
  if (error) console.log(error);
  return data?.length || 0;
}

export async function getTotalGkQuizzes() {
  const supabase = createClient();
  const { data, error } = await supabase.from("quiz_gk").select("id");
  if (error) console.log(error);
  return data?.length || 0;
}
