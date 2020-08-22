import Constants from "../../settings/Constants";
import getAjax, { IAjax } from "services/Ajax";
import { IIdentity } from "../../components/contexts/AuthenticationContext";
import { ISite } from "../../components/contexts/SiteContext";

const route = `${Constants.apiUrl}/filestation`;
export const Routes = {
  shares: () => `${route}/shares`,
  files: (path: string) => `${route}/files?path=${path}`,
  download: (path: string) => `${route}/files/download?path=${path}`,
  thumbnail: (path: string) => `${route}/files/thumb?patth=${path}`,
};

export const shares = (ajax: IAjax) => {
  return ajax.get(Routes.shares());
};

export const files = (path: string, ajax: IAjax) => {
  return ajax.get(Routes.files(path));
};

export const download = (path: string, ajax: IAjax) => {
  return ajax.get(Routes.download(path));
};

export const thumbnail = (path: string, ajax: IAjax) => {
  return ajax.get(Routes.thumbnail(path));
};

export const getFileStation = (
  identity: IIdentity,
  setSite: (state: ISite) => void
) => {
  const ajax = getAjax(identity, setSite);
  return {
    shares: () => shares(ajax),
    files: (path: string) => files(path, ajax),
    download: (path: string) => download(path, ajax),
    thumbnail: (path: string) => thumbnail(path, ajax),
    ajax: ajax,
  };
};

export default getFileStation;
