import React, { useState } from "react";
import { Button, Form, Modal} from "react-bootstrap";

export const Form_Carreer = (props) => {

    const { id, state, onState, onHide, onIds} = props
    //resgistrar materia
    const [acronim, setAcronim] = useState(null);
    const [name, setName] = useState(null);

    //
    const allData = () => {
        onHide()
        onIds()
        setTimeout(() => {
            setAcronim(null)
            setName(null)
        }, 500)
    }

    //Validete
    //Actualizar Carrera
    if (state === true) {
        const URL = `http://localhost:8080/api/career/${id}`
        fetch(URL).then((response) => { return response.json() })
            .then((data) => {
                setAcronim(data.data.acronim)
                setName(data.data.name)
            })
            .catch((error) => {
                console.log(error.message)
            })
        onState()
    }

    const update = async () => {
        if (name !== null && acronim !== null) {
            await fetch(`http://localhost:8080/api/career/`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "id":`${id}`,
                    "name": `${name}`,
                    "acronim": `${acronim}`
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

    //Insertar Carrera 
    const addCareer = async () => {
        if (name !== null && acronim !== null) {
            await fetch(`http://localhost:8080/api/career/`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "name": `${name}`,
                    "acronim": `${acronim}`
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
                    {id !== null
                        ? <Modal.Title>Actualizar Carrera</Modal.Title>
                        : <Modal.Title>Nuevo Carrera</Modal.Title>
                    }
                </Modal.Header>

                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>

                        <Form.Group className="mb-2" controlId="Name">
                            <Form.Label required type="text">Acronimo:</Form.Label>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control placeholder="BD"  defaultValue={acronim} value={acronim} onChange={(e) => setAcronim(e.target.value)}  required/>
                        </Form.Group>

                        <Form.Group className="mb-2" controlId="Lastname">
                            <Form.Label>Nombre:</Form.Label>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control required type="text" placeholder="Base de Datos" defaultValue={name} value={name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>

                        <Modal.Footer>
                            {id === null
                                ? <Button variant="success" type='submit' onClick={() => addCareer()}>Registrar</Button>
                                : <Button variant="success" type='submit' onClick={() => update()}>Actualizar</Button>
                            }
                            <Button variant="danger" onClick={() => (allData())}>Cancelar</Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}
