"use server";
import { createClient } from "@/lib/supabase/server";

export async function getConversationLengths() {
  const supabase = createClient();
  let { data: chats, error } = await supabase
    .from("chats_doubt_solve")
    .select("*");

  const conversationLengths =
    chats?.map((chat) => chat.payload.messages.length) ?? [];
  const lengthDistribution: { [key: string]: number } = {};

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

export async function getResolutionRate() {
  const supabase = createClient();
  let { data: chats, error } = await supabase
    .from("chats_doubt_solve")
    .select("*");
  const totalChats = chats?.length || 0;
  const solvedChats = chats?.filter((chat) => chat.solved).length || 0;
  const resolutionRate = (solvedChats / totalChats) * 100;
  return { totalChats, solvedChats, resolutionRate };
}

export async function getConversationStatistics() {
  const supabase = createClient();
  let { data: chats, error } = await supabase
    .from("chats_doubt_solve")
    .select("*");
  const totalConversations = chats?.length || 0;
  const conversationLengths =
    chats?.map((chat: any) => chat.payload.messages.length) || [];
  const averageConversationLength =
    conversationLengths.reduce((sum: any, length: any) => sum + length, 0) /
    conversationLengths.length;
  return {
    totalConversations,
    conversationLengths,
    averageConversationLength,
  };
}
