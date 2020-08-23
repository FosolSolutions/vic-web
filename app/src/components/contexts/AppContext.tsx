import React from "react";
import JwtDecode from "jwt-decode";
import { IToken, IAccessToken, ILogin } from "../../services";
import { Spinner, Overlay } from "react-bootstrap";

export const CookieName = "app-context";

export interface IClaim {
  key: string;
  value?: string;
}

export interface IIdentity {
  isAuthenticated: boolean;
  username?: string;
  email?: string;
  displayName?: string;
  accessToken?: string;
  expiresIn?: Date;
  refreshToken?: string;
  refreshExpiresIn?: Date;
  scope?: string;
  claims?: IClaim[];
}

export interface IOauthFactory {
  token: (credentials: ILogin) => Promise<IToken>;
  refresh: () => Promise<IToken>;
}

export interface IAjaxFactory {
  send: (url: string, options?: RequestInit) => Promise<Response>;
  get: (url: string, options?: RequestInit) => Promise<Response>;
  post: (url: string, data?: any, options?: RequestInit) => Promise<Response>;
  put: (url: string, data?: any, options?: RequestInit) => Promise<Response>;
  remove: (url: string, data?: any, options?: RequestInit) => Promise<Response>;
}

export interface IAppState {
  identity: IIdentity;
  error?: string;
  oauth?: IOauth;
  requestCount: number;
}

/**
 * Parse the token information and generate an identity.
 * @param token The token model provided by the API.
 * @returns An new instance of an identity.
 */
export const generateIdentity = (
  token: IToken | undefined | null
): IIdentity => {
  if (!token || !token.accessToken)
    return {
      isAuthenticated: false,
    };

  var identity = !!token.accessToken
    ? (JwtDecode(token.accessToken) as IAccessToken)
    : ({} as IAccessToken);

  const expiresIn = new Date();
  expiresIn.setSeconds(expiresIn.getSeconds() + token.expiresIn);
  const refreshExpiresIn = new Date();
  refreshExpiresIn.setSeconds(
    refreshExpiresIn.getSeconds() + token.refreshExpiresIn
  );
  return {
    isAuthenticated: true,
    accessToken: token.accessToken,
    expiresIn: expiresIn,
    refreshToken: token.refreshToken,
    refreshExpiresIn: refreshExpiresIn,
    scope: token.scope,
    username: identity?.unique_name,
    email: identity?.email,
    displayName: identity?.display_name,
    claims: [
      { key: "given_name", value: identity?.given_name },
      { key: "family_name", value: identity?.family_name },
    ],
  };
};

// string | Blob | ArrayBufferView | ArrayBuffer | FormData | URLSearchParams | ReadableStream<Uint8Array> | null | undefined
const serialize = (data?: any, options?: RequestInit): RequestInit => {
  const headers = {
    ...options?.headers,
    "Access-Control-Allow-Origin": "*",
  };

  if (
    data === undefined ||
    data === null ||
    data instanceof String ||
    data instanceof Blob ||
    data instanceof ArrayBuffer ||
    data instanceof ArrayBuffer ||
    data instanceof FormData ||
    data instanceof URLSearchParams ||
    data instanceof ReadableStream
  )
    return { ...options, body: data };
  if (data instanceof Number)
    return {
      ...options,
      body: data.toString(),
      headers: headers,
    };
  if (data instanceof Object)
    return {
      ...options,
      body: JSON.stringify(data),
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
    };
  return {
    ...options,
    body: data,
    headers: headers,
  };
};

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
      return { ...s, requestCount: s.requestCount++ };
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
          ...options?.headers,
          Authorization: `Bearer ${state.identity.accessToken}`,
        },
      }
    : options;
  return fetch(url, init).finally(() => {
    // TODO: Find out why this is firing twice for the first request.
    if (setState)
      setState((s) => {
        const rc = s.requestCount - 1 >= 1 ? s.requestCount - 1 : 0;
        return { ...s, requestCount: rc };
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
    { ...serialize(data, options), method: "Post" },
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
    { ...serialize(data, options), method: "Put" },
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
    { ...serialize(data, options), method: "Delete" },
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
    if (!state.oauth?.tokenUrl) throw "Oauth configuration missing 'tokenUrl'.";
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
    throw error;
  }
};

export const refresh = async (
  state: IAppState,
  setState: React.Dispatch<React.SetStateAction<IAppState>>,
  setCookie: (name: string, value: any, options?: object) => {}
) => {
  try {
    if (!state.oauth?.refreshUrl)
      throw "Oauth configuration missing 'refreshUrl'.";
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
    throw error;
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

export const defaultState = {
  identity: {
    isAuthenticated: false,
  },
  isLoading: false,
  requestCount: 0,
} as IAppState;

export const defaultSetState = () => {};

const AppContext = React.createContext<
  [IAppState, React.Dispatch<React.SetStateAction<IAppState>>]
>([defaultState, defaultSetState]);

export interface IOauth {
  tokenUrl: string;
  refreshUrl: string;
}

export const AppProvider = (props: React.PropsWithChildren<any>) => {
  const [state, setState] = React.useState({
    ...defaultState,
    oauth: {
      tokenUrl: props.tokenUrl,
      refreshUrl: props.refreshUrl,
    },
  } as IAppState);
  const target = React.useRef(null);

  return (
    <AppContext.Provider value={[state, setState]}>
      <div ref={target}>{props.children}</div>
      <Overlay
        target={target.current}
        show={state.requestCount > 0}
        placement="auto"
      >
        <div
          style={{
            opacity: 0.25,
            backgroundColor: "#000",
            width: "99%",
            height: "99%",
            textAlign: "center",
          }}
        >
          <Spinner
            animation="border"
            role="status"
            style={{
              position: "absolute",
              top: "50%",
              opacity: 1,
              color: "green",
            }}
          >
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      </Overlay>
    </AppContext.Provider>
  );
};
export const AppConsumer = AppContext.Consumer;
export default AppContext;
