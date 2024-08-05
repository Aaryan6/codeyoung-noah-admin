"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  quiz: {
    label: "Total Quizzes",
  },
  math: {
    label: "Math",
    color: "#2662d9",
  },
  science: {
    label: "Science",
    color: "#e23670",
  },
  english: {
    label: "English",
    color: "#e78b30",
  },
  other: {
    label: "Other",
    color: "#626262",
  },
} satisfies ChartConfig;

type Props = {
  quizzes: {
    totalQuizzes: number | undefined;
    mathQuizzes: number | undefined;
    scienceQuizzes: number | undefined;
    englishQuizzes: number | undefined;
  };
};

export function SubjectCircleChart({ quizzes }: Props) {
  const chartData = [
    {
      subject: "math",
      quiz: quizzes.mathQuizzes ?? 0,
      fill: "#2662d9",
    },
    {
      subject: "science",
      quiz: quizzes.scienceQuizzes ?? 0,
      fill: "#e23670",
    },
    {
      subject: "english",
      quiz: quizzes.englishQuizzes ?? 0,
      fill: "#e78b30",
    },
    {
      subject: "other",
      quiz: quizzes.totalQuizzes
        ? quizzes.totalQuizzes -
          (quizzes.mathQuizzes ?? 0) -
          (quizzes.scienceQuizzes ?? 0) -
          (quizzes.englishQuizzes ?? 0)
        : 0,
      fill: "#626262",
    },
  ];

  return (
    <Card className="flex flex-col w-full max-w-md">
      <CardHeader className="items-center pb-0">
        <CardTitle>Subject Quizzes</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="quiz"
              nameKey="subject"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {quizzes.totalQuizzes!.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
