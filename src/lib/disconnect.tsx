import { errorToastProps } from "@/config/display/toasterProps";
import { ApiService } from "@/services/api_service";
import { use_session } from "@/services/session_provider";
import { Response } from "@/types/general/response";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function use_disconnect() {
  const { clear_session } = use_session();
  const nav = useNavigate();

  const apply = async () => {
    clear_session();
    const res = await ApiService.get<Response>(new Headers(), "/account/disconnect");

    if (res.success === true) {
      nav("/");
    } else {
      toast(res.message, errorToastProps);
    }
  };

  return { apply };
}
