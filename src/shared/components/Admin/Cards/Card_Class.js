import React, {useEffect, useState} from "react";
import {Col ,Row} from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import {Link} from "react-router-dom";

export const Card_class = (props) =>{

    const {year,career,cuater} = props
    const [status, setStaus] = useState()
    const URL = `http://localhost:8080/api/clas/`
    const [clas, setClas] = useState([])

    const flroes = {
        usuario: "viqui",
        contrasena: "123"
    }

    useEffect(()=> {
        fetch(URL).then((response)=>{return response.json()})
            .then((data)=> {
                console.log(data.data);
                setClas(data.data)
            })
            .catch((error)=>{
                console.log(error.message)
            })
    },[])

    console.log(clas)
    return(
        <div className="container-fluids">
            <div className="row">
                {clas.map((clases) => (
                    <>
                        {(parseInt(year) === 0 || parseInt(cuater) === 0 || career === "0")
                            ?
                            <div className="col-sm-6 col-xl-4 mb-3">
                                <Link to={`${clases.id}`} style={{textDecoration:"none"}}>
                                    <Card className="text-center" style={{borderRadius: 20, backgroundColor:"#87c8ba", borderColor:"black"}}>
                                        <Card.Body style={{height: '15rem'}} key={clases.id}>
                                            <div className="row text-start">
                                                <div className="col-6" style={{color:"black", fontWeight:"bold"}}>Correo</div>
                                                <div className="col-6" style={{color:"black", fontWeight:"bold"}}>Materia</div>
                                                <div className="col-6" style={{color:"black"}}>{clases.emailTeacher }</div>
                                                <div className="col-6" style={{color:"black"}}>{clases.subject.name}</div>
                                            </div>
                                            <div className="row text-start mt-3">
                                                <div className="col-6" style={{color:"black", fontWeight:"bold"}}>Grado</div>
                                                <div className="col-6" style={{color:"black", fontWeight:"bold"}}>Grupo</div>
                                                <div className="col-6" style={{color:"black"}}>{clases.group.degree}</div>
                                                <div className="col-6" style={{color:"black"}}>{clases.group.letter}</div>
                                            </div>
                                            <div className="row text-start mt-3">
                                                <div className="col-6" style={{color:"black", fontWeight:"bold"}}>Año</div>
                                                <div className="col-6" style={{color:"black", fontWeight:"bold"}}>Statatus</div>
                                                <div className="col-6" style={{color:"black"}}>{clases.group.year}</div>
                                                {
                                                    clases.status === 1
                                                        ? <div className="col-6" style={{color:"black"}}>Activo</div>
                                                        : <div className="col-6" style={{color:"black"}}>Inactivo</div>
                                                }
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </div>
                            :
                            <>
                                {((parseInt(year) === clases.group.year && parseInt(cuater) === clases.group.degree && career === clases.group.career.acronim))
                                    &&
                                    <div className="col-sm-6 col-xl-4 mt-4">
                                        <Link to={`${clases.id}`} style={{textDecoration:"none"}}>
                                            <Card className="text-center" style={{borderRadius: 20, backgroundColor:"#87c8ba", borderColor:"black"}}>
                                                <Card.Body style={{height: '15rem'}} key={clases.id}>
                                                    <div className="row text-start">
                                                        <div className="col-6" style={{color:"black", fontWeight:"bold"}}>Correo</div>
                                                        <div className="col-6" style={{color:"black", fontWeight:"bold"}}>Materia</div>
                                                        <div className="col-6" style={{color:"black"}}>{clases.emailTeacher }</div>
                                                        <div className="col-6" style={{color:"black"}}>{clases.group.career.acronim}</div>
                                                    </div>
                                                    <div className="row text-start mt-3">
                                                        <div className="col-6" style={{color:"black", fontWeight:"bold"}}>Grado</div>
                                                        <div className="col-6" style={{color:"black", fontWeight:"bold"}}>Grupo</div>
                                                        <div className="col-6" style={{color:"black"}}>{clases.group.degree}</div>
                                                        <div className="col-6" style={{color:"black"}}>{clases.group.letter}</div>
                                                    </div>
                                                    <div className="row text-start mt-3">
                                                        <div className="col-6" style={{color:"black", fontWeight:"bold"}}>Año</div>
                                                        <div className="col-6" style={{color:"black", fontWeight:"bold"}}>Statatus</div>
                                                        <div className="col-6" style={{color:"black"}}>{clases.group.year}</div>
                                                        {
                                                            clases.status === 1
                                                                ? <div className="col-6" style={{color:"black"}}>Activo</div>
                                                                : <div className="col-6" style={{color:"black"}}>Inactivo</div>
                                                        }
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Link>
                                    </div>
                                }
                            </>

                        }
                    </>
                ))}

            </div>
        </div>
    )
}