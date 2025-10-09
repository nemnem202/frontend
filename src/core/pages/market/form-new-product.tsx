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

export default function FromNewProduct() {

    return (

        <form>
            <FieldSet>
                <FieldLegend>Article's name</FieldLegend>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="name">Product's name</FieldLabel>
                        <Input id="productName" placeholder="" required />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="name">Product's description</FieldLabel>
                        <Textarea id="productDescription" placeholder="" required />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="name">Product's quantity in stock</FieldLabel>
                        <Input id="productQuantity" placeholder="" type="number" required />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="name">Product' price</FieldLabel>
                        <Input id="productPrice" placeholder="" type="number" required />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="name">Product' photos</FieldLabel>
                        <Input id="productPhotos" placeholder="" type="file" required />
                    </Field>
                    <FieldSeparator />
                    <Field orientation="horizontal">
                        <Button type="submit">Post new product</Button>
                    </Field>
                </FieldGroup>
            </FieldSet>
        </form>

    )
}