import React, { useState } from "react";
import { useFormik} from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import { injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { register } from "../_redux/authCrud";
import { HeaderMobile } from "../../../../_metronic/layout/components/header-mobile/HeaderMobile";
import { QuickUser } from './../../../../_metronic/layout/components/extras/offcanvas/QuickUser';
import { ScrollTop } from './../../../../_metronic/layout/components/extras/ScrollTop';
import { LayoutInit } from './../../../../_metronic/layout/components/LayoutInit';
import { Footer } from './../../../../_metronic/layout/components/footer/Footer';
import { Header } from './../../../../_metronic/layout/components/header/Header';
import { countryList, domainList, professionList } from "../../../constant";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './authentication.css';


const initialValues = {
  job: "",
  field: "",
  industry: "",
  country: "",
  state: "",
  city: "",
  note: "",
  telephone: "",
  phone: "",
  fax: "",
  website: "",
  avatar: "",
  photo: "",
  email: "",
  username: "",
  password: "",
  changepassword: "",
  acceptTerms: false,
};

const SUPPORTED_FORMATS = [
  'image/png',
  'image/jpeg'
]

function Registration(props) {
  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(0);
  const RegistrationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Format d'e-mail incorrect")
      .min(3, "Au moins 3 symboles")
      .max(50, "50 symboles maximum")
      .required("Ce champ est requis"),
    username: Yup.string()
      .min(3, "Au moins 3 symboles")
      .max(50, "50 symboles maximum")
      .required("Ce champ est requis."),
    password: Yup.string()
      .min(6, "Au moins 6 symboles")
      .max(50, "50 symboles maximum")
      .required("Ce champ est requis."),
    job: Yup.string()
      .required("Ce champ est requis."),
    industry: Yup.string()
      .required("Ce champ est requis."),
    country: Yup.string()
      .required("Ce champ est requis."),
    city: Yup.string()
      .required("Ce champ est requis."),
    note: Yup.string()
      .required("Ce champ est requis."),
    phone: Yup.string()
      .required("Ce champ est requis."),
    avatar: Yup.mixed()
      .required("Ce champ est requis.")
      .test('fileFormat', 'Type de fichier non pris en charge.', (value) => (value && SUPPORTED_FORMATS.includes(value.type)))
    // .test('fileSize', 'Veuillez vérifier la dimension du fichier.', async (value) => { 
    //   if(!value) return false;
    //   const img = new Image();
    //   img.src = URL.createObjectURL(value);
    //   return await new Promise(resolve => {
    //     img.decode().then(() => {
    //       URL.revokeObjectURL(img.src);
    //       return resolve(img.width >= 400 && img.height >= 400);
    //     });
    //   });
    // }),
    ,
    photo: Yup.mixed()
      .required("Ce champ est requis.")
      .test('fileFormat', 'Type de fichier non pris en charge.', (value) => (value && SUPPORTED_FORMATS.includes(value.type)))
    // .test('fileSize', 'Veuillez vérifier la dimension du fichier.', async (value) => { 
    //   if(!value) return false;
    //   const img = new Image();
    //   img.src = URL.createObjectURL(value);
    //   return await new Promise(resolve => {
    //     img.decode().then(() => {
    //       URL.revokeObjectURL(img.src);
    //       return resolve(img.width >= 1140 && img.height >= 470);
    //     });
    //   });
    // }),
    ,
    changepassword: Yup.string()
      .required("Ce champ est requis.")
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Le mot de passe et la confirmation du mot de passe ne correspondent pas"
        ),
      }),
    // acceptTerms: Yup.bool().required(
    //   "You must accept the terms and conditions"
    // ),
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
    onSubmit: (values, { setStatus, setErrors, setSubmitting }) => {
      setSubmitting(true);
      enableLoading();
      console.log(values);
      let formData = new FormData();
      for (const key in values) {
        if (Object.hasOwnProperty.call(values, key)) {
          const value = values[key];
          formData.append(key, value)
        }
      }
      register(formData)
        .then(({ data: { accessToken } }) => {
          props.history.push('/auth/login');
          disableLoading();
          setSubmitting(false);
        })
        .catch((err) => {
          setSubmitting(false);
          setErrors(err.response.data.errors);
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
                          {/* begin: username */}
                          <div className="form-group fv-plugins-icon-container">
                            <input
                              type="text"
                              className={`form-control form-control-solid h-auto px-6 ${getInputClasses(
                                "username"
                              )}`}
                              name="username"
                              {...formik.getFieldProps("username")}
                            />
                            {formik.touched.username && formik.errors.username ? (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">{formik.errors.username}</div>
                              </div>
                            ) : null}
                          </div>
                          {/* end: username */}
                        </div>
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-3">Profession :</div>
                        <div className="col-12 col-md-8 col-sm-8">
                          {/* begin: job */}
                          <div className="form-group fv-plugins-icon-container" style={{ color: 'black', borderRadius: 0 }}>
                            {/* <Select
                              placeholder="sélectionner Profession"
                              className={`${getInputClasses(
                                "job"
                              )}`}
                              {...formik.getFieldProps("job")}
                              onChange={selectedOption => {
                                formik.values.job = selectedOption;
                                setUpdate(update + 1);
                              }}
                              isSearchable={true}
                              options={professionList}
                              name="job"
                              style={{borderRadius:'0px !important'}}
                            /> */}
                            <Autocomplete
                              id="free-solo-demo"
                              freeSolo
                              options={professionList.map((option) => option.value)}
                              className={` ${getInputClasses(
                                "job"
                              )}`}
                              onChange={(event, values) => {
                                formik.values.job = values;
                                setUpdate(update + 1);
                                console.log(formik.values.job);
                              }}
                              name="job"
                              renderInput={(params) => (
                                <TextField {...params}
                                  variant="outlined"
                                  onChange={(event) => {
                                    console.log(event.target.value);
                                    formik.values.job = event.target.value;
                                  }}
                                  style={{ borderRadius: '0px !important', backgroundColor: 'rgb(232, 240, 254)' }} />
                              )}
                            />
                            {formik.touched.job && formik.errors.job ? (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">{formik.errors.job}</div>
                              </div>
                            ) : null}
                          </div>
                          {/* end: job */}
                        </div>
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-3">Domaine d'expertise :</div>
                        <div className="col-12 col-md-8 col-sm-8">
                          {/* begin: field */}
                          <div className="form-group fv-plugins-icon-container">
                            <input
                              type="text"
                              className={`form-control form-control-solid h-auto px-6 ${getInputClasses(
                                "field"
                              )}`}
                              name="name"
                              {...formik.getFieldProps("field")}
                            />
                            {formik.touched.field && formik.errors.field ? (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">{formik.errors.field}</div>
                              </div>
                            ) : null}
                          </div>
                          {/* end: name */}
                        </div>
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-3">Industrie :</div>
                        <div className="col-12 col-md-8 col-sm-8">
                          {/* begin: name */}
                          <div className="form-group fv-plugins-icon-container" style={{ color: 'black' }}>
                            {/* <Select
                              placeholder="sélectionner Industrie"
                              className={`${getInputClasses(
                                "industry"
                              )}`}
                              {...formik.getFieldProps("industry")}
                              onChange={selectedOption => {
                                formik.values.industry = selectedOption;
                                setUpdate(update + 1);
                              }}
                              isSearchable={true}
                              options={domainList}
                              name="industry"
                            /> */}
                            <Autocomplete
                              id="free-solo-demo"
                              freeSolo
                              options={domainList.map((option) => option.value)}
                              className={` ${getInputClasses(
                                "industry"
                              )}`}
                              onChange={(event, values) => {
                                formik.values.industry = values;
                                setUpdate(update + 1);
                              }}
                              name="industry"
                              renderInput={(params) => (
                                <TextField {...params}
                                  variant="outlined"
                                  onChange={(event) => {
                                    formik.values.industry = event.target.value;
                                  }}
                                  style={{ borderRadius: '0px !important', backgroundColor: 'rgb(232, 240, 254)' }} />
                              )}
                            />
                            {formik.touched.industry && formik.errors.industry ? (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">{formik.errors.industry}</div>
                              </div>
                            ) : null}
                          </div>
                          {/* end: industry */}
                        </div>
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-3">Pays :</div>
                        <div className="col-12 col-md-8 col-sm-8">
                          {/* begin: country */}
                          <div className="form-group fv-plugins-icon-container" style={{ color: 'black' }}>
                            <Autocomplete
                              id="free-solo-demo"
                              freeSolo
                              options={countryList.map((option) => option.value)}
                              className={` ${getInputClasses(
                                "country"
                              )}`}
                              onChange={(event, values) => {
                                formik.values.country = values;
                                setUpdate(update + 1);
                              }}
                              name="country"
                              renderInput={(params) => (
                                <TextField {...params}
                                  variant="outlined"
                                  onChange={(event) => {
                                    formik.values.country = event.target.value;
                                  }}
                                  style={{ borderRadius: '0px !important', backgroundColor: 'rgb(232, 240, 254)' }} />
                              )}
                            />
                            {formik.touched.country && formik.errors.country ? (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">{formik.errors.country}</div>
                              </div>
                            ) : null}
                          </div>
                          {/* end: country */}
                        </div>
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-3">Etat :</div>
                        <div className="col-12 col-md-8 col-sm-8">
                          {/* begin: state */}
                          <div className="form-group fv-plugins-icon-container">
                            <input
                              type="text"
                              className={`form-control form-control-solid h-auto px-6 ${getInputClasses(
                                "state"
                              )}`}
                              name="state"
                              {...formik.getFieldProps("state")}
                            />
                            {formik.touched.state && formik.errors.state ? (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">{formik.errors.state}</div>
                              </div>
                            ) : null}
                          </div>
                          {/* end: state */}
                        </div>
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-3">Ville :</div>
                        <div className="col-12 col-md-8 col-sm-8">
                          {/* begin: city */}
                          <div className="form-group fv-plugins-icon-container">
                            <input
                              type="text"
                              className={`form-control form-control-solid h-auto px-6 ${getInputClasses(
                                "city"
                              )}`}
                              name="city"
                              {...formik.getFieldProps("city")}
                            />
                            {formik.touched.city && formik.errors.city ? (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">{formik.errors.city}</div>
                              </div>
                            ) : null}
                          </div>
                          {/* end: city */}
                        </div>
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-3">
                          A propos de vous :
                          <p className="mt-5">(Vous pouvez taper ou
                          copier et coller votre
                            texte dans ce champ)</p>
                        </div>
                        <div className="col-12 col-md-8 col-sm-8">
                          {/* begin: note */}
                          <div className="form-group fv-plugins-icon-container">
                            <textarea
                              className={`form-control form-control-solid h-auto px-6 ${getInputClasses(
                                "note"
                              )}`}
                              name="note"
                              rows="10"
                              {...formik.getFieldProps("note")}
                            />
                            {formik.touched.note && formik.errors.note ? (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">{formik.errors.note}</div>
                              </div>
                            ) : null}
                          </div>
                          {/* end: note */}
                        </div>
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-3">Tél. bureau :</div>
                        <div className="col-12 col-md-8 col-sm-8">
                          {/* begin: telephone */}
                          <div className="form-group fv-plugins-icon-container">
                            <input
                              type="text"
                              className={`form-control form-control-solid h-auto px-6 ${getInputClasses(
                                "telephone"
                              )}`}
                              name="telephone"
                              {...formik.getFieldProps("telephone")}
                            />
                            {formik.touched.telephone && formik.errors.telephone ? (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">{formik.errors.telephone}</div>
                              </div>
                            ) : null}
                          </div>
                          {/* end: telephone */}
                        </div>
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-3">Tél. portable :</div>
                        <div className="col-12 col-md-8 col-sm-8">
                          {/* begin: phone */}
                          <div className="form-group fv-plugins-icon-container">
                            <input
                              type="text"
                              className={`form-control form-control-solid h-auto px-6 ${getInputClasses(
                                "phone"
                              )}`}
                              name="phone"
                              {...formik.getFieldProps("phone")}
                            />
                            {formik.touched.phone && formik.errors.phone ? (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">{formik.errors.phone}</div>
                              </div>
                            ) : null}
                          </div>
                          {/* end: phone */}
                        </div>
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-3">Fax :</div>
                        <div className="col-12 col-md-8 col-sm-8">
                          {/* begin: fax */}
                          <div className="form-group fv-plugins-icon-container">
                            <input
                              type="text"
                              className={`form-control form-control-solid h-auto px-6 ${getInputClasses(
                                "fax"
                              )}`}
                              name="fax"
                              {...formik.getFieldProps("fax")}
                            />
                            {formik.touched.fax && formik.errors.fax ? (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">{formik.errors.fax}</div>
                              </div>
                            ) : null}
                          </div>
                          {/* end: fax */}
                        </div>
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-3">Adresse électronique :</div>
                        <div className="col-12 col-md-8 col-sm-8">
                          {/* begin: email */}
                          <div className="form-group fv-plugins-icon-container">
                            <input
                              type="text"
                              className={`form-control form-control-solid h-auto px-6 ${getInputClasses(
                                "email"
                              )}`}
                              name="email"
                              {...formik.getFieldProps("email")}
                            />
                            {formik.touched.email && formik.errors.email ? (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">{formik.errors.email}</div>
                              </div>
                            ) : null}
                          </div>
                          {/* end: email */}
                        </div>
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-3">Site Web :</div>
                        <div className="col-12 col-md-8 col-sm-8">
                          {/* begin: website */}
                          <div className="form-group fv-plugins-icon-container">
                            <input
                              type="text"
                              className={`form-control form-control-solid h-auto px-6 ${getInputClasses(
                                "website"
                              )}`}
                              name="website"
                              {...formik.getFieldProps("website")}
                            />
                            {formik.touched.website && formik.errors.website ? (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">{formik.errors.website}</div>
                              </div>
                            ) : null}
                          </div>
                          {/* end: website */}
                        </div>
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-0">
                          Photo identifiant :
                          <p className="m-0">
                            14.11cm * 14.11cm <br />
                            (400px * 400px)
                          </p>
                        </div>

                        <div className="col-12 col-md-8 col-sm-8">
                          {/* begin: avatar */}
                          <div className="form-group fv-plugins-icon-container">
                            <div style={{ display: "flex" }}>
                              <input
                                type="file"
                                className={`form-control form-control-solid h-auto px-6 ${getInputClasses(
                                  "avatar"
                                )}`}
                                name="avatar"
                                accept=".png, .jpg, .jpeg"
                                onChange={evt => { formik.setFieldValue("avatar", evt.target.files[0]); }}
                              />
                              <button type="reset" onClick={() => { formik.setFieldValue("avatar", ""); formik.setFieldValue("photo", ""); }} style={{ width: "45px", marginLeft: "10px" }}><i className="fas fa-trash" style={{ color: "black" }}></i></button>
                            </div>
                            {formik.touched.avatar && formik.errors.avatar ? (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">{formik.errors.avatar}</div>
                              </div>
                            ) : null}
                          </div>
                          {/* end: avatar */}
                        </div>
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-0">
                          Photo pour votre page :
                          <p className="m-0">
                            40.22cm * 16.58cm <br />
                            (1140px * 470px)
                          </p>
                        </div>
                        <div className="col-12 col-md-8 col-sm-8">
                          {/* begin: photo */}
                          <div className="form-group fv-plugins-icon-container">
                            <input
                              type="file"
                              className={`form-control form-control-solid h-auto px-6 ${getInputClasses(
                                "photo"
                              )}`}
                              accept=".png, .jpg, .jpeg"
                              name="photo"
                              onChange={evt => formik.setFieldValue("photo", evt.target.files[0])}
                              style={{ width: "342.52px" }}
                            />
                            {formik.touched.photo && formik.errors.photo ? (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">{formik.errors.photo}</div>
                              </div>
                            ) : null}
                          </div>
                          {/* end: photo */}
                        </div>
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-3">Mot de passe :</div>
                        <div className="col-12 col-md-8 col-sm-8">
                          {/* begin: password */}
                          <div className="form-group fv-plugins-icon-container">
                            <input
                              type="password"
                              className={`form-control form-control-solid h-auto px-6 ${getInputClasses(
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
                          {/* end: password */}
                        </div>
                        <div className="col-12 col-md-4 col-sm-4 text-sm-right pt-3">Confirmez le mot de passe :</div>
                        <div className="col-12 col-md-8 col-sm-8">
                          {/* begin: changepassword */}
                          <div className="form-group fv-plugins-icon-container">
                            <input
                              type="password"
                              className={`form-control form-control-solid h-auto px-6 ${getInputClasses(
                                "changepassword"
                              )}`}
                              name="changepassword"
                              {...formik.getFieldProps("changepassword")}
                            />
                            {formik.touched.changepassword && formik.errors.changepassword ? (
                              <div className="fv-plugins-message-container">
                                <div className="fv-help-block">{formik.errors.changepassword}</div>
                              </div>
                            ) : null}
                          </div>
                          {/* end: changepassword */}
                        </div>
                      </div>
                      <button
                        type="submit"
                        id="register_btn"
                        // disabled={
                        //   formik.isSubmitting ||
                        //   !formik.isValid
                        //   // !formik.values.acceptTerms
                        // }
                        className="send font-weight-bold px-9 py-4 my-3 mx-4 position-absolute"
                        style={{
                          left: "calc(50% - 90px)",
                          width: 173,
                          height: 43,
                          borderRadius: 10,
                        }}
                      >
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
