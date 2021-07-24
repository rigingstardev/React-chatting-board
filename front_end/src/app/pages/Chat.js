import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import { Avatar, colors, Divider, InputAdornment, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles, TextField, Typography } from "@material-ui/core";
import SVG from 'react-inlinesvg';
import AddIcon from '@material-ui/icons/Add';
import { toAbsoluteUrl } from "../../_metronic/_helpers";
import Send from "@material-ui/icons/Send";
import AttachFile from "@material-ui/icons/AttachFile";

/*
  INTL (i18n) docs:
  https://github.com/formatjs/react-intl/blob/master/docs/Components.md#formattedmessage
*/

/*
  Formik+YUP:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
*/

const useStyles = makeStyles(theme => ({
  search: {
    "& > .MuiInput-underline": {
      borderBottom: '1px solid #e7eff780',
      padding: "2px 0"
    },
    "& input": {
      color: '#e7eff780'
    }
  },
  listRoot: {
    "& .MuiListItem-container, & .MuiListItem-root.MuiListItem-gutters": {
      marginTop: 1,
      backgroundColor: "#3F5060",
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
      width: 50,
      height: 50
    }
  },
  color: {
    color: '#b6ceffbd',
  },
  plusUsersNumber: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: "#112233",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#b6ceffbd'
  }
}));

const users = [
  {
    id: 1,
    avatar: '/media/users/100_1.jpg',
    name: 'Dona Jossart',
    subname: 'Volunteer USAID',
    date: '11:00',
  },
  {
    id: 2,
    avatar: '/media/users/100_2.jpg',
    name: 'Nadine Mila',
    subname: 'Volunteer USAID',
    date: '10:15',
  },
  {
    id: 3,
    avatar: '/media/users/100_3.jpg',
    name: 'Franck Jossart',
    subname: 'Volunteer USAID',
    date: '15 juillet 2021',
  },
  {
    id: 4,
    avatar: '/media/users/100_4.jpg',
    name: 'Bijou Maze',
    subname: 'Volunteer USAID',
    date: 'Volunteer USAID',
  },
];

const groups = [
  {
    id: 1,
    name: 'Project clean water for villages',
    users: [{
      id: 1,
      avatar: '/media/users/100_1.jpg',
      name: 'Dona Jossart',
      subname: 'Volunteer USAID',
      date: '11:00',
    },
    {
      id: 2,
      avatar: '/media/users/100_2.jpg',
      name: 'Nadine Mila',
      subname: 'Volunteer USAID',
      date: '10:15',
    },
    {
      id: 3,
      avatar: '/media/users/100_3.jpg',
      name: 'Franck Jossart',
      subname: 'Volunteer USAID',
      date: '15 juillet 2021',
    },
    {
      id: 4,
      avatar: '/media/users/100_4.jpg',
      name: 'Bijou Maze',
      subname: 'Volunteer USAID',
      date: 'Volunteer USAID',
    },
    {
      id: 5,
      avatar: '/media/users/100_5.jpg',
      name: 'Bijou Maze',
      subname: 'Volunteer USAID',
      date: 'Volunteer USAID',
    },
    {
      id: 6,
      avatar: '/media/users/100_6.jpg',
      name: 'Bijou Maze',
      subname: 'Volunteer USAID',
      date: 'Volunteer USAID',
    },
    {
      id: 7,
      avatar: '/media/users/100_7.jpg',
      name: 'Bijou Maze',
      subname: 'Volunteer USAID',
      date: 'Volunteer USAID',
    },
    ]
  },
  {
    id: 1,
    name: 'Project clean water for villages',
    users: [{
      id: 1,
      avatar: '/media/users/100_1.jpg',
      name: 'Dona Jossart',
      subname: 'Volunteer USAID',
      date: '11:00',
    },
    {
      id: 2,
      avatar: '/media/users/100_2.jpg',
      name: 'Nadine Mila',
      subname: 'Volunteer USAID',
      date: '10:15',
    },
    {
      id: 3,
      avatar: '/media/users/100_3.jpg',
      name: 'Franck Jossart',
      subname: 'Volunteer USAID',
      date: '15 juillet 2021',
    },
    {
      id: 4,
      avatar: '/media/users/100_4.jpg',
      name: 'Bijou Maze',
      subname: 'Volunteer USAID',
      date: 'Volunteer USAID',
    },
    {
      id: 5,
      avatar: '/media/users/100_5.jpg',
      name: 'Bijou Maze',
      subname: 'Volunteer USAID',
      date: 'Volunteer USAID',
    },
    {
      id: 6,
      avatar: '/media/users/100_6.jpg',
      name: 'Bijou Maze',
      subname: 'Volunteer USAID',
      date: 'Volunteer USAID',
    },
    {
      id: 7,
      avatar: '/media/users/100_7.jpg',
      name: 'Bijou Maze',
      subname: 'Volunteer USAID',
      date: 'Volunteer USAID',
    },
    {
      id: 8,
      avatar: '/media/users/100_8.jpg',
      name: 'Bijou Maze',
      subname: 'Volunteer USAID',
      date: 'Volunteer USAID',
    },
    ]
  },
  {
    id: 1,
    name: 'Project clean water for villages',
    users: [{
      id: 1,
      avatar: '/media/users/100_1.jpg',
      name: 'Dona Jossart',
      subname: 'Volunteer USAID',
      date: '11:00',
    },
    {
      id: 2,
      avatar: '/media/users/100_2.jpg',
      name: 'Nadine Mila',
      subname: 'Volunteer USAID',
      date: '10:15',
    },
    {
      id: 3,
      avatar: '/media/users/100_3.jpg',
      name: 'Franck Jossart',
      subname: 'Volunteer USAID',
      date: '15 juillet 2021',
    },
    {
      id: 4,
      avatar: '/media/users/100_4.jpg',
      name: 'Bijou Maze',
      subname: 'Volunteer USAID',
      date: 'Volunteer USAID',
    },
    {
      id: 5,
      avatar: '/media/users/100_5.jpg',
      name: 'Bijou Maze',
      subname: 'Volunteer USAID',
      date: 'Volunteer USAID',
    },
    {
      id: 6,
      avatar: '/media/users/100_6.jpg',
      name: 'Bijou Maze',
      subname: 'Volunteer USAID',
      date: 'Volunteer USAID',
    },
    {
      id: 7,
      avatar: '/media/users/100_7.jpg',
      name: 'Bijou Maze',
      subname: 'Volunteer USAID',
      date: 'Volunteer USAID',
    },
    ]
  },
]

