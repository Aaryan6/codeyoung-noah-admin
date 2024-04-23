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

export async function getTotalQuestions(userid: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("quiz")
    .select("id,userid,questions")
    .match({ userid: userid });

  if (error) console.log(error);

  let totalQuestions = 0;
  for (const quiz of data || []) {
    const questions = quiz.questions;
    totalQuestions += questions.length;
  }

  return totalQuestions;
}

export async function getTopics(userid: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("quiz")
    .select("id,userid,topic")
    .match({ userid: userid });

  if (error) console.log(error);

  const uniqueTopics = new Set(data?.map((item) => item.topic));
  return Array.from(uniqueTopics);
}
