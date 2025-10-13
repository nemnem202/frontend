import { createContext, useState, ReactNode, useContext } from "react";
import { is_valid_session_name, SessionName } from "@/types/general/session_names";

type SessionContextType = {
  session: SessionName | null;
  set_session: (session: SessionName) => void;
  clear_session: () => void;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const sess_in_local_sto = localStorage.getItem("session");
  const [session, set_session_state] = useState<SessionName | null>(
    is_valid_session_name(sess_in_local_sto) ? (sess_in_local_sto as SessionName) : null
  );

  const set_session = (new_session: SessionName) => {
    console.log("[SESSION] : new session as ", new_session);
    set_session_state(new_session);
    localStorage.setItem("session", new_session);
  };
  const clear_session = () => {
    set_session_state(null);
    localStorage.removeItem("session");
  };

  return (
    <SessionContext.Provider value={{ session, set_session, clear_session }}>
      {children}
    </SessionContext.Provider>
  );
}

export function use_session() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("use_session doit être utilisé à l'intérieur d'un SessionProvider");
  }
  return context;
}
