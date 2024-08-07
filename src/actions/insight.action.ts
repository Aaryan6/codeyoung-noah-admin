"use server";
import { createClient } from "@/lib/supabase/server";

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function getTotalQuizzes() {
  const supabase = createClient();
  const { data, error } = await supabase.from("quiz").select("id");
  if (error) console.log(error);
  return data?.length || 0;
}

export async function getTotalGkQuizzes() {
  const supabase = createClient();
  const { data, error } = await supabase.from("quiz_gk").select("id");
  if (error) console.log(error);
  return data?.length || 0;
}

export async function getQuestionsCountByBloomsLevel() {
  const supabase = createClient();
  const { data, error } = await supabase.from("db_math").select("blooms_level");

  if (error) {
    console.error("Error fetching data:", error);
    return;
  }
  const bloomsLevelsCount = data.reduce((acc: any, curr) => {
    const { blooms_level } = curr;
    acc[blooms_level] = (acc[blooms_level] || 0) + 1;
    return acc;
  }, {});

  // console.log("Questions count by Bloom's level:");
  const bloomsLevelsQuestions = [];
  for (const [bloomsLevel, count] of Object.entries(bloomsLevelsCount)) {
    // console.log(`${bloomsLevel}: ${count}`);
    bloomsLevelsQuestions.push({
      bloomsLevel,
      count,
    });
  }

  return bloomsLevelsQuestions;
}

export const groupDataByDifficultyLevel = async () => {
  const supabase = createClient();

  const tableNames = [
    "db_grade1_math",
    "db_grade2_math",
    "db_grade3_math",
    "db_grade4_math",
    "db_grade5_math",
    "db_grade6_math",
    "db_grade7_math",
    "db_grade8_math",
  ];

  try {
    const groupedData: {
      [difficultyLevel: string]: { count: number };
    } = {};

    for (const tableName of tableNames) {
      const { data, error } = await supabase.from(tableName).select("*");

      if (error) {
        console.error(`Error fetching data from ${tableName}: `, error);
      } else {
        data.forEach((item) => {
          const difficultyLevel = item.difficulty_level.toLowerCase();
          if (groupedData[difficultyLevel]) {
            groupedData[difficultyLevel].count++;
          } else {
            groupedData[difficultyLevel] = {
              count: 1,
            };
          }
        });
      }
    }

    const chartData = Object.entries(groupedData)
      .sort((a, b) => {
        const levelOrder = ["easy", "medium", "hard"];
        return levelOrder.indexOf(a[0]) - levelOrder.indexOf(b[0]);
      })
      .map(([difficultyLevel, { count }]) => ({
        difficultyLevel: capitalize(difficultyLevel),
        count,
      }));

    return { chartData, groupedData };
  } catch (error) {
    console.error("Error grouping data: ", error);
    throw error;
  }
};

export async function getWeeklyDoubtSolveMetrics() {
  const supabase = createClient();
  const metrics = [];

  // Get metrics for the past 7 days
  for (let i = 6; i >= 0; i--) {
    const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
    const startOfDay = new Date(date).setHours(0, 0, 0, 0);
    const endOfDay = new Date(date).setHours(23, 59, 59, 999);

    const { data: chats, error: chatsError } = await supabase
      .from("chats_doubt_solve")
      .select("id, createdAt, solved");
    if (chatsError) return null;
    const doubtsolved =
      chats?.filter(
        (chat) =>
          chat.createdAt &&
          new Date(chat.createdAt).getTime() >= startOfDay &&
          new Date(chat.createdAt).getTime() <= endOfDay &&
          chat.solved
      ).length || 0;

    const dayMetrics = {
      date: `${date.getDate().toString().padStart(2, "0")}-${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${date.getFullYear()}`,
      doubtsolved,
    };

    metrics.push(dayMetrics);
  }

  return metrics;
}
