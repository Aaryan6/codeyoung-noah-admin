import React from "react";

type QuizData = {
  quizNumber: number;
  correctAnswers: number;
};
type Props = {
  dashboardData: {
    quizNumber: number | null;
    quizWise: QuizData[] | never[];
    quizCurrentStatus: {
      numberOfCompletedQuiz: number;
      level: number;
    };
  };
};

const LevelCard = ({ dashboardData }: Props) => {
  return (
    <div className="level-card mt-[2rem]  flex-column items-center content-center w-full p-4 md:mt-[0rem] md:max-w-56">
      <div className="flex justify-center">
        <span className="text-[#2F4F4F] text-lg font-semibold">
          Level {dashboardData?.quizCurrentStatus?.level}
        </span>
      </div>
      <div className="mt-[1rem] flex justify-center text-[#569090] text-[48px] font-[700]">
        {dashboardData?.quizCurrentStatus?.numberOfCompletedQuiz
          ? dashboardData?.quizCurrentStatus?.numberOfCompletedQuiz
          : "0"}
      </div>
      <div className="flex justify-center text-[#569090] text-[14px] font-[500]">
        Completed Quizzes
      </div>
    </div>
  );
};

export default LevelCard;
