export const session_names = ["user", "admin", "modo", "vendor"] as const;

export type SessionName = (typeof session_names)[number];

export const is_valid_session_name = (name: string | null): boolean => {
  console.log("look if session is ok for ", name, "in", session_names);
  if (!name) return false;
  return (session_names as readonly string[]).includes(name);
};
