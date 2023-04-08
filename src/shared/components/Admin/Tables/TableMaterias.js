import React, { useState,useEffect } from 'react'
import { Table, Button } from 'react-bootstrap';
import { FaRegEdit } from 'react-icons/fa';
import {Form_Subject} from "../Forms/Form_Subject";
import {Loading} from "../../Loading";

export const TablesMaterias = () => {
    //Consumo Api
    const URL = `http://localhost:8080/api/subject/`
    const [Materias,setMaterias] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const [idMateria, setIdMateria] = useState(null)
    const [state, setState] = useState(false)

    useEffect(()=>{
        fetch(URL).then((response)=>{return response.json()})
        .then((data)=> {
            console.log(data.data);
            setMaterias(data.data)
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
                        <th>#</th>
                        <th>Acronimo</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody style={styles.Text}>
                    {Materias.map((materia)=>(
                        <tr>
                            <td>{materia.id}</td>
                            <td>{materia.acronim}</td>
                            <td>{materia.name}</td>
                            <td>
                                <FaRegEdit style={styles.Icon} onClick={()=>(setModalShow(true),setIdMateria(materia.id),setState(true))}/>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
            <a onClick={()=>(setModalShow(true), setIdMateria(null))} className="btn-flotante">Registrar</a>
            <Form_Subject
                state={state}
                id={idMateria}
                show={modalShow}
                onHide={()=> (setModalShow(false), setIdMateria(null),setState(false))}
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