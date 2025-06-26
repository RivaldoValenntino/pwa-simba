import { z } from "zod";

export const UbahPasswordSchema = z.object({
  password_lama: z.string().min(6, "Password lama minimal 6 karakter"),
  password_baru: z.string().min(6, "Password baru minimal 6 karakter"),
  konfirmasi_password_baru: z.string().min(6, "Konfirmasi password minimal 6 karakter"),
}).refine((data) => data.password_baru === data.konfirmasi_password_baru, {
  path: ["konfirmasi_password_baru"],
  message: "Konfirmasi password tidak cocok",
});

export type UbahPasswordType = z.infer<typeof UbahPasswordSchema>;
