import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Equis from "../../../assets/img/Equis.png";

export const AlertaSesion = (props) => {

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className="container-fluid">
                    <div className="row">
                        <div className="text-center">
                            <img className="mt-3 mb-3" src={Equis} style={{height:"200px",width:"200px"}}/>
                            <h3>El correo o la contraseña son incorrectas</h3>
                            <Button className="btn-danger mt-5" onClick={props.onHide} style={{width:"300px", height:"50px"}}>Cerrar</Button>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}