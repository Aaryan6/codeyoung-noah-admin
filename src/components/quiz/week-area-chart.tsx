"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

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
import { formatDateTime } from "@/lib/utils";
import useDateRange from "@/lib/zustand/use-date-range";
import { useEffect } from "react";

const chartConfig = {
  quizzes: {
    label: "Quizzes",
    color: "#244faa",
  },
} satisfies ChartConfig;

export function WeekAreaChart({
  data,
}: {
  data: {
    id: number;
    subject: string | null;
    subject_id: number | null;
    created_at: string;
  }[];
}) {
  const dateRange = useDateRange();
  const chartData = Object.values(
    data.reduce((acc: { [key: string]: any }, curr) => {
      const date = formatDateTime(curr.created_at).dateOnly;
      const subject = (curr.subject?.toLowerCase() || "unknown") as any;

      if (!acc[date]) {
        acc[date] = {
          date,
          quizzes: 0,
          math: 0,
          science: 0,
          english: 0,
        };
      }

      acc[date].quizzes += 1;

      if (subject in acc[date]) {
        acc[date][subject] += 1;
      }

      return acc;
    }, {})
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Past 7 Days Quizzes</CardTitle>
        <CardDescription>
          Showing total quizzes for the last 7 days
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <ChartContainer config={chartConfig} className="max-h-[25rem] w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={4}
              tickFormatter={(value) => (value > 0 ? value : "")}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="quizzes"
              type="natural"
              fill="#244faa"
              fillOpacity={0.5}
              stroke="#244faa"
            />
            <Area
              dataKey="math"
              type="natural"
              fill="#2662d9"
              fillOpacity={0.5}
              stroke="#2662d9"
            />
            <Area
              dataKey="science"
              type="natural"
              fill="#e23670"
              fillOpacity={0.5}
              stroke="#e23670"
            />
            <Area
              dataKey="english"
              type="natural"
              fill="#e78b30"
              fillOpacity={0.5}
              stroke="#e78b30"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
