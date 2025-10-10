import { AppSidebar } from "@/core/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/core/components/ui/sidebar";
import { ApiService } from "@/services/api_service";
import { Product } from "@/types/tables/product";
function Home({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}

export default Home;
