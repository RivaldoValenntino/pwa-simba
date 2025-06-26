export type Kategori = {
  id_kategori_group: string;
  kategori_group: string;
  yang_telah_dikerjakan: number;
  total_pekerjaan: number;
  progress_pekerjaan: number;
  tenggat: number;
  image: string;
};

export type DashboardResponse = {
  progress_pekerjaan: number;
  total_pekerjaan_selesai_hari_ini: number;
  total_pekerjaan_hari_ini: number;
  progress_pekerjaan_hari_ini: number;
  menu_kategori_penilaian: Kategori[];
};
