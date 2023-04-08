import Noe from "../../../assets/img/Noe.png"
import {Route, Routes, useNavigate} from "react-router-dom";
import {Cards} from "./Cards";
import {TableStudens} from "./TableStudens";
import React, {useEffect, useState} from "react";
import {ListGroup, Modal, Nav, Navbar, NavDropdown} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Loading} from "../Loading";

function MyVerticallyCenteredModal(props) {

    const navigation = useNavigate();

    const cerrar = () => {
        navigation("/")
        sessionStorage.clear()
    }

    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <h4 className="text-center">¿Quieres cerrar sesion?</h4>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} variant="danger">Cancelar</Button>
                <Button onClick={cerrar} variant="success">Aceptar</Button>
            </Modal.Footer>
        </Modal>
    );
}

export const NavbarDocente = ({userLogin}) => {
    console.log("============")
    console.log(userLogin)
    const navigation = useNavigate();
    const [modalShow, setModalShow] = useState(false);
    const [users,setUser] = useState([]);

    useEffect(() => {
        let email = sessionStorage.getItem('email');
        fetch("http://localhost:8080/api/users/"+email).then((res) => {
            return res.json();
        }).then((resp) => {
            if(Object.keys(resp).length===0) {
                alert("error");
            } else {
                if (!sessionStorage.getItem('email')){
                    navigation("/")
                }
                if(sessionStorage.getItem('role') === "0"){
                    navigation(-1)
                }
                setUser(resp.data);
            }
        })
    },[]);

    if (!sessionStorage.getItem('email') || sessionStorage.getItem('role') === "0") return <Loading/>
    return (
        <>
            <>
                <div className="container-fluid" style={{backgroundColor:"#109175"}}>
                    <Navbar>
                        <Navbar.Brand href="/loginDte" style={{color:"white"}}>SICAE</Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                            <Nav>
                                <NavDropdown
                                    align="end"
                                    title={users.email}
                                >
                                    <ListGroup variant="flush" style={{width:"400px"}}>
                                        <ListGroup.Item>
                                            <div className="d-flex justify-content-center align-items-center mb-3 mt-3">
                                                <img src={Noe} style={{height:"100px", width:"100px"}}/>
                                            </div>
                                            <div className="text-center mb-3 mt-3">
                                                <h5 className="mb-3 mt-3">{users.name} {users.lastname}</h5>
                                                <h5>{users.email}</h5>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center mb-3 mt-3">
                                                <Button variant="danger" onClick={() => setModalShow(true)}>
                                                    Cerrar Sesión
                                                </Button>

                                                <MyVerticallyCenteredModal
                                                    show={modalShow}
                                                    onHide={() => setModalShow(false)}
                                                />
                                            </div>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
                <Routes>
                    <Route index element={
                        <div className="border border-1 border-dark" style={{height:"90vh", padding:"1%"}}>
                            <div style={{overflowY: "auto", overflowX:"hidden", height:"100%"}}>
                                <Cards users={users}/>
                            </div>
                        </div>
                    }/>
                    <Route path="list/:id" element={<TableStudens/>}/>
                </Routes>
            </>
        </>
    )
}