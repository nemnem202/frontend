import { Route, Routes } from "react-router-dom";
import Home from "./pages/market/home";
import Article from "./pages/market/article";
import Header from "./components/partials/header";
import NotFound from "./pages/not_found";
import FormNewProduct from "./pages/market/form-new-product";

export default function MarketRouter() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles/:id" element={<Article />} />
        <Route path="/articles/post-article" element={<FormNewProduct />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
