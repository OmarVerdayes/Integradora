import React, {useEffect, useState} from 'react'
import {Form, Navbar} from 'react-bootstrap';
import {Card_class} from "../Cards/Card_Class";
import {Form_Class} from "../Forms/Form_Class";

export const TableClases = () => {
    //Consumo Api
    const URL = `http://localhost:8080/api/career/`
    const [Carrera,setCarrera] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const [year, setYear] = useState("0")
    const [career, setCareer] = useState("0")
    const [cuater, setCuater] = useState("0")
    const arreglo = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

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

    const reset = () => {
        setYear("0")
        setCareer("0")
        setCuater("0")
    }
    return (
        <>
            <div className="container-fluid mt-3">
                <div className="container-fluid border border-1 border-dark" style={{backgroundColor:"#255770FF", borderTopRightRadius:20, borderTopLeftRadius:20, color:"white", borderColor:"black"}}>
                    <Navbar>
                        <Navbar.Brand onClick={()=>(reset())}>
                            <div style={{color:"#fff"}}>
                                Restaurar Valores
                            </div>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                <Form noValidate>
                                    <div className="row">
                                        <div className="col-3">
                                            <Form.Select required aria-label="Default select example" value={year} onChange={(e)=>setYear(e.target.value)}>
                                                <option value="0">Año</option>
                                                <option value="2023">2023</option>
                                                <option value="2022">2022</option>
                                            </Form.Select>
                                        </div>
                                        <div className="col-4">
                                            <Form.Select required aria-label="Default select example" value={career} onChange={(e)=>setCareer(e.target.value)}>
                                                <option value="0">Carrera</option>
                                                {
                                                    Carrera.map((career)=> (
                                                        <option value={career.acronim}>{career.acronim}</option>
                                                    ))
                                                }
                                            </Form.Select>
                                        </div>
                                        <div className="col-5">
                                            <Form.Select required aria-label="Default select example" value={cuater} onChange={(e)=>setCuater(e.target.value)}>
                                                <option value="0">Cuatrimestre</option>
                                                {
                                                    arreglo.map((arreglo)=>(
                                                        <option value={arreglo}>{arreglo}</option>
                                                    ))
                                                }
                                            </Form.Select>
                                        </div>
                                    </div>
                                </Form>
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
                <div className="border border-1 border-dark" style={{borderColor:"black", backgroundColor:"#fff", borderBottomRightRadius:20, borderBottomLeftRadius:20, height:"75vh"}}>
                    <div style={{overflowY: "auto", overflowX:"hidden", height:"100%"}}>
                        <div style={{width:"100%", padding:"1%"}}>
                            <Card_class
                                year = {year}
                                career = {career}
                                cuater = {cuater}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <a onClick={()=>(setModalShow(true))} className="btn-flotante">Registrar</a>
            <Form_Class
                show={modalShow}
                onHide={()=> (setModalShow(false))}
                backdrop="static"
            />
        </>
    )
}
