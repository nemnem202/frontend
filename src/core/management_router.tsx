import { Route, Routes } from "react-router-dom";
import Admin from "./pages/management/admin";
import Modo from "./pages/management/modo";
import NotFound from "./pages/not_found";

export default function ManagementRouter() {
  return (
    <Routes>
      <Route path="/admin" element={<Admin />} />
      <Route path="/modo" element={<Modo />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
