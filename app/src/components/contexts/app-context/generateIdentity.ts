import { IToken, IAccessToken } from "services";
import { IIdentity } from ".";
import JwtDecode from "jwt-decode";

/**
 * Parse the token information and generate an identity.
 * @param token The token model provided by the API.
 * @returns An new instance of an identity.
 */
const generateIdentity = (token: IToken | undefined | null): IIdentity => {
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

export default generateIdentity;
