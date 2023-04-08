import React, {useEffect, useState} from "react";
import {Button, Form , Modal} from "react-bootstrap";


export const Form_Student = (props) =>{

    const {id,state,onState,onHide,onId} = props

    const URL = `http://localhost:8080/api/group/`
    const [lastName, setLastName] = useState(null)
    const [name, setName] = useState(null)
    const [password, setPassword] = useState(null)
    const [matricula, setMatricula] = useState(null)
    const [group, setGroup] = useState(null)
    const [groupGet, setGroupGet] = useState([])

    //Valirdar
    let regex = new RegExp("^[a-zA-Z ]+$");
    if (regex.test(name)){
        console.log(name)
    }

    //Quitar todoS
    const allData = () => {
        onHide()
        onId()
        setTimeout(() => {
            setName(null)
            setLastName(null)
            setPassword(null)
            setMatricula(null)
            setGroup(null)
        }, 500)
    }

    if (state === true){
        const URL = `http://localhost:8080/api/student/${id}`
        fetch(URL).then((response)=>{return response.json()})
            .then((data)=> {
                console.log(data.data);
                setName(data.data.name)
                setPassword(data.data.password)
                setGroup(data.data.group.id)
                setMatricula(data.data.id)
                setLastName(data.data.lastname)

            })
            .catch((error)=>{
                console.log(error.message)
            })
        onState()
    }

    const addStudent = async () => {
        if(lastName !== null && name !== null && group !== null && password !== null && matricula !== null){
            await fetch(`http://localhost:8080/api/student/`,{
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "id": `${matricula}`,
                    "name": `${name}`,
                    "lastname": `${lastName}`,
                    "password": `${password}`,
                    "group": {
                        "id": `${group}`,
                    }
                }),
            })
                .then( async (response)=>
                    await response.json())
                .then((data)=>{
                    console.log(data.data)
                })
                .catch((err)=> {
                    console.log(err)
                });
        }
    }

    const updateStudent = async () => {
        if(lastName !== null && name !== null && group !== null && password !== null && matricula !== null){
            await fetch(`http://localhost:8080/api/student/`,{
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "id": `${matricula}`,
                    "name": `${name}`,
                    "lastname": `${lastName}`,
                    "password": `${password}`,
                    "group": {
                        "id": `${group}`,
                    }
                }),
            })
                .then( async (response)=>
                    await response.json())
                .then((data)=>{
                    console.log(data.data)
                })
                .catch((err)=> {
                    console.log(err)
                });
        }
    }

    useEffect(()=>{
        fetch(URL).then((response)=>{return response.json()})
            .then((data)=> {
                console.log(data.data);
                setGroupGet(data.data)
            })
            .catch((error)=>{
                console.log(error.message)
            })
    },[])

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
        <Modal.Header >
            {id !== null
                ? <Modal.Title>Actualizar Alumno</Modal.Title>
                : <Modal.Title>Registro Alumno</Modal.Title>
            }
        </Modal.Header>

        <Modal.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>

                <Form.Group className="mb-2" controlId="Name">
                    <Form.Label required type="text">Nombre:</Form.Label>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control aria-valuetext required type="text" placeholder="Nombre" value={name} onChange={(e)=>setName(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-2" controlId="Lastname">
                    <Form.Label>Apellidos:</Form.Label>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control required type="text" placeholder="Apellidos" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-2" controlId="matricula">
                    <Form.Label>Matricula:</Form.Label>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    {id === null
                        ? <Form.Control required type="text" placeholder="Matricula" value={matricula} onChange={(e)=>setMatricula(e.target.value)}/>
                        : <Form.Control required type="text" placeholder="Matricula" value={matricula} onChange={(e)=>setMatricula(e.target.value)} disabled/>
                     }
                </Form.Group>

                <Form.Group className="mb-1" md="1" controlId="User">
                    <Form.Label>Grado, Grupo y Carrera:</Form.Label>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Select aria-label="Default select example" value={group} onChange={(e)=>setGroup(e.target.value)}>
                        <option>Selecsiona grado, grupo y carrera</option>
                        {groupGet.map((groupG)=>(
                            <option value={groupG.id}>{groupG.degree}-.{groupG.letter} {groupG.career.acronim}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-2" controlId="Password">
                    <Form.Label>Contraseña:</Form.Label>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control required type="password" placeholder="Contraseña" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </Form.Group>
                <Modal.Footer>
                    {id === null
                        ? <Button variant="success" type='submit' onClick={()=>addStudent()}>Registrar</Button>
                        : <Button variant="success" type='submit' onClick={()=>updateStudent()}>Actualizar</Button>
                    }
                    <Button variant="danger" onClick={()=>(allData())}>Cancelar</Button>
                </Modal.Footer>
            </Form>
        </Modal.Body>
      </Modal>
    </div>
)}
