"use server";
import { createClient } from "@/lib/supabase/server";
import { dateFormat } from "@/lib/utils";

const getSubject = (subject_id: number) => {
  switch (subject_id) {
    case 1:
      return "math";
    case 2:
      return "science";
    case 3:
      return "english";
    default:
      return "";
  }
};

export async function getTotalQuizzes() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("quiz")
    .select("id,subject,subject_id, created_at");
  const subjectWiseQuizzes = data?.map((d) => {
    return {
      id: d.id,
      subject: d.subject
        ? d.subject
        : d.subject_id
        ? getSubject(d.subject_id)
        : "",
      subject_id: d.subject_id,
    };
  });

  const mathQuizzes = subjectWiseQuizzes?.filter(
    (quiz) => quiz.subject === "math"
  );

  const scienceQuizzes = subjectWiseQuizzes?.filter(
    (quiz) => quiz.subject === "science"
  );

  const englishQuizzes = subjectWiseQuizzes?.filter(
    (quiz) => quiz.subject === "english"
  );

  const sevenDaysAgo = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000);
  const today = new Date();
  const quizzesLast7Days = data
    ?.sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    )
    .filter((quiz) => {
      const createdAt = new Date(quiz.created_at);
      return createdAt > sevenDaysAgo && createdAt <= today;
    });

  return {
    totalQuizzes: data?.length,
    mathQuizzes: mathQuizzes?.length,
    scienceQuizzes: scienceQuizzes?.length,
    englishQuizzes: englishQuizzes?.length,
    quizzesLast7Days: quizzesLast7Days,
  };
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
  // const topics = data?.map((d) => d.metadata?.topic);
  // const uniqueTopics = Array.from(new Set(topics));
  // return uniqueTopics?.length;
  return data?.length;
}

export async function getTotalMathUsers() {
  const supabase = createClient();
  const { data, error } = await supabase.from("quiz").select("userid");
  if (error) console.log(error);
  const users = data?.map((d) => d.userid!);
  const realUsers = users?.filter((u) => u !== null);
  const commonUsers = Array.from(new Set(realUsers));
  return commonUsers?.length;
}

export async function getMathQuizFigure() {
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

// math quiz insights
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

export async function getDailyMathQuizFigure() {
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

//quizes per week
export async function getWeeklyMathQuizFigure() {
  const supabase = createClient();
  const { data, error } = await supabase.from("quiz").select("created_at");
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

export async function getGradeWiseMathQuizFigure() {
  const supabase = createClient();
  const { data, error } = await supabase.from("quiz").select("metadata");
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

export async function get30DaysMetrics() {
  const supabase = createClient();
  const metrics = [];

  // metrics for the past 30 days
  for (let i = 29; i >= 0; i--) {
    const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
    const startOfDay = new Date(date).setHours(0, 0, 0, 0);
    const endOfDay = new Date(date).setHours(23, 59, 59, 999);

    const { data: quizzesData, error } = await supabase
      .from("quiz")
      .select("id, created_at");
    const quizzes =
      quizzesData?.filter(
        (quiz) =>
          quiz.created_at &&
          new Date(quiz.created_at).getTime() >= startOfDay &&
          new Date(quiz.created_at).getTime() <= endOfDay
      ).length || 0;

    const { data: chats, error: chatsError } = await supabase
      .from("chats_doubt_solve")
      .select("id, createdAt, solved");

    const doubtsSolved =
      chats?.filter(
        (chat) =>
          chat.createdAt &&
          new Date(chat.createdAt).getTime() >= startOfDay &&
          new Date(chat.createdAt).getTime() <= endOfDay &&
          chat.solved
      ).length || 0;

    const dayMetrics = {
      date: `${date.getDate()} ${date.toLocaleString("default", {
        month: "short",
      })}`, // DD MMM format
      quizzes,
      doubtsSolved,
    };

    metrics.push(dayMetrics);
  }

  return metrics;
}
