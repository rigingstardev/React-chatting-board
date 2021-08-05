import React, { useEffect, useState } from "react";
import { Modal, InputGroup, FormControl } from 'react-bootstrap';
import MultiSelect from "react-multi-select-component";

export default function AddChannelModal({
    show,
    onHide,
    onAddChannel,
    users
}) {

    const [groupName, setGroupName] = useState("");
    const [selected, setSelected] = useState([]);
    const [options, setOptions] = useState([]);

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
        onAddChannel(groupName, selected.map(sel => sel.value));
        setGroupName("");
        setSelected([]);
    };


    return (
        <Modal
            show={show}
            onHide={onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Nom de groupe
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Veuillez saisir le nom du groupe</h4>
                <InputGroup className="mb-3">
                    {/* <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Grouper : </InputGroup.Text>
                    </InputGroup.Prepend> */}
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
                />
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-primary font-weight-bold" onClick={handleAdd}>Add</button>
                <button className="btn btn-primary font-weight-bold" onClick={onHide}>Close</button>
            </Modal.Footer>
        </Modal>
    );
}