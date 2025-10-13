import { createContext, useState, ReactNode, useContext } from "react";
import { SessionName } from "@/types/general/session_names";

type SessionContextType = {
  session: SessionName | null;
  set_session: (session: SessionName) => void;
  clear_session: () => void;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, set_session_state] = useState<SessionName | null>(null);

  const set_session = (new_session: SessionName) => {
    console.log("[SESSION] : new session as ", new_session);
    set_session_state(new_session);
  };
  const clear_session = () => set_session_state(null);

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
