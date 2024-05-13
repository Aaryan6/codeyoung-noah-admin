import {
  getDailyMathQuizFigure,
  getGradeWiseMathQuizFigure,
  getWeeklyMathQuizFigure,
} from "@/actions/quiz.actions";
import { SelectUser } from "./_components/select-user";
import Statistics from "./_components/statistics";

export default async function UserDashboard() {
  await getDailyMathQuizFigure();
  await getWeeklyMathQuizFigure();
  await getGradeWiseMathQuizFigure();
  return (
    <div className="flex-col flex p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">User Details</h2>
      </div>
      <div className="flex-1 space-y-4">
        <div className="pt-4">
          <SelectUser />
        </div>
        <Statistics />
      </div>
    </div>
  );
}
