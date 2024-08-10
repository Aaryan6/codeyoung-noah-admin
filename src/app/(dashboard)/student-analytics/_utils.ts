import { DateRange } from "react-day-picker";

export const getMostServedTopic = (data: any, dateRange: DateRange) => {
  if (!data) return null;
  const dataByTopic = data
    ?.filter((d: any) =>
      (d.topic_id !== null || d.topic !== null) &&
      dateRange.from &&
      dateRange.to
        ? new Date(d.created_at) > dateRange.from &&
          new Date(d.created_at) <= dateRange.to
        : d.created_at
    )
    .map((d: any) => {
      return {
        id: d.id,
        userid: d.userid,
        created_at: d.created_at,
        topic: d?.topicTable?.topic_name || d?.topic,
      };
    });

  const mostServedTopic = Object.entries(
    dataByTopic
      ?.filter((d: any) => d.topic != null)
      .reduce((acc: any, curr: any) => {
        if (!acc[curr.topic]) {
          acc[curr.topic] = 0;
        }
        acc[curr.topic] += 1;
        return acc;
      }, {})
  ).map(([topic, served]) => ({ topic, served }));

  return {
    servedTopics: mostServedTopic,
  };
};

export const getAttemptedQuestions = (data: any, dateRange: DateRange) => {
  const attemptedQuestions = data
    ?.filter((d: any) =>
      dateRange.from && dateRange.to
        ? new Date(d.created_at) > dateRange.from &&
          new Date(d.created_at) <= dateRange.to
        : d.created_at
    )
    .reduce((acc: any, curr: any) => {
      return acc + (curr.submissions?.length || 0);
    }, 0);
  return attemptedQuestions;
};

export const getCorrectSubmissions = (data: any, dateRange: DateRange) => {
  const attemptedQuestions = data
    ?.filter((d: any) =>
      dateRange.from && dateRange.to
        ? new Date(d.created_at) > dateRange.from &&
          new Date(d.created_at) <= dateRange.to
        : d.created_at
    )
    .reduce((acc: any, curr: any) => {
      return (
        acc +
        (curr.submissions?.filter((s: any) => s.isCorrect === true).length || 0)
      );
    }, 0);
  return attemptedQuestions;
};
