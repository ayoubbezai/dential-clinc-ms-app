import api from "@/utils/api";

export const messagesServices = {
  async getConversation(page: number) {
    try {
      const response = await api.get(`/getConversation?page=${page}`);
      console.log("r", response?.data);
      return {
        data: response?.data,
        error: false,
        message: response?.data?.message || "meassages fetched succfully",
      };
    } catch (error: any) {
      console.log(error);

      return {
        data: null,
        error: true,
        message: error.response?.data?.message || "Faild to get message",
      };
    }
  },
};
