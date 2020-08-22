import Constants from "../../settings/Constants";
import { get } from "services/Ajax";

const route = `${Constants.apiUrl}/filestation`;
export const Routes = {
  shares: () => `${route}/shares`,
  files: (path: string) => `${route}/files?path=${path}`,
  download: (path: string) => `${route}/files/download?path=${path}`,
  thumbnail: (path: string) => `${route}/files/thumb?patth=${path}`,
};

export const shares = () => {
  return get(Routes.shares());
};

export const files = (path: string) => {
  return get(Routes.files(path));
};

export const download = (path: string) => {
  return get(Routes.download(path));
};

export const thumbnail = (path: string) => {
  return get(Routes.thumbnail(path));
};

export default {
  shares: shares,
  files: files,
  download: download,
  thumbnail: thumbnail,
};
