import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import { Avatar, colors, Divider, InputAdornment, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles, TextField, Typography } from "@material-ui/core";
import { Button } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import { toAbsoluteUrl } from '../../_metronic/_helpers/AssetsHelpers';
// import background from "../../../public/media/bg/CompositeLayer@1X.png";
/*
  INTL (i18n) docs:
  https://github.com/formatjs/react-intl/blob/master/docs/Components.md#formattedmessage
*/

/*
  Formik+YUP:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
*/
const useStyles = makeStyles(theme => ({
    plusUsersNumber: {
        backgroundImage: `url(../../../public/media/bg/CompositeLayer@1X.png)`,
        width: '100px',
        height: '200px'
    },
    namefiled: {
        marginLeft: "15px",
        position: "relative",
        bottom: "367px"
    },
    Adresse: {
        marginLeft: "15px",
        position: "relative",
        bottom: "354px"
    },
    numro: {
        marginLeft: "15px",
        position: "relative",
        bottom: "334px"
    },
    namefiled1: {
        marginLeft: "15px",
        position: "relative",
        bottom: "271px"
    },
    Adresse1: {
        marginLeft: "15px",
        position: "relative",
        bottom: "267px"
    },
    numro1: {
        marginLeft: "15px",
        position: "relative",
        bottom: "260px"
    },
    namefiled2: {
        marginLeft: "15px",
        position: "relative",
        bottom: "280px"
    },
    Adresse2: {
        marginLeft: "15px",
        position: "relative",
        bottom: "267px"
    },
    numro2: {
        marginLeft: "15px",
        position: "relative",
        bottom: "251px"
    },
    namefiled3: {
        marginLeft: "15px",
        position: "relative",
        bottom: "339px"
    },
    Adresse3: {
        marginLeft: "15px",
        position: "relative",
        bottom: "341px"
    },
    numro3: {
        marginLeft: "15px",
        position: "relative",
        bottom: "347px"
    },
    noms: {
        fontSize: "15px",
        fontWeight: "500"
    },
    imageo: {
        bottom: "532px",
        position: "relative",
        marginLeft: "548px",
    },
    imageo1: {
        bottom: "390px",
        position: "relative",
        marginLeft: "319px",
    },
    imageo2: {
        bottom: "433px",
        position: "relative",
        marginLeft: "146px",
    }

}));
const initialValues = {
    nomsvalue: "",
    adressevalue: "",
    numrovalue: "",
};

