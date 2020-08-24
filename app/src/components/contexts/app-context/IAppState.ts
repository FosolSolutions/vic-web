import IIdentity from "./IIdentity";
import { IOauth } from "./";

export default interface IAppState {
  identity: IIdentity;
  error?: string;
  oauth?: IOauth;
  requestCount: number;
}
