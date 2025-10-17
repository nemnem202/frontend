import { Product } from "@/types/tables/product";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { Button } from "@/core/components/ui/button";
import { Badge } from "@/core/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

export default function ProductCard({ p }: { p: Product }) {
  const image_url =
    p.product_image_path && p.product_image_path.length > 0
      ? p.product_image_path
      : "/placeholder-product.jpg"; // image de secours

  const navigate = useNavigate();

  return (
    <Card
      className="w-full max-w-sm overflow-hidden rounded-2xl shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 duration-200 cursor-pointer"
      onClick={() => navigate(`/market/articles/${p.id}`)}
    >
      <div className="relative">
        <img src={image_url} alt={p.product_name} className="h-48 w-full object-cover" />
        {p.suspended && (
          <Badge variant="destructive" className="absolute top-2 right-2 shadow-md">
            Suspendu
          </Badge>
        )}
      </div>

      <CardHeader className="space-y-1">
        <CardTitle className="text-lg font-semibold truncate">{p.product_name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground line-clamp-2">
          {p.product_description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex items-center justify-between pt-0">
        {/* <span className="text-lg font-bold text-primary">{p.product_price.toFixed(2)} €</span> */}
        <span className="text-sm text-muted-foreground">
          {p.available_quantity > 0 ? `${p.available_quantity} en stock` : "Rupture de stock"}
        </span>
      </CardContent>

      <CardFooter className="pt-2">
        <Button
          className="w-full flex items-center justify-center gap-2 cursor-pointer"
          variant="default"
          disabled={p.suspended || p.available_quantity <= 0}
          onClick={(e) => {
            e.stopPropagation();
            console.log("oeoe");
          }}
        >
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
