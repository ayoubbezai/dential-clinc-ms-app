// hooks/useProtectedRoute.ts
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { getToken, removeToken } from "@/utils/tokenStorage";

export default function useProtectedRoute() {
  const router = useRouter();


  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      console.log("token", token);
      if (!token) {
        router.replace("/login");
      }
    };
    checkToken();
  }, []);
}
