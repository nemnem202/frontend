import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import MarketRouter from "./market_router";
import ManagementRouter from "./management_router";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/market/*" element={<MarketRouter />} />
        <Route path="/management/*" element={<ManagementRouter />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
