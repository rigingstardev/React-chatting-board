import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import {makeStyles} from "@material-ui/core";
import { toAbsoluteUrl, toImageUrl } from "../../_metronic/_helpers";
import {InputGroup} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {FormControl} from 'react-bootstrap';
import {GetAllUsers} from './_redux/chatCrud';

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
        backgroundColor: '#5E6E79 !important',
        color:'white !important',
        marginTop: "10px",
        border:"none"
    },
    listRoot: {
        "& .MuiListItem-container, & .MuiListItem-root.MuiListItem-gutters": {
            marginTop: 1,
            backgroundColor: "#3F5060",
            display: "flex"
        },
        "& .MuiListItem-root.MuiListItem-gutters.groups": {
            display: 'block'
        },
        "& .MuiListItem-root.MuiListItem-gutters > div.group-users": {
            display: 'flex',
            alignItems: 'center'
        },
        "& .MuiTypography-root": {
            color: '#b6ceffbd'
        },
        "& .MuiListItemSecondaryAction-root": {
            color: '#112233cc'
        },
        "& .MuiAvatar-root": {
            width: 70,
            height: 60
        }
    }
}));

const initialInputData={country:"",state:"",city:"",profession:"",username:"",expertise:""};
function PersonList(props) {
    const classes = useStyles();
    const [usersData, setUsers] = useState([]);
    const [displayData,setDisplayData]=useState([]);
    const [inputData,setInputData]=useState({country:"",state:"",city:"",profession:"",username:"",expertise:""});
    const [update, setUpdate] = useState(0);

    const getAllUsers = async () => {
        try {
            const {data} = await GetAllUsers();
            setUsers(data); 
            setDisplayData(data);
            // return data;
        } catch (error) {
            console.error(error);
        }
    }

    const Filterdata = () => {        
        var tmp=[];
        console.log(usersData);
        usersData.map((user)=>{
            var flg=true;
            for(let item in inputData){
                if(inputData[item]=="" || inputData[item]==user[item])continue;
                flg=false;
            }
            if(flg)tmp.push(user);
        });
        setDisplayData(tmp);
    }
    
    const refreshData =()=>{
        setInputData(initialInputData);
        setDisplayData(usersData);
        setUpdate(update+1);
    }
    useEffect(() => {
        getAllUsers();
    }, []);
    const updatePays = (e) =>{
        var tmp = inputData;        
        tmp[e.target.id]=e.target.value
        setInputData(tmp);
        setUpdate(update+1);
    }
    return (
        <div className={"container person-list"}>
            <div className="row mt-5">
                <div className="col-12">
                    <h1 className="text-uppercase text-white-50 text-center my-10">entrepreneurs et professionnels congolais et d’ailleurs</h1>
                </div>
                <div className="col-12 col-sm-4 col-xxl-3">
                    <div className={
                        classes.search
                    }>
                        <div className={
                            classes.header
                        }>Filtrez votre recherche</div>
                        <div className="col-12">
                            <InputGroup className={"mb-3"}>
                                <FormControl className={
                                        classes.inputclass
                                    }
                                    placeholder="Pays"
                                    aria-label="Pays"
                                    id="country"
                                    value={inputData.pays}
                                    onChange={updatePays}
                                    aria-describedby="basic-addon1"/>
                            </InputGroup>
                        </div>
                        <div className="col-12">
                            <InputGroup className={"mb-3"}>
                                <FormControl className={
                                        classes.inputclass
                                    }
                                    value={inputData.etat}
                                    placeholder="Etat"
                                    aria-label="Etat"
                                    id="state"
                                    aria-describedby="basic-addon1"
                                    onChange={updatePays}
                                    />
                            </InputGroup>
                        </div>
                        <div className="col-12">
                            <InputGroup className={"mb-3 "}>
                                <FormControl className={
                                        classes.inputclass
                                    }
                                    value={inputData.ville}
                                    placeholder="Ville"
                                    aria-label="Ville"
                                    id="city"
                                    aria-describedby="basic-addon1"
                                    onChange={updatePays}
                                    />
                            </InputGroup>
                        </div>
                        <div className="col-12">
                            <InputGroup className={"mb-3 "}>
                                <FormControl className={
                                        classes.inputclass
                                    }
                                    value={inputData.profession}
                                    placeholder="Profession"
                                    aria-label="Profession"
                                    id="profession"
                                    aria-describedby="basic-addon1"
                                    onChange={updatePays}
                                    />
                            </InputGroup>
                        </div>
                        <div className="col-12">
                            <InputGroup className={"mb-3 "}>
                                <FormControl className={
                                        classes.inputclass
                                    }
                                    value={inputData.noms}
                                    placeholder="Noms"
                                    aria-label="Noms"
                                    id="username"
                                    aria-describedby="basic-addon1"
                                    onChange={updatePays}
                                    />
                            </InputGroup>
                        </div>
                        <div className="col-12">
                            <InputGroup className={"mb-3 "}>
                                <FormControl className={
                                        classes.inputclass
                                    }
                                    value={inputData.expertise}
                                    placeholder="Expertise"
                                    aria-label="Expertise" 
                                    id="expertise"
                                    aria-describedby="basic-addon1"
                                    onChange={updatePays}
                                    />
                            </InputGroup>
                        </div>
                        <div style={
                            {textAlign: "center"}
                        }>
                            <Button variant="secondary" onClick={refreshData}>Refaire</Button>
                            <img alt="search" className="cursor-pointer w-40px ml-2" onClick={Filterdata}
                                src={
                                    toAbsoluteUrl('/media/person/search.png')
                                }/>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-8 col-xxl-9" style={{height:"calc(100vh - 176px)", overflowY:"scroll"}}>
                    <div className="row">
                        {
                        displayData.map((user, i) => (
                            <div className="col-6 col-sm-4 col-lg-3 mt-3 mt-sm-0 px-5"
                                key={i}>
                                <img className="w-100" alt="Logo"
                                    src={
                                        toImageUrl(user.avatar)
                                    }
                                    style={
                                        {border: '2px solid #34829E'}
                                    }/>
                                <div className="py-3">
                                    <p className="mb-0 mt-1 text-success font-size-lg">
                                        {
                                        user.username
                                    }</p>
                                    <p className="mb-0 text-white-50 font-size-lg">
                                        {
                                        user.industry
                                    }</p>
                                    <p className="mb-0 text-white-50 font-size-lg">
                                        {
                                        user.job
                                    }</p>
                                </div>
                            </div>
                        ))
                    } </div>
                </div>
            </div>
        </div>
    );
}

export default injectIntl(connect(null, null)(PersonList));
