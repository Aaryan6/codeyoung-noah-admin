import StatsCard from "@/components/stats-card";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Statistics({
  totalQuizzes,
  totalGkQuizzes,
  totalTopics,
  totalUsers,
}: {
  totalQuizzes: number;
  totalGkQuizzes: number;
  totalTopics: number;
  totalUsers: number;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Overall Statistics</CardTitle>
      </CardHeader>
      <CardContent className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <StatsCard title='Total Quizzes' figure={totalQuizzes ?? 0} />
        <StatsCard title='GK Quizzes' figure={totalGkQuizzes} />
        <StatsCard title='Topics' figure={totalTopics} />
        <StatsCard title='Users' figure={totalUsers} />
      </CardContent>
    </Card>
  );
}
