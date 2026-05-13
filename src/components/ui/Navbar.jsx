import { useState } from "react";
import { Link, NavLink } from "react-router";
import { Globe, User } from "lucide-react";

// Assumes TailwindCSS is configured. Logos are served from public/image
// Active link style: red text (#EF4444).

const navItems = [
  { name: "Beranda", to: "/" },
  { name: "Tentang", to: "/tentang" },
  { name: "Galeri", to: "/galeri" },
  { name: "Berita", to: "/berita" },
  { name: "Prestasi", to: "/prestasi" },
  { name: "Event", to: "/event" },
  { name: "Cabor", to: "/cabor" },
  { name: "Anggota", to: "/anggota" },
  { name: "Fasilitas", to: "/fasilitas" },
  { name: "Kontak", to: "/kontak" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo */}
          <div className="flex min-w-55 items-center gap-3">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/image/logo.png"
                alt="KONI Kampar"
                className="h-9 w-auto"
                loading="eager"
              />
            </Link>
          </div>

          {/* Center: Menu (desktop) */}
          <div className="hidden flex-1 justify-center md:flex">
            <ul className="flex items-center gap-8 text-sm text-gray-700">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      [
                        "transition-colors hover:text-red-500",
                        isActive
                          ? "font-semibold text-red-500"
                          : "text-gray-800",
                      ].join(" ")
                    }
                    end={item.to === "/"}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Language + User */}
          <div className="flex min-w-30 items-center justify-end gap-5">
            <button
              className="flex items-center gap-2 text-sm text-gray-800 hover:text-gray-900"
              aria-label="Ganti Bahasa"
            >
              <Globe className="w-5 h-5 " />
              <span className="text-sm">ID</span>
            </button>
            <Link
              to="/login"
              className="text-gray-800 hover:text-red-600 transition"
              aria-label="Login"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Mobile toggle */}
            <button
              className="md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Buka menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-6 w-6"
              >
                {open ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden">
            <ul className="space-y-1 border-t border-gray-200 py-3 text-sm">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      [
                        "block rounded px-3 py-2",
                        isActive
                          ? "bg-red-50 font-semibold text-red-600"
                          : "text-gray-800 hover:bg-gray-50",
                      ].join(" ")
                    }
                    onClick={() => setOpen(false)}
                    end={item.to === "/"}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
