import { Metadata } from "next";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Statistics from "./_components/statistics";
import { SelectUser } from "./_components/select-user";
import UserStatistics from "./_components/user-statistics";

import {
  getDailyMetrics,
  groupDataByDifficultyLevel,
} from "@/actions/insight.action";
import QuestionsStatistics from "./_components/questions-statistics";
import {
  getConversationStatistics,
  getResolutionRate,
} from "@/actions/doubt-solving.actions";
import OverallMetrics from "./_components/overall-metrics";
import { get30DaysMetrics } from "@/actions/quiz.actions";
import Quiz7Days from "./_components/quiz-7-days";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Quiz App Dashboard",
};

export default async function DashboardPage() {
  const resolutionRate = await getResolutionRate();
  const conversationAnalysis = await getConversationStatistics();

  const dailyMetrics = await getDailyMetrics();
  const monthlyMetrics = await get30DaysMetrics();

  const { chartData, groupedData } = await groupDataByDifficultyLevel();

  return (
    <div className='mx-auto w-full max-w-7xl flex-col flex'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-3xl font-semibold tracking-tight'>Dashboard</h2>
        </div>
        <Tabs defaultValue='overview' className='space-y-4'>
          <TabsList>
            <TabsTrigger value='overview'>Overview</TabsTrigger>
            <TabsTrigger value='overall-metrics'>Overall Metrics</TabsTrigger>
            <TabsTrigger value='user-analytics'>User Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value='overview' className='space-y-4'>
            <Statistics />
            <Quiz7Days data={dailyMetrics} />
            {chartData && groupedData && (
              <QuestionsStatistics
                chartData={chartData}
                groupedData={groupedData || {}}
              />
            )}
          </TabsContent>
          <TabsContent value='overall-metrics' className='space-y-4'>
            <OverallMetrics
              data={dailyMetrics}
              resolutionRate={resolutionRate}
              conversationAnalysis={conversationAnalysis}
            />
          </TabsContent>
          <TabsContent value='user-analytics' className='space-y-4'>
            <div className='flex-col flex pt-6'>
              <div className='flex items-center justify-between space-y-2'>
                <h2 className='text-3xl font-semibold tracking-tight'>
                  User Insights
                </h2>
              </div>
              <div className='flex-1 space-y-4'>
                <div className='pt-4'>
                  <SelectUser />
                </div>
                <UserStatistics />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
