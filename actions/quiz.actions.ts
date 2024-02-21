import { createClient } from "@/lib/supabase/server";
import { dateFormat } from "@/lib/utils";

export async function getTotalQuizzes() {
  const supabase = createClient();
  const { data, error } = await supabase.from("quiz").select("*");
  if (error) console.log(error);
  return data?.length;
}

export async function getTotalQuestions() {
  const supabase = createClient();
  const { data, error } = await supabase.from("grade7_math_data").select("*");
  if (error) console.log(error);
  return data?.length;
}

export async function getTotalTopics() {
  const supabase = createClient();
  const { data, error } = await supabase.from("grade7_math_data").select("*");
  if (error) console.log(error);
  const topics = data?.map((d) => d.metadata.topic);
  const uniqueTopics = Array.from(new Set(topics));
  return uniqueTopics?.length;
}

export async function getTotalUsers() {
  const supabase = createClient();
  const { data, error } = await supabase.from("quiz").select("*");
  if (error) console.log(error);
  const users = data?.map((d) => d.userId!);
  const realUsers = users?.filter((u) => u !== null);
  const commonUsers = Array.from(new Set(realUsers));
  return commonUsers?.length;
}

export async function getQuizFigure() {
  const supabase = createClient();
  const { data, error } = await supabase.from("quiz").select("*");
  if (error) console.log(error);
  const quizzesPerDay = data?.map((d: any) => dateFormat(d.created_at));
  const counts = quizzesPerDay?.reduce((acc: any, val: any) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
  const result = Object.keys(counts!).map((key: any) => ({
    name: key,
    figure: counts![key],
  }));
  return result;
}
