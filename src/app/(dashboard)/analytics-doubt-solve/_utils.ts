export const getChatsMetrics = async (data: any) => {
  const chatsByUserId = Object.entries(
    data?.reduce((acc: any, chat: any) => {
      if (!acc[chat.user_id]) {
        acc[chat.user_id] = {
          totalChats: 0,
          messagesLength: 0,
          doubtSolved: 0,
        };
      }
      acc[chat.user_id] = {
        totalChats: acc[chat.user_id].totalChats + 1,
        messagesLength:
          acc[chat.user_id].messagesLength + chat.payload.messages.length,
        doubtSolved: chat.solved
          ? acc[chat.user_id].doubtSolved + 1
          : acc[chat.user_id].doubtSolved,
      };
      return acc;
    }, {})
  ).map(([userId, metrics]: any) => ({
    userId,
    ...metrics,
  }));

  return chatsByUserId;
};
