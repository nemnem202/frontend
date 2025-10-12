import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "../components/ui/field";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import "../../stylesheets/pages/register.css";
import { ApiService } from "@/services/api_service";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { successToastProps } from "@/config/display/toasterProps";
import { Spinner } from "../components/ui/spinner";
import { Response } from "@/types/general/response";
import { useNavigate } from "react-router-dom";

export default function RegisterOrLogin() {
  const [authentified, setAuthentified] = useState<"user" | "admin" | null | undefined>(undefined);

  const [global_message, setMessage] = useState<string | null>(null);

  const nav = useNavigate();

  const try_to_get_session = async () => {
    const response = await ApiService.get<Response>(new Headers(), "/account/session");

    console.log(response);

    if (response.success === false && authentified !== null) return setAuthentified(null);

    if (response.message === "admin" || response.message === "user") {
      setAuthentified(response.message as "admin" | "user");
    } else {
      console.error("une erreur est survenue");
      toast("une erreur est survenue", successToastProps);
    }
  };

  useEffect(() => {
    try_to_get_session();
  }, []);

  useEffect(() => {
    if (!authentified) return;
    if (authentified === "admin") {
      nav("/management/admin");
    } else if (authentified === "user") {
      nav("/market");
    }
  }, [authentified]);

  return authentified === null ? (
    <div className="register-page m-auto">
      <Tabs defaultValue="register">
        <TabsList>
          <TabsTrigger value="register" onClick={() => setMessage(null)}>
            Register
          </TabsTrigger>
          <TabsTrigger value="login" onClick={() => setMessage(null)}>
            Login
          </TabsTrigger>
        </TabsList>
        <Card className="min-w-lg">
          <CardContent>
            <TabsContent value="register">
              <Register setMessage={setMessage} />
            </TabsContent>
            <TabsContent value="login">
              <Login setMessage={setMessage} />
            </TabsContent>
          </CardContent>
        </Card>
        {global_message && <p className="text-sm text-red-500 font-medium">{global_message}</p>}
      </Tabs>
    </div>
  ) : (
    <div className="register-page m-auto">
      <Spinner className="size-20" />
    </div>
  );
}

function Register({
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
    const invite_key = formData.get("invite-key");
    const headers = ApiService.create_header({ "Content-type": "application/json" });
    const response = await ApiService.post(
      { username, password, invite_key },
      headers,
      "/account/register"
    );

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
          <FieldLegend>Register</FieldLegend>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="username">User-name</FieldLabel>
              <Input id="username" name="username" placeholder="Evil Rabbit" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" name="password" type="password" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="invite-key">Invite key</FieldLabel>
              <Input id="invite-key" name="invite-key" type="password" value={"22"} required />
              <FieldDescription>The invite key a modo gave you</FieldDescription>
            </Field>
          </FieldGroup>
        </FieldSet>
        <FieldSeparator />
        <Field orientation="horizontal">
          <Button type="submit">Submit</Button>
          <Button variant="outline" type="button">
            Contact us
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}

function Login({
  setMessage,
}: {
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const nav = useNavigate();

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const username = formData.get("username");
    const password = formData.get("password");
    const headers = ApiService.create_header({ "Content-type": "application/json" });
    const response = await ApiService.post({ username, password }, headers, "/account/login");

    if (!response.success) {
      setMessage(response.message);
    } else {
      if (response.message.toLowerCase() === "admin") {
        nav("/management/admin");
      } else if (response.message.toLowerCase() === "user") {
        nav("/market");
      }

      toast("CONNECTÉ", successToastProps);
      setMessage(null);
    }
  };
  return (
    <form onSubmit={(e) => login(e)}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Login</FieldLegend>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="username">User-name</FieldLabel>
              <Input
                id="username"
                placeholder="Evil Rabbit"
                name="username"
                defaultValue={"admin"}
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                name="password"
                defaultValue={"admin_password_hash"}
                required
              />
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
