import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {URLSERVIS} from "../../../plugins/Axios";
import {Form, Navbar, Table} from "react-bootstrap";
import {Loading} from "../../Loading";
import Button from "react-bootstrap/Button";

export const TablaGetGroup = () => {
    const {id} = useParams()
    const [clas, setClas] = useState([]);
    const [student,setStudent] = useState([]);
    const [status, setStatus] = useState(false);
    const [teachers, setTeachers] = useState(null);
    const [teacher, setTeacher] = useState(null);

    useEffect(()=> {
        const getSalon = async () => {
            const res = await URLSERVIS(`clas/${id}`);
            setClas(res.data.data)
        };

        const getStudens = async () => {
            const res = await URLSERVIS(`student/`);
            setStudent(res.data.data)
        };

        const getTeacher = async () => {
            const res = await URLSERVIS(`users/`);
            setTeachers(res.data.data)
        }

        getSalon();
        getStudens();
        getTeacher();
    },[])

    const statusButtom = () => {
        if(status !== true) {
            setStatus(true)
        } else {
            setStatus(false)
            setTeacher("")
        }
    }

    const editTeacher = async () => {
        await fetch(`http://localhost:8080/api/clas/`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": `${clas.id}`,
                "status": `${clas.status}`,
                "group": {
                    "id": `${clas.group.id}`
                },
                "user":{
                    "email":`${teacher}`
                },
                "subject": {
                    "id": `${clas.subject.id}`
                }
            }),
        })
            .then(async (response) =>
                await response.json())
            .then((data) => {
                window.location.reload();
                console.log(data.error)
            })
            .catch((err) => {
                console.log(err)
            });
    }

    let numer = 1;

    if(!clas.group) return <Loading/>

    return(
        <>
            <div className="container-fluid mt-3">
                <div className="row">
                    <div className="col-12">
                        <Navbar variant="dark" style={{borderTopRightRadius:10, borderTopLeftRadius:10, backgroundColor:"#255770FF",borderColor:"black"}}>
                            <div className="container-fluid">
                                <Navbar.Brand>
                                    <div className="row">
                                        <div className="col-5">
                                            {
                                                status !== true
                                                    ? <Form.Control placeholder={"Mestro: "+clas.nameTeacher} value={teacher} onChange={(e)=> (setTeacher(e.target.value))} disabled />
                                                    :
                                                    <Form.Select  placeholder={"Mestro: "+clas.nameTeacher} value={teacher} onChange={(e)=> (setTeacher(e.target.value))}>
                                                        <option value={clas.gmailTeacher}>{clas.nameTeacher}</option>
                                                        {
                                                            teachers.map((teachers)=>(
                                                                <>
                                                                    {(teachers.role === 1 && teachers.status === 1 && teachers.email !== clas.emailTeacher)
                                                                        && <option value={teachers.email}>{teachers.name+" "+teachers.lastname}</option>
                                                                    }
                                                                </>
                                                            ))
                                                        }
                                                    </Form.Select>
                                            }
                                        </div>
                                        <div className="col-2">
                                            <Form.Control placeholder={"Materia: "+clas.subject.acronim} disabled />
                                        </div>
                                        <div className="col-2">
                                            <Form.Control placeholder={"Grado: "+clas.group.degree} disabled />
                                        </div>
                                        <div className="col-2">
                                            <Form.Control placeholder={"Grupo: "+clas.group.letter} disabled />
                                        </div>
                                    </div>
                                </Navbar.Brand>
                                <Navbar.Collapse className="justify-content-end">
                                    { status !== true
                                        ?
                                        <Button className={clas.status === 1 ? "btn btn-primary" : "btn btn-secondary"} onClick={()=>(statusButtom())} disabled={clas.status === 0}>Editar</Button>
                                        :
                                        <>
                                            <Button className="btn btn-danger" onClick={()=>(statusButtom())}>Cancelar</Button>
                                            <Button className="btn btn-success" onClick={()=> (editTeacher())}>Confirma</Button>
                                        </>
                                    }
                                </Navbar.Collapse>
                            </div>
                        </Navbar>
                    </div>
                </div>
                <div>
                    <div style={{height:"75vh"}}>
                        <div className="col-12 border border-1 border-dark" style={{overflowY: "scroll", overflowX:"hidden", height:"100%"}}>
                            <Table bordered hover style={{borderColor:"black"}}>
                                <thead style={{backgroundColor:"#476077",borderColor:"black",color:"white"}}>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre(s)</th>
                                    <th>Apellidos</th>
                                    <th>Matricula</th>
                                </tr>
                                </thead>
                                <tbody>
                                {student.map((student)=>(
                                    <>
                                        {(student.group.degree === clas.group.degree && student.group.letter === clas.group.letter)
                                            &&
                                            <tr key={student.id} style={{overflowY: "scroll", overflowX:"hidden", height:"100%"}}>
                                                <td>{numer++}</td>
                                                <td>{student.name}</td>
                                                <td>{student.lastname}</td>
                                                <td>{student.id}</td>
                                            </tr>
                                        }
                                    </>
                                ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}