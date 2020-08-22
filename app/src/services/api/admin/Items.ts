import Constants from "../../../settings/Constants";
import { get as aget, post, put, remove as aremove } from "../../Ajax";
import { IFile } from "../../";

const route = `${Constants.apiUrl}/admin/items`;
export const Routes = {
  get: (id: number) => `${route}/${id}`,
  getByPath: (path: string) => `${route}?path=${path}`,
  add: () => `${route}`,
  update: (id: number) => `${route}/${id}`,
  remove: (id: number) => `${route}/${id}`,
};

export const get = (id: number) => {
  return aget(Routes.get(id));
};

export const getByPath = (path: string) => {
  return aget(Routes.getByPath(path));
};

export const add = (item: IFile) => {
  return post(Routes.add(), item);
};

export const update = (id: number, item: IFile) => {
  return put(Routes.update(id), item);
};

export const remove = (id: number, item: IFile) => {
  return aremove(Routes.remove(id), item);
};

export default {
  get: get,
  getByPath: getByPath,
  add: add,
  update: update,
  remove: remove,
};
