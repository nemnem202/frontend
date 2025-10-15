import { successToastProps } from "@/config/display/toasterProps";
import { Button } from "@/core/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/core/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/core/components/ui/field";
import { Input } from "@/core/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/core/components/ui/table";
import { ApiService } from "@/services/api_service";
import { Account } from "@/types/tables/accounts";
import { toast } from "sonner";
import { faker } from "@faker-js/faker";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";

export default function Admin() {
  const generate_accounts = (count: number): Account[] => {
    const accounts: Account[] = [];
    for (let i = 0; i < count; i++) {
      accounts.push({
        username: faker.internet.username(),
        id: faker.number.int(),
        number_of_reports: faker.number.int(),
        password: faker.string.sample(),
        suspended: Math.random() > 0.5,
      });
    }

    return accounts;
  };

  return (
    <div className="admin-page">
      <RegisterModoAccount setMessage={() => {}} />
      <Card>
        <CardHeader>
          <CardTitle>Manage accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <ManageAccount title="modos" accounts={generate_accounts(10)} />
          <ManageAccount title="users" accounts={generate_accounts(30)} />
          <ManageAccount title="vendors" accounts={generate_accounts(10)} />
        </CardContent>
      </Card>
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
    <Card>
      <CardHeader>
        <CardTitle>Create a modo account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => register(e)}>
          <FieldGroup>
            <FieldSet>
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
      </CardContent>
    </Card>
  );
}

function ManageAccount({ accounts, title }: { accounts: Account[]; title: string }) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent>
          <Table className="w-[700px]">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Username</TableHead>
                <TableHead>Number of reports</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.map((a) => (
                <TableRow>
                  <TableCell className="font-medium">{a.username}</TableCell>
                  <TableCell>{a.number_of_reports}</TableCell>
                  <TableCell className="text-right">
                    {!a.suspended ? (
                      <Button className="w-[100px]">Active</Button>
                    ) : (
                      <Button variant={"destructive"} className="w-[100px]">
                        Suspended
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
