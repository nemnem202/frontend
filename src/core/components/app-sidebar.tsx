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
    title: "Featured Items",
    url: "#",
  },
  {
    title: "Popular Items",
    url: "#",
  },
  {
    title: "New Items",
    url: "#",
  },
];

const categories = [
  {
    title: "Costumes",
    url: "#",
  },
  {
    title: "Discretion",
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
    title: "Chemistry",
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
      className="bg-sidebar-foreground w-sm"
      collapsible={isMobile ? "offcanvas" : "none"}
    >
      <SidebarContent>
        <SidebarGroup className="bg-chart-2">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="text-lg hover:bg-chart-1"
                  >
                    <a href={item.url}>{item.title}</a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="bg-chart-2">
          <SidebarGroupLabel className="text-xl">Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((category) => (
                <SidebarMenuItem key={category.title}>
                  <SidebarMenuButton
                    asChild
                    className="text-lg  hover:bg-chart-1"
                  >
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
