import React, {useEffect, useState} from "react";
import {Button, Form , Modal } from "react-bootstrap";
import {URLSERVIS} from "../../../plugins/Axios";


export const Form_Class = (props) =>{

    const [group, setGroup] = useState(null);
    const [materia, setMateria] = useState(null);
    const [profesor, setProfesor] = useState(null);
    const [docente, setDocente] = useState([])
    const [subject, setSubject] = useState([])
    const [grup, setGrup] = useState([])

    const allData = () => {
        props.onHide()
        setTimeout(() => {
            setProfesor(null)
            setMateria(null)
            setGroup(null)
        }, 500)
    }

    useEffect(()=> {
        const getDocente = async () => {
            const res = await URLSERVIS("users/")
            setDocente(res.data.data)
        }
        const getSubject = async () => {
            const res = await URLSERVIS("subject/")
            setSubject(res.data.data)
        }
        const getGrupos = async () => {
            const res = await URLSERVIS("group/")
            setGrup(res.data.data)
        }
        getGrupos()
        getDocente()
        getSubject()
    },[])

    const addClass = async () => {
        if(group !== null && materia !== null && profesor !== null){

            await fetch(`http://localhost:8080/api/clas/`,{
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "status":1,
                    "group": {
                        "id":`${group}`
                    },
                    "teacher": {
                        "email":`${profesor}`
                    }
                    ,
                    "subject":{
                        "id":`${materia}`
                    },

                }),
            })
                .then( async (response)=>
                    await response.json())
                .then((data)=>{
                    console.log()(data.data)
                })
                .catch((err)=> {
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

    return(
        <div className="modal show" style={{ display: 'block', position: 'initial' }}>
      <Modal
          {...props}
          aria-labelledby="contained-modal-title-vcenter"
          centered
      >
        <Modal.Header>
          <Modal.Title>Nuevo Registro Clase</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>

                <Form.Group className="mb-2" controlId="Name">
                    <Form.Label required type="text">Docente:</Form.Label>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Select required aria-label="Default select example" value={profesor} onChange={(e) => (setProfesor(e.target.value))}>
                        <option>Selecciona Docente</option>
                        {docente.map((docente)=>(
                            <>
                                {
                                    (docente.status === 1 && docente.role === 1)
                                    &&
                                    <option value={docente.email}>{docente.email}</option>
                                }
                            </>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-2" controlId="Lastname">
                    <Form.Label>Materia:</Form.Label>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Select required aria-label="Default select example"  value={materia} onChange={(e) => (setMateria(e.target.value))}>
                        <option>Selecciona Materia</option>
                        {subject.map((subject)=>(
                            <option value={subject.id}>{subject.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-2" controlId="Email">
                    <Form.Label>Grupo:</Form.Label>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Select required aria-label="Default select example" value={group} onChange={(e) => (setGroup(e.target.value))}>
                        <option>Selecciona Grupo</option>
                        {grup.map((grup)=>(
                            <option value={grup.id}>{grup.degree}-.{grup.letter} {grup.career.acronim}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Modal.Footer>
                    <Button variant="success" type='submit' onClick={()=> addClass()}>Registrar</Button>
                    <Button variant="danger" onClick={()=>(allData())}>Cancelar</Button>
                </Modal.Footer>
            </Form>
        </Modal.Body>
      </Modal>
    </div>
)}
