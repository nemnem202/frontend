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

import { ApiService } from "@/services/api_service";
import { Account } from "@/types/tables/accounts";
import { toast } from "sonner";

import { useEffect, useState } from "react";
import { Response } from "@/types/general/response";
import DisconnectButton from "@/core/components/partials/disconnect_button";
import ManageAccount from "@/core/components/partials/manage_accounts";

export default function Admin() {
  const [user_accounts, set_user_accounts] = useState<Account[]>([]);
  const [vendor_accounts, set_vendor_accounts] = useState<Account[]>([]);
  const [modo_accounts, set_modo_accounts] = useState<Account[]>([]);
  const [modo_message, set_modo_message] = useState<string | null>(null);

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
    <div className="min-h-screen p-6 flex flex-col items-center gap-8">
      <div className="w-full max-w-6xl flex justify-between">
        <h1>Admin page</h1>
        <DisconnectButton />
      </div>
      <RegisterModoAccount setMessage={set_modo_message} message={modo_message} />
      <div className="w-full max-w-6xl flex_col md:grid-cols-3 gap-6">
        <ManageAccount title="Modos" accounts={modo_accounts} get_all={get_all} />
        <ManageAccount title="Vendors" accounts={vendor_accounts} get_all={get_all} />
        <ManageAccount title="Users" accounts={user_accounts} get_all={get_all} />
      </div>
    </div>
  );
}

function RegisterModoAccount({
  setMessage,
  message,
}: {
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
  message: string | null;
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

    if (!response.success) {
      setMessage(response.message);
    } else {
      toast(response.message.toLocaleUpperCase(), successToastProps);
      setMessage(null);
    }
  };

  return (
    <div className="w-full max-w-6xl  rounded-lg shadow-md p-6 flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Create a Modo Account</h2>
      {message && <p className="text-red-500">{message}</p>}
      <form onSubmit={register} className="flex flex-col md:flex-row gap-4">
        <Input name="username" placeholder="Username" required className="flex-1" />
        <Input name="password" type="password" placeholder="Password" required className="flex-1" />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
