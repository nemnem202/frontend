import { errorToastProps } from "@/config/display/toasterProps";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/core/components/ui/card";
import { Spinner } from "@/core/components/ui/spinner";
import { ApiService } from "@/services/api_service";
import { Product } from "@/types/tables/product";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Basket() {
  const [products, setProducts] = useState<(Product & { quantity: number })[] | null>(null);
  const [total, setTotal] = useState<number>(0);

  const get_basket = async () => {
    const products = await ApiService.get<Product[]>(new Headers(), "/market/basket");

    if ("message" in products) {
      toast(products.message, errorToastProps);
    } else {
      const basket = products.map((e) => ({ ...e, quantity: 1 }));
      setProducts(basket);
    }
  };

  useEffect(() => {
    get_basket();
  }, []);

  return (
    <div className="basket-page">
      {products ? (
        <Card>
          <CardHeader>
            <CardTitle>Basket</CardTitle>
          </CardHeader>
          <CardContent>
            {products.length === 0 ? (
              <p>Your basket is empty.</p>
            ) : (
              <ul className="space-y-4">
                {products.map((item) => (
                  <li key={item.id} className="flex items-center gap-4">
                    <img
                      src={item.product_image_path}
                      alt={item.product_name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="font-semibold">{item.product_name}</div>
                      <div>
                        {item.quantity} x ${item.product_price}
                      </div>
                    </div>
                    <div className="font-bold">
                      {(item.product_price * item.quantity).toFixed(2)} €
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
          <CardFooter className="justify-end">
            <div className="text-lg font-bold">Total: ${total.toFixed(2)}</div>
          </CardFooter>
        </Card>
      ) : (
        <Spinner className="size-20" />
      )}
    </div>
  );
}
