"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} from "recharts";

const Quiz7Days = ({ data }: { data: any }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? (
    <Card>
      <CardHeader>
        <CardTitle>Past 7 Days Quizzes</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={350}>
          <LineChart
            width={730}
            height={350}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type='monotone'
              dataKey='quizzes'
              stroke='#8884d8'
              name='Quizzes'
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  ) : null;
};

export default Quiz7Days;
