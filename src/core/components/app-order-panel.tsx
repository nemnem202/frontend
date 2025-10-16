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
import { Input } from "./ui/input";
import { useState } from "react";
import { Form } from "react-router-dom";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "./ui/field";
import { ApiService } from "@/services/api_service";

interface OrderPanelProps {
  product: Product;
}

export const OrderPanel = (props: OrderPanelProps) => {
  const [selectedQuantity, setSelectedQuantity] = useState(0);

  function DecreaseQuantity() {
    if (selectedQuantity > 0) {
      setSelectedQuantity(selectedQuantity - 1);
    }
  }

  function IncreaseQuantity() {
    setSelectedQuantity(selectedQuantity + 1);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const formdata = new FormData(target);
    const itemQuantity = formdata.get("quantity");
    const itemId = target.id;

    const headers = ApiService.create_header({
      "Content-Type": "application/json",
    });

    ApiService.post({ itemId, itemQuantity }, headers, "/market/basket").then(
      (response) => {
        if (response.success) {
          alert("Product added to the basket!");
        } else {
          alert("Error: " + response.message);
        }
      }
    );
  }

  return (
    <>
      <Card className="w-xs h-auto">
        <CardContent>
          <form id={props.product.id.toString()} onSubmit={handleSubmit}>
            <FieldGroup>
              <FieldSet>
                <p className="text-lg">${props.product.product_price}</p>
                {!props.product.suspended && <p>Available</p>}
                {props.product.suspended && (
                  <p className="suspended">Unavailable</p>
                )}
                <FieldGroup>
                  <Field>
                    <div className="flex flex-row gap-3 justify-content-between">
                      <FieldLabel htmlFor="quantity">Quantity:</FieldLabel>
                      <div className="flex flex-row gap-3">
                        <Button
                          id="quantityReduction"
                          variant="outline"
                          type="button"
                          onClick={DecreaseQuantity}
                        >
                          -
                        </Button>
                        <Input
                          inputMode="numeric"
                          readOnly
                          id="quantity"
                          defaultValue={selectedQuantity.toString()}
                          value={selectedQuantity.toString()}
                          required
                          name="quantity"
                          className="text-center w-20"
                        />
                        <Button
                          id="quantityIncrease"
                          variant="outline"
                          type="button"
                          onClick={IncreaseQuantity}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <p>
                      Total: $
                      {(
                        Math.floor(
                          selectedQuantity * props.product.product_price * 100
                        ) / 100
                      ).toString()}
                    </p>
                  </Field>
                </FieldGroup>
              </FieldSet>
              <Field
                orientation="horizontal"
                className="flex flex-col justify-content-center"
              >
                <Button variant="outline" type="submit" className="w-25">
                  Add
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </>
  );
};
