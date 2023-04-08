import {Card,Container} from "react-bootstrap";

export const NotFount = () => {
    return(
        <div className="container-fluid">
            <div className="row position-absolute top-50 start-50 translate-middle">
                <div className="col-12 text-center" style={{fontFamily:"cursive"}}>
                    <p style={{fontSize:"4cm"}}>404</p>
                    <p style={{fontSize:"1cm"}}>Ooops...</p>
                    <p style={{fontSize:"1cm"}}>page not found</p>
                </div>
            </div>
        </div>
    )
}