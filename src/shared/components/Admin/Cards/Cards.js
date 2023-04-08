import React from "react";
import {Link} from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import {Col ,Row} from "react-bootstrap";
import { FaChalkboardTeacher} from 'react-icons/fa';
import { BsFillPersonFill} from 'react-icons/bs';
import {MdGroups} from 'react-icons/md'
import {ImBooks} from 'react-icons/im'
import {GiTeacher} from 'react-icons/gi'
import {HiOutlineBuildingOffice2} from 'react-icons/hi2'

export const Cards = () =>{
    return(    
            <Row xs="3" md="3" style={{margin:"20px 20px"}}>
                    <Link to="/loginAdm/Docentes"  style={{textDecoration:"none",color:"black"}}>
                        <Col style={{marginBlock:"10px"}}>
                            <Card style={{cursor:"pointer", borderColor:"black",borderRadius:"10px"}}>
                                <Card.Body style={{textAlign:"center"}}>  
                                    <FaChalkboardTeacher style={{height:"150px",width:"150px"}}></FaChalkboardTeacher>
                                </Card.Body>
                                <Card.Header style={{backgroundColor:"#109175", borderRadius:"0px 0px 10px 10px"}}>
                                    <Card.Title style={{color:"white", textAlign:"center"}}><h1>Docentes</h1></Card.Title>        
                                </Card.Header>
                            </Card>
                        </Col>
                    </Link>

                    <Link to="/loginAdm/Alumnos" style={{textDecoration:"none",color:"black"}}>
                        <Col style={{marginBlock:"10px"}}>
                            <Card style={{cursor:"pointer",borderColor:"black",borderRadius:"10px"}}>
                                <Card.Body style={{textAlign:"center"}}>  
                                    <BsFillPersonFill style={{height:"150px",width:"150px"}}></BsFillPersonFill>
                                </Card.Body>
                                <Card.Header style={{backgroundColor:"#109175", borderRadius:"0px 0px 10px 10px"}}>
                                    <Card.Title style={{color:"white", textAlign:"center"}}><h1>Alumnos</h1></Card.Title>        
                                </Card.Header>
                            </Card>
                        </Col>
                    </Link>

                    <Link to="/loginAdm/Clases" style={{textDecoration:"none",color:"black"}}>
                        <Col style={{marginBlock:"10px"}}>
                            <Card style={{cursor:"pointer",borderColor:"black",borderRadius:"10px"}}>
                                <Card.Body style={{textAlign:"center"}}>  
                                    <GiTeacher style={{height:"150px",width:"150px"}}></GiTeacher>
                                </Card.Body>
                                <Card.Header style={{backgroundColor:"#109175", borderRadius:"0px 0px 10px 10px"}}>
                                    <Card.Title style={{color:"white", textAlign:"center"}}><h1>Clases</h1></Card.Title>        
                                </Card.Header>
                            </Card>
                        </Col>                        
                    </Link>

                    <Link to="/loginAdm/Materias" style={{textDecoration:"none",color:"black"}}>
                        <Col style={{marginBlock:"10px"}}>
                            <Card style={{cursor:"pointer",borderColor:"black",borderRadius:"10px"}}>
                                <Card.Body style={{textAlign:"center"}}>  
                                    <ImBooks style={{height:"150px",width:"150px"}}></ImBooks>
                                </Card.Body>
                                <Card.Header style={{backgroundColor:"#109175", borderRadius:"0px 0px 10px 10px"}}>
                                    <Card.Title style={{color:"white", textAlign:"center"}}><h1>Materias</h1></Card.Title>        
                                </Card.Header>
                            </Card>
                        </Col>    
                    </Link>

                    
                    <Link to="/loginAdm/Grupos" style={{textDecoration:"none",color:"black"}}>
                        <Col style={{marginBlock:"10px"}}>
                            <Card style={{cursor:"pointer",borderColor:"black",borderRadius:"10px"}}>
                                <Card.Body style={{textAlign:"center"}}>  
                                    <MdGroups style={{height:"150px",width:"150px"}}></MdGroups>
                                </Card.Body>
                                <Card.Header style={{backgroundColor:"#109175", borderRadius:"0px 0px 10px 10px"}}>
                                    <Card.Title style={{color:"white", textAlign:"center"}}><h1>Grupos</h1></Card.Title>        
                                </Card.Header>
                            </Card>
                        </Col>    
                    </Link>
                    
                    <Link to="/loginAdm/Carreras" style={{textDecoration:"none",color:"black"}}>
                        <Col style={{marginBlock:"10px"}}>
                            <Card style={{cursor:"pointer",borderColor:"black",borderRadius:"10px"}}>
                                <Card.Body style={{textAlign:"center"}}>
                                    <HiOutlineBuildingOffice2 style={{height:"150px",width:"150px"}}></HiOutlineBuildingOffice2>
                                </Card.Body>
                                <Card.Header style={{backgroundColor:"#109175", borderRadius:"0px 0px 10px 10px"}}>
                                    <Card.Title style={{color:"white", textAlign:"center"}}><h1>Carreras</h1></Card.Title>        
                                </Card.Header>
                            </Card>
                        </Col>                        
                    </Link>
                    
            </Row>
    )
}