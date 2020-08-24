import IClaim from "./IClaim";

export default interface IIdentity {
  isAuthenticated: boolean;
  username?: string;
  email?: string;
  displayName?: string;
  accessToken?: string;
  expiresIn?: Date;
  refreshToken?: string;
  refreshExpiresIn?: Date;
  scope?: string;
  claims?: IClaim[];
}
