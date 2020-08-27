import { IAppState, prepareBody, generateIdentity } from ".";
import { ILogin, IToken } from "services";
import { CookieName } from "./AppContext";

/**
 * Makes an HTTP Ajax request and will refresh the access token if it has expired.
 * @param url The URL to the endpoint.
 * @param options
 * @param state
 * @param setState
 * @param setCookie
 */
const makeRequest = async (
  url: string,
  options?: RequestInit,
  state?: IAppState,
  setState?: React.Dispatch<React.SetStateAction<IAppState>>,
  setCookie?: (name: string, value: any, options?: object) => {}
) => {
  if (setState)
    setState((s) => {
      return { ...s, requestCount: s.requestCount + 1 };
    });
  const now = new Date();
  // Check if the access token has expired. // TODO: If the refresh token has expired need to throw.
  if (
    state &&
    setState &&
    setCookie &&
    state?.oauth?.refreshUrl &&
    state?.identity.refreshToken &&
    state?.identity?.expiresIn &&
    state?.identity.expiresIn <= now
  ) {
    // Make a request to refresh the access token.
    const token = await refresh(state, setState, setCookie);
    state.identity.accessToken = token.accessToken; // Need to do this because state isn't guarenteed to be updated yet.
  }

  // If there is an access token include it in the request.
  const init = state?.identity.accessToken
    ? {
        ...options,
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${state.identity.accessToken}`,
          ...options?.headers,
        },
      }
    : options;
  return fetch(url, init).finally(() => {
    // TODO: Find out why this is firing twice for the first request.
    if (setState)
      setState((s) => {
        return { ...s, requestCount: s.requestCount - 1 };
      });
  });
};

export const send = (
  url: string,
  options?: RequestInit,
  state?: IAppState,
  setState?: React.Dispatch<React.SetStateAction<IAppState>>,
  setCookie?: (name: string, value: any, options?: object) => {}
) => makeRequest(url, options, state, setState, setCookie);

export const get = (
  url: string,
  options?: RequestInit,
  state?: IAppState,
  setState?: React.Dispatch<React.SetStateAction<IAppState>>,
  setCookie?: (name: string, value: any, options?: object) => {}
) =>
  makeRequest(url, { ...options, method: "Get" }, state, setState, setCookie);

export const post = (
  url: string,
  data?: any,
  options?: RequestInit,
  state?: IAppState,
  setState?: React.Dispatch<React.SetStateAction<IAppState>>,
  setCookie?: (name: string, value: any, options?: object) => {}
) =>
  makeRequest(
    url,
    { ...prepareBody(data, options), method: "Post" },
    state,
    setState,
    setCookie
  );

export const put = (
  url: string,
  data?: any,
  options?: RequestInit,
  state?: IAppState,
  setState?: React.Dispatch<React.SetStateAction<IAppState>>,
  setCookie?: (name: string, value: any, options?: object) => {}
) =>
  makeRequest(
    url,
    { ...prepareBody(data, options), method: "Put" },
    state,
    setState,
    setCookie
  );

export const remove = (
  url: string,
  data?: any,
  options?: RequestInit,
  state?: IAppState,
  setState?: React.Dispatch<React.SetStateAction<IAppState>>,
  setCookie?: (name: string, value: any, options?: object) => {}
) =>
  makeRequest(
    url,
    { ...prepareBody(data, options), method: "Delete" },
    state,
    setState,
    setCookie
  );

export const token = async (
  credentials: ILogin,
  state: IAppState,
  setState: React.Dispatch<React.SetStateAction<IAppState>>,
  setCookie: (name: string, value: any, options?: object) => {}
) => {
  try {
    if (!state.oauth?.tokenUrl)
      throw new Error("Oauth configuration missing 'tokenUrl'.");
    const response = await post(state.oauth?.tokenUrl, credentials);
    const token = (await response.json()) as IToken;
    setCookie(CookieName, token, {
      maxAge: token.refreshExpiresIn,
    });
    setState((state) => {
      return {
        ...state,
        identity: generateIdentity(token),
        error: undefined,
      };
    });
    return token;
  } catch (error) {
    console.log(error);
    setState((state) => {
      return {
        ...state,
        error: error,
      } as IAppState;
    });
    throw new Error(error);
  }
};

export const refresh = async (
  state: IAppState,
  setState: React.Dispatch<React.SetStateAction<IAppState>>,
  setCookie: (name: string, value: any, options?: object) => {}
) => {
  try {
    if (!state.oauth?.refreshUrl)
      throw new Error("Oauth configuration missing 'refreshUrl'.");
    const response = await post(state.oauth?.refreshUrl, undefined, {
      headers: {
        Authorization: `Bearer ${state.identity.refreshToken}`,
      },
    });
    const token = (await response.json()) as IToken;
    setCookie(CookieName, token, {
      maxAge: token.refreshExpiresIn,
    });
    setState((state) => {
      return {
        ...state,
        identity: generateIdentity(token),
        error: undefined,
      };
    });
    return token;
  } catch (error) {
    console.log(error);
    setState((state) => {
      return {
        ...state,
        error: error,
      } as IAppState;
    });
    throw new Error(error);
  }
};

export const ajaxFactory = {
  send: send,
  get: get,
  post: post,
  put: put,
  remove: remove,
};

export const oAuthFactory = {
  token: token,
  refresh: refresh,
};
