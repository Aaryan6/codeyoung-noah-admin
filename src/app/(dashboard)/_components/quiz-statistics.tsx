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
  return (
    <div className='grid gap-6 grid-cols-1'>
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
