
export const Loading = () => {
    return(
        <div className="container">
            <div className="row position-absolute top-50 start-50 translate-middle">
                <div className="col-4">
                    <div className="spinner-grow" role="status" style={{backgroundColor:"#1E3D74"}}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                <div className="col-4">
                    <div className="spinner-grow" role="status" style={{backgroundColor:"#1E3D74"}}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                <div className="col-4">
                    <div className="spinner-grow" role="status" style={{backgroundColor:"#1E3D74"}}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
    )
}