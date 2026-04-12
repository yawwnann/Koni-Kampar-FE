import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  Eye,
  Trash2,
  Mail,
  MailOpen,
  MessageSquare,
} from "lucide-react";

// Mock data
const mockMessages = [
  {
    id: 1,
    name: "Ahmad Subarjo",
    email: "ahmad@example.com",
    subject: "Pertanyaan Pendaftaran Atlet",
    message:
      "Halo, saya ingin bertanya tentang cara mendaftar sebagai atlet untuk cabor renang. Bagaimana prosedur dan syarat yang harus dipenuhi? Terima kasih.",
    date: "2024-01-05 10:30",
    status: "unread",
  },
  {
    id: 2,
    name: "Dina Mariana",
    email: "dina@example.com",
    subject: "Pengajuan Kerja Sama",
    message:
      "Selamat pagi, kami dari perusahaan X ingin mengajukan kerja sama sponsorship untuk event yang akan datang. Mohon arahannya untuk proposal lebih lanjut.",
    date: "2024-01-04 15:45",
    status: "read",
  },
  {
    id: 3,
    name: "Budi Santoso",
    email: "budi.s@example.com",
    subject: "Informasi Event Kejurda",
    message:
      "Apakah jadwal Kejurda tahun ini sudah keluar? Saya sangat menantikan informasinya. Terima kasih.",
    date: "2024-01-03 09:20",
    status: "read",
  },
];

export default function ContactList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const filteredData = mockMessages.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(filteredData.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleView = (item) => {
    setSelectedMessage(item);
    setShowViewModal(true);
    // Di aplikasi nyata, Anda bisa memanggil API untuk mengubah status menjadi 'read'
  };

  const handleDelete = (item) => {
    setSelectedMessage(item);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log("Deleting message:", selectedMessage);
    setShowDeleteModal(false);
    setSelectedMessage(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kontak Masuk</h1>
          <p className="text-gray-500 mt-1">
            Kelola pesan dan pertanyaan dari pengunjung
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-red-50 rounded-2xl p-4 border border-red-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-xl">
              <MessageSquare className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-700">
                {mockMessages.length}
              </p>
              <p className="text-sm text-red-600">Total Pesan</p>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-xl">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-700">
                {mockMessages.filter((m) => m.status === "unread").length}
              </p>
              <p className="text-sm text-blue-600">Belum Dibaca</p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 rounded-2xl p-4 border border-green-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-xl">
              <MailOpen className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-700">
                {mockMessages.filter((m) => m.status === "read").length}
              </p>
              <p className="text-sm text-green-600">Sudah Dibaca</p>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 sm:col-span-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari pengirim, email, atau subjek..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition"
            />
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition">
            <Filter className="w-5 h-5" />
            Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedItems.length === filteredData.length &&
                      filteredData.length > 0
                    }
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Pengirim
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Subjek
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.map((item) => (
                <tr
                  key={item.id}
                  className={`hover:bg-gray-50 transition ${item.status === "unread" ? "bg-gray-50/50" : ""}`}
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                      className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p
                        className={`font-medium ${item.status === "unread" ? "text-gray-900" : "text-gray-700"}`}
                      >
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500">{item.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p
                      className={`text-sm ${item.status === "unread" ? "font-medium text-gray-900" : "text-gray-600"}`}
                    >
                      {item.subject}
                    </p>
                    <p className="text-xs text-gray-400 truncate max-w-xs mt-1">
                      {item.message}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">
                    {item.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        item.status === "unread"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {item.status === "unread" ? "Belum Dibaca" : "Dibaca"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleView(item)}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Lihat Pesan"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Hapus Pesan"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    Tidak ada pesan ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Menampilkan {filteredData.length} dari {mockMessages.length} data
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled
              className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-400"
            >
              Sebelumnya
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-red-600 text-sm text-white">
              1
            </button>
            <button
              disabled
              className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-400"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Hapus Pesan
            </h3>
            <p className="text-gray-500 mb-6">
              Apakah Anda yakin ingin menghapus pesan dari{" "}
              <strong>{selectedMessage.name}</strong>? Tindakan ini tidak dapat
              dibatalkan.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-xl text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Message Modal */}
      {showViewModal && selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-2xl flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Detail Pesan</h3>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="sr-only">Tutup</span>
                &times;
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Dari</p>
                  <p className="text-gray-900">
                    {selectedMessage.name} &lt;{selectedMessage.email}&gt;
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Tanggal</p>
                  <p className="text-gray-900">{selectedMessage.date}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Subjek</p>
                  <p className="text-gray-900 font-medium">
                    {selectedMessage.subject}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 mt-4">
                  <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-4 py-2 rounded-xl text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 transition"
              >
                Tutup
              </button>
              <a
                href={`mailto:${selectedMessage.email}?subject=Balasan: ${selectedMessage.subject}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition"
              >
                <Mail className="w-4 h-4" />
                Balas Email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
