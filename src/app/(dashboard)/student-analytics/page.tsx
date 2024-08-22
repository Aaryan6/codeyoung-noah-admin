"use client";
import { SelectUser } from "@/components/select-user";
import StatsCard from "@/components/stats-card";
import { getStudentQuizzes, getStudentTopics } from "@/actions/student.actions";
import useUserStore from "@/lib/zustand/user.select";
import { useEffect, useState } from "react";
import { SubjectCircleChart } from "@/components/subject-circle-chart";
import { QuizChart } from "./_components/quiz-chart";
import useDateRange from "@/lib/zustand/use-date-range";
import { DataTable } from "./_components/topic/data-table";
import { columns } from "./_components/topic/column";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getAttemptedQuestions,
  getCorrectSubmissions,
  getMostServedTopic,
} from "./_utils";

type QuizDataProps = {
  totalQuizzes: any[];
  mathQuizzes: any[];
  scienceQuizzes: any[];
  englishQuizzes: any[];
  completedQuiz: any[];
};

export default function StudentAnalytics() {
  const useUser = useUserStore();
  const dateRange = useDateRange();
  const [quizData, setQuizData] = useState<any>(null);
  const [topicData, settopicData] = useState<any>(null);

  const fetchData = async () => {
    const [quizzes, topicData] = await Promise.allSettled([
      getStudentQuizzes({ user_id: useUser.userid as string }),
      getStudentTopics({ user_id: useUser.userid as string }),
    ]);
    setQuizData(quizzes);
    settopicData(topicData);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useUser.userid, dateRange.from, dateRange.to]);

  const quizzes: QuizDataProps = quizData?.value;

  const attemptedQuestions = getAttemptedQuestions(
    quizzes?.totalQuizzes,
    dateRange
  );
  const correctQuestions = getCorrectSubmissions(
    quizzes?.totalQuizzes,
    dateRange
  );

  const topicList = getMostServedTopic(topicData?.value, dateRange);

  console.log({ quizData });

  return (
    <div className="p-4 space-y-4 bg-muted h-screen overflow-y-auto">
      <div className="">
        <SelectUser />
      </div>
      <div className="flex gap-4">
        <div className="grid grid-cols-3 gap-4 w-full">
          <StatsCard
            title="Quiz Attempted"
            figure={
              quizzes?.totalQuizzes?.filter((d) =>
                dateRange.from && dateRange.to
                  ? new Date(d.created_at) > dateRange.from &&
                    new Date(d.created_at) <= dateRange.to
                  : d.created_at
              ).length
            }
          />
          <StatsCard
            title="Completed Quizzes"
            figure={
              quizzes?.completedQuiz?.filter((d) =>
                dateRange.from && dateRange.to
                  ? new Date(d.created_at) > dateRange.from &&
                    new Date(d.created_at) <= dateRange.to
                  : d.created_at
              ).length
            }
          />
          <StatsCard
            title="Quiz Completion Ratio"
            figure={
              Math.round(
                (quizzes?.completedQuiz?.filter((d) =>
                  dateRange.from && dateRange.to
                    ? new Date(d.created_at) > dateRange.from &&
                      new Date(d.created_at) <= dateRange.to
                    : d.created_at
                ).length /
                  quizzes?.totalQuizzes?.filter((d) =>
                    dateRange.from && dateRange.to
                      ? new Date(d.created_at) > dateRange.from &&
                        new Date(d.created_at) <= dateRange.to
                      : d.created_at
                  ).length) *
                  100
              ) || 0
            }
            percentage={true}
          />
          <StatsCard title="Attempted Questions" figure={attemptedQuestions!} />
          <StatsCard title="Corrected Submissions" figure={correctQuestions!} />
          <StatsCard
            title="Correct Submissions Ratio"
            figure={
              Math.round((correctQuestions! / attemptedQuestions!) * 100) || 0
            }
            percentage={true}
          />
        </div>
        <SubjectCircleChart quizzes={quizzes} />
      </div>
      <QuizChart data={quizzes?.totalQuizzes} />
      <div className="">
        {topicList && (
          <Card className="">
            <CardHeader>
              <CardTitle>Topics Metrics</CardTitle>
            </CardHeader>
            <DataTable columns={columns} data={topicList.servedTopics} />
          </Card>
        )}
      </div>
    </div>
  );
}
