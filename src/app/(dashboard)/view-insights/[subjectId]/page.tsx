// import QuizScore from "@/components/quiz-score";
import React, { Suspense } from "react";
import { getDashboard, getInsight } from "../server";
import QuizScore from "../_components/quiz-score";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

type Props = {
  subjectId: number;
};

const PageContent = async (props: Props) => {
  const user_Id = getCookie("userId", { cookies });
  const grade = getCookie("grade", { cookies });
  const dashboardData = await getDashboard(user_Id!, props.subjectId);
  const insights = await getInsight(
    user_Id!,
    parseInt(grade!),
    props.subjectId
  );

  return (
    <div className="p-5 md:p-12 w-full md:max-w-5xl mx-auto bg-[#FFF] !important">
      <QuizScore dashboardData={dashboardData} insights={insights} />
    </div>
  );
};

const Page = ({ params: { subjectId } }: { params: { subjectId: number } }) => {
  return (
    <div className="p-5 md:px-12 w-full md:max-w-7xl mx-auto bg-[#FFF] !important">
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-[90vh]">
            Loading...
          </div>
        }
      >
        <PageContent subjectId={subjectId} />
      </Suspense>
    </div>
  );
};

export default Page;
