import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import { Avatar, colors, Divider, InputAdornment, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles, TextField, Typography } from "@material-ui/core";
import { toAbsoluteUrl } from '../../_metronic/_helpers/AssetsHelpers';
import { FaFileExcel } from "react-icons/fa";
import { InputGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';

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
        backgroundColor: "#204870",
        color: "#B4BFC9",
        fontSize: "20px"
    },
    buttonclass: {
        backgroundColor: ""
    },
    backg: {
        backgroundImage: `url(${toAbsoluteUrl(
            "/media/bg/download.png"
        )}`
    }
}));


const initialValues = {
    email: "",
    password: "",
};

function Charts(props) {
    const { intl } = props;
    const [loading, setLoading] = useState(false);
    const classes = useStyles();
    const isTabletDevice = useMediaQuery({
        query: "(min-width:1583px)",
    });
    const isTabletDevice1 = useMediaQuery({
        query: "(min-width:826px)",
    });
    return (
        <div className={"container w-100 mx-auto"}>
            <div className="row" style={{ marginTop: "10px" }}>
                <div className="col-4">
                    <div className="row">
                        <div className="col-12" >
                            <div className="row">
                                <div className="col-10">
                                    <Button variant="secondary" style={{
                                        backgroundColor: "#204870",
                                        color: "#B4BFC9",
                                    }} className={classes.plusUsersNumber}>TOURISME ET</Button></div>
                                <div className="col-2" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><p style={{ color: "#5c6c7b", fontSize: "25px" }}>●</p></div></div>
                        </div>
                        <div className="col-12" style={{ color: "#B4BFC9", fontSize: "20px", marginTop: "10px" }}>
                            <div className="row">
                                <div className="col-10">TECHNOLOGIE</div>
                                <div className="col-2" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><p style={{ color: "#5c6c7b", fontSize: "25px" }}>●</p></div>
                            </div>
                        </div>
                        <div className="col-12" style={{ color: "#B4BFC9", fontSize: "20px", marginTop: "10px" }}>
                            <div className="row">
                                <div className="col-10">
                                    TRANSPORT
                                </div>
                                <div className="col-2" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><p style={{ color: "#5c6c7b", fontSize: "25px" }}>●</p></div>
                            </div>
                        </div>
                        <div className="col-12" style={{ color: "#B4BFC9", fontSize: "20px", marginTop: "10px" }}>
                            <div className="row">
                                <div className="col-10">
                                    DIVERTISSEMENT
                                </div>
                                <div className="col-2" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><p style={{ color: "#5c6c7b", fontSize: "25px" }}>●</p></div>
                            </div>
                        </div>
                        <div className="col-12" style={{ color: "#B4BFC9", fontSize: "20px", marginTop: "10px" }}>
                            <div className="row">
                                <div className="col-10">
                                    COMMERCE ET FINANCE
                                </div>
                                <div className="col-2" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><p style={{ color: "#5c6c7b", fontSize: "25px" }}>●</p></div>
                            </div>
                        </div>
                        <div className="col-12" style={{ color: "#B4BFC9", fontSize: "20px", marginTop: "10px" }}>
                            <div className="row">
                                <div className="col-10">
                                    COSMETIQUE ET BEAUTE
                                </div>
                                <div className="col-2" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><p style={{ color: "#5c6c7b", fontSize: "25px" }}>●</p></div>
                            </div>
                        </div>
                        <div className="col-12" style={{ color: "#B4BFC9", fontSize: "20px", marginTop: "10px" }}>
                            <div className="row">
                                <div className="col-10">
                                    ALIMENTATION
                                </div>
                                <div className="col-2" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><p style={{ color: "#5c6c7b", fontSize: "25px" }}>●</p></div>
                            </div>
                        </div>
                        <div className="col-12" style={{ color: "#B4BFC9", fontSize: "20px", marginTop: "10px" }}>
                            <div className="row">
                                <div className="col-10">
                                    IMMOBILIER
                                </div>
                                <div className="col-2" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><p style={{ color: "#5c6c7b", fontSize: "25px" }}>●</p></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"col-8"} >
                    <div style={{
                        backgroundImage: `url(${toAbsoluteUrl(
                            "/media/bg/download.png"
                        )}`, backgroundRepeat: "no-repeat", width: "104%",
                        height: "121%"
                    }}>
                        <img
                            alt="Logo"
                            style={{
                                color: "#888586", position: "relative",
                                top: "495px",
                                left: "107px"
                            }}
                            src={toAbsoluteUrl("/media/bg/logo2.png")}
                        />
                        <img
                            alt="Logo"
                            style={{
                                color: "#888586", position: "relative",
                                top: "435px",
                                left: "187px"
                            }}
                            src={toAbsoluteUrl("/media/bg/logo2.png")}
                        />
                        <img
                            alt="Logo"
                            style={{
                                color: "#888586", position: "relative",
                                top: "373px",
                                left: "64px"
                            }}
                            src={toAbsoluteUrl("/media/bg/logo1.png")}
                        />
                        <img
                            alt="Logo"
                            style={{
                                color: "#888586", position: "relative",
                                top: "312px",
                                right: "82px"
                            }}
                            src={toAbsoluteUrl("/media/bg/logo3.png")}
                        />
                        <img
                            alt="Logo"
                            style={{
                                color: "#888586", position: "relative",
                                top: "250px",
                                right: "17px"
                            }}
                            src={toAbsoluteUrl("/media/bg/logo4.png")}
                        />
                        <img
                            alt="Logo"
                            style={{
                                color: "#888586", position: "relative",
                                top: "250px",
                                left: "35px"
                            }}
                            src={toAbsoluteUrl("/media/bg/logo2.png")}
                        />
                        <img
                            alt="Logo"
                            style={{
                                color: "#888586", position: "relative",
                                top: "189px",
                                right: "90px"
                            }}
                            src={toAbsoluteUrl("/media/bg/logo1.png")}
                        />
                        <img
                            alt="Logo"
                            style={{
                                color: "#888586", position: "relative",
                                top: "314px",
                                right: "43px"
                            }}
                            src={toAbsoluteUrl("/media/bg/logo3.png")}
                        />
                        <img
                            alt="Logo"
                            style={{
                                color: "#888586", position: "relative",
                                top: "131px",
                                right: "527px"
                            }}
                            src={toAbsoluteUrl("/media/bg/logo3.png")}
                        />
                        <img
                            alt="Logo"
                            style={{
                                color: "#888586", position: "relative",
                                top: "145px",
                                right: "528px"
                            }}
                            src={toAbsoluteUrl("/media/bg/logo2.png")}
                        />
                        <img
                            alt="Logo"
                            style={{
                                color: "#888586", position: "relative",
                                top: "68px",
                                right: "468px"
                            }}
                            src={toAbsoluteUrl("/media/bg/logo1.png")}
                        />
                        <img
                            alt="Logo"
                            style={{
                                color: "#888586", position: "relative",
                                top: "128px",
                                right: "247px"
                            }}
                            src={toAbsoluteUrl("/media/bg/logo4.png")}
                        />
                        <img
                            alt="Logo"
                            style={{
                                color: "#888586", position: "relative",
                                top: "5px",
                                right: "239px"
                            }}
                            src={toAbsoluteUrl("/media/bg/logo2.png")}
                        />
                        <img
                            alt="Logo"
                            style={{
                                color: "#888586", position: "relative",
                                bottom: "64px",
                                left: "654px"
                            }}
                            src={toAbsoluteUrl("/media/bg/logo3.png")}
                        />
                        <img
                            alt="Logo"
                            style={{
                                color: "#888586", position: "relative",
                                top: "186px",
                                left: "565px"
                            }}
                            src={toAbsoluteUrl("/media/bg/logo3.png")}
                        />
                        <img
                            alt="Logo"
                            style={{
                                color: "#888586", position: "relative",
                                top: "333px",
                                left: "420px"
                            }}
                            src={toAbsoluteUrl("/media/bg/logo2.png")}
                        />
                        <img
                            alt="Logo"
                            style={{
                                color: "#888586", position: "relative",
                                top: "391px",
                                left: "134px"
                            }}
                            src={toAbsoluteUrl("/media/bg/logo4.png")}
                        />
                    </div>
                </div>
                <div style={{
                    top: "338px",
                    right: "80px",
                    position: "fixed",
                    display: "grid"
                }}>
                    <Button variant="secondary" style={{
                        backgroundColor: "#204870",
                        color: "#B4BFC9",
                    }} className={classes.plusUsersNumber}>CLASSEMENT</Button>
                    <Button variant="secondary" style={{
                        backgroundColor: "#112233",
                        color: "#B4BFC9",
                        fontSize: "22px",
                        marginTop: "5px",
                        paddingLeft: "30px",
                        paddingRight: "30px",
                    }} >REGISTRE</Button>
                </div>
                <div style={{
                    display: "grid", position: "relative",
                    left: "863px",
                    bottom: "0px"
                }}>
                    <Button variant="secondary" style={{
                        backgroundColor: "#204870",
                        color: "#B4BFC9",
                    }} className={classes.plusUsersNumber}>THE EXAMPLE</Button>
                    <Button variant="secondary" style={{
                        backgroundColor: "#435665",
                        color: "#B4BFC9",
                        fontSize: "20px",
                        marginTop: "5px",
                    }} >FOOD</Button>
                    <Button variant="secondary" style={{
                        backgroundColor: "#364656",
                        color: "#B4BFC9",
                        width: "100px",
                        fontSize: "20px",
                        marginTop: "5px"
                    }} >1.98</Button>
                </div>
            </div>
        </div>
    );
}

export default injectIntl(connect(null, null)(Charts));
