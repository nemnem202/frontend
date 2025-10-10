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
import { useIsMobile } from "@/hooks/use-mobile";

const items = [
  {
    title: "Featured Items",
    url: "#",
  },
  {
    title: "Popular Items",
    url: "#",
  },
  {
    title: "New Items",
    url: "#",
  },
];

const categories = [
  {
    title: "Costumes",
    url: "#",
  },
  {
    title: "Costumes",
    url: "#",
  },
  {
    title: "Hacking",
    url: "#",
  },
  {
    title: "Production",
    url: "#",
  },
  {
    title: "Chemicals",
    url: "#",
  },
  {
    title: "Storage",
    url: "#",
  },
];

export function AppSidebar() {
  const isMobile = useIsMobile();

  return (
    <Sidebar
      variant="floating"
      className="text-chart-1"
      collapsible={isMobile ? "offcanvas" : "none"}
    >
      <SidebarContent className="bg-chart-3">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>{item.title}</a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-chart-1">
            Categories
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((category) => (
                <SidebarMenuItem key={category.title}>
                  <SidebarMenuButton asChild>
                    <a href={category.url}>{category.title}</a>
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
