import { queryOptions } from "@tanstack/react-query";
import api from "../services/api";
import { useAuthStore } from "../store/auth";
import { PekerjaanResponse } from "../types/responses/Pekerjaan";

export const getDaftarPekerjaan = async (
  id_kategori_group: string[]
): Promise<PekerjaanResponse> => {
  const token = useAuthStore.getState().token;
  const response = await api.get<PekerjaanResponse>(
    `/pekerjaan/daftar-pekerjaan`,
    {
      headers: {
        token: `${token}`,
      },
      params: {
        id_kategori_group,
      },
      paramsSerializer: (params) => {
        return Object.entries(params)
          .map(([key, values]) =>
            (values as string[])
              .map((value, index) => `${key}[${index}]=${value}`)
              .join("&")
          )
          .join("&");
      },
    }
  );
  return response.data;
};

export const daftarPekerjaanQuery = (id_kategori_group: string[]) =>
  queryOptions({
    queryKey: ["daftarPekerjaanQuery", id_kategori_group],
    queryFn: () => getDaftarPekerjaan(id_kategori_group),
    retry: false,
    staleTime: 60 * 60 * 1000,
  });

export const getDaftarPekerjaanSelesai = async (
  id_kategori_group: string[]
): Promise<PekerjaanResponse> => {
  const token = useAuthStore.getState().token;
  const response = await api.get<PekerjaanResponse>(
    `/pekerjaan/pekerjaan-selesai`,
    {
      headers: {
        token: `${token}`,
      },
      params: {
        id_kategori_group,
      },
      paramsSerializer: (params) => {
        return Object.entries(params)
          .map(([key, values]) =>
            (values as string[])
              .map((value, index) => `${key}[${index}]=${value}`)
              .join("&")
          )
          .join("&");
      },
    }
  );
  return response.data;
};

export const daftarPekerjaanSelesaiQuery = (id_kategori_group: string[]) =>
  queryOptions({
    queryKey: ["daftarPekerjaanSelesaiQuery", id_kategori_group],
    queryFn: () => getDaftarPekerjaanSelesai(id_kategori_group),
    retry: false,
    staleTime: 60 * 60 * 1000,
  });
