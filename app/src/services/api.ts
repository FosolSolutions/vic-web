const api = process?.env?.API_URL ?? "https://localhost:10443"; // TODO: For some reason react is not using the .env file...

const fileStation = `${api}/filestation`;
const FileStation = {
  Shares: () => `${fileStation}/shares`,
  Files: (path: string) => `${fileStation}/files?path=${path}`,
  Download: (path: string) => `${fileStation}/files/download?path=${path}`,
  Thumbnail: (path: string) => `${fileStation}/files/thumb?patth=${path}`,
};

const auth = `${api}/auth`;
const Auth = {
  Login: () => `${auth}/login`,
  Logout: () => `${auth}/logout`,
};

// Administration

const items = `${api}/admin/items`;
const Items = {
  Get: (id: number) => `${items}/${id}`,
  GetByPath: (path: string) => `${items}?path=${path}`,
  Add: () => `${items}`,
  Update: (id: number) => `${items}/${id}`,
  Remove: (id: number) => `${items}/${id}`,
};

const users = `${api}/admin/users`;
const Users = {
  Get: (id: string) => `${users}/${id}`,
  Add: () => `${users}`,
  Update: (id: string) => `${users}/${id}`,
  Remove: (id: string) => `${users}/${id}`,
};

export default {
  FileStation: FileStation,
  Auth: Auth,
  Admin: {
    Items: Items,
    Users: Users,
  },
};
