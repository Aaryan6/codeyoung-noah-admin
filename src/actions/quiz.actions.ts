"use server";
import { createClient } from "@/lib/supabase/server";
import { dateFormat } from "@/lib/utils";

export async function getTotalQuizzes() {
  const supabase = createClient();
  const { data, error } = await supabase.from("quiz").select("id");
  if (error) console.log(error);
  return data?.length;
}

export async function getTotalQuestions() {
  const supabase = createClient();
  const { data, error } = await supabase.from("db_math").select("id");
  if (error) console.log(error);
  return data?.length;
}

export async function getTotalTopics() {
  const supabase = createClient();
  const { data, error } = await supabase.from("db_math").select("metadata");
  if (error) console.log(error);
  const topics = data?.map((d) => d.metadata.topic);
  const uniqueTopics = Array.from(new Set(topics));
  return uniqueTopics?.length;
}

export async function getTotalUsers() {
  const supabase = createClient();
  const { data, error } = await supabase.from("quiz").select("userid");
  if (error) console.log(error);
  const users = data?.map((d) => d.userid!);
  const realUsers = users?.filter((u) => u !== null);
  const commonUsers = Array.from(new Set(realUsers));
  return commonUsers?.length;
}

export async function getQuizFigure() {
  const supabase = createClient();
  const { data, error } = await supabase.from("quiz").select("created_at");
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

export const getNumberOfCompletedGKQuiz = async (userid: string) => {
  const supabase = createClient();
  const { data: allQuizes, error } = await supabase
    .from("quiz_gk")
    .select("questions, submissions")
    .eq("userid", userid)
    .eq("complete", "True");

  if (error) {
    console.error(error);
  }
  let numberOfCompletedQuiz = allQuizes?.length || 0;

  const totalQuiz =
    numberOfCompletedQuiz <= 10
      ? 10
      : numberOfCompletedQuiz - (numberOfCompletedQuiz % 10) + 10;
  const level = totalQuiz / 10;
  return {
    numberOfCompletedQuiz,
    level,
    totalQuiz,
  };
};

export const getNumberOfCompletedMathQuiz = async (userid: string) => {
  const supabase = createClient();
  const { data: allQuizes, error } = await supabase
    .from("quiz")
    .select("questions, submissions")
    .eq("userid", userid)
    .eq("complete", "True");

  if (error) {
    console.error(error);
  }
  let numberOfCompletedQuiz = allQuizes?.length || 0;

  const totalQuiz =
    numberOfCompletedQuiz <= 10
      ? 10
      : numberOfCompletedQuiz - (numberOfCompletedQuiz % 10) + 10;
  const level = totalQuiz / 10;
  return {
    numberOfCompletedQuiz,
    level,
    totalQuiz,
  };
};

export async function getInCompletedMathQuiz(userId: string) {
  const supabase = createClient();
  const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000); // Calculate the timestamp for 2 hours ago
  const { data, error } = await supabase
    .from("quiz")
    .select("*")
    .eq("userid", userId)
    .eq("start", true)
    .eq("complete", false)
    .gte("created_at", twoHoursAgo.toISOString()); // Filter quizzes created within the last 2 hours

  if (error) {
    console.error("incomplete quiz error", error);
  }
  return data;
}



