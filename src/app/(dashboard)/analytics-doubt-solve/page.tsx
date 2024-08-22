import { Metadata } from "next";
import {
  getConversationStatistics,
  getResolutionRate,
} from "@/actions/doubt-solving.actions";
import { getWeeklyDoubtSolveMetrics } from "@/actions/insight.action";
import Statistics from "./_components/stastistics";
import { DoubtSolveBarChart } from "./_components/doubt-solve-bar-chart";
import { getChatsMetrics } from "./_utils";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "./_components/chats-table/data-table";
import { columns } from "./_components/chats-table/column";

export const metadata: Metadata = {
  title: "Doubt Solve Analytics",
  description: "Codeyoung Noah Admin Dashboard",
};

export default async function AnalyticsDoubtSolve() {
  const [resolutionRate, conversationAnalysis, weeklyMetrics] =
    await Promise.all([
      getResolutionRate(),
      getConversationStatistics(),
      getWeeklyDoubtSolveMetrics(),
    ]);

  const chatsMetrics: any = await getChatsMetrics(conversationAnalysis?.chats);

  return (
    <div className="w-full flex-col flex p-8">
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-semibold tracking-tight">
            Doubt Solve Analytics
          </h2>
        </div>
        <Statistics
          data={weeklyMetrics}
          resolutionRate={resolutionRate}
          conversationAnalysis={conversationAnalysis}
        />
        <DoubtSolveBarChart weeklyMetrics={weeklyMetrics!} />
        {chatsMetrics && (
          <Card className="">
            <CardHeader>
              <CardTitle>Chats Metrics</CardTitle>
            </CardHeader>
            <DataTable columns={columns} data={chatsMetrics} />
          </Card>
        )}
      </div>
    </div>
  );
}
