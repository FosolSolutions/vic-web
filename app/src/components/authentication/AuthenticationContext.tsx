import React from "react";

export interface IUser {
  isAuthenticated: boolean;
  displayName?: string;
  accessToken?: string;
}

export type AuthenticationContextType = {
  user: IUser;
  setUser: (user: IUser) => void;
};

export const AuthenticationContext = React.createContext<
  AuthenticationContextType
>({
  user: {
    isAuthenticated: false,
  },
  setUser: () => {},
});
