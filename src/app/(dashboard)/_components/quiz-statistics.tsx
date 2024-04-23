"use client";
import { getQuestionsCountByBloomsLevel } from "@/actions/insight.action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useRef, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis } from "recharts";

interface QuizStatisticsProps {
  gkQuiz: number;
  totalQuiz: number;
}

const QuizStatistics: React.FC<QuizStatisticsProps> = ({
  gkQuiz,
  totalQuiz,
}) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getQuestionsCountByBloomsLevel();
      setData(data || []);
    }
    fetchData();
  }, []);

  return (
    <div className='grid gap-6 grid-cols-1'>
      <Card>
        <CardHeader>
          <CardTitle>Questions Count by Bloom&apos;s Level</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart width={750} height={400} data={data}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='bloomsLevel' />
            <Tooltip />
            <Legend />
            <Bar dataKey='count' fill='#000' label='Number of Questions' />
          </BarChart>
        </CardContent>
      </Card>

      <div className='grid gap-6 grid-cols-1 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Total GK Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{gkQuiz}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{totalQuiz}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizStatistics;
