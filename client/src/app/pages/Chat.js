import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { shallowEqual, useSelector } from "react-redux";
import { Box, Avatar,  Divider, InputAdornment, Tooltip, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles, TextField, Typography, Input, IconButton} from "@material-ui/core";
import SVG from 'react-inlinesvg';
import AddIcon from '@material-ui/icons/Add';
import { toAbsoluteUrl, toImageUrl } from "../../_metronic/_helpers";
import { MessageList } from '../components/MessageList/MessageList';

import $ from 'jquery';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AddChannelModal from './AddChannelModal';
import UpdateChannelModal from './UpdateChannelModal';
import { CreateChannel, GetChannel, GetMessage, GetAllUsers, ReadDirectMessage, UpdateChannel } from './_redux/chatCrud';
import { WindowsNotify } from "../../helpers/WinNotify";
import { Badge } from 'react-bootstrap';

import Settings from '@material-ui/icons/Settings';

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
    height: 65,
    "& > .MuiInput-underline, & > .MuiInput-underline:after": {
      borderBottom: '1px solid #fff',
      padding: "2px 0"
    },
    "& input": {
      color: '#fff'
    }
  },
  listRoot: {
    cursor: 'pointer',
    "& .MuiListItem-root.MuiListItem-gutters": {
      marginTop: 1,
      backgroundColor: "#3F5060",
      paddingLeft:10,
    },
    "& .MuiListItem-root.MuiListItem-gutters.groups": {
      display: 'block',
    },
    "& .MuiTypography-root": {
      color: '#b6ceffbd',
    },
    "& .MuiListItemSecondaryAction-root": {
      color: '#112233cc'
    },
    "& .MuiAvatar-root": {
      width: 75,
      height: 75,
      marginRight: 5,
    },
  },
  color: {
    color: '#b6ceffbd',
  },
  plusUsersNumber: {
    width: 75,
    height: 75,
    borderRadius: '50%',
  },
  transBox:{
    width:'100%',
    height:'100%',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#112233",
    opacity:0.8,
    color:'white',
    '&:hover':{
      opacity:0,
    }
  },
  active: {
    borderLeft: "6px solid #eee",
  },
  settingsButton:{
    padding:"unset",
    color:"#b6ceffbd",
  }
}));
//////////////////////
const aaa = {
  results: [
    { name: 'aaa' },
    { name: 'abb' },
    { name: 'abc' },
    { name: 'ttt' },
    { name: 'ggg' },
    { name: 'fff' },
    { name: 'eee' },
    { name: 'ddd' },
    { name: 'ccc' },
    { name: 'ooo' },
    { name: 'kkk' },
  ],
};

