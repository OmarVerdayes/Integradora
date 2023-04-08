import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import {all} from "axios";


export const Form_Teacher = (props) => {

    const { onHide } = props
    const { Email, state, onState, onEmail} = props
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [name, setName] = useState(null)
    const [lastName, setLastName] = useState(null)

    const allData = () => {
        onHide()
        onEmail()
        setTimeout(() => {
            setPassword(null)
            setEmail(null)
            setName(null)
            setLastName(null)
        }, 500)
    }
    //Actualizar maestro
    if (state === true) {
        const URL = `http://localhost:8080/api/users/${Email}`
        fetch(URL).then((response) => { return response.json() })
            .then((data) => {
                console.log(data.data);
                setEmail(data.data.email)
                setName(data.data.name)
                setLastName(data.data.lastname)
                setPassword(data.data.password)
            })
            .catch((error) => {
                console.log(error.message)
            })
        onState()
    }


    const update = async () => {
        if (name !== null && email !== null) {
            await fetch(`http://localhost:8080/api/users/`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "email": `${email}`,
                    "name": `${name}`,
                    "lastname": `${lastName}`,
                    "password": `${password}`,
                    "role": 1,
                    "status": 1,
                }),
            })
                .then(async (response) =>
                    await response.json())
                .then((data) => {
                    console.log(data.error)
                })
                .catch((err) => {
                    console.log(err)
                });
        }
    }

    //agregar maestro
    const addTeacher = async () => {
        if (email !== null && password !== null && name !== null && lastName !== null) {
            await fetch(`http://localhost:8080/api/users/`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "email": `${email}`,
                    "name": `${name}`,
                    "lastname": `${lastName}`,
                    "password": `${password}`,
                    "role": 1,
                    "status": 1,
                }),
            })
                .then(async (response) =>
                    await response.json())
                .then((data) => {
                    console.log(data.data)
                })
                .catch((err) => {
                    console.log(err)
                });
        }
    }

    //Validation
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    return (
        <div className="modal show" style={{ display: 'block', position: 'initial' }}>
            <Modal
                {...props}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    {Email !== null
                        ? <Modal.Title>Actualizar Docente</Modal.Title>
                        : <Modal.Title>Nuevo Docente</Modal.Title>
                    }
                </Modal.Header>

                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>

                        <Form.Group className="mb-2" controlId="Name">
                            <Form.Label required type="text">Nombre:</Form.Label>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control required type="text" placeholder="Nombre" defaultValue={name} value={name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-2" controlId="Lastname">
                            <Form.Label>Apellidos:</Form.Label>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control required type="text" placeholder="Apellidos" defaultValue={lastName} value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-2" controlId="Email">
                            <Form.Label>Correo:</Form.Label>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control required type="email" placeholder="Correo" defaultValue={email} value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-2" controlId="Password">
                            <Form.Label>Contraseña:</Form.Label>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control required type="password" placeholder="Contraseña" defaultValue={password} value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Modal.Footer>
                            {Email === null
                                ? <Button variant="success" type='submit' onClick={() => addTeacher()}>Registrar</Button>
                                : <Button variant="success" type='submit' onClick={() => update()}>Actualizar</Button>
                            }
                            <Button variant="danger" onClick={()=>(allData())}>Cancelar</Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}
