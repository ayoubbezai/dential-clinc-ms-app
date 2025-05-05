import { profileServices } from "@/services/profileServices";
import { ProfileType } from "@/Types/alias";
import React, { useState, useEffect } from "react";

const useProfile = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ProfileType | null>(null);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await profileServices.getProfile();

      if (response.error) {
        setError(response.message);
      } else {
        const newData = response?.data?.data || [];

        setData(newData);
      }
    } catch (err) {
      setError("Failed to fetch profile");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    loading,
    error,
    data,

    refetch: fetchProfile,
  };
};

export default useProfile;
