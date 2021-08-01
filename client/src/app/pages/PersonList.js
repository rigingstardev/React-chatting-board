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
        backgroundColor: "#0E476F"
    },
    search: {
        backgroundColor: '#768690',
        height: "450px"
    },
    header: {
        textAlign: "center",
        fontSize: "17px",
        paddingTop: "10px",
        color: "#E0E3E6"
    },
    inputclass: {
        backgroundColor: '#5E6E79',
        marginTop: "10px"
    },
    listRoot: {
        "& .MuiListItem-container, & .MuiListItem-root.MuiListItem-gutters": {
            marginTop: 1,
            backgroundColor: "#3F5060",
            display: "flex"
        },
        "& .MuiListItem-root.MuiListItem-gutters.groups": {
            display: 'block',
        },
        "& .MuiListItem-root.MuiListItem-gutters > div.group-users": {
            display: 'flex',
            alignItems: 'center'
        },
        "& .MuiTypography-root": {
            color: '#b6ceffbd',
        },
        "& .MuiListItemSecondaryAction-root": {
            color: '#112233cc'
        },
        "& .MuiAvatar-root": {
            width: 70,
            height: 60
        }
    },
}));

let pictures = [
    {
        avatar: '/media/person/man1.png',
    },
    {
        avatar: '/media/person/woman1.png',
    },
    {
        avatar: '/media/person/woman1.png',
    },
    {
        avatar: '/media/person/man2.png',
    },
    {
        avatar: '/media/person/man1.png',
    },
    {
        avatar: '/media/person/man2.png',
    },
    {
        avatar: '/media/person/man1.png',
    },
    {
        avatar: '/media/person/woman2.png',
    },
    {
        avatar: '/media/person/man2.png',
    },
    {
        avatar: '/media/person/man1.png',
    },
    {
        avatar: '/media/person/woman2.png',
    },
    {
        avatar: '/media/person/man1.png',
    },

];
const initialValues = {
    email: "",
    password: "",
};

