import api from "../services/api";
import { useAuthStore } from "../store/auth";
import { UploadSuccessResponse } from "../types/responses/UploadSucces";
import { UploadFileRequest } from "../types/requests/upload-file";

export const uploadFile = async (
  data: UploadFileRequest
): Promise<UploadSuccessResponse> => {
  const token = useAuthStore.getState().token;
  const formData = new FormData();
  formData.append("fileupload", data.file);

  const response = await api.post<UploadSuccessResponse>(
    "/penilaian/upload",
    formData,
    {
      headers: {
        token: `${token}`,
      },
    }
  );

  return response.data;
};
