import StatsCard from "./stats-card";
import {
  getTotalQuestions,
  getTotalQuizzes,
  getTotalTopics,
  getTotalUsers,
} from "@/actions/quiz.actions";

export default async function Statistics() {
  const totalQuestions = await getTotalQuestions();
  const totalQuizzes = await getTotalQuizzes();
  const totalTopics = await getTotalTopics();
  const totalUsers = await getTotalUsers();
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard title="Total Quizzes" figure={totalQuizzes ?? 0} />
      <StatsCard title="Total Questions" figure={totalQuestions ?? 0} />
      <StatsCard title="Users" figure={totalUsers} />
      <StatsCard title="Topics" figure={totalTopics} />
    </div>
  );
}
