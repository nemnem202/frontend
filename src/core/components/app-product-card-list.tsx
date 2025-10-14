import { Product } from "@/types/tables/product";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Link } from "react-router-dom";

interface ProductCardListProps {
  array: Product[];
}

export const ProductCardList = (props: ProductCardListProps) => {
  return (
    <div className="flex flex-row flex-wrap gap-4 items-start justify-center">
      {props.array.map((product: Product) => (
        <Link key={product.id} to={`/market/articles/${product.id}`}>
          <Card className="w-full max-w-sm hover:scale-102">
            <CardHeader>
              <img
                src={product.product_image_path}
                alt={product.product_name}
                className="w-xl"
              />
              <CardTitle>{product.product_name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="line-clamp-2">
                {product.product_description}
              </CardDescription>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <p className="product_price">${product.product_price}</p>
              {!product.suspended && (
                <p>
                  {product.available_quantity} item
                  {product.available_quantity > 1 ? "s" : ""} in stock
                </p>
              )}
              {product.suspended && <p className="suspended">Unavailable</p>}
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
};