function Chat(props) {
  const { intl } = props;
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");


  const handleSearchChange = (event) => {
    // setData(null);
    setSearchValue(event.target.value);

    // if (event.target.value.length > 2) {
    //   clearTimeout();

    //   setLoading(true);

    //   // simulate getting search result
    //   timeoutId = setTimeout(() => {
    //     setData(fakeData);
    //     setLoading(false);
    //   }, 500);
    // }
  };

  const clear = () => {
    // setData(null);
    setSearchValue("");
  };

  return (
    <div className="container-contact w-100">
      <div className="d-flex">
        <div style={{ width: 310 }}>
          <TextField
            className={"px-10 py-5 w-100 " + classes.search}
            id="input-with-icon-textfield"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <span className="svg-icon">
                    <SVG
                      src={toAbsoluteUrl(
                        "/media/svg/icons/General/Search.svg"
                      )}
                    />
                  </span>
                </InputAdornment>
              ),
            }}
          />
          <Typography className={"px-10 " + classes.color} variant="subtitle1" gutterBottom>
            CONVERSATIONS
          </Typography>
          <List className={classes.listRoot}>
            {users.map((users, i) => (
              <ListItem key={i}>
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={toAbsoluteUrl(users.avatar)} />
                </ListItemAvatar>
                <ListItemText
                  primary={users.name}
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        {users.subname}
                      </Typography>
                    </>
                  }
                />
                <ListItemSecondaryAction>
                  {users.date}
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          <Divider light className="bg-white-o-60 mt-10" />
          <Typography className={"px-10 mt-5 " + classes.color} variant="subtitle1" gutterBottom>
            GROUPES DE TRAVAIL <AddIcon />
          </Typography>
          <List className={classes.listRoot}>
            {groups.map((group, i) => {
              return (<ListItem className="groups" key={i}>
                <Typography variant="subtitle1" gutterBottom>
                  {group.name}
                </Typography>
                <div className="group-users">
                  {group.users.map((user, j, gUsers) => {
                    if (gUsers.length >= 5) {
                      if (j < 4) {
                        return (
                          <ListItemAvatar key={j}>
                            <Avatar alt="Remy Sharp" src={toAbsoluteUrl(user.avatar)} />
                          </ListItemAvatar>
                        );
                      } else if (j == 4) {
                        let number = gUsers.length - 4;
                        return (<ListItemAvatar key={j}>
                          <div className={classes.plusUsersNumber}> + {number}</div>
                        </ListItemAvatar>);
                      }
                      return "";
                    } else {
                      return (
                        <ListItemAvatar key={j}>
                          <Avatar alt="Remy Sharp" src={toAbsoluteUrl(user.avatar)} />
                        </ListItemAvatar>
                      );
                    }
                  })}
                </div>
              </ListItem>)
            })}
          </List>
        </div>
        <div style={{ flex: 1 }}>
          <div className="chat-view">
            <div className="message-list"></div>
            <div className="message-input d-flex align-items-center">
              <AttachFile className="w-50px text-white-50" />
              <textarea
                className={`form-control form-control-solid h-auto px-6 bg-transparent border-0 text-white-50`}
                name="name"
                placeholder="Here where the users can enter their conversations et varius mi. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed sit amet imperdiet quam.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. "
                rows="4"
              />
              <Send className="w-50px text-white-50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default injectIntl(connect(null, null)(Chat));
