import React, { useEffect, useState, useRef } from "react";
import { Card } from '../../../_metronic/_partials/controls/Card'
import { Button, CardActionArea,  CardContent, makeStyles, Typography } from "@material-ui/core";
import { toImageUrl } from "../../../_metronic/_helpers";
import {getUserByToken, getUserByName, update} from '../Auth/_redux/authCrud';
import {useParams, useLocation, Link} from 'react-router-dom';
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import * as auth from "../Auth/_redux/authRedux";
import * as Yup from "yup";
import { useFormik} from "formik";

const useStyles = makeStyles({
  card: {
    // maxWidth: 345,
    backgroundColor: '#112233',
    width: "100%"
  },
  media: {
    width: "100%",
    height: 550,
  },
  myButton:{
    width: "170px"
  },
  myFont:{
    color:"#b6ceff"
  }
});

function ProfileOverview(props) {
  
  const [userData, setUserData] = useState([]);
  const [editPage, setEditPage] = useState(false);
  const [note, setNote] = useState('');
  const {username} = useParams();
  const classes = useStyles();
  const { intl } = props;

  const getUser = async () => {
    console.log(username)
    if(!username){
      try{
        const {data} = await getUserByToken();
        setUserData(data);
        setNote(data.note);
      }catch(error){
        console.log(error)
      }
    }else{
      try{
        const {data} = await getUserByName(username);
        setUserData(data);
        setNote(data.note);
      }catch(error){
        console.log(error)
      }
    }
  }

  const EditionSchema = Yup.object().shape({
    name:Yup.string().required("name required"),
    profession:Yup.string().required("profession required"),
    note:Yup.string().required("note required"),
    field:Yup.string().required("field required"),
    industry:Yup.string().required("industry required"),
    website:Yup.string().required("website required"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues : {
      name: userData.username ? userData.username : '',
      email:userData.email ? userData.email : '',
      profession: userData.profession ? userData.profession : '',
      note: userData.note ? userData.note : '',
      field: userData.field ? userData.field : '',
      industry: userData.industry ? userData.industry : '',
      website: userData.website ? userData.website : '',
    },
    validationSchema: EditionSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      console.log(values);
      let formData = new FormData();
      for (const key in values) {
        const value = values[key];
        formData.append(key, value)
      }
      update(formData)
        .then(() => {
          props.history.go(0);
        })
        .catch((err) => {
          setStatus(
            intl.formatMessage({
              id: "AUTH.VALIDATION.INVALID_LOGIN",
            })
          );
        });
    },
  });

  useEffect(()=>{
    getUser();
  }, []);
  return (
    <div className="row">
        <img src={toImageUrl(encodeURIComponent(userData.photo))} className="w-100" />
        <form id="update_profile" onSubmit={formik.handleSubmit}>
          <div>            
            <Typography className="text-white my-5" gutterBottom variant="h5" component="h2">
              {editPage === false ? 
                  userData.username : 
                  <input
                    name="name"
                    {...formik.getFieldProps("name")} 
                  />
              }
            </Typography>
            <Typography className="text-white-50 mb-5" gutterBottom variant="subtitle1">
              {editPage === false ? 
                  userData.profession :
                  <input 
                    type="text"
                    name="profession"
                    {...formik.getFieldProps("profession")} 
                  />
              }
            </Typography>
            <div className="row">
              <div className="col-12 col-sm-12 col-md-8">
                <Typography className="text-white-50" variant="body2" color="textSecondary" component="div">
                { editPage === false ? 
                    note.split("\n").map((i, key)=>{
                      return <p key={key}>{i}</p>
                    }) :
                    <textarea
                      className={`form-control form-control-solid h-auto px-6`}
                      name="note"
                      rows="10"
                      name="note"
                      {...formik.getFieldProps("note")} 
                    />
                }
                </Typography>
                <div className="mt-10 row d-flex align-items-center flex-wrap">
                  <div className="col-4">
                    <Typography className="text-white-50" gutterBottom variant="subtitle1">
                      SECTEUR
                    </Typography>
                    <Typography className="text-white-50" variant="body2" color="textSecondary" component="p">
                      {editPage === false ? userData.field :
                        <input 
                          name="field"
                          {...formik.getFieldProps("field")} 
                        />
                      }
                    </Typography>
                  </div>
                  <div className="col-4">
                    <Typography className="text-white-50" gutterBottom variant="subtitle1">
                      SPECIALITE
                    </Typography>
                    <Typography className="text-white-50" variant="body2" color="textSecondary" component="p">
                      {editPage === false ? userData.industry :
                      <input 
                        name="industry"
                        {...formik.getFieldProps("industry")} 
                      />}
                    </Typography>
                  </div>
                  <div className="col-4">
                    <Typography className="text-white-50" gutterBottom variant="subtitle1">
                      PORTFOLIO
                    </Typography>
                    <Typography className="text-white-50" variant="body2" color="textSecondary" component="p">
                      {editPage === false ?
                        <Link className="text-white-50" to={{pathname: `http://${userData.website}`}} target="_blank">{userData.website}</Link>
                        :
                        <input 
                          name="website"
                          {...formik.getFieldProps("website")} 
                        />
                      }                    
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-4">
                <div className="row pl-0 pl-md-20">
                  <div className="col-6 col-sm-8 col-md-12 mt-sm-20 mt-20 mt-md-0 d-flex justify-content-end">
                    <div>
                    <Typography className={classes.myFont} gutterBottom variant="subtitle1">
                      Coordonnées
                    </Typography>
                    <Typography className="text-white-50" gutterBottom variant="body2" color="textSecondary" component="p">
                      Tél. portable : <b className={classes.myFont}>{userData.phone}</b>
                    </Typography>
                    {userData.telephone !=="" && <Typography className="text-white-50" gutterBottom variant="body2" color="textSecondary" component="p">
                      Tél. bureau : <b className={classes.myFont}>{userData.telephone}</b>
                    </Typography>}
                    <Typography className="text-white-50" gutterBottom variant="body2" color="textSecondary" component="p">
                      E-mail : 
                      <Link
                        to='#'
                        onClick={(e) => {
                            window.location = `mailto:${userData.email}`;
                            e.preventDefault();
                        }}
                      >
                        <b className={classes.myFont}>{userData.email}</b>
                    </Link>
                    </Typography>
                    <Typography className="text-white-50" gutterBottom variant="body2" color="textSecondary" component="p">
                      État : <b className={classes.myFont}>{userData.state}</b>
                    </Typography>
                    </div>
                  </div>
                  <div className="col-6 col-sm-4 col-md-12 mt-15 text-right">
                    <div className="col-12 mb-5">
                      <Button
                      type="button"
                      className={classes.myButton} variant="contained" style={{backgroundColor: "#0766C0"}}>
                        Carte de visite
                      </Button>
                    </div>
                    <div className="col-12 mb-5">
                      <Button 
                      type="button"
                      className={classes.myButton} variant="contained" style={{backgroundColor: "#0758C0"}}>
                        Imprimer le profil
                      </Button>
                    </div>
                    <div className="col-12 mb-5">
                      <Button
                      type="button"
                      className={classes.myButton} variant="contained" style={{backgroundColor: "#073DC0"}}>
                        Envoyer le profil
                      </Button>
                    </div>
                    {!username && <div className="col-12 mb-5">
                      <Button
                      type="button"
                      onClick={()=>{
                        setEditPage(true)
                      }}className={classes.myButton} variant="contained" style={{backgroundColor: "#073DC0"}}>
                        Modifier votre profil
                      </Button>
                    </div>}
                  </div>
                </div>
              </div>
              {editPage && <div className="col-12 col-sm-12 col-md-12 d-flex justify-content-around">
                <Button type="button" className={classes.myButton} variant="contained" style={{backgroundColor: "#073DC0"}}>
                  Photo de profil
                </Button>
                <Button type="button" className={classes.myButton} variant="contained" style={{backgroundColor: "#073DC0"}}>
                  Photo de page
                </Button>
                <Button
                  id="btn_submit"
                  type="submit" 
                  className={classes.myButton} variant="contained" style={{backgroundColor: "#073DC0"}}>
                  Sauvegarder
                </Button>
              </div>}
            </div>
          </div>
        </form>
    </div>
  );
}
export default ProfileOverview;