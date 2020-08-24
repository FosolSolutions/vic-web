import React from "react";
import { Spinner } from "react-bootstrap";
import { IAppState } from ".";

export const CookieName = "app-context";

export const defaultState = {
  identity: {
    isAuthenticated: false,
  },
  isLoading: false,
  requestCount: 0,
} as IAppState;

export const defaultSetState = () => {};

const AppContext = React.createContext<
  [IAppState, React.Dispatch<React.SetStateAction<IAppState>>]
>([defaultState, defaultSetState]);

export const AppProvider = (props: React.PropsWithChildren<any>) => {
  const [state, setState] = React.useState({
    ...defaultState,
    oauth: {
      tokenUrl: props.tokenUrl,
      refreshUrl: props.refreshUrl,
    },
  } as IAppState);

  return (
    <AppContext.Provider value={[state, setState]}>
      <div>
        {state.requestCount > 0 ? (
          <div
            style={{
              opacity: 0.25,
              backgroundColor: "#000",
              height: "100%",
              width: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 2,
              textAlign: "center",
            }}
          >
            <Spinner
              animation="border"
              role="status"
              style={{
                color: "white",
                position: "relative",
                top: "50%",
              }}
            >
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        ) : null}
        {props.children}
      </div>
    </AppContext.Provider>
  );
};
export const AppConsumer = AppContext.Consumer;
export default AppContext;
