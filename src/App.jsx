import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/ui/Navbar.jsx";
import Footer from "./components/ui/Footer.jsx";
import Beranda from "./pages/Beranda/Beranda.jsx";
import About from "./pages/About/About.jsx";
import Gallery from "./pages/Gallery/gallery.jsx";
import News from "./pages/News/News.jsx";
import NewsDetail from "./pages/News/NewsDetail.jsx";
import Event from "./pages/Event/Event.jsx";
import EventDetail from "./pages/Event/EventDetail.jsx";
import SportBranch from "./pages/SportBranch/SportBranch.jsx";
import SportBranchDetail from "./pages/SportBranch/SportBranchDetail.jsx";
import Facilities from "./pages/Facilities/Facilities.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import Members from "./pages/Members/Members.jsx";
import Structure from "./pages/Members/Structure.jsx";
import Bio from "./pages/Members/Bio.jsx";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";

// Admin Pages
import AdminLayout from "./pages/Admin/components/AdminLayout.jsx";
import Dashboard from "./pages/Admin/Dashboard.jsx";
import SportBranchList from "./pages/Admin/SportBranch/SportBranchList.jsx";
import SportBranchForm from "./pages/Admin/SportBranch/SportBranchForm.jsx";
import PerformanceList from "./pages/Admin/Performance/PerformanceList.jsx";
import PerformanceForm from "./pages/Admin/Performance/PerformanceForm.jsx";
import NewsList from "./pages/Admin/News/NewsList.jsx";
import NewsForm from "./pages/Admin/News/NewsForm.jsx";
import EventList from "./pages/Admin/Event/EventList.jsx";
import EventForm from "./pages/Admin/Event/EventForm.jsx";
import GalleryList from "./pages/Admin/Gallery/GalleryList.jsx";
import GalleryForm from "./pages/Admin/Gallery/GalleryForm.jsx";
import FacilitiesList from "./pages/Admin/Facilities/FacilitiesList.jsx";
import FacilitiesForm from "./pages/Admin/Facilities/FacilitiesForm.jsx";
import UserList from "./pages/Admin/Users/UserList.jsx";
import UserForm from "./pages/Admin/Users/UserForm.jsx";
import ContactList from "./pages/Admin/Contact/ContactList.jsx";

function AppContent() {
  const location = useLocation();
  const authPages = ["/login", "/register"];
  const isAuthPage = authPages.includes(location.pathname);
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAuthPage && !isAdminPage && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Beranda />} />
        <Route path="/tentang" element={<About />} />
        <Route path="/galeri" element={<Gallery />} />
        <Route path="/berita" element={<News />} />
        <Route path="/berita/:id" element={<NewsDetail />} />
        <Route path="/event" element={<Event />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/cabor" element={<SportBranch />} />
        <Route path="/cabor/:id" element={<SportBranchDetail />} />
        <Route path="/fasilitas" element={<Facilities />} />
        <Route path="/anggota" element={<Members />} />
        <Route path="/anggota/struktur" element={<Structure />} />
        <Route path="/anggota/bio" element={<Bio />} />
        <Route path="/kontak" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          {/* Sport Branch */}
          <Route path="cabor" element={<SportBranchList />} />
          <Route path="cabor/tambah" element={<SportBranchForm />} />
          <Route path="cabor/edit/:id" element={<SportBranchForm />} />
          {/* Performance */}
          <Route path="prestasi" element={<PerformanceList />} />
          <Route path="prestasi/tambah" element={<PerformanceForm />} />
          <Route path="prestasi/edit/:id" element={<PerformanceForm />} />
          {/* News */}
          <Route path="berita" element={<NewsList />} />
          <Route path="berita/tambah" element={<NewsForm />} />
          <Route path="berita/edit/:id" element={<NewsForm />} />
          {/* Event */}
          <Route path="event" element={<EventList />} />
          <Route path="event/tambah" element={<EventForm />} />
          <Route path="event/edit/:id" element={<EventForm />} />
          {/* Gallery */}
          <Route path="galeri" element={<GalleryList />} />
          <Route path="galeri/tambah" element={<GalleryForm />} />
          {/* Facilities */}
          <Route path="fasilitas" element={<FacilitiesList />} />
          <Route path="fasilitas/tambah" element={<FacilitiesForm />} />
          <Route path="fasilitas/edit/:id" element={<FacilitiesForm />} />
          {/* Users */}
          <Route path="users" element={<UserList />} />
          <Route path="users/tambah" element={<UserForm />} />
          <Route path="users/edit/:id" element={<UserForm />} />
          {/* Contacts */}
          <Route path="kontak" element={<ContactList />} />
        </Route>
      </Routes>
      {!isAuthPage && !isAdminPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
