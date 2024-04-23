import { Metadata } from "next";

import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDateRangePicker } from "./_components/date-range-picker";
import Statistics from "./_components/statistics";
import { SelectUser } from "./_components/select-user";
import UserStatistics from "./_components/user-statistics";
import QuizStatistics from "./_components/quiz-statistics";
import { getTotalGkQuizzes, getTotalQuizzes } from "@/actions/insight.action";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Quiz App Dashboard",
};

export default async function DashboardPage() {
  const gkQuiz = await getTotalGkQuizzes();
  const totalQuiz = await getTotalQuizzes();
  return (
    <div className='mx-auto w-full max-w-7xl flex-col flex'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-3xl font-semibold tracking-tight'>Dashboard</h2>
          <div className='flex items-center space-x-2'>
            <CalendarDateRangePicker />
            <Button>Download</Button>
          </div>
        </div>
        <Tabs defaultValue='overview' className='space-y-4'>
          <TabsList>
            <TabsTrigger value='overview'>Overview</TabsTrigger>
            {/* <TabsTrigger value='analytics' disabled>
                Analytics
              </TabsTrigger> */}
          </TabsList>
          <TabsContent value='overview' className='space-y-4'>
            <Statistics />
            <div className='flex-col flex pt-6'>
              <div className='flex items-center justify-between space-y-2'>
                <h2 className='text-3xl font-semibold tracking-tight'>
                  Quiz Insights
                </h2>
              </div>
              <div className='flex-1 space-y-4'>
                <div className='pt-4'>
                  <QuizStatistics gkQuiz={gkQuiz} totalQuiz={totalQuiz} />
                </div>
              </div>
            </div>
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
