import { Metadata } from "next";
import {
  getTotalQuizzes,
  getTotalUsers,
  getTotalTopics,
} from "@/actions/quiz.actions";
import Metrics from "@/components/metrics";
import { getTotalGKQuizzes } from "@/actions/gk-quiz.actions";
import { SubjectCircleChart } from "@/components/subject-circle-chart";
import Statistics from "./_components/statistics";
import { WeekAreaChart } from "@/components/quiz/week-area-chart";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Codeyoung Noah Admin Dashboard",
};

export default async function DashboardPage() {
  const [quizzes, totalTopics, totalUsers, totalGkQuizzes] = await Promise.all([
    getTotalQuizzes(),
    getTotalTopics(),
    getTotalUsers(),
    getTotalGKQuizzes(),
  ]);

  return (
    <div className="w-full flex-col flex p-8">
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-semibold tracking-tight">Dashboard</h2>
        </div>
        <div className="flex gap-4">
          <Statistics
            quizzes={quizzes!}
            totalTopics={totalTopics!}
            totalUsers={totalUsers!}
            totalGKQuizzes={totalGkQuizzes!}
          />
          <SubjectCircleChart quizzes={quizzes} />
        </div>
        <WeekAreaChart data={quizzes.quizzesLast7Days!} />
        {/* <Metrics
          resolutionRate={resolutionRate}
          conversationAnalysis={conversationAnalysis}
          dailyMetrics={dailyMetrics}
          monthlyMetrics={monthlyMetrics}
          chartData={chartData}
          groupedData={groupedData}
        /> */}
      </div>
    </div>
  );
}