function PersonList(props) {
    const { intl } = props;
    const [loading, setLoading] = useState(false);
    const classes = useStyles();
    const isTabletDevice = useMediaQuery({
        query: "(min-width:800px)",
    });
    const isTabletDevice1 = useMediaQuery({
        query: "(min-width:500px)",
    });
    return (
        <div className={"container w-100 mx-auto"}>
            {!isTabletDevice1 && !isTabletDevice && <div className="row" style={{ marginTop: "0px" }}>
                <div className="col-12">
                    <div className={classes.search + " row"} >
                        <div className={classes.header + " col-12"}>Filtrez votre recherche</div>
                        <div className="col-6">
                            <InputGroup className={"mb-3 "}>
                                <FormControl
                                    className={classes.inputclass}
                                    placeholder="Pays"
                                    aria-label="Pays"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </div>
                        <div className="col-6">
                            <InputGroup className={"mb-3 "}>
                                <FormControl
                                    className={classes.inputclass}
                                    placeholder="Etat"
                                    aria-label="Etat"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </div>
                        <div className="col-6">
                            <InputGroup className={"mb-3 "}>
                                <FormControl
                                    className={classes.inputclass}
                                    placeholder="Ville"
                                    aria-label="Ville"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </div>
                        <div className="col-6">
                            <InputGroup className={"mb-3 "}>
                                <FormControl
                                    className={classes.inputclass}
                                    placeholder="Profession"
                                    aria-label="Profession"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </div>
                        <div className="col-6">
                            <InputGroup className={"mb-3 "}>
                                <FormControl
                                    className={classes.inputclass}
                                    placeholder="Noms"
                                    aria-label="Noms"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </div>
                        <div className="col-6">
                            <InputGroup className={"mb-3 "}>
                                <FormControl
                                    className={classes.inputclass}
                                    placeholder="Expertise"
                                    aria-label="Expertise"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </div>
                        <div className="col-12" style={{ textAlign: "center" }}>
                            <Button variant="secondary">Refaire</Button>
                            <img
                                alt="Logo"
                                style={{ marginLeft: '5px' }}
                                className="cursor-pointer"
                                src={toAbsoluteUrl('/media/person/search.png')}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="row">
                        {pictures.map((group, i) => {
                            return (<div className="col-6" >
                                <img
                                    alt="Logo"
                                    style={{ width: "80%", margin: "5px" }}
                                    src={toAbsoluteUrl(group.avatar)}
                                />
                            </div>)
                        })}
                    </div>
                </div>
            </div>}
            {isTabletDevice1 && !isTabletDevice && <div className="row" style={{ marginTop: "2px" }}>
                <div className="col-4">
                    <div className={classes.search} >
                        <div className={classes.header}>Filtrez votre recherche</div>
                        <div className="col-12">
                            <InputGroup className={"mb-3 "}>
                                <FormControl
                                    className={classes.inputclass}
                                    placeholder="Pays"
                                    aria-label="Pays"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </div>
                        <div className="col-12">
                            <InputGroup className={"mb-3 "}>
                                <FormControl
                                    className={classes.inputclass}
                                    placeholder="Etat"
                                    aria-label="Etat"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </div>
                        <div className="col-12">
                            <InputGroup className={"mb-3 "}>
                                <FormControl
                                    className={classes.inputclass}
                                    placeholder="Ville"
                                    aria-label="Ville"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </div>
                        <div className="col-12">
                            <InputGroup className={"mb-3 "}>
                                <FormControl
                                    className={classes.inputclass}
                                    placeholder="Profession"
                                    aria-label="Profession"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </div>
                        <div className="col-12">
                            <InputGroup className={"mb-3 "}>
                                <FormControl
                                    className={classes.inputclass}
                                    placeholder="Noms"
                                    aria-label="Noms"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </div>
                        <div className="col-12">
                            <InputGroup className={"mb-3 "}>
                                <FormControl
                                    className={classes.inputclass}
                                    placeholder="Expertise"
                                    aria-label="Expertise"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </div>
                        <div style={{ textAlign: "center" }}>
                            <Button variant="secondary">Refaire</Button>
                            <img
                                alt="Logo"
                                style={{ marginLeft: '5px' }}
                                className="cursor-pointer"
                                src={toAbsoluteUrl('/media/person/search.png')}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-8">
                    <div className="row">
                        {pictures.map((group, i) => {
                            return (<div className="col-4" >
                                <img
                                    alt="Logo"
                                    style={{ width: "80%", margin: "5px" }}
                                    src={toAbsoluteUrl(group.avatar)}
                                />
                            </div>)
                        })}
                    </div>
                </div>
            </div>}
            {isTabletDevice && <div className="row" style={{ marginTop: "100px" }}>
                <div className="col-4">
                    <div className={classes.search} >
                        <div className={classes.header}>Filtrez votre recherche</div>
                        <div className="col-12">
                            <InputGroup className={"mb-3 "}>
                                <FormControl
                                    className={classes.inputclass}
                                    placeholder="Pays"
                                    aria-label="Pays"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </div>
                        <div className="col-12">
                            <InputGroup className={"mb-3 "}>
                                <FormControl
                                    className={classes.inputclass}
                                    placeholder="Etat"
                                    aria-label="Etat"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </div>
                        <div className="col-12">
                            <InputGroup className={"mb-3 "}>
                                <FormControl
                                    className={classes.inputclass}
                                    placeholder="Ville"
                                    aria-label="Ville"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </div>
                        <div className="col-12">
                            <InputGroup className={"mb-3 "}>
                                <FormControl
                                    className={classes.inputclass}
                                    placeholder="Profession"
                                    aria-label="Profession"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </div>
                        <div className="col-12">
                            <InputGroup className={"mb-3 "}>
                                <FormControl
                                    className={classes.inputclass}
                                    placeholder="Noms"
                                    aria-label="Noms"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </div>
                        <div className="col-12">
                            <InputGroup className={"mb-3 "}>
                                <FormControl
                                    className={classes.inputclass}
                                    placeholder="Expertise"
                                    aria-label="Expertise"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </div>
                        <div style={{ textAlign: "center" }}>
                            <Button variant="secondary">Refaire</Button>
                            <img
                                alt="Logo"
                                style={{ marginLeft: '5px' }}
                                className="cursor-pointer"
                                src={toAbsoluteUrl('/media/person/search.png')}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-8">
                    <div className="row">
                        {pictures.map((group, i) => {
                            return (<div className="col-3" >
                                <img
                                    alt="Logo"
                                    style={{ width: "80%", margin: "5px" }}
                                    src={toAbsoluteUrl(group.avatar)}
                                />
                            </div>)
                        })}
                    </div>
                </div>
            </div>}
        </div>
    );
}

export default injectIntl(connect(null, null)(PersonList));
