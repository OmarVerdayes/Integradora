import {Card} from "react-bootstrap";
import {useEffect, useState} from "react";
import {URLSERVIS} from "../../plugins/Axios";
import {Loading} from "../Loading";
import {Link} from "react-router-dom";

export const Cards = ({users}) => {

    console.log(users)
    const [clase, setClase] = useState([]);

    useEffect(() => {
        const getSalon = async () => {
            const res1 = await URLSERVIS("clas/");
            setClase(res1.data.data)
        }
        getSalon();
    },[]);

    console.log(clase)
    if(!clase.length) return <Loading/>;

    return (
        <>
            <div>
                <div className="row">
                    {
                        clase.map((clases) => (
                            <>
                                {clases.emailTeacher === users.email
                                    &&
                                    <div className="col-sm-6 col-xl-3 mb-3">
                                        <Link to={`list/${clases.id}`} style={{textDecoration:"none"}}>
                                            <Card className="text-center" style={{borderRadius: 20}}>
                                                <Card.Body style={{height: '10rem'}} key={users.id}>
                                                    <div className="row">
                                                        <div className="col-10"></div>
                                                        <div className="col-2 d-grid gap-2 al">
                                                            <center>
                                                                {
                                                                    clases.status === 1 ? <div style={{
                                                                        borderColor: "black",
                                                                        height: "20px",
                                                                        width: "20px",
                                                                        borderRadius: 100,
                                                                        backgroundColor: "#255770"
                                                                    }}></div> : <div style={{
                                                                        borderColor: "black",
                                                                        height: "20px",
                                                                        width: "20px",
                                                                        borderRadius: 100,
                                                                        backgroundColor: "#B2B5AB"
                                                                    }}></div>
                                                                }
                                                            </center>
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                                <Card.Footer style={{
                                                    backgroundColor: "#109175",
                                                    color: "#fff",
                                                    borderBottomLeftRadius: 20,
                                                    borderBottomRightRadius: 20
                                                }}>
                                                    <div className="row">
                                                        <div className="col-12"
                                                             style={{fontFamily: "sans-serif", fontWeight: "bold"}}>
                                                            <p className="text-start" style={{fontSize: "20px"}}>
                                                                {clases.subject.acronim}
                                                                <br/>
                                                                {clases.group.degree}.-{clases.group.letter}
                                                            </p>
                                                            {clases.status === 1
                                                                ? <p className="text-end">status: Activo</p>
                                                                : <p className="text-end">status: Inactivo</p>
                                                            }
                                                        </div>
                                                    </div>
                                                </Card.Footer>
                                            </Card>
                                        </Link>
                                    </div>
                                }
                            </>
                        ))
                    }
                </div>
            </div>
        </>
    )
}