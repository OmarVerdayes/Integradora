import {Outlet, useNavigate, useParams} from "react-router-dom";
import {Form, Navbar, Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React, {useEffect, useState} from "react";
import {Loading} from "../Loading";
import {URLSERVIS} from "../../plugins/Axios";
import {MostrarQR} from "./MostrarQR";
import { useTimer } from 'react-timer-hook';

export const TableStudens = () => {

    const {id} = useParams();
    const navigation = useNavigate();
    const time = new Date();

    const { seconds, minutes, restart } = useTimer({ time, onExpire: () => console.warn('onExpire called')});
    const fecha = new Date();
    const [ano, setAno] = useState("");
    const [mes, setMes] = useState("");
    const [dia, setDia] = useState("");
    const [post, setPost] = useState([]);
    const [clases, setClases] = useState([]);
    const [studens, setStudens] = useState([]);
    const [asistens, setAsistens] = useState([])
    const [modalShow, setModalShow] = useState(false);
    const [state, setState] = useState(true);
    const [contador, setContador] = useState(null);
    const [updateAsis, setUpdateAsis] =useState([]);
    const [getQR, setGetQR] = useState([]);

    //Consulta el qr
    const getsQR = async () => {
        await fetch(`http://localhost:8080/api/qr/${post}`)
            .then((response) =>
                response.json())
            .then((data) => {
                setGetQR(data.data)
            }).catch((err) => {
                console.log(err)
            });
    }

    //Update status
    const updateQr = async () => {
        await fetch(`http://localhost:8080/api/qr/`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": `${getQR.id}`,
                "date": `${getQR.date}`,
                "status": 0,
                "clas": {
                    "id": `${getQR.idClas}`
                }
            }),
        })
            .then((response) =>
                response.json())
            .then((data) => {
                console.log(data.data)
            }).catch((err) => {
                console.log(err)
            });
    }

    useEffect(() => {

        fetch(`http://localhost:8080/api/clas/${id}`).then((res) => {
            return res.json();
        }).then((resp) => {
            if(Object.keys(resp).length===0) {
                alert("error");
            } else {
                setClases(resp.data);
            }
        })

        //Consultar
        const getStudens = async () => {
            const res1 = await URLSERVIS("student/");
            setStudens(res1.data.data)
        }

        const getAsistence = async () => {
            fetch(`http://localhost:8080/api/asistence/${id}`).then((res) => {
                return res.json();
            }).then((resp) => {
                setAsistens(resp.data)
            }).catch((err)=>{
                console.log(err)
            })
        }

        getAsistence()
        getStudens();
        setAno(fecha.getFullYear())
        setMes(fecha.getMonth())
        setDia(fecha.getDay())
    },  [1000]);


    //Consulta todas las asistencia
    const getAsistence = async () => {
        fetch(`http://localhost:8080/api/asistence/${id}`).then((res) => {
            return res.json();
        }).then((resp) => {
            setAsistens(resp.data)
        }).catch((err)=>{
            console.log(err)
        })
    }

    //Genera un nuevo qr
    const insert = async () => {
        await fetch(`http://localhost:8080/api/qr/`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "date": `${dia}-${mes}-${ano}`,
                "status": 1,
                "clas": {
                    "id": `${clases.id}`,
                    "group":{
                        "id":`${clases.group.id}`
                    }
                }
            }),
        })
            .then(async (response) =>
                await response.json())
            .then(async (data) => {
                await localStorage.setItem("status", data.data.id)
                setGetQR(data.data)
                setPost(data.data);
                getAsistence()
            }).catch((err) => {
                console.log(err)
            });
    }

    //Valida el tiempo
    const times = () => {
        const time = new Date();
        time.setSeconds(time.getSeconds() + 10);
        restart(time)
    }

    //Finaliza a todos los alumnos a un nuevo cuatrimestre
    const finalizarCuatri = async () => {
        await fetch(`http://localhost:8080/api/clas/`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": `${clases.id}`,
                "status": `0`,
                "group": {
                    "id": `${clases.group.id}`
                },
                "user":{
                    "email":`${clases.emailTeacher}`
                },
                "subject": {
                    "id": `${clases.subject.id}`
                }
            }),
        })
            .then(async (response) =>
                await response.json())
            .then((data) => {
                setTimeout(()=> {
                    navigation("/loginDte")
                },1000)
            })
            .catch((err) => {
                console.log(err)
            });
    }

    //Procentajes asistencias
    const asissPorcc = (id) => {
        let contador1 = 0;
        let contador2 = 0;
        for (let i = 0; i < asistens.length; i++) {
            if (asistens[i].student_id === id){
                contador1++
                if(asistens[i].status !== 0){
                    contador2++;
                }
            }
        }
        return ((contador2/contador1) * 100).toFixed(2)
    }

    if (minutes === 0 && seconds === 0){
        updateQr()
    }
    if(!clases.subject) return <Loading/>

    return(
        <>
            <div className="container-fluid mt-3">
                <div style={{backgroundColor:"#D9D9D9"}}>
                    <Navbar style={{backgroundColor:"#255770FF"}}>
                        <div className="container-fluid">
                            <Navbar.Brand style={{color:"#FFF"}}>{clases.subject.acronim}</Navbar.Brand>
                            <Navbar.Toggle/>
                            <Navbar.Collapse className="justify-content-end">
                                {
                                    !state
                                    &&
                                    <Button className="btn btn-secondary" disabled>{minutes}:{seconds}</Button>
                                }
                                {
                                    state
                                        ?
                                        <>
                                            { clases.status === 1
                                                ?<Button style={{backgroundColor:"#109175", borderColor:"#109175"}} onClick={() => (setModalShow(true),setState(false),insert(),times())}>Generar QR</Button>
                                                : <></>
                                            }
                                        </>
                                        : <Button style={{backgroundColor:"#109175", borderColor:"#109175"}} onClick={() => setModalShow(true)}>Mostrar QR</Button>
                                }
                            </Navbar.Collapse>
                        </div>
                        <MostrarQR
                            show={modalShow}
                            qrState={state}
                            clase={clases.group.degree}
                            onHide={() => (setModalShow(false))}
                            qrCan={()=> (setState(true),setModalShow(false),localStorage.clear())}
                            qr={post}
                            secs = {seconds}
                            mins = {minutes}
                        />
                    </Navbar>
                    <div className="container-fluid mb-3">
                        <div style={{overflowY: "hidden", overflowX:"auto", width:"100%"}}>
                            <Table bordered hober className="mt-3">
                                <thead style={{backgroundColor:"#255770FF",borderColor:"black",color:"white"}}>
                                <tr key={studens.id}>
                                    <th>Matricula</th>
                                    <th style={{width:"10%"}}>____Nombres_y_apellidos____</th>
                                    <th>Fecha</th>
                                    <th>Porcentaje</th>
                                </tr>
                                </thead>
                                <tbody style={{backgroundColor:"#FFF",borderColor:"black"}} className="mb-3">
                                {studens.map((studen) => (
                                    <>
                                        {((studen.group.degree === clases.group.degree) && (studen.group.letter === clases.group.letter))
                                            &&
                                            <tr key={studen.id}>
                                                <td>{studen.id}</td>
                                                <td>{`${studen.name} ${studen.lastname}`}</td>
                                                <td>
                                                    {asistens.map((asistens)=>(
                                                        <>
                                                            { (studen.id === asistens.student_id)
                                                                &&
                                                                <td>
                                                                    {
                                                                        clases.status === 1
                                                                            ?
                                                                            <input
                                                                                style={{fontSize:"20px",width:"20px",textAlign:"center",border:"hidden"}}
                                                                                type="text"
                                                                                className="form-control"
                                                                                defaultValue ={(asistens.status === 0 && "/")||(asistens.status === 1 && ".")||(asistens.status === 2 && "x")}
                                                                                className="text-center"
                                                                            />
                                                                            :
                                                                            <input
                                                                                style={{fontSize:"20px",width:"20px",textAlign:"center",border:"hidden"}}
                                                                                type="text"
                                                                                className="form-control"
                                                                                defaultValue ={(asistens.status === 0 && "/")||(asistens.status === 1 && ".")||(asistens.status === 2 && "x")}
                                                                                className="text-center"
                                                                                disabled
                                                                            />
                                                                    }
                                                                </td>
                                                            }
                                                        </>
                                                    ))}
                                                </td>
                                                <td>
                                                            <button className={80.0 <= asissPorcc(studen.id) ? "btn btn-secondary" : "btn btn-warning"} disabled>
                                                                {asissPorcc(studen.id)}%
                                                            </button>
                                                </td>
                                            </tr>
                                        }
                                    </>
                                ))
                                }
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
            {
                clases.status === 1
                    ?<a className="btn-flotante" onClick={()=> (finalizarCuatri())}>Finalizar Clase</a>
                    :<></>
            }
            <Outlet/>
        </>
    )
}
