import React from "react";

export interface ISite {
  error?: string;
}

export const SiteContext = React.createContext<[ISite, (state: ISite) => void]>(
  [{}, () => {}]
);
