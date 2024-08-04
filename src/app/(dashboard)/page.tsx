import { Metadata } from "next";
import {
  getConversationStatistics,
  getResolutionRate,
} from "@/actions/doubt-solving.actions";
import {
  getDailyMetrics,
  groupDataByDifficultyLevel,
} from "@/actions/insight.action";
import {
  get30DaysMetrics,
  getTotalMathQuizzes,
  getTotalMathUsers,
  getTotalTopics,
} from "@/actions/quiz.actions";
import Metrics from "@/components/metrics";
import { getTotalGKQuizzes } from "@/actions/gk-quiz.actions";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Codeyoung Noah Admin Dashboard",
};

export default async function DashboardPage() {
  const resolutionRate = await getResolutionRate();
  const conversationAnalysis = await getConversationStatistics();

  const dailyMetrics = await getDailyMetrics();
  const monthlyMetrics = await get30DaysMetrics();

  const { chartData, groupedData } = await groupDataByDifficultyLevel();

  // Stats
  const totalQuizzes = await getTotalMathQuizzes();
  const totalTopics = await getTotalTopics();
  const totalUsers = await getTotalMathUsers();
  const totalGkQuizzes = await getTotalGKQuizzes();

  return (
    <div className='mx-auto w-full max-w-7xl flex-col flex'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-3xl font-semibold tracking-tight'>Dashboard</h2>
        </div>
        <Metrics
          resolutionRate={resolutionRate}
          conversationAnalysis={conversationAnalysis}
          dailyMetrics={dailyMetrics}
          monthlyMetrics={monthlyMetrics}
          chartData={chartData}
          groupedData={groupedData}
          stats={{ totalGkQuizzes, totalQuizzes, totalTopics, totalUsers }}
        />
      </div>
    </div>
  );
}
