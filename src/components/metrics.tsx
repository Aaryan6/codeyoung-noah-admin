"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverallMetrics from "@/app/(dashboard)/analytics-doubt-solve/_components/stastistics";
import QuestionsStatistics from "@/app/(dashboard)/analytics-questions/_components/questions-statistics";
import { SelectUser } from "@/components/select-user";
// import UserStatistics from "@/app/(dashboard)/_components/user-statistics";

const Metrics = ({
  resolutionRate,
  conversationAnalysis,
  dailyMetrics,
  monthlyMetrics,
  chartData,
  groupedData,
}: {
  resolutionRate?: any;
  conversationAnalysis?: any;
  dailyMetrics?: any;
  monthlyMetrics?: any;
  chartData?: any;
  groupedData?: any;
}) => {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="doubt-solving-metrics">
          Doubt Solving Metrics
        </TabsTrigger>
        <TabsTrigger value="user-analytics">User Analytics</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        {chartData && groupedData && (
          <QuestionsStatistics
            chartData={chartData}
            groupedData={groupedData || {}}
          />
        )}
      </TabsContent>
      <TabsContent value="doubt-solving-metrics" className="space-y-4">
        <OverallMetrics
          data={monthlyMetrics}
          resolutionRate={resolutionRate}
          conversationAnalysis={conversationAnalysis}
        />
      </TabsContent>
      <TabsContent value="user-analytics" className="space-y-4">
        <div className="flex-col flex pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-semibold tracking-tight">
              User Insights
            </h2>
          </div>
          <div className="flex-1 space-y-4">
            <div className="pt-4">
              <SelectUser />
            </div>
            {/* <UserStatistics /> */}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default Metrics;
