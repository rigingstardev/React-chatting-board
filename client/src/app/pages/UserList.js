import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import { Avatar, colors, Divider, InputAdornment, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles, TextField, Typography } from "@material-ui/core";
import { toAbsoluteUrl } from '../../_metronic/_helpers/AssetsHelpers';
import { FaFileExcel } from "react-icons/fa";

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
        id: 1,
        avatar: '/media/news/news1.png',
    },
    {
        id: 2,
        avatar: '/media/news/news2.png',
    },
    {
        id: 3,
        avatar: '/media/news/news3.png',
    },
    {
        id: 4,
        avatar: '/media/news/news1.png',
    },
    {
        id: 5,
        avatar: '/media/news/news4.png',
    },
    {
        id: 6,
        avatar: '/media/news/news5.png',
    },
    {
        id: 7,
        avatar: '/media/news/news1.png',
    },
    {
        id: 8,
        avatar: '/media/news/news6.png',
    },

];
const initialValues = {
    email: "",
    password: "",
};

function UserList(props) {
    const { intl } = props;
    const [loading, setLoading] = useState(false);
    const classes = useStyles();
    return (
        <div className={"container-fluid p-5 p-sm-10 px-5 px-sm-10 px-md-30 " + classes.plusUsersNumber}>

            <div className="row mt-5">
                {pictures.map((group, i) => {
                    return (<div className="col-6 col-sm-4 col-md-4 col-lg-3 px-5 mb-10">
                        <div style={{ backgroundColor: "#FAF2C7" }}>
                            <img
                                alt="Logo"
                                className="w-100"
                                src={toAbsoluteUrl(group.avatar)}
                            />
                            <div className="p-5">
                                <p className="mb-0 font-weight-bolder">ROGER MUNTU</p>
                                <p className="mb-0 font-size-sm">Journaliste / Animateur</p>
                                <p className="mb-0 font-size-sm">La Voix de l’Amerique</p>
                                <p className="mb-0 mt-1 font-size-sm text-right">Washington DC</p>
                            </div>
                        </div>
                    </div>)
                })}

            </div>
        </div>
    );
}

export default injectIntl(connect(null, null)(UserList));
