import { Response } from "@/types/general/response";

export class ApiService {
  public static readonly api_url = import.meta.env.VITE_API_URL;

  static post = async (body: object, headers: HeadersInit, path: string): Promise<Response> => {
    try {
      const response = await fetch(this.api_url + this.formatPath(path), {
        method: "post",
        headers: headers,
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.response) return data as Response;

      return { message: "Le contenu de la réponse est incohérent : " + data, success: false };
    } catch {
      return { message: "Une erreur innatendue est survenue", success: false };
    }
  };

  static get = async <R>(headers: Headers, path: string): Promise<R | Response> => {
    try {
      const response = await fetch(this.api_url + this.formatPath(path), {
        method: "get",
        headers: headers,
      });
      const data = await response.json();

      if ("message" in data && "success" in data) {
        return data as Response;
      } else {
        return data as R;
      }
    } catch (err) {
      return { message: "Une erreur innatendue est survenue" + err, success: false };
    }
  };

  static formatPath = (path: string): string => {
    if (path.startsWith("/")) return path;
    return "/" + path;
  };
}
