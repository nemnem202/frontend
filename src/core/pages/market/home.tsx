import { AppSidebar } from "@/core/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/core/components/ui/sidebar";
import { ApiService } from "@/services/api_service";
import { Product } from "@/types/tables/product";
import "../../../stylesheets/pages/home.css";
import { ProductCardList } from "@/core/components/app-product-card-list";

const mockProducts: Product[] = [
  {
    product_name: "Sulfuric Acid (H₂SO₄)",
    suspended: false,
    product_description:
      "Strong acid commonly used in laboratories. Purity: 98%. Hazardous—handle with care.",
    product_price: 45.99,
    product_image_path: "/PH_product_image.jpg",
    number_of_sells: 120,
    number_of_reports: 3,
    available_quantity: 50,
    account_id: 101,
    id: 1,
  },
  {
    product_name: "Absolute Ethanol",
    suspended: false,
    product_description:
      "Ethyl alcohol with 99.9% purity. Used as solvent and disinfectant.",
    product_price: 22.5,
    product_image_path: "/PH_product_image.jpg",
    number_of_sells: 450,
    number_of_reports: 1,
    available_quantity: 200,
    account_id: 102,
    id: 2,
  },
  {
    product_name: "Sodium Chloride (NaCl)",
    suspended: true,
    product_description:
      "Reagent-grade table salt, used in buffer solutions and crystallization experiments. Currently out of stock.",
    product_price: 8.75,
    product_image_path: "/PH_product_image.jpg",
    number_of_sells: 980,
    number_of_reports: 0,
    available_quantity: 0,
    account_id: 103,
    id: 3,
  },
  {
    product_name: "Binocular Microscope",
    suspended: false,
    product_description:
      "High-quality optical microscope with up to 1000x magnification. LED illumination.",
    product_price: 899.99,
    product_image_path: "/PH_product_image.jpg",
    number_of_sells: 45,
    number_of_reports: 5,
    available_quantity: 15,
    account_id: 201,
    id: 4,
  },
  {
    product_name: "Benchtop Centrifuge",
    suspended: false,
    product_description:
      "Compact centrifuge with max speed of 5000 rpm. Capacity: 8 tubes.",
    product_price: 350.0,
    product_image_path: "/PH_product_image.jpg",
    number_of_sells: 70,
    number_of_reports: 2,
    available_quantity: 10,
    account_id: 202,
    id: 5,
  },
  {
    product_name: "Glass Beaker (500ml)",
    suspended: false,
    product_description:
      "Heat-resistant borosilicate glass, graduated with 5% precision.",
    product_price: 5.5,
    product_image_path: "/PH_product_image.jpg",
    number_of_sells: 2500,
    number_of_reports: 0,
    available_quantity: 500,
    account_id: 203,
    id: 6,
  },
  {
    product_name: "Sterile Syringes 5ml (Box of 100)",
    suspended: false,
    product_description:
      "Disposable 5ml syringes, individually wrapped and sterile. Medical use.",
    product_price: 15.99,
    product_image_path: "/PH_product_image.jpg",
    number_of_sells: 1500,
    number_of_reports: 0,
    available_quantity: 300,
    account_id: 301,
    id: 7,
  },
  {
    product_name: "Hypodermic Needles (25G) - Box",
    suspended: false,
    product_description:
      "25G gauge needles (orange), 1 inch long. Sterile, single-use.",
    product_price: 12.0,
    product_image_path: "/PH_product_image.jpg",
    number_of_sells: 800,
    number_of_reports: 1,
    available_quantity: 150,
    account_id: 302,
    id: 8,
  },
  {
    product_name: "Hydrogen Peroxide (H₂O₂) 30%",
    suspended: false,
    product_description:
      "Oxidizing agent used for disinfection and chemical reactions. Concentrated—use with caution.",
    product_price: 18.25,
    product_image_path: "/PH_product_image.jpg",
    number_of_sells: 320,
    number_of_reports: 2,
    available_quantity: 80,
    account_id: 104,
    id: 9,
  },
  {
    product_name: "Paracetamol Tablets 500mg (Box of 100)",
    suspended: false,
    product_description:
      "Analgesic and antipyretic medication. For mild to moderate pain and fever relief.",
    product_price: 9.99,
    product_image_path: "/PH_product_image.jpg",
    number_of_sells: 2100,
    number_of_reports: 0,
    available_quantity: 400,
    account_id: 303,
    id: 10,
  },
  {
    product_name: "Ammonium Hydroxide Solution (NH₄OH)",
    suspended: false,
    product_description:
      "Aqueous ammonia solution used in analytical chemistry and cleaning applications. Concentration: 25%.",
    product_price: 14.5,
    product_image_path: "/PH_product_image.jpg",
    number_of_sells: 180,
    number_of_reports: 1,
    available_quantity: 60,
    account_id: 105,
    id: 11,
  },
  {
    product_name: "Latex Examination Gloves (Box of 100)",
    suspended: false,
    product_description:
      "Powder-free latex gloves for medical and laboratory use. Ambidextrous and non-sterile.",
    product_price: 11.75,
    product_image_path: "/PH_product_image.jpg",
    number_of_sells: 1300,
    number_of_reports: 0,
    available_quantity: 1,
    account_id: 304,
    id: 12,
  },
];

function Home({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
        <ProductCardList array={mockProducts} />
      </main>
      <div></div>
    </SidebarProvider>
  );
}

export default Home;
