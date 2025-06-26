import { z } from "zod";

export const PenilaianRequest = z.object({
  detail: z.object({
    id_jadwal: z.string(),
    keterangan: z.string(),
    tindakan: z.string(),
  }),
  param: z.array(
    z.object({
      id: z.string(),
      skor: z.string(),
    })
  ),
  foto: z.array(z.string()),
});

export type PenilaianRequest = z.infer<typeof PenilaianRequest>;
