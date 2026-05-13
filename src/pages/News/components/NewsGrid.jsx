import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { newsItems, caborList } from "../../../mock/data";

const ITEMS_PER_PAGE = 6;

export default function NewsGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const [caborFilter, setCaborFilter] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = newsItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCabor = caborFilter === "Semua" || item.cabor === caborFilter;
    return matchesSearch && matchesCabor;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src="/image/effect.png"
          alt="background effect"
          className="absolute top-1/2 right-0 -translate-y-1/2 w-full h-full object-cover blur-3xl opacity-20 -rotate-45"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-extrabold text-gray-900">
            Berita KONI Kampar –
          </h2>
          <p className="text-3xl font-bold text-red-600 mb-4">
            Kabar Terbaru Olahraga Kampar.
          </p>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            Temukan berita terkini seputar dunia olahraga nasional, pencapaian
            atlet, agenda penting KONI Kampar, serta opini & liputan eksklusif
            lainnya yang menginspirasi!
          </p>
        </div>

        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari berita..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition"
            />
          </div>
          <select
            value={caborFilter}
            onChange={(e) => {
              setCaborFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition bg-white"
          >
            {caborList.map((cabor) => (
              <option key={cabor} value={cabor}>
                {cabor === "Semua" ? "Semua Cabang Olahraga" : cabor}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedItems.map((news) => (
            <Link
              to={`/berita/${news.id}`}
              key={news.id}
              className="group rounded-2xl overflow-hidden bg-white shadow-lg transition duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={news.image}
                  alt={news.title}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <div className="mb-3 flex items-center gap-3 text-sm">
                  <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
                    {news.category}
                  </span>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600">
                    {news.cabor}
                  </span>
                  <span className="text-gray-500">{news.date}</span>
                </div>

                <h3 className="mb-3 text-lg font-bold text-gray-900 line-clamp-3 group-hover:text-red-600 transition">
                  {news.title}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-4">
                  {news.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Tidak ada berita yang ditemukan.</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-10 px-4 rounded-lg border border-gray-200 text-sm text-gray-700 font-medium hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sebelumnya
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`h-10 w-10 rounded-lg font-medium transition ${
                  page === currentPage
                    ? "bg-red-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-10 px-4 rounded-lg border border-gray-200 text-sm text-gray-700 font-medium hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Selanjutnya
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
