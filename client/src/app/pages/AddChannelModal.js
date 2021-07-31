import React, { useState } from "react";
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap';

export default function AddChannelModal({
    show,
    onHide,
    onAddChannel
}) {

    const [groupName, setGroupName] = useState("");

    const handleChange = (ev) => {
        setGroupName(ev.target.value);
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
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Grouper : </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="Nom de groupe"
                        aria-label="Nom de groupe"
                        aria-describedby="basic-addon1"
                        onChange={handleChange}
                        value={groupName}
                    />
                </InputGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={() => { onAddChannel(groupName); setGroupName("") }}>Add</Button>
                <Button variant="danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}