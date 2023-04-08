import React, {useEffect, useState} from "react";
import {Button, Form , Modal} from "react-bootstrap";
import {ErrorAct} from "../Modals/ErrorAct";
import swal from 'sweetalert';

export const Form_Group = (props) =>{

    const {onId,state,onState,id,onHide,onGroup} = props
    const fecha = new Date();

    const URL = `http://localhost:8080/api/career/`
    const[degree,setDegree] = useState(null);
    const[letter, setLetter] = useState(null);
    const[year, setYear] = useState(null);
    const[career, setCareer] = useState(null);
    const[careerGet, setCareerGet] = useState([]);
    const[groupGet, setGroupGet] = useState([]);
    const[groups, setGroups] = useState(false)

    //Validation
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true)
    };

    //consultar carreras
    const consultarCarrer = async () =>{
        await fetch(URL).then((response)=>{return response.json()})
            .then((data)=> {
                setCareerGet(data.data)
            })
            .catch((error)=>{
                console.log(error.message)
            })
    }

    //consultar group
    const consultarGroup = async () =>{
        fetch("http://localhost:8080/api/group/").then((response)=>{return response.json()})
            .then((data)=> {
                setGroupGet(data.data)
            })
            .catch((error)=>{
                console.log(error.message)
            })
        setYear(fecha.getFullYear())
    }

    const allData = () => {
        onHide()
        onId()
        setTimeout(() => {
            setDegree(null)
            setLetter(null)
            setYear(null)
            setCareer(null)
        }, 500)
    }

    // Actualizar Grupo
    if (state === true) {
        const URL = `http://localhost:8080/api/group/${id}`
        fetch(URL).then((response) => { return response.json() })
            .then((data) => {
                console.log(data.data);
                setDegree(data.data.degree)
                setLetter(data.data.letter)
                setYear(data.data.year)
                setCareer(data.data.career.id)
            })
            .catch((error) => {
                console.log(error.message)
            })
        onState()
    }

    //actualizar grupo
    const update = async () => {
        if (degree !== null && letter !== null && year !== null && career !== null) {
            await fetch(`http://localhost:8080/api/group/`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "id":`${id}`,
                    "degree": `${degree}`,
                    "letter": `${letter}`,
                    "year": `${year}`,
                    "career": {
                        "id": `${career}`,
                    }
                }),
            })
                .then(async (response) =>
                    await response.json())
                .then((data) => {
                    onHide()
                    allData()
                    swal({
                        title: "Actulización Exitoso",
                        text: "Grupo Actualizado",
                        icon: "success",
                        button: false,
                        timer: 3000
                    });
                    onGroup()
                    setTimeout(()=>{
                        window.location.reload()
                    },3000)
                })
                .catch((err) => {
                    console.log(err)
                });
        }
    }

    // Insertar Grupo 
    const addGroup = async () => {
        let validate = false;
        for (let i = 0; i < groupGet.length; i++) {
            console.log("pase  aqui 1")
            if(groupGet[i].degree === parseInt(degree) && groupGet[i].letter === letter && groupGet[i].career.id === parseInt(career) && groupGet[i].year === parseInt(year)){
                return(
                    validate = true,
                    onGroup(),
                        swal({
                            title: "Error de registro",
                            text: "Este grupo ya existe",
                            icon: "error",
                            button: false,
                            timer : 3000
                        })
                )
            }
        }

        if(degree !== null && letter !== null && year !== null && career !== null && validate !== true){
            console.log("pase  aqui 2")
            fetch(`http://localhost:8080/api/group/`,{
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "degree": `${degree}`,
                    "letter": `${letter}`,
                    "year": `${year}`,
                    "career": {
                        "id": `${career}`,
                    }
                }),
            })
                .then( async (response)=>
                    await response.json())
                .then((data)=>{
                    onHide()
                    swal({
                        title: "Registro Exitoso",
                        text: "Grupo registrado",
                        icon: "success",
                        button: false,
                        timer : 3000
                    });
                    onGroup()
                    setTimeout(()=>{
                        window.location.reload()
                    },3000)
                })
                .catch((err)=> {
                    console.log(err)
                });
        }
    }

    useEffect(()=>{
        consultarCarrer();
        consultarGroup();
    },[])


    return(
        <div className="modal show" style={{ display: 'block', position: 'initial' }}>
            <Modal
                {...props}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    {id !== null
                        ? <Modal.Title>Actualizar Grupo</Modal.Title>
                        : <Modal.Title>Nuevo Grupo</Modal.Title>
                    }
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>

                        <Form.Group className="mb-2" controlId="Name">
                            <Form.Label required type="text">Grado:</Form.Label>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control required type="text" placeholder="5" defaultValue={degree} value={degree} onChange={(e)=>setDegree(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-2" controlId="Lastname">
                            <Form.Label>Grupo:</Form.Label>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control required type="text" placeholder="B" defaultValue={letter} value={letter} onChange={(e)=>setLetter(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-2" controlId="Name">
                            <Form.Label required type="text">Carrera:</Form.Label>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Select aria-label="Default select example" defaultValue={career} value={career} onChange={(e)=>setCareer(e.target.value)}>
                                <option>Default select</option>
                                {careerGet.map((carrerMap)=>(
                                    <option value={carrerMap.id}>{carrerMap.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    { id === null
                        ? <Button variant="success" type='submit' onClick={() => addGroup()}>Registrar</Button>
                        : <Button variant="success" type='submit' onClick={() => update()}>Actualizar</Button>
                    }
                    <Button variant="danger" onClick={()=>(allData())}>Cancelar</Button>
                </Modal.Footer>
            </Modal>
            <ErrorAct
                show={groups}
                backdrop="static"
                onHide = {()=>(setGroups(false))}
            />
        </div>
    )
}
