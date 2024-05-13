import StatsCard from "@/components/stats-card";
import {
  getTotalQuestions,
  getTotalMathQuizzes,
  getTotalTopics,
  getTotalMathUsers,
} from "@/actions/quiz.actions";

export default async function Statistics() {
  const totalQuestions = await getTotalQuestions();
  const totalQuizzes = await getTotalMathQuizzes();
  const totalTopics = await getTotalTopics();
  const totalUsers = await getTotalMathUsers();

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <StatsCard title="Total Quizzes" figure={totalQuizzes ?? 0} />
      <StatsCard title="Users" figure={totalUsers} />
      <StatsCard title="Topics" figure={totalTopics} />
    </div>
  );
}
