import { z } from "zod";

const phoneRegex = /^(?:\+62|62|08)[1-9][0-9]{7,11}$/;

export const profileUpdateRequest = z.object({
  nama_lengkap: z.string(),
  kontak: z
    .string()
    .regex(phoneRegex, "Nomor HP tidak valid")
    .min(10, "Nomor HP minimal 10 digit")
    .max(13, "Nomor HP maksimal 13 digit"),
  alamat: z.string(),
});

export type ProfileUpdateRequest = z.infer<typeof profileUpdateRequest>;