function Chat(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { intl, socket } = props;
  const { user } = useSelector((state) => state.auth, shallowEqual);
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [notifyFlag, setNotifyFlag] = useState(false);
  const [addChannelModalShow, setModalShow] = useState(false);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [channels, setChannels] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const [messageType, setMessageType] = useState('private');
  const [messageData, setMessageData] = useState([]);
  const [update, setUpdate] = useState(0);
  const [groupSetting, setGroupSetting] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState([]);
  
  //////////////
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(
    aaa.results
  );
  const handleChange1 = e => {
    setSearchTerm(e.target.value);
  };
  // useEffect(() => {
  //   const results = aaa.results.filter(person =>
  //     person.name.toLowerCase().includes(searchTerm)
  //   );
  //   setSearchResults(results);
  // }, [searchTerm]);

  function handleChangetab(event, newValue) {
    setValue(newValue);
  }

  function search() {
    return users ? users.filter(person =>
      person.username.toLowerCase().includes(searchTerm)
    ) : [];
  }
  function search_channel() {
    return channels ? channels.filter(group =>
      group.name.toLowerCase().includes(searchTerm)
    ) : [];
  }
  function handleChangeIndex(index) {
    setValue(index);
  }

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const clear = () => {
    // setData(null);
    setSearchValue("");
  };

  const handleChange = async (e) => {
    const value = e.target.value;
    if (currentId && messageType === "private") {
      let currentUser = users.filter(user => user._id === currentId);
      if (currentUser.length) {
        if (currentUser[0].count > 0)
          await ReadDirectMessage(currentId);
      }
    }
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
    if (!currentId) {
      return alert('please select channel or user.');
    }
    if (message.trim() != "") {
      if (socket) {
        if (messageType === "private") {
          socket.emit("newDirectMessage", {
            toUser: currentId,
            message: message,
          });
        } else {
          socket.emit("newChannelMessage", {
            channelId: currentId,
            message: message,
          });
        }
      }
      // setMessageData(data);
      setMessage("");
    }
  }

  const adduser = () => {
    setModalShow(true);
  }

  const groupitem = async (id, type = "private") => {
    if (currentId === id) return;
    if (type === "private") {
      await ReadDirectMessage(id);
    }
    setCurrentId(id);
    setMessageType(type);
    await getMessage(id, type);
  }

  // useEffect(() => {
  //   let cur = channels.filter(channel => channel._id === currentGroup._id)[0];
  //   if (cur && cur.users) {
  //     setUsers(cur.users);
  //     setCurrentGroup(cur);
  //   }
  // }, [currentGroup._id, channels])

  const addChannelModalClose = async () => {
    await setUpdate(update + 1);
    setModalShow(false);
  }
  const groupSettingModalClose = async () => {
    await setUpdate(update + 1);
    setGroupSetting(false);
  }
  const addChannel = async (name, selUsers, avatar) => {
    console.log(avatar);
    try {
      await CreateChannel(name, selUsers, avatar);
      if (socket) {
        socket.emit("newChannel", { channelName: name });
      }
      addChannelModalClose();
    } catch (error) {
      console.error(error);
      // addChannelModalClose();
    }
  };

  const updateChannel = async (type, data) => {
    console.log(data);
    try{
      await UpdateChannel(type, data);
      getChannel();
      if(socket){
        socket.emit("updatedChannel", { channelName: data.name });
      }
      groupSettingModalClose();
    } catch (error) {
      console.log(error);
    }
  }


  const getChannel = async () => {
    try {
      const { data } = await GetChannel();
      setChannels(data);
      // return data;
    } catch (error) {
      console.error(error);
    }
  }

  const getAllUsers = async () => {
    try {
      const { data } = await GetAllUsers();
      setUsers(data);
      // return data;
    } catch (error) {
      console.error(error);
    }
  }

  const getMessage = async (id, type = "private") => {
    try {
      const { data } = await GetMessage(id, type);

      setMessageData(data.map((message) => {
        if (type === "private") {
          return ({
            position: user._id === message.message.from._id ? 'right' : 'left',
            type: 'text',
            focus: true,
            text: message.message.message.replace(/\n/g, "<br />"),
            date: new Date(message.message.createdAt),
            copiableDate: true,
            avatar: toImageUrl(message.message.from.avatar),
          });
        }
        return ({
          position: user._id === message.user._id ? 'right' : 'left',
          type: 'text',
          focus: true,
          text: message.message.message.replace(/\n/g, "<br />"),
          date: new Date(message.message.createdAt),
          copiableDate: true,
          avatar: toImageUrl(message.user.avatar),
        });
      }));

      getAllUsers();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    $(window).blur(function () {
      setNotifyFlag(true);
    });
    $(window).focus(function () {
      setNotifyFlag(false);
    });
    getChannel();
    getAllUsers();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.removeAllListeners("newChannel");

      socket.on("newChannel", ({ channel }) => {
        setChannels((prevChannels) => [...prevChannels, channel]);
      });
    }
  }, [socket, channels.length]);

  useEffect(() => {
    if (socket) {
      socket.removeAllListeners("newChannelMessage");
      socket.removeAllListeners("newDirectMessage");
      socket.on("newChannelMessage", (message) => {
        const data = [...messageData];
        if (message.type !== "System") {
          data.push(
            {
              position: user._id === message.user._id ? 'right' : 'left',
              type: 'text',
              focus: true,
              text: message.message.message.replace(/\n/g, "<br />"),
              date: new Date(message.message.createdAt),
              copiableDate: true,
              avatar: toImageUrl(message.user.avatar),
              status: 'new'
            },
          )
          if (notifyFlag) WindowsNotify(`New message arrived from ${message.user.username}`, message.message.message, 'chat', toImageUrl(message.user.avatar));
        }
        else {
          data.push(
            {
              type: 'system',
              text: message.message
            }
          )
        }
        setMessageData(data);
      });

      socket.on("newDirectMessage", (message) => {
        const data = [...messageData];
        getAllUsers()
        if (message.type !== "System") {
          if (message.message.from._id === currentId || message.message.to._id === currentId)
            data.push(
              {
                position: user._id === message.message.from._id ? 'right' : 'left',
                type: 'text',
                focus: true,
                text: message.message.message.replace(/\n/g, "<br />"),
                date: new Date(message.message.createdAt),
                copiableDate: true,
                avatar: toImageUrl(message.message.from.avatar),
                status: 'new'
              },
            )
          if (notifyFlag) WindowsNotify(`New message arrived from ${message.message.from.username}`, message.message.message, 'chat', toImageUrl(message.message.from.avatar));
        }
        else {
          data.push(
            {
              type: 'system',
              text: message.message
            }
          )
        }
        setMessageData(data);
      });
    }
  }, [socket, messageData.length, notifyFlag]);

  useEffect(() => {
    if (socket) {
      socket.on("checkOnlineUsers", () => {
        getAllUsers();
        getChannel();
      });
    }
  }, [socket])

  const isTabletDevice = useMediaQuery({
    query: "(min-width:645px)",
  });

  return (
    <div className="container-contact w-100">
      <div className="d-flex">
        {!isTabletDevice &&
          <div className="w-100" >
            <TextField
              className={"px-5 py-5 w-100 " + classes.search}
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
            {/* <Typography className={"px-10 " + classes.color} variant="subtitle1" >
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
                  <Tab label="MESSAGES" style={{ color: "#8ba2ca" }} />
                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                <TabContainer dir={theme.direction}>
                  <List className={classes.listRoot} style={{ overflowY: "auto" }} >
                    {users.map((user, i) => (
                      <ListItem key={i} className={clsx(user._id === currentId && classes.active)} onClick={() => groupitem(user._id)}>
                        <ListItemAvatar className="symbol symbol-circle">
                          <>
                            <Avatar className="symbol-label" alt={user.username} src={toImageUrl(user.avatar)} />
                            <i className={clsx("symbol-badge symbol-badge-bottom", { "bg-success": user.socketId, "bg-gray-700": !user.socketId })}></i>
                          </>
                        </ListItemAvatar>
                        <ListItemText
                          primary={user.username}
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
                          <Badge variant="success">{Boolean(user.count) && "+" + user.count}</Badge>
                          <span className="sr-only">unread messages</span>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </TabContainer>
                <TabContainer dir={theme.direction}>
                  <Typography className={"cursor-pointer px-10 mt-5 " + classes.color} onClick={adduser} variant="subtitle1"  >
                    GROUPES DE TRAVAIL <AddIcon fontSize="large"/>
                    <AddChannelModal
                      show={addChannelModalShow}
                      onHide={addChannelModalClose}
                      onAddChannel={addChannel}
                      users={users}
                    />
                    <UpdateChannelModal 
                      show={groupSetting}
                      onHide={() => {groupSettingModalClose()}}
                      onAddChannel={addChannel}
                      // users={selectedGroup.users}
                      // groupname={selectedGroup.groupname}
                      groupId = {selectedGroup}
                    />
                  </Typography>
                  <List className={classes.listRoot} style={{ overflowY: "auto", marginTop: "10px" }}>
                    {channels.map((group, i) => {
                      return (<ListItem className={clsx("groups cursor-pointer", group._id === currentId && classes.active)} key={i} onClick={() => groupitem(group._id, "channel")}>
                        <Box display="flex" justifyContent="space-between">                        
                          <Typography variant="subtitle1" >
                            {group.name}
                          </Typography>
                          <IconButton 
                            className={classes.settingsButton}
                            onClick={()=>{
                              setGroupSetting(!groupSetting);
                              console.log(group.users);
                              // setSelectedGroup({users:group.users, groupname:group.name});
                              setSelectedGroup(i);
                            }}
                          >
                            <Settings />
                          </IconButton>
                        </Box>
                        <div className="group-users">
                          {!!(group.users && group.users.length) && group.users.map((user, j, gUsers) => {
                            if (gUsers.length >= 5) {
                              if (j < 4) {
                                return (
                                  <ListItemAvatar className="symbol symbol-circle" key={j}>
                                    <>
                                      <Avatar className="symbol-label" alt={user.username} src={toImageUrl(user.avatar)} />
                                      <i className={clsx("symbol-badge symbol-badge-bottom", { "bg-success": user.socketId, "bg-gray-700": !user.socketId })}></i>
                                    </>
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
                                <ListItemAvatar className="symbol symbol-circle" key={j}>
                                  <>
                                    <Avatar className="symbol-label" alt={user.username} src={toImageUrl(user.avatar)} />
                                    <i className={clsx("symbol-badge symbol-badge-bottom", { "bg-success": user.socketId, "bg-gray-700": !user.socketId })}></i>
                                  </>
                                </ListItemAvatar>
                              );
                            }
                          })}
                          {!(group.users && group.users.length) && (<ListItemAvatar>
                            <div className={classes.plusUsersNumber}> + {0}</div>
                          </ListItemAvatar>)}
                        </div>
                      </ListItem>)
                    })}
                  </List>
                </TabContainer>
                <TabContainer dir={theme.direction}>
                  <div className="chat-view">
                    {/* <div className="message-list-view" style={{ width: "100%" }}> */}
                    <MessageList
                      className='message-list'
                      lockable={true}
                      downButton={true}
                      toBottomHeight={'100%'}
                      dataSource={messageData} />
                    {/* </div> */}
                    <div className="message-input d-flex align-items-center">
                    <SVG
                        className="w-30px text-white-50" 
                        style={{paddingLeft:"5px"}}
                        src={toAbsoluteUrl(
                          "/media/svg/icons/General/Attachment.svg"
                        )}
                      />
                      <textarea
                        className={`form-control form-control-solid h-auto px-6 bg-transparent border-0 text-white-50`}
                        name="name"
                        onChange={handleChange}
                        onKeyDown={keyPress}
                        placeholder="Tapez un nouveau message"
                        rows="3"
                        value={message}
                      />
                                    <SVG
                className="w-50px text-white-50 cursor-pointer"
                style={{paddingRight:"15px"}}
                src={toAbsoluteUrl(
                  "/media/svg/icons/General/Send Icon.svg"
                )}
                onClick={handleSend}
              />  
                    </div>
                  </div>
                </TabContainer>
              </SwipeableViews>
            </div>
          </div>}
        {isTabletDevice && <div style={{ width: 435, minWidth: 435, height: "calc(100vh - 180px)", borderBottom: "1px solid #4a5764" }}>
          <TextField
            className={"px-10 py-5 w-100 " + classes.search}
            id="input-with-icon-textfield"
            InputProps={{
              startAdornment: (

                <InputAdornment position="start" >
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
            placeholder="Search"
            value={searchTerm}
            onChange={handleChange1}
          />
          <Typography className={"px-10 m-0 " + classes.color} style={{ height: 25 }} variant="subtitle1" >
            CONVERSATIONS
          </Typography>
          {isTabletDevice && <List className={classes.listRoot} style={{ height: "calc((100% - 162px) / 2)", overflowY: "auto" }}>
            {search().map((user, i) => (
              <ListItem key={i} className={clsx(user._id === currentId && classes.active)} onClick={() => groupitem(user._id)}>
                <ListItemAvatar className="symbol symbol-circle">
                  <>
                    <Avatar className="symbol-label" alt={user.username} src={toImageUrl(user.avatar)} />
                    <i className={clsx("symbol-badge symbol-badge-bottom", { "bg-success": user.socketId, "bg-gray-700": !user.socketId })}></i>
                  </>
                </ListItemAvatar>
                <ListItemText
                  primary={user.username}
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
                  <Badge variant="danger" pill >{Boolean(user.count) && "+" + user.count}</Badge>
                  <span className="sr-only">unread messages</span>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>}
          {/* <ul>
                    {searchResults.map((item, i) => (
                      <li key={i} >{`${item.name}`}</li>
                    ))}
                  </ul> */}
          {isTabletDevice && <Divider light className="bg-white-o-60" style={{ marginTop: 35 }} />}
          {isTabletDevice && <Typography className={" cursor-pointer px-10 " + classes.color} variant="subtitle1" onClick={adduser} style={{ marginTop: 8, marginBottom: 7, height: 22 }} >
            GROUPES DE TRAVAIL <AddIcon fontSize="large" fontWeight={10}/>
            <AddChannelModal
              show={addChannelModalShow}
              onHide={() => {addChannelModalClose()}}
              onAddChannel={addChannel}
              users={users}
            />
          </Typography>}
          { isTabletDevice &&
              <UpdateChannelModal 
              show={groupSetting}
              onHide={() => {groupSettingModalClose()}}
              onUpdateChannel={updateChannel}
              // users={selectedGroup.users}
              // groupname = {selectedGroup.groupname}
              groupId = {selectedGroup}
            />
          }
            {isTabletDevice && <List className={classes.listRoot} style={{ height: "calc((100% - 162px) / 2)", overflowY: "auto", padding: "0" }}>
              {search_channel().map((group, i) => {
                return (<ListItem className={clsx("groups cursor-pointer", group._id === currentId && classes.active)} key={i} onClick={() => groupitem(group._id, "channel")}>
                  <Box display="flex" justifyContent="space-between" className="pb-1">
                    <Box display="flex">
                      {/* <Avatar className="symbol-label" alt={user.username} src={toImageUrl("avatar/1.png")} style={{alignItems:"center"}} /> */}
                      <Typography variant="subtitle1">
                        {group.name}
                      </Typography>
                    </Box>
                    <IconButton 
                      className={classes.settingsButton}
                      onClick={()=>{
                        setGroupSetting(!groupSetting);
                        // setSelectedGroup({users:group.users, groupname:group.name});
                        setSelectedGroup(i);
                      }}
                    >
                      <Settings />
                    </IconButton>
                  </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Box>
                      {!!(group.users && group.users.length) && group.users.map((user, j, gUsers) => {
                        if(j < 4)
                          return <ListItemAvatar className="symbol symbol-circle" key={j} >
                          <>
                            <Avatar className="symbol-label" alt={user.username} src={toImageUrl(user.avatar)} />
                            <i className={clsx("symbol-badge symbol-badge-bottom", { "bg-success": user.socketId, "bg-gray-700": !user.socketId })}></i>
                          </>
                        </ListItemAvatar>
                      })}
                      </Box>
                      {!!(group.users && group.users.length) && <ListItemAvatar>
                        <div className={classes.plusUsersNumber} style={{background:`url(${toImageUrl('avatar/')}${group.avatar})`, backgroundSize: 75}}>
                           <div className={classes.transBox}>
                           + {Math.max(group.users.length-4, 0)}
                           </div>
                        </div>
                      </ListItemAvatar>}
                    </Box>
                </ListItem>)
              })}
            </List>}
        </div>}
        {isTabletDevice && <div style={{ flex: 1 }}>
          <div className="chat-view">
            {/* <div className="message-list-view" style={{ width: "100%" }}> */}
            <MessageList
              className='message-list'
              lockable={true}
              downButton={true}
              toBottomHeight={'100%'}
              dataSource={messageData} />
            {/* </div> */}
            <div className="message-input d-flex align-items-center">
            <SVG
                        className="w-30px text-white-50" 
                        style={{paddingLeft:"5px"}}
                        src={toAbsoluteUrl(
                          "/media/svg/icons/General/Attachment.svg"
                        )}
                      />
              <textarea
                className={`form-control form-control-solid h-auto px-6 bg-transparent border-0 text-white-50`}
                name="name"
                onChange={handleChange}
                onKeyDown={keyPress}
                placeholder="Tapez un nouveau message"
                rows="3"
                value={message}
                style={{ fontSize: "1.1rem" }}
              />
              <SVG
                className="w-50px text-white-50 cursor-pointer"
                style={{paddingRight:"15px"}}
                src={toAbsoluteUrl(
                  "/media/svg/icons/General/Send Icon.svg"
                )}
                onClick={handleSend}
              />    
            </div>
          </div>
        </div>}
      </div>
    </div >
  );
}

export default Chat;
