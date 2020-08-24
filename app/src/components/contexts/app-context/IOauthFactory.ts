import { ILogin, IToken } from "services";

export default interface IOauthFactory {
  token: (credentials: ILogin) => Promise<IToken>;
  refresh: () => Promise<IToken>;
}
