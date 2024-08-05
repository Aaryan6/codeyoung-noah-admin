import StatsCard from "@/components/stats-card";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Statistics({
  quizzes,
  totalUsers,
  totalGKQuizzes,
  totalTopics,
}: {
  quizzes: {
    totalQuizzes: number | undefined;
    mathQuizzes: number | undefined;
    scienceQuizzes: number | undefined;
    englishQuizzes: number | undefined;
  };
  totalGKQuizzes: number;
  totalTopics: number;
  totalUsers: number;
}) {
  return (
    <Card className="flex-1 h-full">
      <CardHeader>
        <CardTitle>Overall Statistics</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Quizzes" figure={quizzes.totalQuizzes ?? 0} />
        <StatsCard title="Total Users" figure={totalUsers ?? 0} />
        <StatsCard title="Total Topics" figure={totalTopics ?? 0} />
        <StatsCard title="Total GK Quizzes" figure={totalGKQuizzes ?? 0} />
      </CardContent>
    </Card>
  );
}
