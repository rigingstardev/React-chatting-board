import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
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

function ContactUs(props) {
  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    password: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
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
    onSubmit: (values, { setStatus, setSubmitting }) => {
      enableLoading();
      setTimeout(() => {
        // login(values.email, values.password)
        //   .then(({ data: { token } }) => {
        //     disableLoading();
        //     console.log(token);
        //   })
        //   .catch(() => {
        //     disableLoading();
        //     setSubmitting(false);
        //     setStatus(
        //       intl.formatMessage({
        //         id: "AUTH.VALIDATION.INVALID_LOGIN",
        //       })
        //     );
        //   });
      }, 1000);
    },
  });

  return (
    <div className="container-contact w-max-750px w-750px mx-auto">
      <form
        id="kt_login_signin_form"
        onSubmit={formik.handleSubmit}
      >
        <div className="row mt-15">
          <div className="col-12">
            {/* begin: name */}
            <div className="form-group fv-plugins-icon-container">
              <textarea
                className={`form-control form-control-solid h-auto px-6 ${getInputClasses(
                  "name"
                )}`}
                name="name"
                placeholder="Entrez votre message"
                rows="15"
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">{formik.errors.name}</div>
                </div>
              ) : null}
            </div>
            {/* end: name */}
          </div>
          <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-3">Profession :</div>
          <div className="col-12 col-md-8 col-sm-8">
            {/* begin: name */}
            <div className="form-group fv-plugins-icon-container">
              <input
                type="text"
                className={`form-control form-control-solid h-auto px-6 ${getInputClasses(
                  "name"
                )}`}
                name="name"
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">{formik.errors.name}</div>
                </div>
              ) : null}
            </div>
            {/* end: name */}
          </div>
        </div>
        {/* <button
          type="submit"
          disabled={
            formik.isSubmitting ||
            !formik.isValid ||
            !formik.values.acceptTerms
          }
          className="btn btn-primary send font-weight-bold px-9 py-4 my-3 mx-4 position-absolute"
          style={{
            left: "calc(50% - 50px)",
            backgroundColor: "#CCB742"
          }}
        >
          <span>Envoyer</span>
          {loading && <span className="ml-3 spinner spinner-white"></span>}
        </button> */}
      </form>
    </div>
  );
}

export default injectIntl(connect(null, null)(ContactUs));
