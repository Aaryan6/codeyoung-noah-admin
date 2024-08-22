import React from "react";
import { cn } from "@/lib/utils";

type QuizData = {
  quizNumber: number;
  correctAnswers: number;
};
type Props = {
  dashboardData: {
    quizNumber: number | null;
    quizWise: QuizData[] | never[];
  };
};

const ScoreGraph = ({ dashboardData }: Props) => {
  // Sort the quizWise data by quizNumber in ascending order
  dashboardData.quizWise.sort((a, b) => a.quizNumber - b.quizNumber);

  // Convert the sorted dashboardData.quizWise data to the desired format
  const data = dashboardData.quizWise.map((item) => item.correctAnswers);
  const labels = dashboardData.quizWise.map(
    (item) => `Quiz ${item.quizNumber}`
  );
  const maxBarHeight = 136;
  const minBarHeight = 20;
  const maxValue = Math.max(...data);
  const scalingFactor =
    maxValue === 0 ? 0 : (maxBarHeight - minBarHeight) / maxValue;
  return (
    <div className="flex items-end md:custom-bar-graph">
      {data?.length > 0 &&
        data?.map((value, index) => (
          <div key={index} className={cn(index > 0 && "ml-[2rem]")}>
            <div
              key={index}
              className={cn(
                "relative rounded w-[30px]",
                value <= 2
                  ? "bg-[#EB9284]"
                  : value <= 7
                  ? "bg-[#FFA85D]"
                  : "bg-[#7EC8A6]"
              )}
              style={{
                height: `${
                  value === 0
                    ? minBarHeight
                    : minBarHeight + value * scalingFactor
                }px`,
              }}
            >
              <span className="bar-value" style={{ color: "#FFF" }}>
                {value}
              </span>
            </div>
            <div
              style={{
                color: "#569090",
                maxWidth: "30px",
                overflowWrap: "break-word",
                textAlign: "center",
                fontSize: "12px",
                marginTop: "5px",
              }}
            >
              {labels[index]}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ScoreGraph;
