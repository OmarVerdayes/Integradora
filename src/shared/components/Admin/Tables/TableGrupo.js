import React, { useState,useEffect } from 'react'
import { Table } from 'react-bootstrap';
import { FaRegEdit } from 'react-icons/fa';
import {Form_Group} from "../Forms/Form_Group";
import estilos from "../../../../utils/estilos.css"

export const TablesGrupos = () => {
    //Consumo Api
    const URL = `http://localhost:8080/api/group/`
    const [Grupo, setGrupo] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const [state, setState] = useState(false)
    const [id, setId] = useState(null)

    //Consultar grupos
    const consultarGrupos = async () => {
        await fetch(URL).then((response)=>{return response.json()})
            .then((data)=> {
                console.log(data.data);
                setGrupo(data.data)
            })
            .catch((error)=>{
                console.log(error.message)
            })
    }

    useEffect(()=>{
        consultarGrupos()
    }, [])

    return (
        <>
            <div className="container-fluid mt-3">
                <Table bordered hover style={{borderColor:"black"}}>
                    <thead style={styles.TableThead}>
                    <tr style={styles.TableCabecera}>
                        <th>Grado</th>
                        <th>Grupo</th>
                        <th>Carrera</th>
                        <th>Año</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody style={styles.Text}>
                    {Grupo.map((post)=>
                        (
                            <tr>
                                <td>{post.degree}</td>
                                <td>{post.letter}</td>
                                <td>{post.career.acronim}</td>
                                <td>{post.year}</td>
                                <td>
                                    <FaRegEdit style={styles.Icon} onClick={()=>(setModalShow(true),setState(true),setId(post.id))} />
                                </td>
                            </tr>
                        )
                    )}
                    </tbody>
                </Table>
            </div>
            <a onClick={()=>(setModalShow(true))} className="btn-flotante">Registrar</a>
            <Form_Group
                show={modalShow}
                state={state}
                id = {id}
                onId = {()=>setId(null)}
                onHide={()=> (setModalShow(false))}
                onState={()=> (setState(false))}
                onGroup = {()=> (consultarGrupos())}
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