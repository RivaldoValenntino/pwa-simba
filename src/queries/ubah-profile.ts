import { AxiosError } from "axios";
import api from "../services/api";
import { useAuthStore } from "../store/auth";
import { profileUpdateRequest, ProfileUpdateRequest } from "../types/requests/ubah-profile";
import { ErrorResponse } from "../types/responses/Error";
import { SuccessResponse } from "../types/responses/Success";

export const ubahProfileUpload = async (data: ProfileUpdateRequest): Promise<SuccessResponse> => {
  const token = useAuthStore.getState().token;
  try {
    profileUpdateRequest.parse(data);

    const response = await api.post("/ubah-profile", data, {
      headers: {
        token: `${token}`,
      },
    });
    return response.data;
  } catch (err) {
    const error = err as AxiosError<ErrorResponse>;
    throw new Error(error.response?.data.message || "Gagal Mengubah Profile");
  }
};