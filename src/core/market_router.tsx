import { Route, Routes } from "react-router-dom";
import Article from "./pages/market/article";
import Header from "./components/partials/header";
import NotFound from "./pages/not_found";
import FromNewProduct from "./pages/market/form-new-product";
import ProtectRouteBySession from "./middlewares/session_route";
import Basket from "./pages/market/basket";
import { Home } from "./pages/market/home";

export default function MarketRouter() {
  return (
    <>
      <Header />
      <Routes>
        {/* <Route element={<ProtectRouteBySession session_names={["user"]} />}> */}
        <Route path="/basket" element={<Basket />} />
        {/* </Route> */}
        {/* <Route element={<ProtectRouteBySession session_names={["user"]} />}> */}
        <Route path="/" element={<Home />} />
        {/* </Route> */}
        {/* <Route
          element={<ProtectRouteBySession session_names={["user", "vendor"]} />}
        > */}
        <Route path="/articles/:id" element={<Article />} />
        {/* </Route> */}
        {/* <Route
          element={<ProtectRouteBySession session_names={["user", "vendor"]} />}
        > */}
        <Route path="/category/:category" element={<Home />} />
        {/* </Route> */}

        <Route element={<ProtectRouteBySession session_names={["vendor"]} />}>
          <Route path="/articles/post-article" element={<FromNewProduct />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
