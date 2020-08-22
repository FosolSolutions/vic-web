import Constants from "../../settings/Constants";
import getAjax, { IAjax } from "../Ajax";
import { ILogin } from "../";
import { IIdentity } from "../../components/contexts/AuthenticationContext";
import { ISite } from "../../components/contexts/SiteContext";

const route = `${Constants.apiUrl}/auth`;
export const Routes = {
  token: () => `${route}/token`,
  refresh: () => `${route}/refresh`,
};

export const token = (login: ILogin, ajax: IAjax) => {
  return ajax.post(Routes.token(), login);
};

export const refresh = (ajax: IAjax) => {
  return ajax.post(Routes.refresh(), undefined);
};

export const getAuth = (
  identity: IIdentity,
  setSite: (state: ISite) => void
) => {
  const ajax = getAjax(identity, setSite);
  return {
    token: (login: ILogin) => token(login, ajax),
    refresh: () => refresh(ajax),
  };
};

export default getAuth;
