export interface Pekerjaan {
  id?: string;
  kode?: string;
  no_spk?: string;
  nama_asset?: string;
  tanggal_penilaian?: string;
  pemohon?: string;
  is_aset_terdaftar?: string;
  STATUS?: string;
  foto_1?: string | null;
  nama?: string;
  tindakan?: string;
  onclick?: () => void;
}
