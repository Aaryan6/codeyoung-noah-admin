"use server";
import { createClient } from "@/lib/supabase/server";
import { getSubject } from "./quiz.actions";

export async function getStudentQuizzes({ user_id }: { user_id: string }) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("quiz")
    .select(
      "id,subject,subject_id, created_at, start, complete, userid, submissions, questions"
    )
    .eq("userid", user_id)
    .order("created_at", { ascending: true });

  const subjectWiseQuizzes = data?.map((d) => {
    return {
      id: d.id,
      subject: d.subject_id ? getSubject(d.subject_id) : d.subject,
      subject_id: d.subject_id,
      created_at: d.created_at,
      submissions: d.submissions,
      question: d.questions,
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
  const quizzesLast7Days = subjectWiseQuizzes
    ?.sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    )
    .filter((quiz) => {
      const createdAt = new Date(quiz.created_at);
      return createdAt > sevenDaysAgo && createdAt <= today;
    });

  const completedQuiz = data?.filter((q) => q.complete);

  return {
    totalQuizzes: subjectWiseQuizzes,
    mathQuizzes: mathQuizzes,
    scienceQuizzes: scienceQuizzes,
    englishQuizzes: englishQuizzes,
    quizzesLast7Days: quizzesLast7Days,
    completedQuiz: completedQuiz,
  };
}

export async function getStudentTopics({ user_id }: { user_id: string }) {
  const supabase = createClient();
  const { data } = await supabase
    .from("quiz")
    .select(
      "id,userid, created_at, submissions, topic_id, topic, topicTable:topic(*)"
    )
    .eq("userid", user_id);

  return data;
}
