import React from "react";
import JwtDecode from "jwt-decode";
import { IToken, IAccessToken } from "../../services";

export interface IClaim {
  key: string;
  value?: string;
}

export interface IIdentity {
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

/**
 * Parse the token information and generate an identity.
 * @param token The token model provided by the API.
 * @returns An new instance of an identity.
 */
export const generateIdentity = (
  token: IToken | undefined | null
): IIdentity => {
  if (!token || !token.accessToken)
    return {
      isAuthenticated: false,
    };

  var identity = !!token.accessToken
    ? (JwtDecode(token.accessToken) as IAccessToken)
    : ({} as IAccessToken);

  const expiresIn = new Date();
  expiresIn.setSeconds(expiresIn.getSeconds() + token.expiresIn);
  const refreshExpiresIn = new Date();
  refreshExpiresIn.setSeconds(
    refreshExpiresIn.getSeconds() + token.refreshExpiresIn
  );
  return {
    isAuthenticated: true,
    accessToken: token.accessToken,
    expiresIn: expiresIn,
    refreshToken: token.refreshToken,
    refreshExpiresIn: refreshExpiresIn,
    scope: token.scope,
    username: identity?.unique_name,
    email: identity?.email,
    displayName: identity?.display_name,
    claims: [
      { key: "given_name", value: identity?.given_name },
      { key: "family_name", value: identity?.family_name },
    ],
  };
};

export const AuthenticationContext = React.createContext<
  [IIdentity, (state: IIdentity) => void]
>([
  {
    isAuthenticated: false,
  },
  () => {},
]);
