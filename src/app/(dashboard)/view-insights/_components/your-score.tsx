import React from "react";
import ScoreGraph from "../score-graph";
import LevelCard from "./level-card";

type QuizData = {
  quizNumber: number;
  correctAnswers: number;
};
type Props = {
  dashboardData: {
    quizNumber: number | null;
    quizWise: QuizData[];
    quizCurrentStatus: {
      numberOfCompletedQuiz: number;
      level: number;
    };
  };
};

const YourScore = ({ dashboardData }: Props) => {
  return (
    <>
      <div className="text-[#2F4F4F] text-lg font-bold">Your Score</div>
      <div className="mt-[1rem] md:flex md:justify-between">
        <div className="overflow-x-auto">
          <ScoreGraph dashboardData={dashboardData} />
        </div>
        <LevelCard dashboardData={dashboardData} />
      </div>
    </>
  );
};

export default YourScore;
