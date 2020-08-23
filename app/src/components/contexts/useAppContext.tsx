import React from "react";
import { ILogin } from "../../services";
import { useCookies } from "react-cookie";
import AppContext, {
  CookieName,
  oAuthFactory,
  ajaxFactory,
  IAjaxFactory,
  IOauthFactory,
} from "./AppContext";

const useAppContext = () => {
  const [state, setState] = React.useContext(AppContext);
  const [, setCookie] = useCookies([CookieName]);

  const oauth = {
    token: (credentials: ILogin) =>
      oAuthFactory.token(credentials, state, setState, setCookie),
    refresh: () => oAuthFactory.refresh(state, setState, setCookie),
  } as IOauthFactory;

  const ajax = {
    send: (url: string, options?: RequestInit) =>
      ajaxFactory.send(url, options, state, setState, setCookie),
    get: (url: string, options?: RequestInit) =>
      ajaxFactory.get(url, options, state, setState, setCookie),
    post: (url: string, data?: any, options?: RequestInit) =>
      ajaxFactory.post(url, data, options, state, setState, setCookie),
    put: (url: string, data?: any, options?: RequestInit) =>
      ajaxFactory.put(url, data, options, state, setState, setCookie),
    remove: (url: string, data?: any, options?: RequestInit) =>
      ajaxFactory.remove(url, data, options, state, setState, setCookie),
  } as IAjaxFactory;

  return [state, setState, ajax, oauth] as const;
};

export default useAppContext;
