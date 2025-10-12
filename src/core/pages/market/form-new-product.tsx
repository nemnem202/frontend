import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
} from "../../components/ui/field";
import { Input } from "../../components/ui/input"
import { Textarea } from "@/core/components/ui/textarea";
import { Button } from "@/core/components/ui/button";
import { Card, CardContent } from "@/core/components/ui/card";

export default function FormNewProduct() {

    return (
            <Card className="">
                <CardContent>
                    <form action="http://localhost:3000/market/create-product" method="post" encType="multipart/form-data">
                        <FieldSet>
                            <FieldLegend>Article's name</FieldLegend>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="name">Product's name</FieldLabel>
                                    <Input id="productName" placeholder="" name="product_name" required />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="productDescription">Product's description</FieldLabel>
                                    <Textarea id="productDescription" placeholder="" name="product_description" required />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="name">Product's quantity in stock</FieldLabel>
                                    <Input id="productQuantity" placeholder="" type="number" name="available_quantity" required />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="name">Product' price</FieldLabel>
                                    <Input id="productPrice" placeholder="" type="number" name="product_price" required />
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="name">Product' photos</FieldLabel>
                                    <Input id="productPhotos" name="productImage" placeholder="" type="file" required />
                                </Field>
                                <FieldSeparator />
                                <Field orientation="horizontal">
                                    <Button type="submit">Post new product</Button>
                                </Field>
                            </FieldGroup>
                        </FieldSet>
                    </form>
                </CardContent>
            </Card>

    )
}