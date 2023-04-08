import {Modal} from "react-bootstrap";
import QRCode from "react-qr-code";
import React, {useState} from "react";

export const MostrarQR = (props) => {

    const {qr,secs,mins} = props


    //Destruye el codigo qr y no lo vuelve a consultar
    if(secs === 0 && mins === 0){
        props.qrCan()
    }

    //ELiminar las asistencias de ese qr
    const cancelarAsistencia = async () => {

    };



    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex justify-content-center align-items-center">
                    <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "35%", width: "35%" }}
                        value={`${qr.id}`}
                        viewBox={`0 0 256 256`}
                        level='M'
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Modal.Body>
                    <div className="text-center">
                        <div className="row">
                            <div className="col-2"/>
                            <div className="col-4">
                                <button className="btn btn-secondary" onClick={props.qrCan} disabled>{mins}:{secs}</button>
                            </div>
                            <div className="col-4">
                                <button className="btn btn-danger" onClick={props.qrCan}>Cancelar QR</button>
                            </div>
                            <div className="col-2"/>
                        </div>
                    </div>
                </Modal.Body>
            </Modal.Footer>
        </Modal>
    );
}