import Constants from "../../settings/Constants";

const route = `${Constants.apiUrl}/auth`;
export const Routes = {
  token: () => `${route}/token`,
  refresh: () => `${route}/refresh`,
};
