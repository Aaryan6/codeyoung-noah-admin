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
