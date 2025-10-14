import { successToastProps } from "@/config/display/toasterProps";
import { Button } from "@/core/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/core/components/ui/field";
import { Input } from "@/core/components/ui/input";
import { ApiService } from "@/services/api_service";
import { toast } from "sonner";

export default function Admin() {
  return (
    <div className="admin-page">
      <RegisterModoAccount setMessage={() => {}} />
    </div>
  );
}

function RegisterModoAccount({
  setMessage,
}: {
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const username = formData.get("username");
    const password = formData.get("password");
    const headers = ApiService.create_header({ "Content-type": "application/json" });
    const response = await ApiService.post(
      { username, password },
      headers,
      "/account/register/modo"
    );

    console.log(response.message);

    if (!response.success) {
      setMessage(response.message);
    } else {
      toast(response.message.toLocaleUpperCase(), successToastProps);
      setMessage(null);
    }
  };
  return (
    <form onSubmit={(e) => register(e)}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Create a modo account</FieldLegend>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="username">User-name</FieldLabel>
              <Input id="username" name="username" placeholder="Evil Rabbit" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" name="password" type="password" required />
            </Field>
          </FieldGroup>
        </FieldSet>
        <FieldSeparator />
        <Field orientation="horizontal">
          <Button type="submit">Submit</Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
