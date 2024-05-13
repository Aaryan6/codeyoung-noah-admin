"use server";
import { createClient } from "@/lib/supabase/server";
import { dateFormat } from "@/lib/utils";

export async function getTotalGKQuizzes() {
  const supabase = createClient();
  const { data, error } = await supabase.from("quiz_gk").select("id");
  if (error) console.log(error);
  return data?.length;
}

export async function getTotalGKQuestions() {
  const supabase = createClient();
  const { data, error } = await supabase.from("db_gk_quiz2").select("id");
  if (error) console.log(error);
  return data?.length;
}

export async function getTotalGKTopics() {
  const supabase = createClient();
  const { data, error } = await supabase.from("db_gk_quiz2").select("metadata");
  if (error) console.log(error);
  const topics = data?.map((d) => d.metadata.topic);
  const uniqueTopics = Array.from(new Set(topics));
  return uniqueTopics?.length;
}

export async function getTotalGKUsers() {
  const supabase = createClient();
  const { data, error } = await supabase.from("quiz_gk").select("userid");
  if (error) console.log(error);
  const users = data?.map((d) => d.userid!);
  const realUsers = users?.filter((u) => u !== null);
  const commonUsers = Array.from(new Set(realUsers));
  return commonUsers?.length;
}

export async function getGKQuizFigure() {
  const supabase = createClient();
  const { data, error } = await supabase.from("quiz_gk").select("created_at");
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

// math quiz insights
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

export async function getInCompletedGKQuiz(userId: string) {
  const supabase = createClient();
  const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000); // Calculate the timestamp for 2 hours ago
  const { data, error } = await supabase
    .from("quiz_gk")
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

export async function getDailyGKQuizFigure() {
  const supabase = createClient();
  const { data, error } = await supabase.from("quiz_gk").select("created_at");
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

//quizes per week
export async function getWeeklyGKQuizFigure() {
  const supabase = createClient();
  const { data, error } = await supabase.from("quiz_gk").select("created_at");
  if (error) console.log(error);

  const quizzesPerWeek = data?.map((d: any) => {
    const date = new Date(d.created_at);
    const week = getWeekNumber(date);
    return `${week}`;
  });
  const counts = quizzesPerWeek?.reduce((acc: any, val: any) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
  const result = Object.keys(counts!).map((key: any) => ({
    name: key,
    figure: counts![key],
  }));
  return result;
}

function getWeekNumber(date: Date): number {
  const onejan = new Date(date.getFullYear(), 0, 1);
  const weekNumber = Math.ceil(
    ((date.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7
  );
  return weekNumber;
}

export async function getGradeWiseGKQuizFigure() {
  const supabase = createClient();
  const { data, error } = await supabase.from("quiz_gk").select("metadata");
  if (error) console.log(error);

  const gradeWiseQuiz = data
    ?.filter((d: any) => d.metadata !== null)
    .map((d: any) => d.metadata.grade);

  const counts = gradeWiseQuiz?.reduce((acc: any, val: any) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
  const result = Object.keys(counts!).map((key: any) => ({
    name: key,
    figure: counts![key],
  }));
  return result;
}
