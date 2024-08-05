"use server";

import { createClient } from "@/lib/supabase/server";

export async function getTables() {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_all_table_names").select();
  if (error) console.log(error);
  console.log(data);
  return data;
}
