import { Metadata } from "next";
import {
  getConversationStatistics,
  getResolutionRate,
} from "@/actions/doubt-solving.actions";
import { getDailyMetrics } from "@/actions/insight.action";
import OverallMetrics from "../_components/overall-metrics";

export const metadata: Metadata = {
  title: "Doubt Solve Analytics",
  description: "Codeyoung Noah Admin Dashboard",
};

export default async function AnalyticsDoubtSolve() {
  const [resolutionRate, conversationAnalysis, monthlyMetrics] =
    await Promise.all([
      getResolutionRate(),
      getConversationStatistics(),
      getDailyMetrics(),
    ]);

  return (
    <div className="w-full flex-col flex p-8">
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-semibold tracking-tight">
            Doubt Solve Analytics
          </h2>
        </div>
        <OverallMetrics
          data={monthlyMetrics}
          resolutionRate={resolutionRate}
          conversationAnalysis={conversationAnalysis}
        />
      </div>
    </div>
  );
}
