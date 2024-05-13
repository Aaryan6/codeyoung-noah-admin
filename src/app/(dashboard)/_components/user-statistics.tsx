"use client";
import StatsCard from "@/components/stats-card";
import { useEffect, useState } from "react";
import useUserStore from "@/lib/zustand/user.select";
import {
  getInsights,
  getPerformanceByTopic,
  getTopics,
  getTotalQuestions,
  getTotalQuizzes,
} from "@/actions/user.actions";

export default function UserStatistics() {
  const [totalQuizzes, setTotalQuizzes] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalTopics, setTotalTopics] = useState<any[]>([]); // Update the type of totalTopics to be an array of any
  const useUser = useUserStore();

  useEffect(() => {
    (async () => {
      const quiz_res: any = await getTotalQuizzes(useUser.userid!);
      setTotalQuizzes(quiz_res);
      const totalQuestions = await getTotalQuestions(useUser.userid!);
      setTotalQuestions(totalQuestions);
      const topics = await getTopics(useUser.userid!);
      setTotalTopics(topics);
      const insights = await getInsights(useUser.userid!);
      const performance = await getPerformanceByTopic(useUser.userid!);
    })();
  }, [useUser.userid]);

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-2'>
      <StatsCard title='Total Quizzes' figure={totalQuizzes ?? 0} />
      <StatsCard title='Total Questions' figure={totalQuestions ?? 0} />
    </div>
  );
}
