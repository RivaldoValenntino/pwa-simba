import { z } from "zod";

export const uploadFileRequest = z.object({
  file: z.instanceof(File),
});

export type UploadFileRequest = z.infer<typeof uploadFileRequest>;
