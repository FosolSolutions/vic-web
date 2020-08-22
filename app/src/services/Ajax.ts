import { ISite } from "../components/contexts/SiteContext";
import {
  IIdentity,
  generateIdentity,
} from "../components/contexts/AuthenticationContext";
import { AuthRoutes } from "./api";
import Constants from "../settings/Constants";
import { IToken } from ".";

export interface IAjax {
  send: (url: string, init?: RequestInit) => Promise<Response>;
  get: (url: string) => Promise<Response>;
  post: (url: string, body?: object) => Promise<Response>;
  put: (url: string, body?: object) => Promise<Response>;
  remove: (url: string, body?: object) => Promise<Response>;
}

export const getAjax = (
  identity: IIdentity,
  setIdentity: (state: IIdentity) => void,
  setSite: (state: ISite) => void,
  setCookie: any
) => {
  return {
    send: (url: string, init?: RequestInit) =>
      send(url, init, setSite, identity, setIdentity, setCookie),
    get: (url: string) => get(url, setSite, identity, setIdentity, setCookie),
    post: (url: string, body?: object) =>
      post(url, body, setSite, identity, setIdentity, setCookie),
    put: (url: string, body?: object) =>
      put(url, body, setSite, identity, setIdentity, setCookie),
    remove: (url: string, body?: object) =>
      remove(url, body, setSite, identity, setIdentity, setCookie),
  } as IAjax;
};

export default getAjax;

const refresh = (
  identity: IIdentity,
  setIdentity?: (state: IIdentity) => void,
  setSite?: (site: ISite) => void,
  setCookie?: any
): Promise<Response | string> => {
  try {
    // Refresh the access token.
    return fetch(AuthRoutes.refresh(), {
      method: "Post",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${identity.refreshToken}`,
      },
    }).then(async (response) => {
      const token = (await response.json()) as IToken;
      if (!!setCookie)
        setCookie(Constants.cookieName, token, {
          maxAge: token.refreshExpiresIn,
        });
      if (!!setIdentity) setIdentity(generateIdentity(token));
      return token.accessToken;
    });
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

const makeRequest = (
  url: string,
  init?: RequestInit,
  setSite?: (site: ISite) => void,
  identity?: IIdentity
): Promise<Response> => {
  const headers = {
    ...init?.headers,
    "Access-Control-Allow-Origin": "*",
    Authorization: !!identity ? `Bearer ${identity?.accessToken}` : undefined,
  } as HeadersInit;
  const options = {
    ...init,
    method: init?.method ?? "Get",
    headers: headers,
  } as RequestInit;

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
  identity?: IIdentity,
  setIdentity?: (state: IIdentity) => void,
  setCookie?: any
): Promise<Response> => {
  // Determine if access token has expired.
  const now = new Date();
  if (!!identity && !!identity.expiresIn && identity.expiresIn <= now) {
    return refresh(identity, setIdentity, setSite, setCookie).then(
      (accessToken) => {
        identity.accessToken = accessToken as string;
        return makeRequest(url, init, setSite, identity);
      }
    );
  } else return makeRequest(url, init, setSite, identity);
};

/**
 * Send an HTTP GET ajax request to the specified 'url'.
 * @param url The URL to the endpoint.
 * @returns A promise.
 */
export const get = (
  url: string,
  setSite?: (site: ISite) => void,
  identity?: IIdentity,
  setIdentity?: (state: IIdentity) => void,
  setCookie?: any
): Promise<Response> => {
  return send(
    url,
    { method: "Get" },
    setSite,
    identity,
    setIdentity,
    setCookie
  );
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
  identity?: IIdentity,
  setIdentity?: (state: IIdentity) => void,
  setCookie?: any
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
    identity,
    setIdentity,
    setCookie
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
  identity?: IIdentity,
  setIdentity?: (state: IIdentity) => void,
  setCookie?: any
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
    identity,
    setIdentity,
    setCookie
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
  identity?: IIdentity,
  setIdentity?: (state: IIdentity) => void,
  setCookie?: any
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
    identity,
    setIdentity,
    setCookie
  );
};
