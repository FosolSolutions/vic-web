import Constants from "../../settings/Constants";
import { post } from "../Ajax";
import { ILogin } from "../";

const route = `${Constants.apiUrl}/auth`;
export const Routes = {
  token: () => `${route}/token`,
  refresh: () => `${route}/refresh`,
};

export const token = (login: ILogin) => {
  return post(Routes.token(), login);
};

export const refresh = () => {
  return post(Routes.refresh());
};

export default {
  token: token,
  refresh: refresh,
};
