import Constants from "../../settings/Constants";
import getAjax, { IAjax } from "../Ajax";
import { IContact } from "../";
import { IIdentity } from "../../components/contexts/AuthenticationContext";
import { ISite } from "../../components/contexts/SiteContext";

const route = `${Constants.apiUrl}/contact`;
export const Routes = {
  submit: () => `${route}`,
};

export const submit = (message: IContact, ajax: IAjax) => {
  return ajax.post(Routes.submit(), message);
};

export const getContact = (
  identity: IIdentity,
  setIdentity: (state: IIdentity) => void,
  setSite: (state: ISite) => void,
  setCookie: any
) => {
  const ajax = getAjax(identity, setIdentity, setSite, setCookie);
  return {
    submit: (message: IContact) => submit(message, ajax),
  };
};

export default getContact;
