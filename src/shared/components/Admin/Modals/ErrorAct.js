import {Modal} from "react-bootstrap";
import Equis from "../../../../assets/img/Equis.png";

export const ErrorAct = (props) => {

    setTimeout(()=>{
        props.onHide()
    },5000)

    return(
        <Modal
            {...props}
            centered
        >
            <Modal.Body>
                <div className="container-fluid">
                    <div className="text-center">
                        <h4 className="mt-3 mb-3">Error de actualización</h4>
                        <img className="mt-3 mb-3" src={Equis} style={{height:"200px",width:"200px"}}/>
                        <h3 className="btn-danger mt-5">Todavia tienes clases en curso</h3>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}