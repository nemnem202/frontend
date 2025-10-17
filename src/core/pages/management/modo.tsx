import { errorToastProps, successToastProps } from "@/config/display/toasterProps";
import DisconnectButton from "@/core/components/partials/disconnect_button";
import ManageAccount from "@/core/components/partials/manage_accounts";
import { Button } from "@/core/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/core/components/ui/card";
import { Input } from "@/core/components/ui/input";
import { Label } from "@/core/components/ui/label";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/core/components/ui/table";
import { ApiService } from "@/services/api_service";
import { Response } from "@/types/general/response";
import { Account } from "@/types/tables/accounts";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { Table } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Modo() {
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
    <div>
      <div className="min-h-screen p-6 flex flex-col items-center gap-8">
        <div className="w-full max-w-6xl flex justify-between">
          <h1>Modo page</h1>
          <DisconnectButton />
        </div>
        <GenerateKey />
        <div className="w-full max-w-6xl flex_col md:grid-cols-3 gap-6">
          <ManageAccount title="Vendors" accounts={vendor_accounts} get_all={get_all} />
          <ManageAccount title="Users" accounts={user_accounts} get_all={get_all} />
        </div>
      </div>
    </div>
  );
}

function GenerateKey() {
  const [key, setKey] = useState<string | null>(null);

  const getKey = async () => {
    const message: Response = await ApiService.get(new Headers(), "/invite_key");

    if (!message.success) {
      toast(message.message, errorToastProps);
    } else {
      toast("Key generated !", successToastProps);
      setKey(message.message);
    }
  };
  const copyKey = () => {
    if (key) {
      navigator.clipboard.writeText(key);
      toast("Key copied!", successToastProps);
    }
  };

  return (
    <div className="w-full max-w-md rounded-lg shadow-md p-6 flex flex-col gap-4">
      <Label htmlFor="keygen" className="text-sm ">
        Create an invitation key to allow users to allow a user to register
      </Label>

      <div className="flex gap-2">
        <Button id="keygen" onClick={getKey}>
          Generate
        </Button>
        {key && (
          <Button onClick={copyKey} variant="secondary">
            Copy
          </Button>
        )}
      </div>

      {key && <Input value={key} readOnly className="font-mono text-sm  mt-2" />}
    </div>
  );
}
