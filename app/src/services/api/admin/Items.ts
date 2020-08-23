import Constants from "../../../settings/Constants";

const route = `${Constants.apiUrl}/admin/items`;
export const Routes = {
  get: (id: number) => `${route}/${id}`,
  getByPath: (path: string) => `${route}?path=${path}`,
  add: () => `${route}`,
  update: (id: number) => `${route}/${id}`,
  remove: (id: number) => `${route}/${id}`,
};
