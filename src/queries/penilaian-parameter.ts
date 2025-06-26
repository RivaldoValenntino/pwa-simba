import { queryOptions } from "@tanstack/react-query";
import api from "../services/api";
import { useAuthStore } from "../store/auth";
import { FormPenilaianResponses } from "../types/responses/PenilaianParameter";

export const getPenilaianParameter = async (
  id_penilaian: string | undefined
): Promise<FormPenilaianResponses> => {
  const token = useAuthStore.getState().token;
  const response = await api.get<FormPenilaianResponses>(
    `/penilaian/parameter`,
    {
      headers: {
        token: `${token}`,
      },
      params: {
        id_penilaian,
      },
    }
  );
  return response.data;
};

export const ParameterPenilaianQuery = (id_penilaian: string | undefined) =>
  queryOptions({
    queryKey: ["parameterPenilaianQuery", id_penilaian],
    queryFn: () => getPenilaianParameter(id_penilaian),
    retry: false,
    staleTime: 60 * 60 * 1000, // Pastikan data tidak dianggap valid setelah di-fetch
  });
