"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis } from "recharts";

const QuestionsStatistics = ({
  groupedData,
  chartData,
}: {
  groupedData: any;
  chartData: any;
}) => {
  const [hasLoaded, setHasLoaded] = useState(false);
  useEffect(() => {
    setHasLoaded(true);
  }, []);
  return (
    <div className='py-16'>
      <div className='py-4 grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <div className='lg:col-span-2'>
          {chartData && hasLoaded ? (
            <Card>
              <CardHeader>
                <CardTitle>Questions Count by Bloom&apos;s Level</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart width={550} height={350} data={chartData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='difficultyLevel' />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey='count'
                    fill='#000'
                    label='Questions by Difficulty Level'
                  />
                </BarChart>
              </CardContent>
            </Card>
          ) : null}
        </div>
        <div className='flex flex-col space-y-3'>
          <Card>
            <CardHeader>
              <CardTitle>Total Easy Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{groupedData.easy.count}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Medium Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {groupedData.medium.count}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Hard Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{groupedData.hard.count}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QuestionsStatistics;
