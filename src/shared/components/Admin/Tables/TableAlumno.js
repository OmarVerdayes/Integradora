import React, { useEffect, useState } from 'react'
import { Table, Button } from 'react-bootstrap';
import { FaRegEdit } from 'react-icons/fa';
import {Form_Student} from "../Forms/Form_Student";
import {Loading} from "../../Loading";

export const TablesAlumno = () => {
    //Consumo APi
    const URL = `http://localhost:8080/api/student/`
    const [Alumno,setAlumno] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const [idStudends, setIdStudens] = useState(null)
    const [state, setState] = useState(false)

    useEffect(()=>{
        fetch(URL).then((response)=>{return response.json()})
        .then((data)=> {
            console.log(data.data);
            setAlumno(data.data)
        })
        .catch((error)=>{
            console.log(error.message)
        })
    }, [])

    return (
        <>
            <div className="container-fluid mt-3">
                <Table bordered hover style={{borderColor:"black"}}>
                    <thead style={styles.TableThead}>
                    <tr style={styles.TableCabecera}>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Matricula</th>
                        <th>Cuatrimestre</th>
                        <th>Grupos</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody style={styles.Text}>
                    {Alumno.map((post)=>{
                        return(
                            <tr key={post.id}>
                                <td>{post.name}</td>
                                <td>{post.lastname}</td>
                                <td>{post.id}</td>
                                <td>{post.group.degree}</td>
                                <td>{post.group.letter}</td>
                                <td>
                                    <FaRegEdit style={styles.Icon} onClick={()=>(setModalShow(true),setIdStudens(post.id),setState(true))}/>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </div>
            <a onClick={()=>(setModalShow(true),setIdStudens(null))} className="btn-flotante">Registrar</a>
            <Form_Student
                state={state}
                id={idStudends}
                onId = {()=>setIdStudens(null)}
                show={modalShow}
                onHide={()=> (setModalShow(false),setIdStudens(null),setState(false))}
                onState={()=> (setState(false))}
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