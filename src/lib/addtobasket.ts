import { errorToastProps, successToastProps } from "@/config/display/toasterProps";
import { ApiService } from "@/services/api_service";
import { toast } from "sonner";

export async function addToBasket(id: number, quantity: number) {
  const headers = ApiService.create_header({ "Content-type": "application/json" });
  const res = await ApiService.post({ id, quantity }, headers, "/market/basket");

  toast(res.message, res.success ? successToastProps : errorToastProps);
}
