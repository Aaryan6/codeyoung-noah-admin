import { createClient } from "@/lib/supabase/client";

export async function getUsers() {
  const supabase = createClient();
  const { data, error } = await supabase.from("quiz").select("userid");
  if (error) console.log(error);
  const allUsers: any = data
    ?.map((d) => d.userid!)
    .filter((userid) => userid !== null);
  const users = Array.from(new Set(allUsers));
  return users;
}

export async function getTotalQuizzes(userid: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("quiz")
    .select("id,userid")
    .match({ userid: userid });
  if (error) console.log(error);
  return data?.length;
}
