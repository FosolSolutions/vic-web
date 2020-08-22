import { ISite } from "../components/contexts/SiteContext";
import { IIdentity } from "../components/contexts/AuthenticationContext";

export interface IAjax {
  send: (url: string, init?: RequestInit) => Promise<Response>;
  get: (url: string) => Promise<Response>;
  post: (url: string, body?: object) => Promise<Response>;
  put: (url: string, body?: object) => Promise<Response>;
  remove: (url: string, body?: object) => Promise<Response>;
}

export const getAjax = (
  identity: IIdentity,
  setSite: (state: ISite) => void
) => {
  return {
    send: (url: string, init?: RequestInit) =>
      send(url, init, setSite, identity),
    get: (url: string) => get(url, setSite, identity),
    post: (url: string, body?: object) => post(url, body, setSite, identity),
    put: (url: string, body?: object) => put(url, body, setSite, identity),
    remove: (url: string, body?: object) =>
      remove(url, body, setSite, identity),
  } as IAjax;
};

export default getAjax;

/**
 * Send an HTTP ajax request to the specified 'url'.
 * If the context contains an JWT token it will include it in the header.
 * @param url The URL to the endpoint.
 * @param init The ajax configuration options.
 * @returns A promise.
 */
export const send = async (
  url: string,
  init?: RequestInit,
  setSite?: (site: ISite) => void,
  identity?: IIdentity
): Promise<Response> => {
  const options = {
    ...init,
    method: init?.method ?? "Get",
    header: {
      ...init?.headers,
      "Access-Control-Allow-Origin": "*",
      Authorization: !!identity ? `Bearer ${identity?.accessToken}` : undefined,
    },
  };

  try {
    return fetch(url, options);
  } catch (error) {
    console.log(error);
    if (!!setSite) {
      setSite({
        error: error,
      });
    }
    throw error;
  }
};

/**
 * Send an HTTP GET ajax request to the specified 'url'.
 * @param url The URL to the endpoint.
 * @returns A promise.
 */
export const get = (
  url: string,
  setSite?: (site: ISite) => void,
  identity?: IIdentity
): Promise<Response> => {
  return send(url, { method: "Get" }, setSite, identity);
};

/**
 * Send an HTTP POST ajax request to the specified 'url'.
 * @param url The URL to the endpoint.
 * @param body The body to send with the AJAX request.
 * @returns A promise.
 */
export const post = (
  url: string,
  body?: object,
  setSite?: (site: ISite) => void,
  identity?: IIdentity
): Promise<Response> => {
  return send(
    url,
    {
      method: "Post",
      body: !!body ? JSON.stringify(body) : body,
      headers: {
        "Content-Type": "application/json",
      },
    },
    setSite,
    identity
  );
};

/**
 * Send an HTTP PUT ajax request to the specified 'url'.
 * @param url The URL to the endpoint.
 * @param body The body to send with the AJAX request.
 * @returns A promise.
 */
export const put = (
  url: string,
  body?: object,
  setSite?: (site: ISite) => void,
  identity?: IIdentity
): Promise<Response> => {
  return send(
    url,
    {
      method: "Put",
      body: !!body ? JSON.stringify(body) : body,
      headers: {
        "Content-Type": "application/json",
      },
    },
    setSite,
    identity
  );
};

/**
 * Send an HTTP DELETE ajax request to the specified 'url'.
 * @param url The URL to the endpoint.
 * @param body The body to send with the AJAX request.
 * @returns A promise.
 */
export const remove = (
  url: string,
  body?: object,
  setSite?: (site: ISite) => void,
  identity?: IIdentity
): Promise<Response> => {
  return send(
    url,
    {
      method: "Delete",
      body: !!body ? JSON.stringify(body) : body,
      headers: {
        "Content-Type": "application/json",
      },
    },
    setSite,
    identity
  );
};
