import { errorToastProps } from "@/config/display/toasterProps";
import { use_session } from "@/services/session_provider";
import { SessionName } from "@/types/general/session_names";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";

export default function ProtectRouteBySession({ session_names }: { session_names: SessionName[] }) {
  const { session } = use_session();

  // Si aucune session : redirection vers la page de connexion
  if (!session) {
    toast("You must connect to access this route!", errorToastProps);
    return <Navigate to="/" replace />;
  }

  // Si la session existe mais ne correspond pas aux droits requis
  if (!session_names.includes(session)) {
    toast("You don't have permission to access this route.", errorToastProps);
    return <Navigate to="/not-found" replace />;
  }

  // Si tout est bon, on affiche la route enfant
  return <Outlet />;
}
