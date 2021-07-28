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
// import 'react-chat-elements-v2/dist/main.css';
import { MessageList } from '../components/MessageList/MessageList';
import $ from 'jquery';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
/*
  INTL (i18n) docs:
  https://github.com/formatjs/react-intl/blob/master/docs/Components.md#formattedmessage
*/

/*
  Formik+YUP:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
*/
function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}
TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};


const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
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
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [message, setMessage] = useState("");
  const [messageData, setMessageData] = useState(
    [
      {
        position: 'right',
        type: 'text',
        focus: false,
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
        date: new Date(),
        avatar: toAbsoluteUrl('/media/users/100_1.jpg'),
      },
      {
        position: 'left',
        type: 'text',
        focus: false,
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
        date: new Date(),
        avatar: toAbsoluteUrl('/media/users/100_1.jpg'),
      },
    ]
  );
  function handleChangetab(event, newValue) {
    setValue(newValue);
  }

  function handleChangeIndex(index) {
    setValue(index);
  }

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

  const handleChange = (e) => {
    const value = e.target.value;
    setMessage(value);
  }


  const keyPress = (e) => {
    if (e.keyCode == 13) {
      const value1 = e.target.value;
      setMessage(value1);

      if (e.shiftKey) {
        $('.form-control form-control-solid h-auto px-6 bg-transparent border-0 text-white-50').append("<br/>");
      } else {
        e.preventDefault();
        handleSend();
      }
      // put the login here
    }
  }

  const handleSend = () => {
    const data = [...messageData];
    if (message.trim() != "") {
      data.push(
        {
          position: 'right',
          type: 'text',
          focus: true,
          text: message.replace(/\n/g, "<br />"),
          date: new Date(),
          copiableDate: true,
          avatar: toAbsoluteUrl('/media/users/100_1.jpg'),
        },
      )
      setMessageData(data);
      setMessage("");
    }

  }
  const isTabletDevice = useMediaQuery({
    query: "(min-width:645px)",
  });
  return (

    <div className="container-contact w-100">
      <div className="d-flex">
        {!isTabletDevice &&
          <div style={{ width: "100%", margin: "10px" }}>
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
            {/* <Typography className={"px-10 " + classes.color} variant="subtitle1" gutterBottom>
              CONVERSATIONS
            </Typography> */}
            <div className={classes.color}>
              <AppBar position="static" color="default" style={{ backgroundColor: "#112233" }}>
                <Tabs
                  value={value}
                  onChange={handleChangetab}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                >
                  <Tab label="CONVERSATIONS" style={{ color: "#8ba2ca" }} />
                  <Tab label="GROUPES DE TRAVAIL" style={{ color: "#8ba2ca" }} />
                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                <TabContainer dir={theme.direction}>
                  <List className={classes.listRoot} style={{ overflowY: "auto" }}>
                    {users.map((user, i) => (
                      <ListItem key={i}>
                        <ListItemAvatar>
                          <Avatar alt="Remy Sharp" src={toAbsoluteUrl(user.avatar)} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={user.name}
                          secondary={
                            <>
                              <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                              >
                                {user.subname}
                              </Typography>
                            </>
                          }
                        />
                        <ListItemSecondaryAction>
                          {user.date}
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </TabContainer>
                <TabContainer dir={theme.direction}>
                  <List className={classes.listRoot} style={{ overflowY: "auto", marginTop: "-14px" }}>
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
                </TabContainer>
              </SwipeableViews>
            </div>


          </div>}
        {isTabletDevice && <div style={{ width: 310 }}>
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
          {isTabletDevice && <List className={classes.listRoot} style={{ height: "calc((100vh - 381px)/2)", overflowY: "auto" }}>
            {users.map((user, i) => (
              <ListItem key={i}>
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={toAbsoluteUrl(user.avatar)} />
                </ListItemAvatar>
                <ListItemText
                  primary={user.name}
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        {user.subname}
                      </Typography>
                    </>
                  }
                />
                <ListItemSecondaryAction>
                  {user.date}
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>}
          {isTabletDevice && <Divider light className="bg-white-o-60 mt-10" />}
          {isTabletDevice && <Typography className={"px-10 mt-5 " + classes.color} variant="subtitle1" gutterBottom>
            GROUPES DE TRAVAIL <AddIcon />
          </Typography>}
          {isTabletDevice && <List className={classes.listRoot} style={{ height: "calc((100vh - 381px)/2)", overflowY: "auto" }}>
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
          </List>}
        </div>}
        {isTabletDevice && <div style={{ flex: 1 }}>
          <div className="chat-view">
            <div className="message-list" style={{ width: "100%" }}>
              <MessageList
                className='message-list'
                lockable={true}
                downButton={true}
                toBottomHeight={'100%'}
                dataSource={messageData} />
            </div>
            <div className="message-input d-flex align-items-center">
              <AttachFile className="w-50px text-white-50" />
              <textarea
                className={`form-control form-control-solid h-auto px-6 bg-transparent border-0 text-white-50`}
                name="name"
                onChange={handleChange}
                onKeyDown={keyPress}
                placeholder="Here where the users can enter their conversations et varius mi. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed sit amet imperdiet quam.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. "
                rows="4"
                value={message}
              />
              <Send className="w-50px text-white-50 cursor-pointer" onClick={handleSend} />
            </div>
          </div>
        </div>}
      </div>
    </div >
  );
}

export default injectIntl(connect(null, null)(Chat));
