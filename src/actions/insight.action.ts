import { createClient } from "@/lib/supabase/client";

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

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
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

    console.log(groupedData);
    const chartData = Object.entries(groupedData).map(
      ([difficultyLevel, { count }]) => ({
        difficultyLevel: capitalize(difficultyLevel),
        count,
      })
    );

    return { chartData, groupedData };
  } catch (error) {
    console.error("Error grouping data: ", error);
    throw error;
  }
};
