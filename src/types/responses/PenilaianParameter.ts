type PenilaianParams = {
  no_spk: string;
  tanggal_penilaian: string; // format "YYYY-MM-DD"
  pemohon: string;
  petugas_1: string;
  petugas_2: string | null;
  petugas_3: string | null;
  keterangan: string;
};

type ParameterPenilaian = {
  id_detail: string;
  nama: string;
  nama_detail: string;
  nilai_min: string;
  nilai_max: string;
  satuan: string;
  tipe: Record<string, string> | string;
  bobot: string;
};

export type FormPenilaianResponses = {
  penilaian: PenilaianParams;
  parameter: ParameterPenilaian[];
};

export type Parameter = {
  id_detail: string;
  nama_detail: string;
  nilai: string;
};
