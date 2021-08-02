import React, { useState } from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import * as Yup from "yup";
import { injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { resetPassword } from "../_redux/authCrud";
import { useParams } from "react-router";

const initialValues = {
  email: "",
};

function ResetPassword(props) {

  const { intl } = props;
  let { user_id, token } = useParams();
  const [isRequested, setIsRequested] = useState(false);
  const ForgotPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Au moins 6 symboles")
      .max(50, "50 symboles maximum")
      .required("Ce champ est requis."),
    password2: Yup.string()
      .required("Ce champ est requis.")
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Le mot de passe et la confirmation du mot de passe ne correspondent pas"
        ),
      }),
  });

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
    validationSchema: ForgotPasswordSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      resetPassword(user_id, token, values.password)
        .then(() => setIsRequested(true))
        .catch((err) => {
          setIsRequested(false);
          setSubmitting(false);
          setStatus(
            err.response.data
          );
        });
    },
  });

  return (
    <>
      {isRequested && <Redirect to="/auth" />}
      {!isRequested && (
        <div className="login-form login-forgot" style={{ display: "block" }}>
          <div className="text-center mb-10 mb-lg-20">
            <h3 className="font-size-h1">Réinitialiser le mot de passe.</h3>
            <div className="text-white-50 font-weight-bold">
              Veuillez saisir un nouveau mot de passe.
            </div>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
          >
            {formik.status && (
              <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
                <div className="alert-text font-weight-bold">
                  {formik.status}
                </div>
              </div>
            )}
            <div className="form-group fv-plugins-icon-container">
              <input
                type="password"
                placeholder="Mot de passe..."
                className={`form-control form-control-solid text-center h-auto py-5 px-6 ${getInputClasses(
                  "password"
                )}`}
                name="password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">{formik.errors.password}</div>
                </div>
              ) : null}
            </div>
            <div className="form-group fv-plugins-icon-container">
              <input
                type="password"
                placeholder="Confirmez le mot de passe..."
                className={`form-control form-control-solid text-center h-auto py-5 px-6 ${getInputClasses(
                  "password2"
                )}`}
                name="password2"
                {...formik.getFieldProps("password2")}
              />
              {formik.touched.password2 && formik.errors.password2 ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">{formik.errors.password2}</div>
                </div>
              ) : null}
            </div>
            <div className="form-group d-flex flex-wrap flex-center">
              <button
                id="kt_login_forgot_submit"
                type="submit"
                className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4"
                disabled={formik.isSubmitting}
              >
                Soumettre
              </button>
              <Link to="/auth">
                <button
                  type="button"
                  id="kt_login_forgot_cancel"
                  className="btn btn-light-primary font-weight-bold px-9 py-4 my-3 mx-4"
                >
                  Annuler
                </button>
              </Link>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default injectIntl(connect(null, auth.actions)(ResetPassword));
