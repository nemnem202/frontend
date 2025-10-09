import { useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ApiService } from "@/services/api_service";
import { Response } from "@/types/general/response";

export default function Login() {
  const fetchApi = async () => {
    const headers = new Headers();
    // headers.append("Content-Type", "application/json");
    const response = await ApiService.get<Response>(headers, "/account/account");

    console.log(response);
  };
  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <>
      <div>login page</div>
      <Button>Coucou</Button>
      <Input placeholder="coucou" />
    </>
  );
}
