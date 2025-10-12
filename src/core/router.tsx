import { BrowserRouter, Route, Routes } from "react-router-dom";
import MarketRouter from "./market_router";
import ManagementRouter from "./management_router";
import NotFound from "./pages/not_found";
import Footer from "./components/partials/footer";
import { Toaster } from "./components/ui/sonner";
import RegisterOrLogin from "./pages/registerOrLogin";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/market/*" element={<MarketRouter />} />
        <Route path="/management/*" element={<ManagementRouter />} />
        <Route path="/" element={<RegisterOrLogin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Toaster />
    </BrowserRouter>
  );
}
