import { AxiosError } from "axios";
import api from "../services/api";
import { useAuthStore } from "../store/auth";
import { PenilaianRequest } from "../types/requests/form-penilaian";
import { ErrorResponse } from "../types/responses/Error";

export const submitPenilaian = async (data: PenilaianRequest) => {
  const token = useAuthStore.getState().token;
  try {
    const response = await api.post("/penilaian/submit", data, {
      headers: {
        token: `${token}`,
      },
    });
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ErrorResponse>;
    throw new Error(
      error.response?.data.message || "Gagal Menyimpan Penilaian"
    );
  }
};
