// zodiakku-pwa/src/App.jsx
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import HomePage from "./pages/HomePage";
import ZodiakListPage from "./pages/ZodiakListPage";
import ZodiakDetailPage from "./pages/ZodiakDetailPage";
import RamalanListPage from "./pages/RamalanListPage";
import RamalanDetailPage from "./pages/RamalanDetailPage";
import FavoritPage from "./pages/FavoritPage";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/zodiak" element={<ZodiakListPage />} />
        <Route path="/zodiak/:slug" element={<ZodiakDetailPage />} />
        <Route path="/ramalan" element={<RamalanListPage />} />
        <Route path="/ramalan/:slug" element={<RamalanDetailPage />} />
        <Route path="/favorit" element={<FavoritPage />} />
        <Route path="/profil" element={<ProfilePage />} />
      </Routes>
    </MainLayout>
  );
}
