import React, { useState,useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaRegEdit } from 'react-icons/fa';
import {Form_Carreer} from "../Forms/Form_Carreer";

export const TablesCarrera = () => {
    //Consumo Api
    const URL = `http://localhost:8080/api/career/`
    const [Carrera,setCarrera] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const [state, setState] = useState(false)
    const [id, setId] = useState(null)

    useEffect(()=>{
        fetch(URL).then((response)=>{return response.json()})
        .then((data)=> {
            console.log(data.data);
            setCarrera(data.data)
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
                    {Carrera.map((post)=>
                        (
                            <tr>
                                <td>{post.id}</td>
                                <td>{post.acronim}</td>
                                <td>{post.name}</td>
                                <td>
                                    <FaRegEdit style={styles.Icon} onClick={()=>(setModalShow(true),setState(true),setId(post.id))}/>
                                </td>
                            </tr>
                        )
                    )}
                    </tbody>
                </Table>
            </div>
            <a onClick={()=>(setModalShow(true))} className="btn-flotante">Registrar</a>
            <Form_Carreer
                show={modalShow}
                id={id}
                onIds={()=>setId(null)}
                state={state}
                onHide={()=> (setModalShow(false),setId(null),setState(false) )}
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