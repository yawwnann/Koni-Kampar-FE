import PrestasiGrid from "./components/PrestasiGrid";

export default function Prestasi() {
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
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-extrabold text-gray-900">
            Prestasi Atlet –
          </h2>
          <p className="text-3xl font-bold text-red-600 mb-4">
            Kebanggaan Olahraga Kampar.
          </p>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            Lihat pencapaian terbaik atlet-atlet KONI Kampar dari berbagai
            cabang olahraga, baik di tingkat nasional maupun internasional.
          </p>
        </div>

        <PrestasiGrid />
      </div>
    </div>
  );
}
