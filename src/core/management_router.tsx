import { Route, Routes } from "react-router-dom";
import Admin from "./pages/management/admin";
import Modo from "./pages/management/modo";
import NotFound from "./pages/not_found";
import ProtectRouteBySession from "./middlewares/session_route";

export default function ManagementRouter() {
  return (
    <Routes>
      <Route element={<ProtectRouteBySession session_names={["admin"]} />}>
        <Route path="/admin" element={<Admin />} />
      </Route>

      <Route element={<ProtectRouteBySession session_names={["modo"]} />}>
        <Route path="/modo" element={<Modo />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
