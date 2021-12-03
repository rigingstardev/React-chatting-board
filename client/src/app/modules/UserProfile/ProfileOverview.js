import React, { useEffect, useState } from "react";
import { Card } from '../../../_metronic/_partials/controls/Card'
import { Button, CardActionArea,  CardContent, makeStyles, Typography } from "@material-ui/core";
import { toImageUrl } from "../../../_metronic/_helpers";
import {getUserByToken, getUserByName} from '../Auth/_redux/authCrud';
import {useParams, useLocation, Link} from 'react-router-dom';

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

export function ProfileOverview(props) {
  
  const [userData, setUserData] = useState([]);
  const [note, setNote] = useState('');
  const {username} = useParams();

  const getUser = async () => {
    console.log(username)
    if(!username){
      try{
        const {data} = await getUserByToken();
        setUserData(data);
        // console.log(data);
        setNote(data.note);
      }catch(error){
        console.log(error)
      }
    }else{
      try{
        const {data} = await getUserByName(username);
        setUserData(data);
        setNote(data.note);
        // console.log(data);
      }catch(error){
        console.log(error)
      }
    }
  }
  
  const classes = useStyles();

  useEffect(()=>{
    getUser();
  }, []);
  return (
    <div className="row">
      {/* <div className="col-lg-6">
        <ListsWidget14 className="card-stretch gutter-b"></ListsWidget14>
      </div>
      <div className="col-lg-6">
        <ListsWidget10 className="card-stretch gutter-b"></ListsWidget10>
      </div>
      <div className="col-lg-12">
        <AdvanceTablesWidget7 className="card-stretch gutter-b"></AdvanceTablesWidget7>
      </div> */}
      <Card className={classes.card}>
        <CardActionArea>
          {/* <CardMedia
            className={classes.media}
            image={`${toAbsoluteUrl(
              "/media/profile/profile.png"
            )}`}
            title="Contemplative Reptile"
          /> */}
          <img src={toImageUrl(encodeURIComponent(userData.photo))} className="w-100 px-5" />
          <CardContent>
            <Typography className="text-white my-5" gutterBottom variant="h5" component="h2">
              {/* Yacky Fall */}
              {userData.username}
            </Typography>
            <Typography className="text-white-50 mb-5" gutterBottom variant="subtitle1">
              {/* Expert comptable */}
              {userData.profession}
            </Typography>
            <div className="row">
              <div className="col-12 col-sm-12 col-md-8">
                <Typography className="text-white-50" variant="body2" color="textSecondary" component="p">
                  {note.split("\n").map((i, key)=>{
                      return <p key={key}>{i}</p>
                  })}
                </Typography>
                <div className="mt-10 d-flex align-items-center flex-wrap">
                  <div className="mr-5 mr-sm-15">
                    <Typography className="text-white-50" gutterBottom variant="subtitle1">
                      SECTEUR
                    </Typography>
                    <Typography className="text-white-50" variant="body2" color="textSecondary" component="p">
                      {/* Économie */}
                      {userData.field}
                    </Typography>
                  </div>
                  <div className="mr-5 mr-sm-15">
                    <Typography className="text-white-50" gutterBottom variant="subtitle1">
                      SPECIALITE
                    </Typography>
                    <Typography className="text-white-50" variant="body2" color="textSecondary" component="p">
                      {/* Finances */}
                      {userData.industry}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-white-50" gutterBottom variant="subtitle1">
                      PORTFOLIO
                    </Typography>
                    <Typography className="text-white-50" variant="body2" color="textSecondary" component="p">
                      {/* www.youtube.com */}
                      <Link className="text-white-50" to={{pathname: `http://${userData.website}`}} target="_blank">{userData.website}</Link>
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
                  <div className="col-12 col-sm-4 col-md-12 mt-15 text-right">
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
                      <Button className={classes.myButton} variant="contained" style={{backgroundColor: "#073DC0"}}>
                        Modifier votre profil
                      </Button>
                    </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </CardActionArea>
        {/* <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions> */}
      </Card>
    </div>
  );
}
