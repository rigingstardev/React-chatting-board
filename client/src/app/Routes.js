/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React, { useEffect, useState } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import io from "socket.io-client";
import { ContentRoute, Layout } from "../_metronic/layout";
import BasePage from "./BasePage";
import { Logout, AuthPage } from "./modules/Auth";
import ErrorsPage from "./modules/ErrorsExamples/ErrorsPage";
import Registration from './modules/Auth/pages/Registration'
import AdminPage from './admin';

export function Routes() {
  const { isAuthorized, token } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.authToken != null,
      token: auth.authToken
    }),
    shallowEqual
  );

  const [socket, setSocket] = useState(null);

  const setupSocket = (authTo = null) => {
    if ((authTo || token) && !socket) {
      const newSocket = io(process.env.REACT_APP_SOCKET_URL, {
        query: {
          token: authTo || token
        }
      });

      newSocket.on("connect", () => {
        console.log('---Connected---');
        //makeToast("success", "Socket Connected!");
      });

      newSocket.on("disconnect", () => {
        setSocket(null);
        console.log('---Disconnect---');
        // setTimeout(setupSocket, 3000);
        //makeToast("error", "Socket Disconnected!");
      });

      setSocket(newSocket);
    }
  };

  useEffect(() => {
    setupSocket();
    //eslint-disable-next-line
  }, []);

  return (
    <Switch>
      {!isAuthorized ? (
        /*Render auth page when user at `/auth` and not authorized.*/
        <Route>
          <Switch>
            <ContentRoute
              path="/auth/registration"
              component={Registration}
            />
            <AuthPage setupSocket={setupSocket} socket={socket} />
          </Switch>
        </Route>
      ) : (
        /*Otherwise redirect to root page (`/`)*/
        <Redirect from="/auth" to="/" />
      )}

      <Route path="/error" component={ErrorsPage} />
      <Route path="/logout" component={Logout} />
      <Route path="/admin" component={AdminPage}/>
      {!isAuthorized ? (
        /*Redirect to `/auth` when user is not authorized*/
        <Redirect to="/auth/login" />
      ) : (
        <Layout>
          <BasePage socket={socket} />
        </Layout>
      )}
    </Switch>
  );
}
