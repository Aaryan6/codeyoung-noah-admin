"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
const DoubtSolvingMetrics = ({
  data,
  conversationAnalysis,
  resolutionRate,
}: {
  data: any;
  conversationAnalysis: any;
  resolutionRate: any;
}) => {
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
    </div>
  );
};

export default DoubtSolvingMetrics;
