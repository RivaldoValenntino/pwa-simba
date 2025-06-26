import { queryOptions } from "@tanstack/react-query";
import { DashboardResponse } from "../types/responses/Dashboard";
import api from "../services/api";
import { useAuthStore } from "../store/auth";

export const getInfoDashboard = async (
  tanggal: string
): Promise<DashboardResponse> => {
  const token = useAuthStore.getState().token;
  const response = await api.get<DashboardResponse>("/dashboard", {
    headers: {
      token: `${token}`,
    },
    params: {
      tanggal,
    },
  });
  return response.data;
};

export const dashboardQuery = (tanggal: string) =>
  queryOptions({
    queryKey: ["dashboardQuery", tanggal],
    queryFn: () => getInfoDashboard(tanggal),
    retry: false,
    staleTime: 60 * 60 * 1000,
  });
