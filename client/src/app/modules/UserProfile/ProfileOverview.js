import React from "react";
import { AdvanceTablesWidget7, ListsWidget10, ListsWidget14 } from '../../../_metronic/_partials/widgets';
import { Card } from '../../../_metronic/_partials/controls/Card'
import { Button, CardActionArea, CardActions, CardContent, CardMedia, makeStyles, Typography } from "@material-ui/core";
import { toAbsoluteUrl } from "../../../_metronic/_helpers";

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
});

export function ProfileOverview() {
  const classes = useStyles();
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
          <img src={`${toAbsoluteUrl("/media/profile/profile.png")}`} className="w-100 px-5" />
          <CardContent>
            <Typography className="text-white my-5" gutterBottom variant="h5" component="h2">
              Yacky Fall
            </Typography>
            <Typography className="text-white-50 mb-5" gutterBottom variant="subtitle1">
              Expert comptable
            </Typography>
            <div className="row">
              <div className="col-12 col-sm-12 col-md-8">
                <Typography className="text-white-50" variant="body2" color="textSecondary" component="p">
                  Pulitzer Ce nter on Crisis Reporting – Fellow/Correspondent. Traveled across Congo for several weeks to report on election developments, and to raise awareness of the Congo conflict in US media.  Embedded with Moroccan, Pakistani and Uruguayan United Nations peacekeepers in Ituri, Lake Albert and South Kivu. Accredited with Ministry of Information and United Nations Mission in Congo (Summer 2006).
                  <br />
                  <br />
                  Stanford University - William C. and Barbara H. Edwards Media Fellow at the Hoover Institution (Fall 2005). United Press International - Columnist. Wrote a weekly column -- Eye on Africa -- an analysis of political developments on the continent with worldwide distribution (2004-2005).
                  <br />
                  <br />
                  Produced Congo’s Bloody Coltan, a documentary report on the relation between the Congo conflict and the scramble for mineral resources (Fall 2006). Aired on PBS’ Foreign Exchange with Fareed Zakaria. Guest appearances on BBC’s World News Update, PBS’ NewsHour with Jim Lehrer and Foreign Exchange with Fareed Zakaria, NPR’s Diane Rehm Show, Al Jazeera’s World News, VOA’s Washington Forum and Straight Talk Africa, and Radio Canada’s Dimanche Magazine
                  <br />
                  <br />
                </Typography>
                <div className="mt-10 d-flex align-items-center flex-wrap">
                  <div className="mr-5 mr-sm-15">
                    <Typography className="text-white-50" gutterBottom variant="subtitle1">
                      SECTEUR
                    </Typography>
                    <Typography className="text-white-50" variant="body2" color="textSecondary" component="p">
                      Économie
                    </Typography>
                  </div>
                  <div className="mr-5 mr-sm-15">
                    <Typography className="text-white-50" gutterBottom variant="subtitle1">
                      SPECIALITE
                    </Typography>
                    <Typography className="text-white-50" variant="body2" color="textSecondary" component="p">
                      Finances
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-white-50" gutterBottom variant="subtitle1">
                      PORTFOLIO
                    </Typography>
                    <Typography className="text-white-50" variant="body2" color="textSecondary" component="p">
                      www.youtube.com
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-4">
                <div className="row pl-0 pl-md-20">
                  <div className="col-12 col-sm-8 col-md-12 mt-sm-20 mt-20 mt-md-0">
                    <Typography className="text-white" gutterBottom variant="subtitle1">
                      Coordonnées
                    </Typography>
                    <Typography className="text-white-50" gutterBottom variant="body2" color="textSecondary" component="p">
                      Tél. portable : <b className="text-white">+ 243 455 8954</b>
                    </Typography>
                    <Typography className="text-white-50" gutterBottom variant="body2" color="textSecondary" component="p">
                      Tél. bureau : <b className="text-white">+ 240 762 2875</b>
                    </Typography>
                    <Typography className="text-white-50" gutterBottom variant="body2" color="textSecondary" component="p">
                      E-mail : <b className="text-white">example@email.com</b>
                    </Typography>
                    <Typography className="text-white-50" gutterBottom variant="body2" color="textSecondary" component="p">
                      État : <b className="text-white"> New York</b>
                    </Typography>
                  </div>
                  <div className="col-12 col-sm-4 col-md-12 mt-15 text-sm-left text-center">
                    <div className="col-12 mb-5">
                      <Button className="w-150px" variant="contained" color="secondary">
                        Carte de visite
                      </Button>
                    </div>
                    <div className="col-12 mb-5">
                      <Button className="w-150px" variant="contained" color="secondary">
                        Imprimer le profil
                      </Button>
                    </div>
                    <div className="col-12 mb-5">
                      <Button className="w-150px" variant="contained" color="secondary">
                        Envoyer le profil
                      </Button>
                    </div>
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
