"use client";
import { useState } from "react";
import Link from "next/link";

export default function TanamPohonPage() {
  const [file, setFile] = useState<File | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      // Simulasi sukses upload
      setShowPopup(true);
    }
  };

  return (
    <div className="bg-[#F2EFE7] min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 relative">
        {/* Tombol Kembali */}
        <Link href="/tantangan">
          <button className="mb-6 text-[#006A71] hover:text-[#48A6A7] transition font-semibold">
            ← Kembali ke Daftar Tantangan
          </button>
        </Link>

        <h1 className="text-3xl font-bold text-[#006A71] mb-4">
          🌱 Tantangan: Tanam Pohon di Rumah
        </h1>
        <p className="text-gray-700 mb-6">
          Ayo tanam pohon di rumahmu dan unggah bukti dalam bentuk foto atau video. Setelah diverifikasi,
          kamu akan mendapatkan <span className="font-semibold text-[#006A71]">sertifikat digital</span> sebagai apresiasi.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-[#006A71] font-medium">
            Unggah Bukti (Foto/Video)
          </label>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="block w-full border border-gray-300 rounded-md p-2"
            required
          />

          <button
            type="submit"
            className="bg-[#48A6A7] text-white px-4 py-2 rounded hover:bg-[#006A71] transition"
          >
            Kirim Bukti
          </button>
        </form>
      </div>

      {/* Popup sukses */}
      {showPopup && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
            <h2 className="text-2xl font-bold text-[#006A71] mb-2">Bukti Terkirim!</h2>
            <p className="text-gray-700 mb-4">
              Terima kasih sudah berkontribusi! Bukti berhasil diunggah dan akan segera diverifikasi dan sertifikan akan dikirimkan pada notifikasi anda.
            </p>
            <Link href="/tantangan">
              <button
                onClick={() => setShowPopup(false)}
                className="mt-2 bg-[#48A6A7] text-white px-4 py-2 rounded hover:bg-[#006A71] transition"
              >
                ← Kembali ke Tantangan
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
