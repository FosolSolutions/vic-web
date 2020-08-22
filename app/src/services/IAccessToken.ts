export default interface IAccessToken {
  nameid: string;
  unique_name?: string;
  email?: string;
  given_name?: string;
  family_name?: string;
  display_name?: string;
  nbf?: number;
  exp?: number;
  iat?: number;
  iss?: string;
  aud?: string;
}
