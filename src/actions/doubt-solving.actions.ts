"use server";
import { createClient } from "@/lib/supabase/server";

export async function getConversationLengths(chats) {
  const conversationLengths = chats.map((chat) => chat.messages.length);
  const lengthDistribution = {};

  conversationLengths.forEach((length) => {
    if (!lengthDistribution[length]) {
      lengthDistribution[length] = 0;
    }
    lengthDistribution[length]++;
  });

  return Object.entries(lengthDistribution).map(([length, count]) => ({
    length: Number(length),
    count,
  }));
}

export async function getResolutionRate(chats) {
  const totalChats = chats.length;
  const solvedChats = chats.filter((chat) => chat.solved).length;
  const resolutionRate = (solvedChats / totalChats) * 100;
  return resolutionRate;
}

export async function getConversationStatistics(chats) {
  const totalConversations = chats.length;
  const conversationLengths = chats.map((chat) => chat.messages.length);
  const averageConversationLength =
    conversationLengths.reduce((sum, length) => sum + length, 0) /
    conversationLengths.length;
  return {
    totalConversations,
    conversationLengths,
    averageConversationLength,
  };
}

export async function getResponseTimeAnalysis() {
  const responseTimes: any[] = [];
  chats.forEach((chat) => {
    const messages = chat.messages;
    for (let i = 0; i < messages.length - 1; i++) {
      if (messages[i].role === "user" && messages[i + 1].role === "assistant") {
        const responseTime = messages[i + 1].timestamp - messages[i].timestamp;
        responseTimes.push(responseTime);
      }
    }
  });
  const averageResponseTime =
    responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length;

  return averageResponseTime;
}
