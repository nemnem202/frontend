import use_disconnect from "@/lib/disconnect";
import { Button } from "../ui/button";

export default function DisconnectButton() {
  const { apply } = use_disconnect();

  return (
    <Button variant={"destructive"} onClick={() => apply()}>
      Log out
    </Button>
  );
}
