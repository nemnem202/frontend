import { Product } from "@/types/tables/product";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { ApiService } from "@/services/api_service";
import { errorToastProps } from "@/config/display/toasterProps";
import { toast } from "sonner";
import { Category } from "@/types/tables/category";
import { useEffect, useState } from "react";

export function AppSidebar({
  setProductList,
}: {
  setProductList: React.Dispatch<React.SetStateAction<Product[] | null>>;
}) {
  const [categories, setCategories] = useState<Category[] | null>([]);

  const fetchCategories = async () => {
    const response = await ApiService.get<Category[] | null>(
      new Headers(),
      "/category"
    );
    if (response === null) {
      return toast("No category found!", errorToastProps);
    } else if ("message" in response) {
      return toast(response.message, errorToastProps);
    } else {
      return setCategories(response);
    }
  };

  async function filterItems(category: string) {
    {
      const products = await ApiService.get<Product[]>(
        new Headers(),
        `/market/category/${category}`
      );

      if ("message" in products) {
        return toast(products.message, errorToastProps);
      } else {
        return setProductList(products);
      }
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarGroupLabel className="text-xl mt-3">
              Categories
            </SidebarGroupLabel>
            <SidebarMenu>
              {categories?.map((category) => (
                <SidebarMenuItem key={category.id}>
                  <SidebarMenuButton
                    asChild
                    onClick={() => filterItems(category.category_name)}
                  >
                    <span>{category.category_name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
