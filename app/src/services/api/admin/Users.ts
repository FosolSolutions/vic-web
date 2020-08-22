import Constants from "../../../settings/Constants";
import getAjax, { IAjax } from "../../Ajax";
import { IUser } from "../../";
import { IIdentity } from "../../../components/contexts/AuthenticationContext";
import { ISite } from "../../../components/contexts/SiteContext";

const route = `${Constants.apiUrl}/admin/users`;
export const Routes = {
  list: () => `${route}`,
  get: (id: string) => `${route}/${id}`,
  add: () => `${route}`,
  update: (id: string) => `${route}/${id}`,
  remove: (id: string) => `${route}/${id}`,
};

export const list = (ajax: IAjax) => {
  return ajax.get(Routes.list());
};

export const get = (id: string, ajax: IAjax) => {
  return ajax.get(Routes.get(id));
};

export const add = (user: IUser, ajax: IAjax) => {
  return ajax.post(Routes.add(), user);
};

export const update = (id: string, user: IUser, ajax: IAjax) => {
  return ajax.put(Routes.update(id), user);
};

export const remove = (id: string, user: IUser, ajax: IAjax) => {
  return ajax.remove(Routes.remove(id), user);
};

export const getUsers = (
  identity: IIdentity,
  setSite: (state: ISite) => void
) => {
  const ajax = getAjax(identity, setSite);
  return {
    list: () => list(ajax),
    get: (id: string) => get(id, ajax),
    add: (user: IUser) => add(user, ajax),
    update: (id: string, user: IUser) => update(id, user, ajax),
    remove: (id: string, user: IUser) => remove(id, user, ajax),
  };
};

export default getUsers;
