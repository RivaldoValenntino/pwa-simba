import { queryOptions } from "@tanstack/react-query";
import api from "../services/api";
import { useAuthStore } from "../store/auth";
import { DetailPekerjaanResponse } from "../types/responses/DetailPekerjaan";
import { PenilaianSpkResponse } from "../types/responses/DetailPenilaian";

export const geDetailPekerjaan = async (
  id_penilaian: string | undefined
): Promise<DetailPekerjaanResponse> => {
  const token = useAuthStore.getState().token;
  const response = await api.get<DetailPekerjaanResponse>(`/penilaian/detail`, {
    headers: {
      token: `${token}`,
    },
    params: {
      id_penilaian,
    },
  });
  return response.data;
};

export const DetailPekerjaanQuery = (id_penilaian: string | undefined) =>
  queryOptions({
    queryKey: ["detailPenilaian", id_penilaian],
    queryFn: () => geDetailPekerjaan(id_penilaian),
    retry: false,
    staleTime: 60 * 60 * 1000, // Pastikan data tidak dianggap valid setelah di-fetch
  });

export const getSpkPekerjaanPdf = async (
  id_penilaian: string | undefined
): Promise<PenilaianSpkResponse> => {
  const token = useAuthStore.getState().token;
  const response = await api.get<PenilaianSpkResponse>(`/penilaian/spk-pdf`, {
    headers: {
      token: `${token}`,
    },
    params: {
      id_penilaian,
    },
  });
  return response.data;
};
