"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

const OverallMetrics = ({
  data,
  conversationAnalysis,
  resolutionRate,
}: {
  data: any;
  conversationAnalysis: any;
  resolutionRate: any;
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <div className="flex flex-col space-y-12">
      <Card>
        <CardHeader>
          <CardTitle>Doubt Solving Metrics</CardTitle>
          <CardDescription>
            Doubt resolution rate and conversation analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Doubts</CardTitle>
              <CardDescription>{resolutionRate.totalChats}</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Solved Doubts</CardTitle>
              <CardDescription>{resolutionRate.solvedChats}</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Doubt Resolution Rate</CardTitle>
              <CardDescription>
                {resolutionRate.resolutionRate.toFixed(1)} %
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Average Conversation Length
              </CardTitle>
              <CardDescription>
                {conversationAnalysis.averageConversationLength.toFixed(0)}{" "}
                Messages
              </CardDescription>
            </CardHeader>
          </Card>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Doubts Solved in Past 30 Days</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart
              width={730}
              height={350}
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />

              <Line
                type="monotone"
                dataKey="doubtsSolved"
                stroke="#82ca9d"
                name="Doubts Solved"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverallMetrics;
