/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Switch, Redirect } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import { ContentRoute } from "../../../../_metronic/layout";
import Login from "./Login";
// import Registration from "./Registration";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import "../../../../_metronic/_assets/sass/pages/login/classic/login-1.scss";

export function AuthPage({ setupSocket, socket }) {

  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/*begin::Login*/}
        <div
          className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-column-fluid bg-white"
          id="kt_login"
        >
          {/*begin::Aside*/}
          <div
            className="flex-row-fluid d-flex flex-row-auto bgi-size-cover bgi-no-repeat p-10 p-lg-10"
            style={{
              backgroundColor: '#112233',
            }}
          >
            {/*begin: Aside Container*/}
            <div className="d-flex flex-row-fluid flex-column justify-content-between">
              {/* start:: Aside header */}
              {/* end:: Aside header */}

              {/* start:: Aside content */}
              <div className="flex-column-fluid d-flex flex-column justify-content-center  algin-center" style={{ alignItems: "center" }}>
                <img
                  alt="Logo"
                  className="max-h-50px max-w-475px w-100"
                  src={toAbsoluteUrl("/media/logos/logo_Affaires.svg")}
                />
              </div>
              {/* end:: Aside content */}

              {/* start:: Aside footer for desktop */}
              <div className="d-none flex-column-auto d-lg-flex justify-content-between mt-10">
                <div className="d-flex">
                  <p className="font-weight-lighter" style={{color: "#586577"}}>
                    Pulitzer Ce nter on Crisis Reporting – Fellow/Correspondent. Traveled across Congo for several weeks to report on election developments, and to raise awareness of the Congo conflict in US media. Embedded with Moroccan, Pakistani and Uruguayan United Nations peacekeepers in Ituri, Lake Albert and South Kivu. Accredited with Ministry of Information and United Nations Mission in Congo (Summer 2006). ntary report on the relation between the Congo conflict and the scramble for mineral resources (Fall 2006). Aired on PBS’ Foreign Exchange with Fareed Zakaria. Guest appearances on BBC’s World News
                  </p>
                </div>
              </div>
              {/* end:: Aside footer for desktop */}
            </div>
            {/*end: Aside Container*/}
          </div>
          {/*begin::Aside*/}

          {/*begin::Content*/}
          <div className="d-flex flex-column min-w-100 align-items-center align-items-lg-stretch min-w-sm-450px position-relative p-7 overflow-hidden background-auth px-5 px-sm-20">
            {/*begin::Content header*/}
            {/* <div className="position-absolute top-0 right-0 text-right mt-5 mb-15 mb-lg-0 flex-column-auto justify-content-center py-5 px-10">
              <span className="font-weight-bold text-white-50">
                Vous n'avez pas encore de compte?
              </span>
              <Link
                to="/auth/registration"
                className="font-weight-bold ml-2"
                id="kt_login_signup"
              >
                S'inscrire!
              </Link>
            </div> */}
            {/*end::Content header*/}

            {/* begin::Content body */}
            <div className="d-flex flex-column-fluid mt-5 mt-lg-0 position-relative">
              <Switch>
                <ContentRoute path="/auth/login" setupSocket={setupSocket} socket={socket} component={Login} />
                {/* <ContentRoute
                  path="/auth/registration"
                  component={Registration}
                /> */}
                <ContentRoute
                  path="/auth/forgot-password"
                  component={ForgotPassword}
                />
                <ContentRoute
                  path="/auth/password-reset/:user_id/:token"
                  component={ResetPassword}
                />
                <Redirect from="/auth" exact={true} to="/auth/login" />
                <Redirect to="/auth/login" />
              </Switch>
            </div>
            {/*end::Content body*/}

          </div>
          {/*end::Content*/}
        </div>
        {/*end::Login*/}
      </div>
    </>
  );
}
