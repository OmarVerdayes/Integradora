import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "./components/docente/Login";
import {NotFount} from "./components/NotFount";
import {NavbarDocente} from "./components/docente/NavbarDocente";
import {NavbarAdmin} from "./components/Admin/Nav-Bar/NavbarAdmin";

export const Rutas = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="auth" element={<Login/>}/>
                <Route path="loginDte/*" element={<NavbarDocente/>}/>
                <Route path="loginAdm/*" element={<NavbarAdmin/>}/>
                <Route index element={<Login/>}/>
                <Route path="*" element={<NotFount/>}/>
            </Routes>
        </BrowserRouter>
    )
}