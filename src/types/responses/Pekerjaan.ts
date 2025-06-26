type Kategori = {
  id_kategori_group?: string;
  nama_kategori?: string;
  is_aktif_filter?: number;
};

type JadwalPenilaian = {
  id?: string;
  kode?: string;
  no_spk?: string;
  nama_asset?: string;
  tanggal_penilaian?: string;
  pemohon?: string;
  is_aset_terdaftar?: string;
  STATUS?: string;
  foto_1?: string | null;
};

export type PekerjaanResponse = {
  kategori?: Kategori[];
  jadwal_penilaian?: JadwalPenilaian[];
};

type Penilaian = {
  no_spk: string;
  tanggal_penilaian: string; // format "YYYY-MM-DD"
  pemohon: string;
  petugas_1: string;
  petugas_2: string | null;
  petugas_3: string | null;
  keterangan: string;
};

type Parameter = {
  id_detail: string;
  nama: string;
  nama_detail: string;
  nilai_min: string; // kalau mau bisa juga diubah ke number tergantung kebutuhan
  nilai_max: string;
  satuan: string;
  tipe: string;
  bobot: string;
};

export type FormPenilaian = {
  penilaian: Penilaian;
  parameter: Parameter[];
};
