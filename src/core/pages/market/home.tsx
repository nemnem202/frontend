import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/core/components/ui/sidebar";
import { ApiService } from "@/services/api_service";
import { Product } from "@/types/tables/product";
function Home() {
  // const response = await ApiService.get<Product[]>(headers:Headers, path: string);

  return (
    <>
      <div>Home page</div>
    </>
  );
}

export default Home;
