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

function calculateAccuracy(quiz: any) {
  const totalQuestions = quiz.questions.length;
  const correctAnswers = quiz.submissions.filter(
    (submission: any) => submission.isCorrect
  ).length;
  const accuracy = (correctAnswers / totalQuestions) * 100;
  return accuracy;
}

export async function getInsights(userId: string) {
  const supabase = createClient();
  const { data: userQuizzes, error } = await supabase
    .from("quiz")
    .select("*")
    .match({ userid: userId });

  if (error || !userQuizzes) console.log(error);

  const insights = userQuizzes?.map((quiz) => {
    const accuracy = calculateAccuracy(quiz);
    const topics = quiz.topic || quiz.multiple_topics;
    const grade = quiz.metadata.grade;
    return { accuracy, topics, grade };
  });
  return insights;
}

interface TopicPerformance {
  [topic: string]: {
    totalQuestions: number;
    correctAnswers: number;
  };
}

export async function getPerformanceByTopic(userId: string) {
  const supabase = createClient();
  const { data: userQuizzes, error } = await supabase
    .from("quiz")
    .select("*")
    .match({ userid: userId });
  const topicPerformance: TopicPerformance = {};

  userQuizzes?.forEach((quiz) => {
    quiz.submissions
      .filter((e: any) => e.length > 0)
      .forEach((submission: any) => {
        const question = quiz.questions.find(
          (q: any) => q.id === submission.questionId
        );
        console.log(question);
        const topic = question.metadata.topic || "Uncategorized";

        if (!topicPerformance[topic]) {
          topicPerformance[topic] = {
            totalQuestions: 0,
            correctAnswers: 0,
          };
        }

        topicPerformance[topic].totalQuestions++;
        if (submission.isCorrect) {
          topicPerformance[topic].correctAnswers++;
        }
      });
  });

  console.log(topicPerformance);

  const topicPerformanceData = Object.entries(topicPerformance).map(
    ([topic, { totalQuestions, correctAnswers }]) => {
      const accuracy = (correctAnswers / totalQuestions) * 100;
      return { topic, accuracy };
    }
  );

  return topicPerformanceData;
}
