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
import useDateRange from "@/lib/zustand/use-date-range";

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
    totalQuizzes:
      | {
          id: string;
          subject: string;
          subject_id: number;
          created_at: string;
        }[]
      | undefined
      | null;
    mathQuizzes:
      | {
          id: string;
          subject: string;
          subject_id: number;
          created_at: string;
        }[]
      | undefined
      | null;
    scienceQuizzes:
      | {
          id: string;
          subject: string;
          subject_id: number;
          created_at: string;
        }[]
      | undefined
      | null;
    englishQuizzes:
      | {
          id: string;
          subject: string;
          subject_id: number;
          created_at: string;
        }[]
      | undefined
      | null;
  };
};

export function SubjectCircleChart({ quizzes }: Props) {
  const dateRange = useDateRange();

  const filteredMathQuizzes = quizzes?.mathQuizzes?.filter((q) =>
    dateRange.from != undefined && dateRange.to != undefined
      ? new Date(q.created_at).getTime() > dateRange.from?.getTime() &&
        new Date(q.created_at).getTime() <= dateRange.to?.getTime()
      : true
  );
  const filteredScienceQuizzes = quizzes?.scienceQuizzes?.filter((q) =>
    dateRange.from != undefined && dateRange.to != undefined
      ? new Date(q.created_at).getTime() > dateRange.from?.getTime() &&
        new Date(q.created_at).getTime() <= dateRange.to?.getTime()
      : true
  );
  const filteredEnglishQuizzes = quizzes?.englishQuizzes?.filter((q) =>
    dateRange.from != undefined && dateRange.to != undefined
      ? new Date(q.created_at).getTime() > dateRange.from?.getTime() &&
        new Date(q.created_at).getTime() <= dateRange.to?.getTime()
      : true
  );
  const filteredTotalQuizzes = quizzes?.totalQuizzes?.filter((q) =>
    dateRange.from != undefined && dateRange.to != undefined
      ? new Date(q.created_at).getTime() > dateRange.from?.getTime() &&
        new Date(q.created_at).getTime() <= dateRange.to?.getTime()
      : true
  );

  const chartData = [
    {
      subject: "math",
      quiz: filteredMathQuizzes?.length ?? 0,
      fill: "#2662d9",
    },
    {
      subject: "science",
      quiz: filteredScienceQuizzes?.length ?? 0,
      fill: "#e23670",
    },
    {
      subject: "english",
      quiz: filteredEnglishQuizzes?.length ?? 0,
      fill: "#e78b30",
    },
    {
      subject: "other",
      quiz: filteredTotalQuizzes?.length
        ? filteredTotalQuizzes.length -
          (filteredMathQuizzes?.length ?? 0) -
          (filteredScienceQuizzes?.length ?? 0) -
          (filteredEnglishQuizzes?.length ?? 0)
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
                          {filteredTotalQuizzes!.length.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Quizzes
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
