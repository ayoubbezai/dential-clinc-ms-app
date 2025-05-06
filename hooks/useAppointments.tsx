import { appointmentsServices } from "@/services/appointmentsServices";
import React, { useState, useEffect } from "react";

const useAppointments = () => {
  const [status, setStatus] = useState<string>("pending");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [page, setPage] = useState<number>(1);

  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await appointmentsServices.getAppointments(status, page);

      if (response.error) {
        setError(response.message);
      } else {
        const newData = response?.data?.data || [];
        const newPagination = response?.data?.pagination;

        setPagination(newPagination);

        setData((prevData) => {
          if (page === 1) return newData;

          const existingIds = new Set(prevData.map((item) => item.id));
          const filteredData = newData.filter(
            (item: any) => !existingIds.has(item.id)
          );

          return [...prevData, ...filteredData];
        });
      }
    } catch (err) {
      setError("Failed to fetch appointments");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [status]);

  useEffect(() => {
    fetchAppointments();
  }, [status, page]);

  return {
    status,
    setStatus,
    loading,
    error,
    data,
    setPage,
    pagination,
    page,
    refetch: fetchAppointments,
  };
};

export default useAppointments;
