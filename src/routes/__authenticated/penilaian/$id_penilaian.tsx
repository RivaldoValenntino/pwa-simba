import {
  createFileRoute,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { BottomNavigation } from "../../../components/BottomNavigation";
import { useState } from "react";
import BackIcon from "../../../assets/ic_arrow_back.svg";
import { useQuery } from "@tanstack/react-query";
import {
  DetailPekerjaanQuery,
  getSpkPekerjaanPdf,
} from "../../../queries/penilaian-pekerjaan-query";
import DetailPekerjaanSkeleton from "../../../components/skeleton/DetailPekerjaanSkeleton";
import DetailRow from "../../../components/DetailRow";
import MapButton from "../../../components/MapButton";
import { toast, ToastContainer } from "react-toastify";
import { TindakanBadge } from "../../../components/TindakanBadge";
import { ParameterPenilaianQuery } from "../../../queries/penilaian-parameter";
import { Parameter } from "../../../types/responses/PenilaianParameter";
import { uploadFile } from "../../../queries/upload-file";
import { submitPenilaian } from "../../../queries/upload-penilaian";
import { daftarPekerjaanQuery } from "../../../queries/pekerjaan-query";
import { queryClient } from "../../../main";
import LoadingSpinner from "../../../components/LoadingSpinner";
export const Route = createFileRoute(
  "/__authenticated/penilaian/$id_penilaian"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const [step, setStep] = useState(1);
  const urlApi =
    "https://demo.aj-nusantara.com/manajemen-aset-api-mangutama/public/fotoPenilaian";
  const { id_penilaian } = useParams({ strict: false });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // ambil form parameter dinamis
  const { data: dataParams } = useQuery(ParameterPenilaianQuery(id_penilaian));
  const parameters = dataParams?.parameter;
  const [LoadingUpload, setLoadingUpload] = useState(false);
  // set Formdata
  const [formData, setFormData] = useState<{
    parameters: { [id: string]: Parameter };
    tindakan: string;
    keterangan: string;
    foto: string[];
  }>({
    parameters: {},
    tindakan: "",
    keterangan: "",
    foto: [],
  });

  // console.log(formData);

  // untuk detail pekerjaan step ke 1
  const { data, isLoading } = useQuery(DetailPekerjaanQuery(id_penilaian));

  // get data surat SPK
  const { data: dataSpk } = useQuery({
    queryKey: ["spkPekerjaanPdf", id_penilaian],
    queryFn: () => getSpkPekerjaanPdf(id_penilaian),
  });

  const handleMaxValue = (
    min: number,
    max: number,
    value: number,
    label: string
  ) => {
    if (value < min) {
      toast.warning(`Nilai ${label} tidak boleh kurang dari ${min}.00`, {
        closeButton: false,
      });
    } else if (value > max) {
      toast.warning(`Nilai ${label} tidak boleh lebih dari ${max}.00`, {
        closeButton: false,
      });
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const acceptedFileTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (e.target.files) {
      const newFiles = Array.from(e.target.files);

      // Validasi jenis file
      if (!newFiles.every((file) => acceptedFileTypes.includes(file.type))) {
        toast.warning("Hanya file JPEG, JPG, dan PNG yang diizinkan!", {
          closeButton: false,
        });
        return;
      }

      // set hasil upload buat preview
      setUploadedFiles((prev) => [...prev, ...newFiles]);

      // looping setiap foto upload ke API
      for (const file of newFiles) {
        try {
          setLoadingUpload(true);
          const response = await uploadFile({ file });
          setLoadingUpload(false);
          console.log("File uploaded:", response.filename);
          setFormData((prev) => ({
            ...prev,
            foto: [...prev.foto, response.filename],
          }));
        } catch (err) {
          setLoadingUpload(false);
          toast.error(`Gagal upload ${file.name}`, {
            closeButton: false,
          });
          console.error(err);
        }
      }
    }
  };

  const handleRemoveFile = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();

    // Hapus foto dari preview
    setUploadedFiles((prevFiles) =>
      prevFiles.filter((_, fileIndex) => fileIndex !== index)
    );
    // Hapus foto yng lama dari state
    setFormData((prev) => ({
      ...prev,
      foto: prev.foto.filter((_, fileIndex) => fileIndex !== index),
    }));
  };
  if (isLoading) {
    return <DetailPekerjaanSkeleton />;
  }

  const nextStep = () => {
    if (step === 2) {
      if (!parameters) return;
      let isFormIncomplete = false;
      let outOfRangeParams: {
        label: string;
        value: number;
        min: number;
        max: number;
      }[] = [];

      if (
        formData.tindakan === "" ||
        formData.keterangan === "" ||
        formData.foto.length === 0
      ) {
        isFormIncomplete = true;
      }
      // Cek form kosong dulu
      for (const param of parameters) {
        const nilai = formData.parameters[param.id_detail]?.nilai;

        if (nilai === undefined || nilai === null || nilai === "") {
          isFormIncomplete = true;
          break;
        }
      }

      // Cek field global

      if (isFormIncomplete) {
        toast.warning("Form belum lengkap!", {
          closeButton: false,
        });
        return;
      }

      //looping setiap parameter, trus Kalau parameter form lengkap, cek batas min/max
      for (const param of parameters) {
        const nilaiRaw = formData.parameters[param.id_detail]?.nilai;
        const nilai = Number(nilaiRaw);

        // clause guard kalo nilainya NaN
        if (isNaN(nilai)) continue;

        // Cek apakah nilai berada dalam rentang min dan max jika iya masukkan ke array
        if (
          nilai < Number(param.nilai_min) ||
          nilai > Number(param.nilai_max)
        ) {
          outOfRangeParams.push({
            label: param.nama_detail,
            value: nilai,
            min: Number(param.nilai_min),
            max: Number(param.nilai_max),
          });
        }
      }

      // Double validasi Cek apakah ada parameter yang di luar rentang
      if (outOfRangeParams.length > 0) {
        outOfRangeParams.forEach(({ label, value, min, max }) => {
          handleMaxValue(min, max, value, label);
        });
        return;
      }
    }

    setStep((prev) => Math.min(prev + 1, 3));
  };

  /* Submit Handle */

  // siapkan struktur data yang akan dikirim
  // Akhir: post data ke API

  const handleSubmit = async () => {
    const payload = {
      detail: {
        id_jadwal: id_penilaian || "",
        tindakan: formData.tindakan,
        keterangan: formData.keterangan,
      },
      param: Object.values(formData.parameters).map((param) => ({
        id: param.id_detail,
        skor: param.nilai,
      })),
      foto: formData.foto,
    };

    setLoading(true);
    try {
      await submitPenilaian(payload);
      toast.success("Penilaian berhasil disimpan!", {
        closeButton: false,
      });
      setIsModalOpen(false);
      setTimeout(async () => {
        await navigate({ to: "/pekerjaan", search: { category: "0" } });
        queryClient.invalidateQueries({
          queryKey: daftarPekerjaanQuery(["0"]).queryKey,
        });
      }, 2000);
    } catch (error: any) {
      toast.error(error.message || "Terjadi kesalahan saat menyimpan data", {
        closeButton: false,
      });
      setIsModalOpen(false);
    } finally {
      setLoading(false);
    }
  };

  /* Submit Handle End */
  return (
    <div className="min-h-screen pb-32 bg-white ">
      <div className="flex items-center justify-start h-12 gap-2 p-3 bg-primary">
        <img
          src={BackIcon}
          alt=""
          className="w-6 h-6 invert"
          onClick={() =>
            navigate({ to: "/pekerjaan", search: { category: "0" } })
          }
        />
        <h1 className="text-white">Form penilaian</h1>
      </div>
      <div className="w-full max-w-3xl mx-auto overflow-y-auto bg-white rounded-b-lg">
        {/* Wizard Step Start */}
        <div className="flex items-center justify-between p-4 text-sm border-b">
          <div
            className="flex items-center cursor-pointer gap-x-2"
            onClick={setStep.bind(null, 1)}
          >
            <span
              className={`flex items-center justify-center w-6 h-6 text-xs text-white rounded-full ${
                step === 1 ? "bg-blue-600" : "bg-gray-400"
              }`}
            >
              1
            </span>
            <span className={step === 1 ? " text-black" : "text-gray-400"}>
              Data Aset
            </span>
          </div>

          <span
            className={`text-3xl${step === 1 ? " text-blue-600" : " text-gray-400"}`}
          >
            {">"}
          </span>

          <div
            className="flex items-center cursor-pointer gap-x-2"
            onClick={setStep.bind(null, 2)}
          >
            <span
              className={`flex items-center justify-center w-6 h-6 text-xs text-white rounded-full ${
                step === 2 ? "bg-blue-600" : "bg-gray-400"
              }`}
            >
              2
            </span>
            <span className={step === 2 ? " text-black" : "text-gray-400"}>
              Form
            </span>
          </div>

          <span
            className={`text-3xl${step === 2 ? " text-blue-600" : " text-gray-400"}`}
          >
            {">"}
          </span>

          <div
            className="flex items-center cursor-pointer gap-x-2"
            onClick={nextStep}
          >
            <span
              className={`flex items-center justify-center w-6 h-6 text-xs text-white rounded-full ${
                step === 3 ? "bg-blue-600" : "bg-gray-400"
              }`}
            >
              3
            </span>
            <span className={step === 3 ? " text-black" : "text-gray-400"}>
              Konfirmasi
            </span>
          </div>
        </div>
        {/* Wizard Step End */}

        <div className="px-6 py-2">
          {/* Start Step 1 */}
          {step === 1 ? (
            <div className="flex flex-col items-center justify-center w-full gap-4 mx-auto">
              <div className="flex items-center justify-between w-full max-w-3xl ">
                <h1 className="font-bold text-md">Informasi Asset</h1>
                <a
                  className="px-3 py-1 text-xs text-white rounded-full bg-primary"
                  href={dataSpk?.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  Download SPK
                </a>
              </div>
              <div className="flex flex-col items-center justify-center w-full max-w-3xl ">
                <DetailRow label="Nomor SPK" value={data?.no_spk ?? ""} />
                <div className="w-full h-0.5 bg-gray-300 mt-2"></div>

                <DetailRow
                  label="Penanggung Jawab"
                  value={data?.bagian ?? ""}
                />
                <div className="w-full h-0.5 bg-gray-300 mt-2"></div>

                <DetailRow label="Ruang" value={data?.ruangan ?? ""} />
                <div className="w-full h-0.5 bg-gray-300 mt-2"></div>

                <DetailRow label="Alamat" value={data?.lokasi ?? ""} />
                <div className="w-full h-0.5 bg-gray-300 mt-2"></div>

                <div className="flex items-center justify-between w-full my-2">
                  <p className="text-xs text-gray-500">Koordinat Aset</p>
                  <MapButton
                    latitude={data?.latitude}
                    longitude={data?.longitude}
                  />
                </div>
                <div className="w-full h-0.5 bg-gray-300 mt-2"></div>

                <DetailRow label="Keterangan" value={data?.keterangan ?? "-"} />
                <div className="w-full h-0.5 bg-gray-300 mt-2"></div>
              </div>
            </div>
          ) : null}
          {/* End Step 1 */}

          {/* Start Step 2 */}
          {step === 2 ? (
            <form>
              {/* Form Input Parameter Start */}
              <h3 className="text-lg font-semibold">Parameter</h3>
              <div className="mt-3 space-y-4">
                {Array.isArray(parameters) && parameters.length > 0 ? (
                  parameters?.map((param, index) => (
                    <div key={index}>
                      <label
                        htmlFor={param.nama_detail}
                        className="text-sm text-gray-400"
                      >
                        {param.nama_detail} ({param.nilai_min}/{param.nilai_max}
                        )
                      </label>

                      {/* Cek apakah param.tipe adalah object */}
                      {typeof param.tipe === "object" && param.tipe !== null ? (
                        <select
                          name={String(param.id_detail)}
                          id={String(param.id_detail)}
                          value={
                            formData.parameters[param.id_detail]?.nilai ===
                            "1.00"
                              ? "Ada"
                              : formData.parameters[param.id_detail]?.nilai ===
                                  "0.00"
                                ? "Tidak"
                                : ""
                          }
                          onChange={(e) => {
                            setFormData((prev) => ({
                              ...prev,
                              parameters: {
                                ...prev.parameters,
                                [param.id_detail]: {
                                  id_detail: param.id_detail,
                                  nama_detail: param.nama_detail,
                                  nilai:
                                    e.target.value === "Ada" ? "1.00" : "0.00",
                                },
                              },
                            }));
                          }}
                          className="w-full px-2 py-4 mt-2 border rounded-md focus:ring-1 focus:ring-primary focus:outline-none"
                        >
                          <option value="">-- Pilih --</option>
                          {Object.values(param.tipe).map((val, i) => (
                            <option key={i} value={val}>
                              {val}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="number"
                          name={String(param.id_detail)}
                          id={String(param.id_detail)}
                          min={param.nilai_min}
                          max={param.nilai_max}
                          value={
                            formData.parameters[param.id_detail]?.nilai || ""
                          }
                          onChange={(e) => {
                            setFormData((prev) => ({
                              ...prev,
                              parameters: {
                                ...prev.parameters,
                                [param.id_detail]: {
                                  id_detail: param.id_detail,
                                  nama_detail: param.nama_detail,
                                  nilai: e.target.value,
                                },
                              },
                            }));
                          }}
                          className="w-full px-2 py-4 mt-2 border rounded-md focus:ring-1 focus:ring-primary focus:outline-none"
                        />
                      )}
                    </div>
                  ))
                ) : (
                  <h1 className="xtext-gray-400">
                    Tidak ada parameter tersedia
                  </h1>
                )}
              </div>

              {/* Form Input Parameter End */}

              {/* Bagian Tindakan Start*/}
              <h3 className="mt-4 text-lg font-semibold">Tindakan</h3>
              <div className="mt-3 space-y-2">
                <label htmlFor="tindakan" className="text-gray-400">
                  Pilih Tindakan
                </label>
                <select
                  name="tindakan"
                  id="tindakan"
                  value={formData.tindakan}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      tindakan: e.target.value,
                    }))
                  }
                  className="w-full p-2 border rounded-md focus:ring-1 focus:ring-primary focus:outline-none"
                >
                  <option value="" disabled selected>
                    Silahkan pilih tindakan
                  </option>
                  <option value="Perbaikan">Perbaikan</option>
                  <option value="Penghapusan">Penghapusan</option>
                  <option value="Tidak Perlu Tindakan">
                    Tidak Perlu Tindakan
                  </option>
                </select>
              </div>
              {/* Bagian Tindakan End */}

              {/* Bagian Keterangan Start */}
              <div className="mt-3 space-y-2">
                <label htmlFor="keterangan" className="text-gray-400">
                  Keterangan
                </label>
                <textarea
                  name="keterangan"
                  id="keterangan"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      keterangan: e.target.value,
                    }))
                  }
                  className="w-full p-2 border rounded-md focus:ring-1 focus:ring-primary focus:outline-none"
                >
                  {formData.keterangan ? formData.keterangan : ""}
                </textarea>
              </div>
              {/* Bagian Keterangan End */}

              {/* Bagian Upload Foto */}
              <h3 className="mt-3 text-lg font-semibold">Upload Foto</h3>
              <div className="w-full mt-3">
                <label className="block text-sm font-medium text-gray-400">
                  Silahkan upload foto sebagai dokumentasi penilaian.
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="fileUpload"
                  multiple
                  onChange={handleFileUpload}
                />
                <label
                  htmlFor="fileUpload"
                  className="flex items-center justify-center w-full gap-2 px-4 py-3 mt-2 text-white rounded-md cursor-pointer bg-primary hover:bg-primary/80"
                >
                  {LoadingUpload ? "Uploading files..." : "Upload Foto"}
                </label>
              </div>

              {/* Preview Foto */}
              {uploadedFiles.length > 0 && (
                <div className="grid grid-cols-4 gap-4 my-4">
                  {uploadedFiles.map((file: File, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Foto ${index + 1}`}
                        className="object-cover w-48 h-20 rounded-lg shadow-md"
                      />
                      <button
                        type="button"
                        onClick={(event) => handleRemoveFile(index, event)}
                        className="absolute w-6 h-6 text-white bg-red-500 rounded-full top-1 right-1 hover:bg-red-600"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </form>
          ) : null}
          {/* End Step 2 */}

          {/* Start Step 3 */}
          {step === 3 ? (
            <div className="flex flex-col items-center justify-center w-full gap-2 mx-auto">
              {/* Detail Hasil Submit Paramter Start */}
              <div className="flex items-center justify-between w-full max-w-3xl ">
                <h1 className="text-lg font-semibold">Parameter</h1>
              </div>
              <div className="flex flex-col items-center justify-center w-full max-w-3xl">
                {Object.values(formData.parameters).map((param) => {
                  return (
                    <>
                      <div
                        className="flex items-center justify-between w-full my-4"
                        key={param.id_detail}
                      >
                        <p className="flex-1 text-sm text-gray-500 text-pretty">
                          {param.nama_detail}
                        </p>
                        <p className="flex-1 px-1 text-sm font-bold text-right">
                          {param.nilai}
                        </p>
                      </div>
                      <div className="w-full h-0.5 bg-gray-300 mt-2"></div>
                    </>
                  );
                })}
              </div>
              {/* Detail Hasil Submit Paramter End */}

              {/* Detail Hasil Submit Tindakan & Keterangan Start */}
              <div className="flex items-center justify-between w-full max-w-3xl ">
                <h1 className="text-lg font-semibold">Tindakan</h1>
              </div>
              <div className="flex flex-col items-center justify-center w-full max-w-3xl">
                <div className="flex items-center justify-between w-full my-4">
                  <p className="flex-1 text-sm text-gray-500 text-nowrap">
                    Jenis Tindakan
                  </p>
                  <TindakanBadge tindakan={formData.tindakan} />
                </div>
                <div className="w-full h-0.5 bg-gray-300 mt-2"></div>
                <div className="flex items-center justify-between w-full my-4">
                  <p className="flex-1 text-sm text-gray-500 text-nowrap">
                    Keterangan
                  </p>
                  <p className="flex-1 px-4 text-sm font-bold text-right">
                    {formData.keterangan}
                  </p>
                </div>
                <div className="w-full h-0.5 bg-gray-300 mt-2"></div>
              </div>
              {/* Detail Hasil Submit Tindakan & Keterangan End */}

              {/* Detail Hasil Submit Foto Penilaian Start */}
              <div className="flex items-center justify-between w-full max-w-3xl">
                <div className="flex flex-col gap-2">
                  <h1 className="text-lg font-semibold">Lampiran Foto</h1>
                  <p className="text-sm font-normal">
                    Berikut adalah hasil foto penilaian
                  </p>
                </div>
              </div>
              {formData.foto.length > 0 && (
                <div className="grid grid-cols-4 gap-4 mt-4">
                  {formData.foto.map((param, index) => (
                    <div key={index} className="relative">
                      <img
                        src={`${urlApi}/${param}`}
                        alt={`Foto ${index + 1}`}
                        className="object-cover w-48 h-20 rounded-lg shadow-md"
                      />
                    </div>
                  ))}
                </div>
              )}
              {/* Detail Hasil Submit Foto Penilaian End */}
              <button
                onClick={() => setIsModalOpen(true)}
                className={`flex items-center justify-center w-full p-4 text-center text-white rounded-full bg-primary`}
              >
                Simpan Penilaian
              </button>
            </div>
          ) : null}
          {/* End Step 3 */}
        </div>
        {LoadingUpload && <LoadingSpinner />}
        <div className="flex justify-between px-4 mt-4 bg-white">
          {step !== 3 ? (
            <button
              onClick={nextStep}
              className="flex items-center justify-center w-full p-4 text-center text-white rounded-full bg-primary"
            >
              Selanjutnya
            </button>
          ) : null}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-6 bg-white rounded-lg shadow-lg w-80">
              <h2 className="text-lg font-bold text-center">
                Konfirmasi simpan data
              </h2>
              <p className="mt-2 text-sm text-center text-gray-600">
                Apakah anda yakin ingin menyimpan data penilaian?
              </p>
              <div className="flex justify-between mt-4">
                <button
                  className="px-4 py-2 bg-gray-300 rounded-md"
                  onClick={() => setIsModalOpen(false)}
                >
                  Batal
                </button>
                <button
                  disabled={loading}
                  className="px-4 py-2 text-white rounded-md bg-primary hover:bg-primary/80"
                  onClick={handleSubmit}
                >
                  {loading ? "Loading..." : "Simpan"}
                </button>
              </div>
            </div>
          </div>
        )}

        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
      <BottomNavigation />
    </div>
  );
}
