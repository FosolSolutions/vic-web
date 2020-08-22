import Constants from "../../../settings/Constants";
import { get as aget, post, put, remove as aremove } from "../../Ajax";
import { IUser } from "../../";

const route = `${Constants.apiUrl}/admin/users`;
export const Routes = {
  list: () => `${route}`,
  get: (id: string) => `${route}/${id}`,
  add: () => `${route}`,
  update: (id: string) => `${route}/${id}`,
  remove: (id: string) => `${route}/${id}`,
};

export const list = () => {
  return aget(Routes.list());
};

export const get = (id: string) => {
  return aget(Routes.get(id));
};

export const add = (user: IUser) => {
  return post(Routes.add(), user);
};

export const update = (id: string, user: IUser) => {
  return put(Routes.update(id), user);
};

export const remove = (id: string, user: IUser) => {
  return aremove(Routes.remove(id), user);
};

export default {
  list: list,
  get: get,
  add: add,
  update: update,
  remove: remove,
};
