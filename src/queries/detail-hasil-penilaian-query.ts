import { queryOptions } from "@tanstack/react-query";
import api from "../services/api";
import { useAuthStore } from "../store/auth";
import {
  PekerjaanSelesaiDetailResponse,
  PenilaianSpkResponse,
} from "../types/responses/DetailPenilaian";

export const getDetailHasilPenilaian = async (
  id: string | undefined
): Promise<PekerjaanSelesaiDetailResponse> => {
  const token = useAuthStore.getState().token;
  const response = await api.get<PekerjaanSelesaiDetailResponse>(
    `/penilaian/detail-selesai`,
    {
      headers: {
        token: `${token}`,
      },
      params: {
        id,
      },
    }
  );
  return response.data;
};
export const getSpkPdf = async (
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

export const downloadSpkPdf = (id_penilaian: string | undefined) =>
  queryOptions({
    queryKey: ["downloadSpkPdf", id_penilaian],
    queryFn: () => getSpkPdf(id_penilaian),
    retry: false,
    staleTime: 60 * 60 * 1000, // Pastikan data tidak dianggap valid setelah di-fetch
  });
export const detailHasilPenilaianQuery = (id: string | undefined) =>
  queryOptions({
    queryKey: ["detailPenilaian", id],
    queryFn: () => getDetailHasilPenilaian(id),
    retry: false,
    staleTime: 60 * 60 * 1000, // Pastikan data tidak dianggap valid setelah di-fetch
  });
