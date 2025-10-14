import { Product } from "@/types/tables/product";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = (props: ProductCardProps) => {
  return (
    <Card className="w-full w-lg">
      <CardHeader>
        <div className="flex flex-row gap-4">
          <img
            src={props.product.product_image_path}
            alt={props.product.product_name}
            className="w-3xs"
          />
          <div className="flex flex-col gap-3">
            <CardTitle>{props.product.product_name}</CardTitle>
            <p>${props.product.product_price}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{props.product.product_description}</CardDescription>
      </CardContent>
    </Card>
  );
};
