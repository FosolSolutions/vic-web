import Constants from "../../../settings/Constants";
import getAjax, { IAjax } from "../../Ajax";
import { IFile } from "../../";
import { IIdentity } from "../../../components/contexts/AuthenticationContext";
import { ISite } from "../../../components/contexts/SiteContext";

const route = `${Constants.apiUrl}/admin/items`;
export const Routes = {
  get: (id: number) => `${route}/${id}`,
  getByPath: (path: string) => `${route}?path=${path}`,
  add: () => `${route}`,
  update: (id: number) => `${route}/${id}`,
  remove: (id: number) => `${route}/${id}`,
};

export const get = (id: number, ajax: IAjax) => {
  return ajax.get(Routes.get(id));
};

export const getByPath = (path: string, ajax: IAjax) => {
  return ajax.get(Routes.getByPath(path));
};

export const add = (item: IFile, ajax: IAjax) => {
  return ajax.post(Routes.add(), item);
};

export const update = (id: number, item: IFile, ajax: IAjax) => {
  return ajax.put(Routes.update(id), item);
};

export const remove = (id: number, item: IFile, ajax: IAjax) => {
  return ajax.remove(Routes.remove(id), item);
};

export const getItems = (
  identity: IIdentity,
  setIdentity: (state: IIdentity) => void,
  setSite: (state: ISite) => void,
  setCookie: any
) => {
  const ajax = getAjax(identity, setIdentity, setSite, setCookie);
  return {
    get: (id: number) => get(id, ajax),
    getByPath: (path: string) => getByPath(path, ajax),
    add: (file: IFile) => add(file, ajax),
    update: (id: number, file: IFile) => update(id, file, ajax),
    remove: (id: number, file: IFile) => remove(id, file, ajax),
  };
};

export default getItems;
