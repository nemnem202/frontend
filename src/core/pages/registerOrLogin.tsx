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
import { is_valid_session_name, SessionName } from "@/types/general/session_names";
import { use_session } from "@/services/session_provider";
import { use_auto_navigation } from "@/hooks/navigation";

export default function RegisterOrLogin() {
  const [authentified, setAuthentified] = useState<SessionName | null | undefined>(undefined);
  const { clear_session, set_session } = use_session();
  const [global_message, setMessage] = useState<string | null>(null);
  const [newSession, setNewSession] = use_auto_navigation();

  const try_to_get_session = async () => {
    const response = await ApiService.get<Response>(new Headers(), "/account/session");

    if (response.success === false && authentified !== null) return setAuthentified(null);

    if (is_valid_session_name(response.message)) {
      setAuthentified(response.message as SessionName);
    } else {
      console.error("une erreur est survenue");
      toast("une erreur est survenue", successToastProps);
    }
  };

  useEffect(() => {
    try_to_get_session();
  }, []);

  useEffect(() => {
    console.log("[AUTH] : ", authentified);
    if (!authentified || !is_valid_session_name(authentified)) {
      setNewSession(null);
      clear_session();
      return;
    }
    set_session(authentified);
    setNewSession(authentified);
  }, [authentified]);

  return authentified === null ? (
    <div className="register-page m-auto">
      <Tabs defaultValue="login">
        <TabsList>
          <TabsTrigger value="login" onClick={() => setMessage(null)}>
            Login
          </TabsTrigger>
          <TabsTrigger value="register" onClick={() => setMessage(null)}>
            Register
          </TabsTrigger>
        </TabsList>
        <Card className="min-w-lg">
          <CardContent>
            <TabsContent value="register">
              <Register setMessage={setMessage} setAuthentified={setAuthentified} />
            </TabsContent>
            <TabsContent value="login">
              <Login setMessage={setMessage} setAuthentified={setAuthentified} />
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
  setAuthentified,
}: {
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
  setAuthentified: React.Dispatch<React.SetStateAction<SessionName | null | undefined>>;
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
      if (is_valid_session_name(response.message)) {
        setAuthentified(response.message as SessionName);
      }
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
              <Input id="invite-key" name="invite-key" type="password" required />
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
  setAuthentified,
}: {
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
  setAuthentified: React.Dispatch<React.SetStateAction<SessionName | null | undefined>>;
}) {
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
      setAuthentified(response.message as SessionName);
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
