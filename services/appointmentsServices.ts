import api from "@/utils/api";

export const appointmentsServices = {
  async getAppointments(status: string, page: number) {
    try {
      const response = await api.get(
        `/mobile/appointments?status=${status}&page=${page}`
      );
      return {
        data: response?.data,
        error: false,
        message: response?.data?.message || "appointments fetched succfully",
      };
    } catch (error: any) {
      console.log(error);

      return {
        data: null,
        error: true,
        message: error.response?.data?.message || "Faild to get Appointments",
      };
    }
  },
};
