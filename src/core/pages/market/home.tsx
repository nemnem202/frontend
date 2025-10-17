import { AppSidebar } from "@/core/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/core/components/ui/sidebar";
import { ApiService } from "@/services/api_service";
import { Product } from "@/types/tables/product";
import "../../../stylesheets/pages/home.css";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { errorToastProps } from "@/config/display/toasterProps";
import { Spinner } from "@/core/components/ui/spinner";
import ProductCard from "@/core/components/partials/product_card";

export function Home() {
  const [productsList, setProductList] = useState<Product[] | null>(null);

  const get_products = async () => {
    const products = await ApiService.get<Product[]>(new Headers(), "/market");

    if ("message" in products) {
      return toast(products.message, errorToastProps);
    } else {
      return setProductList(products);
    }
  };

  useEffect(() => {
    get_products();
  }, []);

  return (
    <SidebarProvider>
      {/* Conteneur flex sous le header */}
      <div className="flex flex-row w-full h-full">
        <AppSidebar setProductList={setProductList}/>
        <main className="flex-1 p-4">
          <SidebarTrigger />
          <HomeContent productsList={productsList} />
        </main>
      </div>
    </SidebarProvider>
  );
}

 function HomeContent({
  productsList,
}: {
  productsList: Product[] | null;
}) {

  return productsList ? (
    <div className="flex flex-wrap gap-6 justify-center">
      {productsList.map((p, index) => (
        <ProductCard p={p} key={index} />
      ))}
    </div>
  ) : (
    <Spinner className="size-20" />
  );
}
