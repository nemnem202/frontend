import { AppSidebar } from "@/core/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/core/components/ui/sidebar";
import { ApiService } from "@/services/api_service";
import { Product } from "@/types/tables/product";
import "../../../stylesheets/pages/home.css";
import { ProductCardList } from "@/core/components/app-product-card-list";
import { useState } from "react";
import { toast } from "sonner";

function Home({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);

  getProductList();

  async function getProductList() {
    const headers = ApiService.create_header({
      "Content-Type": "application/json",
    });
    const response = await ApiService.get<Product[]>(headers, "/market");

    if (!("message" in response)) {
      setProducts(response);
    } else {
      toast(response.message);
    }
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
        <ProductCardList array={products} />
      </main>
      <div></div>
    </SidebarProvider>
  );
}