function Contact(props) {
    const classes = useStyles();
    const isTabletDevice = useMediaQuery({
        query: "(min-width:850px)",
    });
    const isTabletDevice1 = useMediaQuery({
        query: "(min-width:470px)",
    });
    const isTabletDevice2 = useMediaQuery({
        query: "(min-width:280px)",
    });
    const isTabletDevice3 = useMediaQuery({
        query: "(min-width:71px)",
    });
    const { intl } = props;
    const [loading, setLoading] = useState(false);
    const LoginSchema = Yup.object().shape({
        nomsvalue: Yup.string()
            .min(3, "Minimum 3 symbols")
            .max(50, "Maximum 50 symbols")
            .required("Ce champ est requis."),
        adressevalue: Yup.string()
            .min(3, "Minimum 3 symbols")
            .max(50, "Maximum 50 symbols")
            .required("Ce champ est requis."),
        numrovalue: Yup.string()
            .min(3, "Minimum 3 symbols")
            .max(50, "Maximum 50 symbols")
            .required("Ce champ est requis."),
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
        <div className="container w-100 mx-auto">
            {isTabletDevice3 && !isTabletDevice2 && !isTabletDevice1 && !isTabletDevice &&
                <div className="container-contact w-max-750px w-100px mx-auto">
                    <form
                        id="kt_login_signin_form"
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="row mt-15">
                            <div className="col-12">
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
                            </div>
                            <div className="col-12">
                                <div style={{ height: "360px" }}>
                                    <img
                                        alt="Logo"
                                        className="h-350px max-w-100px w-500"
                                        src={toAbsoluteUrl("/media/bg/mailho.png")}
                                    />
                                    <div className={"col-10 " + classes.namefiled3}>
                                        <div className={classes.noms}>Noms :</div>
                                        <input
                                            type="text"
                                            className={`form-control form-control-solid h-auto px-6 ${getInputClasses(
                                                "nomsvalue"
                                            )}`}
                                            name="nomsvalue"
                                            {...formik.getFieldProps("nomsvalue")}
                                        />
                                        {formik.touched.nomsvalue && formik.errors.nomsvalue ? (
                                            <div className="fv-plugins-message-container">
                                                <div className="fv-help-block">{formik.errors.nomsvalue}</div>
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className={"col-10 " + classes.Adresse3}>
                                        <div className={classes.noms}>Adresse email :</div>
                                        <input
                                            type="text"
                                            className={`form-control form-control-solid h-auto px-6 ${getInputClasses(
                                                "adressevalue"
                                            )}`}
                                            name="adressevalue"
                                            {...formik.getFieldProps("adressevalue")}
                                        />
                                        {formik.touched.adressevalue && formik.errors.adressevalue ? (
                                            <div className="fv-plugins-message-container">
                                                <div className="fv-help-block">{formik.errors.adressevalue}</div>
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className={"col-10 " + classes.numro3}>
                                        <div className={classes.noms}>Numéro de téléphone:</div>
                                        <input
                                            type="text"
                                            className={`form-control form-control-solid h-auto px-6 ${getInputClasses(
                                                "numrovalue"
                                            )}`}
                                            name="numrovalue"
                                            {...formik.getFieldProps("numrovalue")}
                                        />
                                        {formik.touched.numrovalue && formik.errors.numrovalue ? (
                                            <div className="fv-plugins-message-container">
                                                <div className="fv-help-block">{formik.errors.numrovalue}</div>
                                            </div>
                                        ) : null}
                                    </div>


                                </div>
                                <div className="text-right">
                                    <div ><span className="text-dark-65 text-right m-2"> Votre message a bien été</span><Button variant="secondary">Envoyer </Button></div>
                                </div>
                            </div>
                        </div>

                    </form>

                </div>}
            {isTabletDevice2 && !isTabletDevice1 && !isTabletDevice &&
                <div className="container-contact w-max-750px w-250px mx-auto">
                    <form
                        id="kt_login_signin_form"
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="row mt-15">
                            <div className="col-12">
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
                            </div>
                            <div className="col-12">
                                <div style={{ height: "410px" }}>
                                    <img
                                        alt="Logo"
                                        className="h-400px max-w-250px w-500"
                                        src={toAbsoluteUrl("/media/bg/mailho.png")}
                                    />
                                    <div className={"col-10 " + classes.namefiled2}>
                                        <div className={classes.noms}>Noms :</div>
                                        <input
                                            type="text"
                                            className={`form-control form-control-solid h-auto px-6 ${getInputClasses(
                                                "nomsvalue"
                                            )}`}
                                            name="nomsvalue"
                                            {...formik.getFieldProps("nomsvalue")}
                                        />
                                        {formik.touched.nomsvalue && formik.errors.nomsvalue ? (
                                            <div className="fv-plugins-message-container">
                                                <div className="fv-help-block">{formik.errors.nomsvalue}</div>
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className={"col-10 " + classes.Adresse2}>
                                        <div className={classes.noms}>Adresse email :</div>
                                        <input
                                            type="text"
                                            className={`form-control form-control-solid h-auto px-6 ${getInputClasses(
                                                "adressevalue"
                                            )}`}
                                            name="adressevalue"
                                            {...formik.getFieldProps("adressevalue")}
                                        />
                                        {formik.touched.adressevalue && formik.errors.adressevalue ? (
                                            <div className="fv-plugins-message-container">
                                                <div className="fv-help-block">{formik.errors.adressevalue}</div>
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className={"col-10 " + classes.numro2}>
                                        <div className={classes.noms}>Numéro de téléphone:</div>
                                        <input
                                            type="text"
                                            className={`form-control form-control-solid h-auto px-6 ${getInputClasses(
                                                "numrovalue"
                                            )}`}
                                            name="numrovalue"
                                            {...formik.getFieldProps("numrovalue")}
                                        />
                                        {formik.touched.numrovalue && formik.errors.numrovalue ? (
                                            <div className="fv-plugins-message-container">
                                                <div className="fv-help-block">{formik.errors.numrovalue}</div>
                                            </div>
                                        ) : null}
                                    </div>


                                </div>
                                <div className="text-right">
                                    <div ><span className="text-dark-65 text-right m-2"> Votre message a bien été</span><Button variant="secondary">Envoyer </Button></div>
                                </div>
                            </div>
                        </div>

                    </form>

                </div>}
            {isTabletDevice1 && !isTabletDevice &&
                <div className="container-contact w-max-750px w-450px mx-auto">
                    <form
                        id="kt_login_signin_form"
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="row mt-15">
                            <div className="col-12">
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
                            </div>
                            <div className="col-12">
                                <div style={{ height: "310px" }}>
                                    <img
                                        alt="Logo"
                                        className="h-300px max-w-450px w-500"
                                        src={toAbsoluteUrl("/media/bg/mail.jpeg")}
                                    />
                                    <div className={"col-7 " + classes.namefiled1}>
                                        <div className={classes.noms}>Noms :</div>
                                        <input
                                            type="text"
                                            className={`form-control form-control-solid h-auto px-6 ${getInputClasses(
                                                "nomsvalue"
                                            )}`}
                                            name="nomsvalue"
                                            {...formik.getFieldProps("nomsvalue")}
                                        />
                                        {formik.touched.nomsvalue && formik.errors.nomsvalue ? (
                                            <div className="fv-plugins-message-container">
                                                <div className="fv-help-block">{formik.errors.nomsvalue}</div>
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className={"col-7 " + classes.Adresse1}>
                                        <div className={classes.noms}>Adresse email :</div>
                                        <input
                                            type="text"
                                            className={`form-control form-control-solid h-auto px-6 ${getInputClasses(
                                                "adressevalue"
                                            )}`}
                                            name="adressevalue"
                                            {...formik.getFieldProps("adressevalue")}
                                        />
                                        {formik.touched.adressevalue && formik.errors.adressevalue ? (
                                            <div className="fv-plugins-message-container">
                                                <div className="fv-help-block">{formik.errors.adressevalue}</div>
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className={"col-7 " + classes.numro1}>
                                        <div className={classes.noms}>Numéro de téléphone:</div>
                                        <input
                                            type="text"
                                            className={`form-control form-control-solid h-auto px-6 ${getInputClasses(
                                                "numrovalue"
                                            )}`}
                                            name="numrovalue"
                                            {...formik.getFieldProps("numrovalue")}
                                        />
                                        {formik.touched.numrovalue && formik.errors.numrovalue ? (
                                            <div className="fv-plugins-message-container">
                                                <div className="fv-help-block">{formik.errors.numrovalue}</div>
                                            </div>
                                        ) : null}
                                    </div>


                                </div>
                                <div className="text-right">
                                    <div ><span className="text-dark-65 text-right m-2"> Votre message a bien été</span><Button variant="secondary">Envoyer </Button></div>
                                </div>
                            </div>
                        </div>

                    </form>

                </div>}
            {isTabletDevice &&
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
                            <div className="col-12">
                                {/* begin: name */}
                                <div style={{ height: "416px" }}>
                                    <img
                                        alt="Logo"
                                        className="max-h-500px max-w-750px w-500"
                                        src={toAbsoluteUrl("/media/bg/CompositeLayer@1X.jpeg")}
                                    />
                                    <div className={"col-6 " + classes.namefiled}>
                                        <div className={classes.noms}>Noms :</div>
                                        <input
                                            type="text"
                                            className={`form-control form-control-solid h-auto px-6 ${getInputClasses(
                                                "nomsvalue"
                                            )}`}
                                            name="nomsvalue"
                                            {...formik.getFieldProps("nomsvalue")}
                                        />
                                        {formik.touched.nomsvalue && formik.errors.nomsvalue ? (
                                            <div className="fv-plugins-message-container">
                                                <div className="fv-help-block">{formik.errors.nomsvalue}</div>
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className={"col-6 " + classes.Adresse}>
                                        <div className={classes.noms}>Adresse email :</div>
                                        <input
                                            type="text"
                                            className={`form-control form-control-solid h-auto px-6 ${getInputClasses(
                                                "adressevalue"
                                            )}`}
                                            name="adressevalue"
                                            {...formik.getFieldProps("adressevalue")}
                                        />
                                        {formik.touched.adressevalue && formik.errors.adressevalue ? (
                                            <div className="fv-plugins-message-container">
                                                <div className="fv-help-block">{formik.errors.adressevalue}</div>
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className={"col-6 " + classes.numro}>
                                        <div className={classes.noms}>Numéro de téléphone:</div>
                                        <input
                                            type="text"
                                            className={`form-control form-control-solid h-auto px-6 ${getInputClasses(
                                                "numrovalue"
                                            )}`}
                                            name="numrovalue"
                                            {...formik.getFieldProps("numrovalue")}
                                        />
                                        {formik.touched.numrovalue && formik.errors.numrovalue ? (
                                            <div className="fv-plugins-message-container">
                                                <div className="fv-help-block">{formik.errors.numrovalue}</div>
                                            </div>
                                        ) : null}
                                    </div>

                                </div>
                                <div className="text-right">
                                    <div ><span className="text-dark-65 text-right m-2"> Votre message a bien été</span><Button variant="secondary">Envoyer </Button></div>
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
                    </form></div>}
        </div>
    );
}

export default injectIntl(connect(null, null)(Contact));
