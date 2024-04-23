import StatsCard from "@/components/stats-card";
import {
  getTotalQuestions,
  getTotalQuizzes,
  getTotalTopics,
  getTotalUsers,
} from "@/actions/quiz.actions";
import { getQuestionsCountByBloomsLevel } from "@/actions/insight.action";

export default async function Statistics() {
  const totalQuestions = await getTotalQuestions();
  const totalQuizzes = await getTotalQuizzes();
  const totalTopics = await getTotalTopics();
  const totalUsers = await getTotalUsers();

  return (
    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
      <StatsCard title='Total Quizzes' figure={totalQuizzes ?? 0} />
      <StatsCard title='Users' figure={totalUsers} />
      <StatsCard title='Topics' figure={totalTopics} />
    </div>
  );
}
