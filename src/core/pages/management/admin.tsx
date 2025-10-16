import { errorToastProps, successToastProps } from "@/config/display/toasterProps";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { useEffect, useState } from "react";
import { Response } from "@/types/general/response";

export default function Admin() {
  const [user_accounts, set_user_accounts] = useState<Account[]>([]);
  const [vendor_accounts, set_vendor_accounts] = useState<Account[]>([]);
  const [modo_accounts, set_modo_accounts] = useState<Account[]>([]);

  const get_users = async () => {
    const result = (await ApiService.get<{
      accounts: Account[];
      message?: string;
    }>(new Headers(), "/account/all/user")) as
      | Response
      | {
          accounts: Account[];
          message?: string;
        };

    if ("accounts" in result) {
      set_user_accounts(result.accounts);
    } else {
      console.error("Erreur API");
      toast((result as Response).message || "Erreur serveur", errorToastProps);
    }
  };

  const get_vendors = async () => {
    const result = (await ApiService.get<{
      accounts: Account[];
      message?: string;
    }>(new Headers(), "/account/all/vendor")) as
      | Response
      | {
          accounts: Account[];
          message?: string;
        };

    if ("accounts" in result) {
      set_vendor_accounts(result.accounts);
    } else {
      console.error("Erreur API");
      toast((result as Response).message || "Erreur serveur", errorToastProps);
    }
  };

  const get_modos = async () => {
    const result = (await ApiService.get<{
      accounts: Account[];
      message?: string;
    }>(new Headers(), "/account/all/modo")) as
      | Response
      | {
          accounts: Account[];
          message?: string;
        };

    if ("accounts" in result) {
      set_modo_accounts(result.accounts);
    } else {
      console.error("Erreur API");
      toast((result as Response).message || "Erreur serveur", errorToastProps);
    }
  };

  const get_all = () => {
    get_users();
    get_modos();
    get_vendors();
  };

  useEffect(() => {
    get_all();
  }, []);

  return (
    <div className="admin-page">
      <RegisterModoAccount setMessage={() => {}} />
      <Card>
        <CardHeader>
          <CardTitle>Manage accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <ManageAccount title="modos" accounts={modo_accounts} get_all={get_all} />
          <ManageAccount title="users" accounts={user_accounts} get_all={get_all} />
          <ManageAccount title="vendors" accounts={vendor_accounts} get_all={get_all} />
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

function ManageAccount({
  accounts,
  title,
  get_all,
}: {
  accounts: Account[];
  title: string;
  get_all: () => void;
}) {
  const changeStatus = async (account_id: number, suspended: boolean) => {
    try {
      const headers = ApiService.create_header({ "Content-type": "application/json" });
      const response = await ApiService.post(
        { suspended: suspended },
        headers,
        "/account/suspend/" + account_id
      );

      toast(response.message, response.success ? successToastProps : errorToastProps);
      get_all();
    } catch (err) {
      toast("an error occurred", errorToastProps);
    }
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <Button>{title}</Button>
        </AccordionTrigger>
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
              {accounts
                .sort((a, b) => a.id - b.id)
                .map((a) => (
                  <TableRow>
                    <TableCell className="font-medium">{a.username}</TableCell>
                    <TableCell>{a.number_of_reports}</TableCell>
                    <TableCell className="text-right">
                      {!a.suspended ? (
                        <Button className="w-[100px]" onClick={() => changeStatus(a.id, true)}>
                          Active
                        </Button>
                      ) : (
                        <Button
                          variant={"destructive"}
                          className="w-[100px]"
                          onClick={() => changeStatus(a.id, false)}
                        >
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
