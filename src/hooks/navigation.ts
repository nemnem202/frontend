import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { SessionName } from "@/types/general/session_names";

export function use_auto_navigation() {
  const [new_session, set_new_session] = useState<SessionName | null>(null);
  const nav = useNavigate();

  useEffect(() => {
    console.log("[NEW SESSION] :", new_session);
    if (!new_session) {
      nav("/");
      return;
    }

    switch (new_session) {
      case "admin":
        nav("/management/admin");
        break;
      case "modo":
        nav("/management/modo");
        break;
      case "user":
      case "vendor":
        nav("/market");
        break;
      default:
        nav("/");
        break;
    }
  }, [new_session, nav]);

  return [new_session, set_new_session] as const;
}
