import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { login } from "../_redux/authCrud";
import { colors } from "@material-ui/core";

/*
  INTL (i18n) docs:
  https://github.com/formatjs/react-intl/blob/master/docs/Components.md#formattedmessage
*/

/*
  Formik+YUP:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
*/

const initialValues = {
  email: "",
  password: "",
};

function Login(props) {
  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Format d'e-mail incorrect")
      .min(3, "Au moins 3 symboles")
      .max(50, "50 symboles maximum")
      .required("Ce champ est requis."),
    password: Yup.string()
      .min(3, "Au moins 3 symboles")
      .max(50, "50 symboles maximum")
      .required("Ce champ est requis.")
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values, { setStatus, setErrors, setSubmitting }) => {
      enableLoading();
      setTimeout(() => {
        login(values.email, values.password)
          .then(({ data: { token } }) => {
            disableLoading();
            props.login(token);
          })
          .catch((err) => {
            console.log(err.response)
            disableLoading();
            setSubmitting(false);
            setErrors(err.response.data.errors);
            setStatus(
              intl.formatMessage({
                id: "AUTH.VALIDATION.INVALID_LOGIN",
              })
            );
          });
      }, 1000);
    },
  });

  return (
    <div className="login-form login-signin" id="kt_login_signin_form">
      {/* begin::Head */}
      <div className="text-center mb-10 mb-lg-20">

      </div>
      {/* end::Head */}

      {/*begin::Form*/}
      <form
        onSubmit={formik.handleSubmit}
        className="form fv-plugins-bootstrap fv-plugins-framework"
      >

        <div className="form-group fv-plugins-icon-container">
          <h2 className="text-center mb-2 text-white-50">CONNEXION</h2>
          <input
            placeholder="Utilisateur"
            type="email"
            className={`form-control form-control-solid text-center h-auto py-5 px-6 ${getInputClasses(
              "email"
            )}`}
            name="email"
            {...formik.getFieldProps("email")}
            style={{ backgroundColor: "#384553", borderColor: "#384553", color: "#ACBEE2" }}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.email}</div>
            </div>
          ) : null}
        </div>
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Mot de passe"
            type="password"
            className={`form-control form-control-solid text-center h-auto py-5 px-6 ${getInputClasses(
              "password"
            )}`}
            name="password"
            {...formik.getFieldProps("password")}
            style={{ backgroundColor: "#384553", borderColor: "#384553", color: "#ACBEE2" }}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.password}</div>
            </div>
          ) : null}
        </div>
        <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
          <Link
            to="/auth/login"
            className="text-dark-50 text-hover-primary my-3 mr-2"
            id="kt_login_forgot"
          >
            <span>Mot de passe oublié?</span>
          </Link>
        </div>

        {/* begin::Mobile footer */}
        <div className="d-flex d-lg-none flex-column-auto flex-column flex-sm-row justify-content-between align-items-center mt-5 p-5">
          <div className="d-flex">
            <p className="font-weight-lighter opacity-80" style={{ borderColor: "#384553", color: "#ACBEE2", wordBreak: "break-all" }}>
              Pulitzer Ce nter on Crisis Reporting – Fellow/Correspondent. Traveled across Congo for several weeks to report on election developments, and to raise awareness of the Congo conflict in US media. Embedded with Moroccan, Pakistani and Uruguayan United Nations peacekeepers in Ituri, Lake Albert and South Kivu. Accredited with Ministry of Information and United Nations Mission in Congo (Summer 2006). ntary report on the relation between the Congo conflict and the scramble for mineral resources (Fall 2006).<br /> Aired on PBS’ Foreign Exchange with Fareed Zakaria. Guest appearances on BBC’s World News
            </p>
          </div>
        </div>
        {/* end::Mobile footer */}

        <div style={{ textAlign: "center" }}>
          <button
            id="kt_login_signin_submit"
            type="submit"
            disabled={formik.isSubmitting}
            className={`btn btn-primary font-weight-bold px-9 py-4 my-3`}
            style={{ backgroundColor: "#384553", borderColor: "#384553", color: "#ACBEE2" }}
          >
            <span>Joindre le réseau</span>
            {loading && <span className="ml-3 spinner spinner-white"></span>}
          </button>
        </div>
      </form>
      {/*end::Form*/}
    </div>
  );
}

export default injectIntl(connect(null, auth.actions)(Login));
