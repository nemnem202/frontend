import { Route, Routes } from "react-router-dom";
import Home from "./pages/market/home";
import Article from "./pages/market/article";
import Header from "./components/partials/header";
import NotFound from "./pages/not_found";
import FromNewProduct from "./pages/market/form-new-product";
import ProtectRouteBySession from "./middlewares/session_route";

export default function MarketRouter() {
  return (
    <>
      <Header />
      <Routes>
        <Route element={<ProtectRouteBySession session_names={["user", "vendor"]} />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<ProtectRouteBySession session_names={["user", "vendor"]} />}>
          <Route path="/articles/:id" element={<Article />} />
        </Route>

        <Route element={<ProtectRouteBySession session_names={["vendor"]} />}>
          <Route path="/articles/post-article" element={<FromNewProduct />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
