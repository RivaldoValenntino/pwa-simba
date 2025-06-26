import { AxiosError } from "axios";
import api from "../services/api";
import { useAuthStore } from "../store/auth";
import { ErrorResponse } from "../types/responses/Error";
import { SuccessResponse } from "../types/responses/Success";
import { UbahPasswordSchema, UbahPasswordType } from "../types/requests/ubah-password";

export const ubahPsaswordUpload = async (data: UbahPasswordType): Promise<SuccessResponse> => {
  const token = useAuthStore.getState().token;
  try {
    UbahPasswordSchema.parse(data);

    const response = await api.post("/auth/ubah-password", data, {
      headers: {
        token: `${token}`,
      },
    });
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ErrorResponse>;
    throw new Error(error.response?.data.message || "Gagal Mengubah Password");
  }
};