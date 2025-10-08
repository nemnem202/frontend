import { Route, Routes } from "react-router-dom";
import Home from "./pages/market/home";
import Article from "./pages/market/article";

export default function MarketRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/articles/:id" element={<Article />} />
    </Routes>
  );
}
