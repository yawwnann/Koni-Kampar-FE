import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Medal, Calendar } from "lucide-react";
import { athletes } from "../../mock/data";

const medalConfig = {
  gold: { label: "Emas", bg: "bg-yellow-100", text: "text-yellow-700", icon: "text-yellow-500" },
  silver: { label: "Perak", bg: "bg-gray-100", text: "text-gray-700", icon: "text-gray-400" },
  bronze: { label: "Perunggu", bg: "bg-orange-100", text: "text-orange-700", icon: "text-orange-500" },
};

export default function PrestasiDetail() {
  const { id } = useParams();
  const athlete = athletes.find((a) => a.id === Number(id));

  if (!athlete) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Atlet tidak ditemukan</h2>
          <Link to="/prestasi" className="mt-4 inline-flex items-center gap-2 text-red-600 hover:underline">
            <ArrowLeft className="w-4 h-4" />
            Kembali ke daftar prestasi
          </Link>
        </div>
      </div>
    );
  }

  const sortedAchievements = [...athlete.achievements].sort((a, b) => b.year - a.year);
  const goldCount = athlete.achievements.filter((a) => a.medal === "gold").length;
  const silverCount = athlete.achievements.filter((a) => a.medal === "silver").length;
  const bronzeCount = athlete.achievements.filter((a) => a.medal === "bronze").length;

  return (
    <div className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src="/image/effect.png"
          alt="background effect"
          className="absolute top-1/2 right-0 -translate-y-1/2 w-full h-full object-cover blur-3xl opacity-20 -rotate-45"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/prestasi"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 transition mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali ke daftar prestasi
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="rounded-2xl overflow-hidden bg-white shadow-lg">
              <div className="h-72 overflow-hidden">
                <img
                  src={athlete.photo}
                  alt={athlete.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900">{athlete.name}</h1>
                <span className="inline-block mt-2 rounded-full bg-red-100 px-4 py-1.5 text-sm font-semibold text-red-600">
                  {athlete.sport}
                </span>

                <div className="mt-6 space-y-3">
                  <p className="text-sm text-gray-500 font-medium">Total Medali</p>
                  <div className="flex gap-4">
                    {goldCount > 0 && (
                      <div className="flex items-center gap-2">
                        <Medal className="w-5 h-5 text-yellow-500" />
                        <span className="font-bold text-yellow-700">{goldCount} Emas</span>
                      </div>
                    )}
                    {silverCount > 0 && (
                      <div className="flex items-center gap-2">
                        <Medal className="w-5 h-5 text-gray-400" />
                        <span className="font-bold text-gray-700">{silverCount} Perak</span>
                      </div>
                    )}
                    {bronzeCount > 0 && (
                      <div className="flex items-center gap-2">
                        <Medal className="w-5 h-5 text-orange-500" />
                        <span className="font-bold text-orange-700">{bronzeCount} Perunggu</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-white shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Riwayat Prestasi
              </h2>

              <div className="space-y-4">
                {sortedAchievements.map((ach, index) => {
                  const config = medalConfig[ach.medal];
                  return (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition"
                    >
                      <div className={`p-2 rounded-xl ${config.bg} shrink-0`}>
                        <Medal className={`w-6 h-6 ${config.icon}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">
                            {ach.event}
                          </h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
                            {config.label}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{ach.description}</p>
                        <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{ach.year}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
