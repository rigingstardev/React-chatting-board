import React, { useState } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import {makeStyles} from "@material-ui/core";
import { toAbsoluteUrl } from '../../_metronic/_helpers/AssetsHelpers';
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

let users = [
    {
        avatar: '/media/users/100_3.jpg',
        text1: 'Sona Larry',
        text2: 'Creatrice',
        text3: 'Kinshasa / RDC',
    },
    {
        avatar: '/media/users/100_3.jpg',
        text1: 'Sona Larry',
        text2: 'Creatrice',
        text3: 'Kinshasa / RDC',
    },
    {
        avatar: '/media/users/100_3.jpg',
        text1: 'Sona Larry',
        text2: 'Creatrice',
        text3: 'Kinshasa / RDC',
    },
    {
        avatar: '/media/users/100_3.jpg',
        text1: 'Sona Larry',
        text2: 'Creatrice',
        text3: 'Kinshasa / RDC',
    },
    {
        avatar: '/media/users/100_3.jpg',
        text1: 'Sona Larry',
        text2: 'Creatrice',
        text3: 'Kinshasa / RDC',
    },
    {
        avatar: '/media/users/100_3.jpg',
        text1: 'Sona Larry',
        text2: 'Creatrice',
        text3: 'Kinshasa / RDC',
    },
    {
        avatar: '/media/users/100_3.jpg',
        text1: 'Sona Larry',
        text2: 'Creatrice',
        text3: 'Kinshasa / RDC',
    },
    {
        avatar: '/media/users/100_3.jpg',
        text1: 'Sona Larry',
        text2: 'Creatrice',
        text3: 'Kinshasa / RDC',
    },
    {
        avatar: '/media/users/100_3.jpg',
        text1: 'Sona Larry',
        text2: 'Creatrice',
        text3: 'Kinshasa / RDC',
    },
    {
        avatar: '/media/users/100_3.jpg',
        text1: 'Sona Larry',
        text2: 'Creatrice',
        text3: 'Kinshasa / RDC',
    },
    {
        avatar: '/media/users/100_3.jpg',
        text1: 'Sona Larry',
        text2: 'Creatrice',
        text3: 'Kinshasa / RDC',
    },
    {
        avatar: '/media/users/100_3.jpg',
        text1: 'Sona Larry',
        text2: 'Creatrice',
        text3: 'Kinshasa / RDC',
    },

];


function PersonList(props) {

    const [loading, setLoading] = useState(false);
    const classes = useStyles();

    return (
        <div className={"container-fluid person-list"}>
            <div className="row mt-5">
                <div className="col-12">
                    <h1 className="text-uppercase text-white-50 text-center my-10">entrepreneurs et professionnels congolais et d’ailleurs</h1>                
                </div>
                <div className="col-12 col-sm-4 col-xxl-3">
                    <div className={classes.search} >
                        <div className={classes.header}>Filtrez votre recherche</div>
                        <div className="col-12">
                            <InputGroup className={"mb-3"}>
                                <FormControl
                                    className={classes.inputclass}
                                    placeholder="Pays"
                                    aria-label="Pays"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </div>
                        <div className="col-12">
                            <InputGroup className={"mb-3"}>
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
                                alt="search"
                                className="cursor-pointer w-40px ml-2"
                                src={toAbsoluteUrl('/media/person/search.png')}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-8 col-xxl-9">
                    <div className="row">
                        {users.map((user, i) => (<div className="col-6 col-sm-4 col-lg-3 mt-3 mt-sm-0 px-5" key={i}>
                                <img
                                    className="w-100"
                                    alt="Logo"
                                    src={toAbsoluteUrl(user.avatar)}
                                    style={{ border: '2px solid #34829E' }}
                                />
                                <div className="py-3">
                                    <p className="mb-0 mt-1 text-success font-size-lg">{ user.text1 }</p>
                                    <p className="mb-0 text-white-50 font-size-lg">{ user.text2 }</p>
                                    <p className="mb-0 text-white-50 font-size-lg">{ user.text3 }</p>
                                </div>
                            </div>)
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default injectIntl(connect(null, null)(PersonList));
