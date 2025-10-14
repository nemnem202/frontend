import { errorToastProps } from "@/config/display/toasterProps";
import { use_session } from "@/services/session_provider";
import { SessionName } from "@/types/general/session_names";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";

export default function ProtectRouteBySession({ session_names }: { session_names: SessionName[] }) {
  const { session } = use_session();

  if (!session) {
    toast("You must connect to access this route!", errorToastProps);
    return <Navigate to="/" replace />; // ou autre comportement par défaut
  }

  if (session_names.includes(session)) {
    return <Outlet />;
  }
  toast("Route is unreachable from your session!", errorToastProps);
  return <Navigate to="/" replace />;
}
