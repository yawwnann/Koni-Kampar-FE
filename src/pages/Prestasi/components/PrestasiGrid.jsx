import { Link } from "react-router-dom";
import { Medal } from "lucide-react";
import { athletes } from "../../../mock/data";

function MedalCount({ achievements, type }) {
  const count = achievements.filter((a) => a.medal === type).length;
  if (count === 0) return null;

  const colors = {
    gold: "text-yellow-500",
    silver: "text-gray-400",
    bronze: "text-orange-500",
  };

  return (
    <div className={`flex items-center gap-1 text-sm font-semibold ${colors[type]}`}>
      <Medal className="w-4 h-4" />
      <span>{count}</span>
    </div>
  );
}

export default function PrestasiGrid() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {athletes.map((athlete) => (
        <Link
          to={`/prestasi/${athlete.id}`}
          key={athlete.id}
          className="group rounded-2xl overflow-hidden bg-white shadow-lg transition duration-300 hover:shadow-xl hover:-translate-y-2"
        >
          <div className="relative h-56 overflow-hidden">
            <img
              src={athlete.photo}
              alt={athlete.name}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
          </div>
          <div className="p-5">
            <div className="mb-2">
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition">
                {athlete.name}
              </h3>
              <span className="inline-block mt-1 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
                {athlete.sport}
              </span>
            </div>

            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100">
              <MedalCount achievements={athlete.achievements} type="gold" />
              <MedalCount achievements={athlete.achievements} type="silver" />
              <MedalCount achievements={athlete.achievements} type="bronze" />
            </div>

            <p className="mt-2 text-sm text-gray-500">
              {athlete.achievements.length} pencapaian
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
