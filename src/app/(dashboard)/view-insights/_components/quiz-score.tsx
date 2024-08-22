"use client";
import React, { useEffect } from "react";
import YourScore from "./your-score";
import StrengthWeakness from "./strength-weakness";
import NoahQuiz from "./noah-quiz";

type QuizData = {
  quizNumber: number;
  correctAnswers: number;
};
type scoreGreaterThanOrEqualTo4Data = {
  topic: string;
  totalScore: number;
};
type scoreLessThanOrEqualTo3Data = {
  topic: string;
  totalScore: number;
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
  insights:
    | {
        scoreGreaterThanOrEqualTo4: scoreGreaterThanOrEqualTo4Data[];
        scoreLessThanOrEqualTo3: scoreLessThanOrEqualTo3Data[];
      }
    | any;
};

const QuizScore = ({ dashboardData, insights }: Props) => {
  const [isMounted, setIsMounted] = React.useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <div>
      <YourScore dashboardData={dashboardData} />
      <div className="mt-[2rem] mb-[2rem]"></div>
      <div className="mt-[2rem]">
        <StrengthWeakness type="strengths" insights={insights} />
      </div>
      <div className="mt-[2rem]">
        <StrengthWeakness type="weakness" insights={insights} />
      </div>
      <div className="mt-[2rem]">
        <NoahQuiz />
      </div>
    </div>
  );
};

export default QuizScore;
