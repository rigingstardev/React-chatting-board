import React, { useEffect, useState } from "react";
import { Modal, InputGroup, FormControl } from 'react-bootstrap';
import MultiSelect from "react-multi-select-component";
import { Select, MenuItem, IconButton, Box, Avatar, TextField, Popover, makeStyles} from "@material-ui/core";

import { toImageUrl } from "../../_metronic/_helpers";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
    avatarSelectButton:{
        width: '100%',
        border:'unset',
        border:'1px solid #cccccc',
    },
    avatarContainer:{
        width: 454,
        marginTop:10,
        padding:'10px',
        border:'1px solid #cccccc',
        display: 'flex',
        justifyContent:'space-between',
        flexWrap: 'wrap',
        '& button:hover':{
            border:'1px solid red',
        }
    },
    border:{
        border:'1px solid blue',
    },
    noborder:{
        border:'none',
    }
}));

export default function AddChannelModal({
    show,
    onHide,
    onAddChannel,
    users
}) {
    const classes = useStyles();
    const [groupName, setGroupName] = useState("");
    const [selected, setSelected] = useState([]);
    const [options, setOptions] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedAvatar, setSelectedAvatar] = useState([]);

    const openAvatarSelect = Boolean(anchorEl);
    const id = openAvatarSelect ? 'simple-popover' : undefined;

    const avatars = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '1.png', '2.png', '3.png', '4.png', '5.png', '6.png']
    useEffect(() => {
        setOptions(users.map(user => ({
            label: user.username,
            value: user._id
        })))
    }, [users]);

    const handleChange = (ev) => {
        setGroupName(ev.target.value);
    };
    const handleAdd = (ev) => {
        if (!groupName) return;
        onAddChannel(groupName, selected.map(sel => sel.value), selectedAvatar.avatarName);
        setGroupName("");
        setSelected([]);
        setSelectedAvatar([]);
    };
    const handleAvatarSelectOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleAavatarSelectClose = () => {
        setAnchorEl(null);
    };

    const handleSelectAvatar = (avatarName, id) =>{
        setSelectedAvatar({id:id, avatarName:avatarName});
        handleAavatarSelectClose();
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Créer un nouveau groupe de travail
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Veuillez saisir le nom du groupe</h4>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Nom de groupe"
                        aria-label="Nom de groupe"
                        aria-describedby="basic-addon1"
                        onChange={handleChange}
                        value={groupName}
                    />
                </InputGroup>
                <MultiSelect
                    options={options}
                    value={selected}
                    onChange={setSelected}
                    labelledBy="Select"
                    className="mb-5"
                />
                <h4>Choisissez l'image du groupe</h4>
                <IconButton className={classes.avatarSelectButton} onClick={handleAvatarSelectOpen}>AvatarSelect</IconButton>
                <Popover
                    id={id}
                    open={openAvatarSelect}
                    anchorEl={anchorEl}
                    onClose={handleAavatarSelectClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <Box className={classes.avatarContainer}>
                        {avatars.map((avatarName, i) => (
                            <IconButton key={i} className={clsx(selectedAvatar.id == i ? classes.border : classes.noborder)} onClick={()=>handleSelectAvatar(avatarName, i)}>
                                <Avatar src={`${toImageUrl('avatar/')}${avatarName}`}/>
                            </IconButton>
                        ))}
                    </Box>
                </Popover>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-primary font-weight-bold" onClick={handleAdd}>Annuler</button>
                <button className="btn btn-primary font-weight-bold" onClick={onHide}>Créer</button>
            </Modal.Footer>
        </Modal>
    );
}