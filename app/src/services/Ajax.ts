import { useContext } from "react";
import { AuthenticationContext } from "../components/contexts/AuthenticationContext";
import { SiteContext } from "../components/contexts/SiteContext";

/**
 * Send an HTTP ajax request to the specified 'url'.
 * If the context contains an JWT token it will include it in the header.
 * @param url The URL to the endpoint.
 * @param init The ajax configuration options.
 * @returns A promise.
 */
export const send = async (
  url: string,
  init?: RequestInit
): Promise<Response> => {
  debugger;
  const [, setSite] = useContext(SiteContext);
  const [identity] = useContext(AuthenticationContext);
  const options = {
    ...init,
    method: init?.method ?? "Get",
    header: {
      ...init?.headers,
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${identity.accessToken}`,
    },
  };

  try {
    return fetch(url, options);
  } catch (error) {
    console.log(error);
    setSite({
      error: error,
    });
    throw error;
  }
};

/**
 * Send an HTTP GET ajax request to the specified 'url'.
 * @param url The URL to the endpoint.
 * @returns A promise.
 */
export const get = (url: string): Promise<Response> => {
  return send(url, { method: "Get" });
};

/**
 * Send an HTTP POST ajax request to the specified 'url'.
 * @param url The URL to the endpoint.
 * @param body The body to send with the AJAX request.
 * @returns A promise.
 */
export const post = (url: string, body?: object): Promise<Response> => {
  return send(url, {
    method: "Post",
    body: !!body ? JSON.stringify(body) : body,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/**
 * Send an HTTP PUT ajax request to the specified 'url'.
 * @param url The URL to the endpoint.
 * @param body The body to send with the AJAX request.
 * @returns A promise.
 */
export const put = (url: string, body?: object): Promise<Response> => {
  return send(url, {
    method: "Put",
    body: !!body ? JSON.stringify(body) : body,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

/**
 * Send an HTTP DELETE ajax request to the specified 'url'.
 * @param url The URL to the endpoint.
 * @param body The body to send with the AJAX request.
 * @returns A promise.
 */
export const remove = (url: string, body?: object): Promise<Response> => {
  return send(url, {
    method: "Delete",
    body: !!body ? JSON.stringify(body) : body,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default send;
