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
  const chartData = Object.values(
    data.reduce(
      (
        acc: {
          [key: string]: {
            date: string;
            quizzes: number;
          };
        },
        curr
      ) => {
        const date = formatDateTime(curr.created_at).dateOnly; // Extract the date from the name
        if (!acc[date]) {
          acc[date] = {
            date: date,
            quizzes: 0,
          };
        }
        acc[date].quizzes += 1;
        return acc;
      },
      {}
    )
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
        <ChartContainer config={chartConfig} className="max-h-[20rem] w-full">
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
              fillOpacity={0.4}
              stroke="#244faa"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
