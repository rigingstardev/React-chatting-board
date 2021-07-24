import React, { useState } from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { register } from "../_redux/authCrud";
import { HeaderMobile } from "../../../../_metronic/layout/components/header-mobile/HeaderMobile";
import { QuickUser } from './../../../../_metronic/layout/components/extras/offcanvas/QuickUser';
import { QuickPanel } from './../../../../_metronic/layout/components/extras/offcanvas/QuickPanel';
import { ScrollTop } from './../../../../_metronic/layout/components/extras/ScrollTop';
import { StickyToolbar } from './../../../../_metronic/layout/components/extras/StickyToolbar';
import { LayoutInit } from './../../../../_metronic/layout/components/LayoutInit';
import { Footer } from './../../../../_metronic/layout/components/footer/Footer';
import { SubHeader } from './../../../../_metronic/layout/components/subheader/SubHeader';
import { Aside } from './../../../../_metronic/layout/components/aside/Aside';
import { Header } from './../../../../_metronic/layout/components/header/Header';

const initialValues = {
  name: "",
  email: "",
  username: "",
  password: "",
  changepassword: "",
  acceptTerms: false,
};

function Registration(props) {
  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const RegistrationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    email: Yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    username: Yup.string()
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
    changepassword: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      )
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Password and Confirm Password didn't match"
        ),
      }),
    acceptTerms: Yup.bool().required(
      "You must accept the terms and conditions"
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
    validationSchema: RegistrationSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setSubmitting(true);
      enableLoading();
      register(values.email, values.name, values.username, values.password)
        .then(({ data: { accessToken } }) => {
          props.register(accessToken);
          disableLoading();
          setSubmitting(false);
        })
        .catch(() => {
          setSubmitting(false);
          setStatus(
            intl.formatMessage({
              id: "AUTH.VALIDATION.INVALID_LOGIN",
            })
          );
          disableLoading();
        });
    },
  });

  return (
    // <div className="login-form login-signin" style={{ display: "block" }}>
    //   <div className="text-center mb-10 mb-lg-20">
    //     <h3 className="font-size-h1 text-white-50">
    //       {/* <FormattedMessage id="AUTH.REGISTER.TITLE" /> */}
    //       Inscrivez-vous
    //     </h3>
    //     <p className="text-muted font-weight-bold">
    //       Enter your details to create your account
    //     </p>
    //   </div>

    //   <form
    //     id="kt_login_signin_form"
    //     className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
    //     onSubmit={formik.handleSubmit}
    //   >
    //     {/* begin: Alert */}
    //     {formik.status && (
    //       <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
    //         <div className="alert-text font-weight-bold">{formik.status}</div>
    //       </div>
    //     )}
    //     {/* end: Alert */}

    //     {/* begin: name */}
    //     <div className="form-group fv-plugins-icon-container">
    //       <input
    //         placeholder="Full name"
    //         type="text"
    //         className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
    //           "name"
    //         )}`}
    //         name="name"
    //         {...formik.getFieldProps("name")}
    //       />
    //       {formik.touched.name && formik.errors.name ? (
    //         <div className="fv-plugins-message-container">
    //           <div className="fv-help-block">{formik.errors.name}</div>
    //         </div>
    //       ) : null}
    //     </div>
    //     {/* end: name */}

    //     {/* begin: Email */}
    //     <div className="form-group fv-plugins-icon-container">
    //       <input
    //         placeholder="Email"
    //         type="email"
    //         className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
    //           "email"
    //         )}`}
    //         name="email"
    //         {...formik.getFieldProps("email")}
    //       />
    //       {formik.touched.email && formik.errors.email ? (
    //         <div className="fv-plugins-message-container">
    //           <div className="fv-help-block">{formik.errors.email}</div>
    //         </div>
    //       ) : null}
    //     </div>
    //     {/* end: Email */}

    //     {/* begin: Username */}
    //     <div className="form-group fv-plugins-icon-container">
    //       <input
    //         placeholder="User name"
    //         type="text"
    //         className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
    //           "username"
    //         )}`}
    //         name="username"
    //         {...formik.getFieldProps("username")}
    //       />
    //       {formik.touched.username && formik.errors.username ? (
    //         <div className="fv-plugins-message-container">
    //           <div className="fv-help-block">{formik.errors.username}</div>
    //         </div>
    //       ) : null}
    //     </div>
    //     {/* end: Username */}

    //     {/* begin: Password */}
    //     <div className="form-group fv-plugins-icon-container">
    //       <input
    //         placeholder="Password"
    //         type="password"
    //         className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
    //           "password"
    //         )}`}
    //         name="password"
    //         {...formik.getFieldProps("password")}
    //       />
    //       {formik.touched.password && formik.errors.password ? (
    //         <div className="fv-plugins-message-container">
    //           <div className="fv-help-block">{formik.errors.password}</div>
    //         </div>
    //       ) : null}
    //     </div>
    //     {/* end: Password */}

    //     {/* begin: Confirm Password */}
    //     <div className="form-group fv-plugins-icon-container">
    //       <input
    //         placeholder="Confirm Password"
    //         type="password"
    //         className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
    //           "changepassword"
    //         )}`}
    //         name="changepassword"
    //         {...formik.getFieldProps("changepassword")}
    //       />
    //       {formik.touched.changepassword && formik.errors.changepassword ? (
    //         <div className="fv-plugins-message-container">
    //           <div className="fv-help-block">
    //             {formik.errors.changepassword}
    //           </div>
    //         </div>
    //       ) : null}
    //     </div>
    //     {/* end: Confirm Password */}

    //     {/* begin: Terms and Conditions */}
    //     <div className="form-group">
    //       <label className="checkbox">
    //         <input
    //           type="checkbox"
    //           name="acceptTerms"
    //           className="m-1"
    //           {...formik.getFieldProps("acceptTerms")}
    //         />
    //         <Link
    //           to="/terms"
    //           target="_blank"
    //           className="mr-1"
    //           rel="noopener noreferrer"
    //         >
    //           I agree the Terms & Conditions
    //         </Link>
    //         <span />
    //       </label>
    //       {formik.touched.acceptTerms && formik.errors.acceptTerms ? (
    //         <div className="fv-plugins-message-container">
    //           <div className="fv-help-block">{formik.errors.acceptTerms}</div>
    //         </div>
    //       ) : null}
    //     </div>
    //     {/* end: Terms and Conditions */}
    //     <div className="form-group d-flex flex-wrap flex-center">
    //       <button
    //         type="submit"
    //         disabled={
    //           formik.isSubmitting ||
    //           !formik.isValid ||
    //           !formik.values.acceptTerms
    //         }
    //         className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4"
    //       >
    //         <span>Submit</span>
    //         {loading && <span className="ml-3 spinner spinner-white"></span>}
    //       </button>

    //       <Link to="/auth/login">
    //         <button
    //           type="button"
    //           className="btn btn-light-primary font-weight-bold px-9 py-4 my-3 mx-4"
    //         >
    //           Cancel
    //         </button>
    //       </Link>
    //     </div>
    //   </form>
    // </div>
    <>
      <HeaderMobile />
      <div className="d-flex flex-column flex-root">
        {/*begin::Page*/}
        <div className="d-flex flex-row flex-column-fluid page">
          {/* <Aside /> */}
          {/*begin::Wrapper*/}
          <div className="d-flex flex-column bg-dark flex-row-fluid" id="kt_wrapper">
            <Header />
            {/*begin::Content*/}
            <div
              id="kt_content"
              className={`content ${''} d-flex flex-column flex-column-fluid`}
            >
              {/* <SubHeader /> */}
              {/*begin::Entry*/}

              <div className="d-flex flex-column-fluid">
                {/*begin::Container*/}
                <div className={'container'}>
                  <div className="register-content mx-auto px-15 py-10 mb-15 text-white-50">
                    <form
                      id="kt_login_signin_form"
                      onSubmit={formik.handleSubmit}
                    >
                      <p >Bienvenu (e) dans le répertoire Congolais des affaires. Vous êtes sur le point d'entrer dans
                        le réseau de professionnels, d'opérateurs économiques et de créateurs les plus authentiques opérant sur le sol congolais et ailleurs.
                        Veuillez, s'il vous plaît, entrer vos informations les plus précises. Décrivez au mieux votre expérience dans votre domaine d'expertise ainsi que vos qualités professionnelles. Nous vous recommandons d'inclure aussi vos qualités personnelles.
                        Apres validation, vos informations entrées dans ce site seront publiées, vues et partager par des tierces personnes visitant ou recherchant d’expertises comme le vôtre. </p>

                      <div className="row mt-15">
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-3">Noms :</div>
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
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-3">Domaine d'expertise :</div>
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
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-3">Industrie :</div>
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
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-3">Pays :</div>
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
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-3">Etat :</div>
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
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-3">Ville :</div>
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
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-3">
                          A propos de vous :
                          <p className="mt-5">(Vous pouvez taper ou
                            copier et coller votre
                            texte dans ce champ)</p>
                        </div>
                        <div className="col-12 col-md-8 col-sm-8">
                          {/* begin: name */}
                          <div className="form-group fv-plugins-icon-container">
                            <textarea
                              className={`form-control form-control-solid h-auto px-6 ${getInputClasses(
                                "name"
                              )}`}
                              name="name"
                              rows="10"
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
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-3">Tél. bureau :</div>
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
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-3">Tél. portable :</div>
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
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-3">Fax :</div>
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
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-3">Adresse électronique :</div>
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
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-3">Site Web :</div>
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
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-3">Photo  identifiant :</div>
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
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-3">Photo pour votre page :</div>
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
                      <button
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
                      </button>
                    </form>

                  </div>
                </div>
                {/*end::Container*/}
              </div>


              {/* {layoutProps.contentExtended && ''} */}
              {/*end::Entry*/}
            </div>
            {/*end::Content*/}
            <Footer />
          </div>
          {/*end::Wrapper*/}
        </div>
        {/*end::Page*/}
      </div>
      <QuickUser />
      {/* <QuickPanel /> */}
      <ScrollTop />
      {/* <StickyToolbar /> */}
      {/*end::Main*/}
      <LayoutInit />
    </>
  );
}

export default injectIntl(connect(null, auth.actions)(Registration));
