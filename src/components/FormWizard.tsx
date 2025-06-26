import { useState } from "react";

const FormWizard = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="max-w-md mx-auto mt-8 overflow-hidden bg-white rounded-lg shadow-lg">
      {/* Header Wizard */}
      <div className="flex items-center px-6 py-3 text-white bg-blue-700">
        <button onClick={prevStep} className="mr-3">
          ←
        </button>
        <h2 className="text-lg font-semibold">Form Penilaian</h2>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-around p-4 text-sm">
        <div
          className={`flex-1 text-center ${step === 1 ? "font-bold" : "text-gray-400"}`}
        >
          1. Detail Aset
        </div>
        <div
          className={`flex-1 text-center ${step === 2 ? "font-bold" : "text-gray-400"}`}
        >
          2. Form
        </div>
        <div
          className={`flex-1 text-center ${step === 3 ? "font-bold" : "text-gray-400"}`}
        >
          3. Konfirmasi
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6">
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between px-6 py-4 bg-gray-100">
        {step > 1 ? (
          <button onClick={prevStep} className="text-gray-600">
            ← Kembali
          </button>
        ) : (
          <div />
        )}
        {step < 3 ? (
          <button
            onClick={nextStep}
            className="px-4 py-2 text-white bg-blue-700 rounded-md"
          >
            Selanjutnya →
          </button>
        ) : (
          <button className="px-4 py-2 text-white bg-green-700 rounded-md">
            Selesai
          </button>
        )}
      </div>
    </div>
  );
};

// Step 1: Detail Aset
const Step1 = () => (
  <div>
    <h3 className="text-lg font-semibold">Detail Aset</h3>
    <p className="text-sm text-gray-500">
      Isi informasi aset sebelum melanjutkan.
    </p>
    <input
      type="text"
      placeholder="Masukkan Nama Aset"
      className="w-full p-2 mt-3 border rounded-md"
    />
  </div>
);

// Step 2: Form Penilaian
const Step2 = () => (
  <div>
    <h3 className="text-lg font-semibold">Form Penilaian</h3>
    <div className="mt-3 space-y-4">
      <input
        type="text"
        placeholder="Masukkan Persentase Kebisingan"
        className="w-full p-2 border rounded-md"
      />
      <input
        type="text"
        placeholder="Masukkan Persentase Getaran"
        className="w-full p-2 border rounded-md"
      />
      <select className="w-full p-2 border rounded-md">
        <option>Selang Inject</option>
        <option>Ada</option>
        <option>Tidak Ada</option>
      </select>
      <input
        type="text"
        placeholder="Masukkan Nilai Suhu"
        className="w-full p-2 border rounded-md"
      />
      <input
        type="text"
        placeholder="Masukkan Persentase Kebersihan"
        className="w-full p-2 border rounded-md"
      />
    </div>
  </div>
);

// Step 3: Upload Foto & Konfirmasi
const Step3 = () => (
  <div>
    <h3 className="text-lg font-semibold">Upload Foto</h3>
    <p className="text-sm text-gray-500">
      Silahkan upload foto sebagai dokumentasi penilaian.
    </p>
    <div className="p-6 mt-3 text-center border-2 border-gray-300 border-dashed">
      📷 Ambil Gambar / Pilih dari Galeri
    </div>
  </div>
);

export default FormWizard;
