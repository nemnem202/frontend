import { errorToastProps, successToastProps } from "@/config/display/toasterProps";
import { Button } from "@/core/components/ui/button";
import { Label } from "@/core/components/ui/label";
import { ApiService } from "@/services/api_service";
import { Response } from "@/types/general/response";
import { useState } from "react";
import { toast } from "sonner";

export default function Modo() {
  return (
    <div className="admin-page">
      <GenerateKey />
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

  return (
    <>
      <Label htmlFor="keygen">Create an invitation key to allow user to create an account</Label>
      <Button name="keygen" onClick={() => getKey()}>
        Generate
      </Button>
      {key && <div>{key}</div>}
    </>
  );
}
