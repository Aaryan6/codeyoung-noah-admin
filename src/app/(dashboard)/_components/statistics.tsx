import StatsCard from "@/components/stats-card";
import {
  getTotalQuestions,
  getTotalMathQuizzes,
  getTotalTopics,
  getTotalMathUsers,
} from "@/actions/quiz.actions";
import { getTotalGkQuizzes } from "@/actions/insight.action";

export default async function Statistics() {
  const totalQuestions = await getTotalQuestions();
  const totalQuizzes = await getTotalMathQuizzes();
  const totalTopics = await getTotalTopics();
  const totalUsers = await getTotalMathUsers();
  const totalGkQuizzes = await getTotalGkQuizzes();

  return (
    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
      <StatsCard title='Total Quizzes' figure={totalQuizzes ?? 0} />
      <StatsCard title='GK Quizzes' figure={totalGkQuizzes} />
      <StatsCard title='Topics' figure={totalTopics} />
      <StatsCard title='Users' figure={totalUsers} />
    </div>
  );
}
