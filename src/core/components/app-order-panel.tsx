import { Product } from "@/types/tables/product";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

interface OrderPanelProps {
  product: Product;
}

export const OrderPanel = (props: OrderPanelProps) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <p>${props.product.product_price}</p>
        {!props.product.suspended && <p>Available</p>}
        {props.product.suspended && <p className="suspended">Unavailable</p>}
      </CardHeader>
      <CardContent>
        <Button>Order</Button>
      </CardContent>
    </Card>
  );
};
