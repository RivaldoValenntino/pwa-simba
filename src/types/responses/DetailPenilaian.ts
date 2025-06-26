type HasilPenilaian = {
  id: string;
  id_jadwal: string;
  id_petugas_1: string;
  id_petugas_2: string | null;
  id_petugas_3: string | null;
  id_kategori: string | null;
  id_tipe: string;
  id_kategori_group: string | null;
  tanggal_pengecekan: string;
  is_aset_terdaftar: string;
  latitude_aset: number | null;
  longitude_aset: number | null;
  id_asset: string | null;
  no_spk: string;
  parameter_perawatan: string;
  penanggung_jawab: string;
  tanggal: string;
  keterangan_pemohon: string;
  pemohon: string;
  latitude: number;
  longitude: number;
  tanggal_penilaian: string;
  skor_penilaian: string;
  keterangan: string;
  tindakan: string;
  kode: string;
  nama: string;
  bagian: string;
  gedung: string;
  ruangan: string;
  tipe: string;
  kategori: string;
  komponen: string | null;
  parameter: string | null;
  keterangan_asset: string | null;
  lokasi_asset: string;
  berkas: string | null;
  qr_code: string;
  qr_code_asset: string | null;
  petugas_1: string;
  petugas_2: string | null;
  petugas_3: string | null;
  status: string;
  batas_skor: string | null;
};

type DetailHasilPenilaian = {
  id: string;
  id_hasil_penilaian: string;
  id_parameter_penilaian: string;
  nama: string;
  nilai_min: string;
  nilai_max: string;
  satuan: string;
  bobot: string;
  tipe: string;
  skor_parameter: string;
};

type Foto = {
  id_penilaian: string;
  filename: string;
};

export type PekerjaanSelesaiDetailResponse = {
  hasil_penilaian: HasilPenilaian;
  detail_hasil_penilaian: DetailHasilPenilaian[];
  foto: Foto[];
};
export type PenilaianSpkResponse = {
  message: string;
  pdf_url: string;
};
