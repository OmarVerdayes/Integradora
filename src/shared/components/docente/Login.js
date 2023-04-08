import React, {useEffect, useState} from "react";
import LogoUtez from "../../../assets/img/LogoMiniUtez.jpg"
import {useNavigate} from "react-router-dom";
import toast from "bootstrap/js/src/toast";
import {Loading} from "../Loading";
import {AlertaSesion} from "./AlertaSesion";

export const Login = () => {

    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userLogin, setUserLogin] = useState([]);
    const [statePass, setStatePass] = useState(false);

    useEffect(()=> {
        if(sessionStorage.getItem('email')){
            if (sessionStorage.getItem('role') === "1"){
                navigate(-1)
            }
            if (sessionStorage.getItem('role') === "0"){
                navigate(-1)
            }
        }
    },[])
    const PreceedLogin = (e) => {
        e.preventDefault();
        /*
        valida el token
            if(validate()) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: {email} ,
                    password: {password}
                })
            };
            fetch('http://localhost:8000/api/users/', requestOptions)
                .then(response =>{
                    return response.json()
                })
                .then(result => console.log(result.data) );
            }
         */
        if(validate()) {
            console.log('proceed');
            fetch("http://localhost:8080/api/users/"+email).then((res) => {
                return res.json();
            }).then((resp) => {
                console.log(resp)
                setUserLogin(resp.data)
                console.log(userLogin)
                if (Object.keys(resp).length===0){
                    toast.error('Por favor de validar el usruario');
                } else {
                    if (resp.data.password === password && resp.data.status === 1) {
                        console.log(resp.data.role)
                        if (resp.data.role === 0) {
                            sessionStorage.setItem('email',email);
                            sessionStorage.setItem('role',resp.data.role);
                            navigate("/loginAdm");
                        } else {
                            sessionStorage.setItem('email',email);
                            sessionStorage.setItem('role',resp.data.role);
                            navigate("/loginDte");
                        }
                    } else {
                        setShow(true)
                        setTimeout(()=>{
                            setShow(false)
                        },2000)
                    }
                }
            }).catch((err) => {
                setShow(true)
                setTimeout(()=>{
                    setShow(false)
                },2000)
            });
        }

    }

    const handleChangeInput = (evento) => {
        //destructurin de los valores enviados por el metodo onchange de cada input
        const { name, value } = evento.target;
        let regex = new RegExp("^[a-zA-Z ]+$");

        if (regex.test(value)) {
            console.log(name, value);
            this.setState({
                //al elemento dentro de [] es una key de cada parametro dentro del
                //estado.
                [name]: value
            });
        } else {
            console.log("es numero");
        }
    }

    const statePassword = () => {
        if (statePass !== false) {
            setStatePass(false)
        } else {
            setStatePass(true)
        }
    }

    const validate = () => {
        let result = true;
        if (email === ' ' || email === null) {
            result = false;
        }
        if (password === ' ' || password === null) {
            result = false;
        }
        return result;
    }

    if(sessionStorage.getItem('email')) return <Loading/>
    return (
       <div className="container">
           <div className="row border border-2 position-absolute top-50 start-50 translate-middle" style={{height:"70%", width:"60%",borderRadius:3,backgroundColor:""}}>
               <div className="col-6 d-flex justify-content-center align-items-center">
                   <div className="col-8 abs-center">
                       <form className="row g-3 needs-validation" onSubmit={PreceedLogin}>
                           <div className="mb-3">
                               <h1>LOGIN</h1>
                           </div>
                           <div className="mb-3">
                               <label htmlFor="exampleInputEmail1" className="form-label">Correo electronico</label>
                               <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Ingresa E-MAIL" required/>
                           </div>
                           <div className="mb-3">
                               <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                               <div className=" input-group">
                                   <input type={ statePass === false ? "password" : "text"} className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Ingresa Contraseña" required/>
                                   <button className="btn border border-1" style={{backgroundColor:"white", borderLeft:"hidden"}} type="button" onClick={()=>(statePassword())}>{ statePass === false ?
                                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                           <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                           <path
                                               d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                       </svg>
                                       :
                                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" className="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                                           <path
                                               d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/>
                                           <path
                                               d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/>
                                       </svg>
                                   }
                                   </button>
                               </div>
                           </div>
                           <div className="d-grid gap-2 col-6 mx-auto">
                               <button type="submit" className="btn btn-" style={{color:"white", backgroundColor:"#109175FF", borderColor:"#109175FF"}} id="liveAlertBtn">Iniciar</button>
                           </div>
                       </form>
                   </div>
               </div>
               <div className="col-6" style={{backgroundColor:"#109175FF"}}>
                   <div className="d-flex justify-content-center align-items-center">
                       <img src={LogoUtez} className="mt-5" alt="LogoUtez" style={{width:200, height:200, borderRadius:"100%"}}/>
                   </div>
                   <div className="text-center">
                       <a style={{
                           color:"white",
                           fontSize: 90,
                           fontFamily: "serif"
                       }}>
                           SICAE
                       </a>
                   </div>
               </div>
               <AlertaSesion
                show = {show}
                onHide={()=>setShow(false)}
               />
           </div>
       </div>
    )
}