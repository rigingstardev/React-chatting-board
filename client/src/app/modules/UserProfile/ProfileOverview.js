import React, { useEffect, useState, useRef } from "react";
import { Card } from '../../../_metronic/_partials/controls/Card'
import { Button, CardActionArea,  CardContent, makeStyles, Typography } from "@material-ui/core";
import { toImageUrl } from "../../../_metronic/_helpers";
import {getUserByToken, getUserByName} from '../Auth/_redux/authCrud';
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
    name:Yup.string().required("email required"),
  });
  const formik = useFormik({
    validationSchema: EditionSchema,
    onSubmit: (values, { setStatus, setErrors, setSubmitting}) => {
      // setSubmitting(true);
      // enableLoading();
      console.log(values);
      let formData = new FormData();
      for (const key in values) {
        if (Object.hasOwnProperty.call(values, key)) {
          const value = values[key];
          formData.append(key, value)
        }
      }
      console.log(formData);
      // (formData)
      //   .then(({ data: { accessToken } }) => {
      //     props.history.push('/auth/login');
      //     // disableLoading();
      //     // setSubmitting(false);
      //   })
      //   .catch((err) => {
      //     // setSubmitting(false);
      //     // setErrors(err.response.data.errors);
      //     setStatus(
      //       intl.formatMessage({
      //         id: "AUTH.VALIDATION.INVALID_LOGIN",
      //       })
      //     );
      //     // disableLoading();
      //   });
    },
  });

  useEffect(()=>{
    getUser();
  }, []);
  return (
    <div className="row">
      <Card className={classes.card}>
        <form id="Update_Profile" onSubmit={formik.handleSubmit}>
        <div>    
          <img src={toImageUrl(encodeURIComponent(userData.photo))} className="w-100 px-5" />
          <div>
            <Typography className="text-white my-5" gutterBottom variant="h5" component="h2">
              {editPage === false ? 
                  userData.username : 
                  <input 
                    defaultValue={userData.username}
                    {...formik.getFieldProps("name")}
                  />
              }
            </Typography>
            <Typography className="text-white-50 mb-5" gutterBottom variant="subtitle1">
              {editPage === false ? 
                  userData.profession :
                  <input 
                    defaultValue={userData.profession}
                    {...formik.getFieldProps("profession")}
                  />
              }
            </Typography>
            <div className="row">
              <div className="col-12 col-sm-12 col-md-8">
                <Typography className="text-white-50" variant="body2" color="textSecondary" component="p">
                { editPage === false ? 
                    note.split("\n").map((i, key)=>{
                      return <p key={key}>{i}</p>
                    }) :
                    <textarea
                      className={`form-control form-control-solid h-auto px-6`}
                      name="note"
                      rows="10"
                      defaultValue={note}
                      {...formik.getFieldProps("note")}
                    />
                }
                </Typography>
                <div className="mt-10 d-flex align-items-center flex-wrap">
                  <div className="mr-5 mr-sm-15">
                    <Typography className="text-white-50" gutterBottom variant="subtitle1">
                      SECTEUR
                    </Typography>
                    <Typography className="text-white-50" variant="body2" color="textSecondary" component="p">
                      {editPage === false ? userData.field :
                        <input 
                          defaultValue={userData.field}
                          {...formik.getFieldProps("field")}
                        />
                      }
                    </Typography>
                  </div>
                  <div className="mr-5 mr-sm-15">
                    <Typography className="text-white-50" gutterBottom variant="subtitle1">
                      SPECIALITE
                    </Typography>
                    <Typography className="text-white-50" variant="body2" color="textSecondary" component="p">
                      {editPage === false ? userData.industry :
                      <input 
                        defaultValue={userData.industry}
                        {...formik.getFieldProps("industry")}
                      />}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-white-50" gutterBottom variant="subtitle1">
                      PORTFOLIO
                    </Typography>
                    <Typography className="text-white-50" variant="body2" color="textSecondary" component="p">
                      {editPage === false ?
                        <Link className="text-white-50" to={{pathname: `http://${userData.website}`}} target="_blank">{userData.website}</Link>
                        :
                        <input 
                          defaultValue={userData.website}
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
                      <Button className={classes.myButton} variant="contained" style={{backgroundColor: "#0766C0"}}>
                        Carte de visite
                      </Button>
                    </div>
                    <div className="col-12 mb-5">
                      <Button className={classes.myButton} variant="contained" style={{backgroundColor: "#0758C0"}}>
                        Imprimer le profil
                      </Button>
                    </div>
                    <div className="col-12 mb-5">
                      <Button className={classes.myButton} variant="contained" style={{backgroundColor: "#073DC0"}}>
                        Envoyer le profil
                      </Button>
                    </div>
                    {!username && <div className="col-12 mb-5">
                      <Button onClick={()=>{
                        setEditPage(true)
                      }}className={classes.myButton} variant="contained" style={{backgroundColor: "#073DC0"}}>
                        Modifier votre profil
                      </Button>
                    </div>
                    }
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-12 d-flex justify-content-around">
                    <Button className={classes.myButton} variant="contained" style={{backgroundColor: "#0766C0"}}>
                      Photo de profil
                    </Button>
                    <Button className={classes.myButton} variant="contained" style={{backgroundColor: "#0766C0"}}>
                      Photo de page
                    </Button>
                    <Button className={classes.myButton} variant="contained" style={{backgroundColor: "#0766C0"}}>
                      Sauvegarder
                    </Button>
              </div>
            </div>
          </div>
        </div>
        </form>
      </Card>
    </div>
  );
}
export default injectIntl(connect(null, auth.actions)(ProfileOverview));