import { Metadata } from "next";
import { groupDataByDifficultyLevel } from "@/actions/insight.action";
import QuestionsStatistics from "./_components/questions-statistics";

export const metadata: Metadata = {
  title: "Doubt Solve Analytics",
  description: "Codeyoung Noah Admin Dashboard",
};

export default async function AnalyticsQuestions() {
  const [{ chartData, groupedData }] = await Promise.all([
    groupDataByDifficultyLevel(),
  ]);

  return (
    <div className="w-full flex-col flex p-8">
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-semibold tracking-tight">
            Question Analytics
          </h2>
        </div>
        {chartData && groupedData && (
          <QuestionsStatistics
            chartData={chartData}
            groupedData={groupedData || {}}
          />
        )}
      </div>
    </div>
  );
}
