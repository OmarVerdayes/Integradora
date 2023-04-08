import React, { useState,useEffect } from 'react'
import { Table } from 'react-bootstrap';
import { FaRegEdit } from 'react-icons/fa';
import {Form_Teacher} from "../Forms/Form_Teacher";
import {ErrorAct} from "../Modals/ErrorAct";

export const TablesDocentes=()=> {

    //Consumo Api
    const URL = `http://localhost:8080/api/users/`
    const [Docente,setDocente] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const [state, setState] = useState(false)
    const [Email, setEmail] = useState(null)
    const [valiClass, setValiClas] = useState([])
    const [statusUser, setStatusUser] = useState(false)
    const [modal, setModal] = useState(false)

    //actualizar
    const statusUsers = async (id,status,name,lastname,role,password) => {
        let validate = false
        for(let i=0; i<valiClass.length; i++){
            if(valiClass[i].emailTeacher === id && valiClass[i].status === 1){
                return validate = true, setModal(true);
            }
        }

        if (validate === false){
            fetch(`http://localhost:8080/api/users/`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "email": `${id}`,
                    "lastname": `${lastname}`,
                    "name": `${name}`,
                    "password": `${password}`,
                    "role": `${role}`,
                    "status": `${status === 1 ? 0 : 1}`,
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
            window.location.reload()
        }
    }

    useEffect(()=>{

        const docente = () => {
            fetch(URL).then((response)=>{return response.json()})
                .then((data)=> {
                    console.log(data.data);
                    setDocente(data.data)
                })
                .catch((error)=>{
                    console.log(error.message)
                })
        }
        docente()

        const clases = () => {
            fetch("http://localhost:8080/api/clas/").then((response)=>{return response.json()})
                .then((data)=> {
                    console.log(data.data);
                    setValiClas(data.data)
                })
                .catch((error)=>{
                    console.log(error.message)
                })
        }
        clases()
        docente()

    }, [])

  return (
    <>
        <div className="container-fluid mt-3">
            <Table bordered hover style={{borderColor:"black"}}>
                <thead style={styles.TableThead}>
                <tr style={styles.TableCabecera}>
                    <th>Nombres</th>
                    <th>Apellidos</th>
                    <th>Correo</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody style={styles.Text}>
                {Docente.map((post)=>
                    (
                        <>
                            {
                                post.role === 1
                                &&
                                <tr key={post.id}>
                                    <td>{post.name}</td>
                                    <td>{post.lastname}</td>
                                    <td>{post.email}</td>
                                    <td>
                                        <FaRegEdit style={styles.Icon} onClick={()=>(setModalShow(true),setState(true),setEmail(post.email))}/>
                                        {post.status === 1
                                            ? <button className="btn btn-success" onClick={()=>(statusUsers(post.email,post.status,post.name,post.lastname,post.role,post.password))}>Activo</button>
                                            : <button className="btn btn-danger" onClick={()=>(statusUsers(post.email,post.status,post.name,post.lastname,post.role,post.password))}>Inactivo</button>
                                        }
                                    </td>
                                </tr>
                            }
                        </>
                    )
                )}
                </tbody>
            </Table>
        </div>
        <a onClick={()=>(setModalShow(true))} className="btn-flotante">Registrar</a>
        <Form_Teacher
            show={modalShow}
            state={state}
            Email={Email}
            onEmail={()=>setEmail(null)}
            onHide={()=> (setModalShow(false),setEmail(null),setState(false))}
            onState={()=> (setState(false))}
            backdrop="static"
        />
        <ErrorAct
            show={modal}
            onHide={() => setModal(false)}
            backdrop="static"
        />
    </>
  )
}

const styles = {
    TableThead: {
        backgroundColor: "#255770",
        padding: "100px",
    },
    TableCabecera: {
        color: "white",
        fontSize: "15px",
        fontWeight: "SemiBold",
        fontfamily: "Inter",
        textAlign: "center",
    },
    Text: {
        fontfamily: "Inter",
        fontSize: "15px",
        fontWeight: "SemiBold",
        textAlign: "center",
    },
    Icon: { 
        height: "auto",
        width: "30px",
        marginRight: "10px",
    },
}