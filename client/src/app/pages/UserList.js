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
        avatar: '/media/bg/CompositeLayer@1X (1).png',
    },
    {
        id: 2,
        avatar: '/media/bg/CompositeLayer@1X (2).png',
    },
    {
        id: 3,
        avatar: '/media/bg/CompositeLayer@1X (3).png',
    },
    {
        id: 4,
        avatar: '/media/bg/CompositeLayer@1X (4).png',
    },
    {
        id: 5,
        avatar: '/media/bg/CompositeLayer@1X (5).png',
    },
    {
        id: 6,
        avatar: '/media/bg/CompositeLayer@1X (6).png',
    },
    {
        id: 7,
        avatar: '/media/bg/profie.png',
    },
    {
        id: 8,
        avatar: '/media/bg/Profil.png',
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
        <div className={"container w-100 mx-auto " + classes.plusUsersNumber}>

            <div className="row" style={{ marginTop: "100px" }}>
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
    );
}

export default injectIntl(connect(null, null)(UserList));
