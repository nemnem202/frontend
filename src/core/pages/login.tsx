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

export default function Login() {
  return (
    <div className="login-page max-w-sm m-auto">
      <Tabs defaultValue="user">
        <TabsList>
          <TabsTrigger value="user">User Connexion</TabsTrigger>
          <TabsTrigger value="admin">Admin Connexion</TabsTrigger>
        </TabsList>
        <Card>
          <CardContent>
            <TabsContent value="user">
              <UserLogin />
            </TabsContent>
            <TabsContent value="admin">
              <AdminLogin />
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
}

function UserLogin() {
  return (
    <form>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Login</FieldLegend>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="username">User-name</FieldLabel>
              <Input id="username" placeholder="Evil Rabbit" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" type="password" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="invite-key">Invite key</FieldLabel>
              <Input id="invite-key" type="password" required />
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

function AdminLogin() {
  return (
    <form>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Admin</FieldLegend>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="password">Admin Password</FieldLabel>
              <Input id="password" type="password" required />
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
