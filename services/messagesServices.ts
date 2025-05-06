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
  async sendMessage(reciver_id: number, message: string) {
    try {
      const response = await api.post("/sendMessage", {
        reciver_id,
        message,
      });
      console.log(response);
      return { data: response.data, error: null };
    } catch (error: any) {
      console.log(error);
      return {
        data: null,
        error: error.message || "Failed to send message",
      };
    }
  },
};
