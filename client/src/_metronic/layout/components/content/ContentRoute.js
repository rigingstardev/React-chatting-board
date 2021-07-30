import React from "react";
import { Route } from "react-router-dom";
import { Content } from "./Content";

export function ContentRoute({ children, component: Component, render, setupSocket, socket, ...props }) {
  return (
    <Route {...props}>
      {routeProps => {
        if (typeof children === "function") {
          return <Content>{children(routeProps)}</Content>;
        }

        if (!routeProps.match) {
          return null;
        }

        if (children) {
          return <Content>{children}</Content>;
        }

        if (Component) {
          return (
            <Content><Component {...routeProps} setupSocket={setupSocket} socket={socket} /></Content>
          );
        }

        if (render) {
          return <Content>{render(routeProps)}</Content>;
        }

        return null;
      }}
    </Route>
  );
}
