import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import {makeStyles, withTheme} from "@material-ui/core";
import { toAbsoluteUrl, toImageUrl } from "../../_metronic/_helpers";
import {InputGroup, Form} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import {GetAllUsers} from './_redux/chatCrud';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {professionList, countryList} from '../constant';

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
        borderLeft:'3px solid black',
        height: 'auto',
        padding: '1.5rem'
    },
    header: {
        textAlign: "center",
        fontSize: "17px",
        marginBottom: "30px",
        color: "#E0E3E6"
    },
    label: {
        color: 'white'
    },
    inputclass: {
        color: "#5E6E79",
        marginBottom: "1rem",
        marginTop:"0.5rem", 
        "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
            // Default transform is "translate(14px, 20px) scale(1)""
            // This lines up the label with the initial cursor position in the input
            // after changing its padding-left.
            color:"#aaaaaa",
            transform: "translate(5px, 15px) scale(1);"
        },
        "& .MuiFormLabel-filled":{
            color:"white",
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#5E6E79",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "green",
            borderRadius: "0"
        },
    },
    firstColor:{
        color:"#3399ff"
    },
    secondColor:{
        color:"#99cc66"
    },
    thirdColor:{
        color:"#ffcc00"
    },
    forthColor:{
        color:"#ff9933"
    }
}));

const initialInputData={country:"",state:"",city:"",profession:"",username:"",expertise:""};
const dataList = ["Red", "Green", "Black", "Blue", "Orange"];
// const userNameColors=["text-success", "text-primary", "text-danger"];

