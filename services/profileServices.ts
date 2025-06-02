import api from "@/utils/api";

export const profileServices = {
  async getProfile() {
    try {
      const response = await api.get(`/profile`);
      console.log("Profile response:", response);
      return {
        data: response?.data,
        error: false,
        message: response?.data?.message || "profile fetched succfully",
      };
    } catch (error: any) {
      console.log(error);

      return {
        data: null,
        error: true,
        message: error.response?.data?.message || "Faild to get profile",
      };
    }
  },
};
