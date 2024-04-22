"use client";
import StatsCard from "@/components/stats-card";
import { useEffect, useState } from "react";
import useUserStore from "@/lib/zustand/user.select";
import { getTotalQuizzes } from "@/actions/user.actions";

export default function Statistics() {
  const [totalQuizzes, setTotalQuizzes] = useState(0);
  const useUser = useUserStore();

  useEffect(() => {
    (async () => {
      const quiz_res: any = await getTotalQuizzes(useUser.userid!);
      setTotalQuizzes(quiz_res);
      console.log(quiz_res);
      console.log(useUser.userid);
    })();
  }, [useUser.userid]);
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
      <StatsCard title="Total Quizzes" figure={totalQuizzes ?? 0} />
    </div>
  );
}