function PersonList(props) {
    const classes = useStyles();
    const [usersData, setUsers] = useState([]);
    const [displayData,setDisplayData]=useState([]);
    const [inputData,setInputData]=useState({country:"",state:"",city:"",profession:"",username:"",expertise:""});
    const [update, setUpdate] = useState(0);
    const [val, setVal] = useState("");
    const userNameColors=[classes.firstColor, classes.secondColor, classes.thirdColor, classes.forthColor];
    
    const getAllUsers = async () => {
        try {
            const {data} = await GetAllUsers();
            console.log("allusers", data);
            setUsers(data); 
            setDisplayData(data);
        } catch (error) {
            console.error(error);
        }
    }

    const Filterdata = () => {        
        var tmp=[];
        console.log(inputData);
        usersData.map((user)=>{
            var flg=true;
            for(let item in inputData){
                if(inputData[item]==="" || inputData[item]===user[item])continue;
                flg=false;
            }
            if(flg)tmp.push(user);
        });
        setDisplayData(tmp);
    }
    
    const refreshData =()=>{
        setVal([]);
        setInputData({country:"",state:"",city:"",profession:"",username:"",expertise:""});
        setDisplayData(usersData);
        console.log("initial", inputData);
        setUpdate(update+1);
    }
    useEffect(() => {
        getAllUsers();
    }, []);
    
    return (
        <div className={"container person-list"}>
            <div className="row mt-5">
                <div className="col-12">
                    <h1 className="text-uppercase text-white-50 text-center my-10">entrepreneurs et professionnels congolais et d’ailleurs</h1>
                </div>
                <div className="col-12 col-sm-4 col-xxl-3">
                    <div className={classes.search}>
                        <div className={ classes.header }>Filtrez votre recherche</div>
                            <Autocomplete
                              id="country"
                              name="country"
                              freeSolo
                              value={val}
                              className={classes.inputclass}
                              onChange={(event, value)=>{
                                  inputData["country"] = value === null ? '' : value;
                                  setUpdate(update + 1);
                                  console.log(inputData);
                                }}
                                options={countryList.map((option) => option.value.toString())}
                                renderInput={(params) => (
                                    <TextField {...params}
                                    variant="outlined"
                                    label="Pays"
                                    onChange={(event)=>{
                                        inputData["country"] = event.target.value;
                                        setUpdate(update + 1);
                                        console.log(event.target.value);
                                    }}
                                    style={{ backgroundColor: '#5E6E79' }}
                                    />
                                    )}
                                    />
                            <Autocomplete
                              id="state"
                              name="state"
                              freeSolo
                              value={val}
                              className={classes.inputclass}
                              options={[]}
                              renderInput={(params) => (
                                  <TextField {...params}
                                  variant="outlined"
                                  label="Etat"
                                  onChange={(event)=>{
                                      inputData["state"] = event.target.value;
                                      setUpdate(update + 1);
                                      console.log(inputData);
                                    }}
                                    style={{ borderRadius: '0px !important', backgroundColor: '#5E6E79' }} />
                                    )}
                            />
                            <Autocomplete
                              id="city"
                              name="city"
                              freeSolo
                              value={val}
                              className={classes.inputclass}
                              options={[]}
                              renderInput={(params) => (
                                  <TextField {...params}
                                  label="Ville"
                                  variant="outlined"
                                  onChange={(event)=>{
                                    inputData["city"] = event.target.value;
                                    setUpdate(update + 1);
                                    console.log(inputData);
                                  }}
                                  style={{ borderRadius: '0px !important', backgroundColor: '#5E6E79' }} />
                                  )}
                                  />
                            <Autocomplete
                              id="profession"
                              name="profession"
                              freeSolo
                              value={val}
                              className={classes.inputclass}
                              options={professionList.map((option) => option.value)}
                              onChange={(event, value)=>{
                                inputData["profession"] = value === null ? '' : value;
                                setUpdate(update + 1);
                                console.log(inputData);
                              }}
                              name="Profession"
                              renderInput={(params) => (
                                  <TextField {...params}
                                  variant="outlined"
                                  label="Profession"
                                  onChange={(event)=>{
                                    inputData["profession"] = event.target.value;
                                    setUpdate(update + 1);
                                    console.log(inputData);
                                  }}
                                  style={{ borderRadius: '0px !important', backgroundColor: '#5E6E79' }} />
                              )}
                            />
                            <Autocomplete
                              id="names"
                              name="names"
                              freeSolo
                              value={val}
                              className={classes.inputclass}
                              options={[]}
                              name="Noms"
                              renderInput={(params) => (
                                  <TextField {...params}
                                  variant="outlined"
                                  label="Noms"
                                  onChange={(event)=>{
                                    inputData["username"] = event.target.value;
                                    setUpdate(update + 1);
                                    console.log(inputData);
                                  }}
                                  style={{ borderRadius: '0px !important', backgroundColor: '#5E6E79' }} />
                                )}
                            />
                            <Autocomplete
                              id="expertise"
                              name="expertise"
                              freeSolo
                              value={val}
                              className={classes.inputclass}
                              options={[]}
                              name="Expertise"
                              renderInput={(params) => (
                                <TextField {...params}
                                  variant="outlined"
                                  label="Expertise"
                                  onChange={(event)=>{
                                    inputData["expertise"] = event.target.value;
                                    setUpdate(update + 1);
                                    console.log(inputData);
                                  }}
                                  style={{ borderRadius: '0px !important', backgroundColor: '#5E6E79' }} />
                              )}
                            />
                        <div style={{textAlign: "center", marginTop: "30px"}}>
                            <Button variant="secondary" 
                                    size="large" 
                                    className="rounded"
                                    style={{fontSize:"20px"}} 
                                    onClick={refreshData}>Refaire</Button>
                            <Button className={"ml-3 rounded"}
                                    style={{backgroundColor: '#0066cc', border:'none', fontSize:"20px",color: '#000000'}}
                                    size="large"
                                    onClick={Filterdata} 
                            >       
                                    <SearchIcon style={{fontSize:"30px"}}/>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-8 col-xxl-9" style={{height:"calc(100vh - 176px)", overflowY:"scroll"}}>
                    <div className="row">
                        {
                        displayData.map((user, i) => (
                            <div className="col-6 col-sm-4 col-lg-3 mt-3 mt-sm-0 px-5"
                                key={i}>
                                <Link to={`/user-profile/profile-overview/${user.username}`}>    
                                <img className="w-100" alt="Logo"
                                    src={
                                        toImageUrl(user.avatar)
                                    }
                                    style={
                                        {border: '2px solid #34829E'}
                                    }/>
                                </Link>
                                <div className="py-3">
                                    
                                    <p className={"mb-0 mt-1 font-size-lg", userNameColors[i%4]}>
                                        {user.username}
                                    </p>
                                    <p className="mb-0 text-white-50 font-size-lg">
                                        {user.industry}
                                    </p>
                                    <p className="mb-0 text-white-50 font-size-lg">
                                        {user.profession}
                                    </p>
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
