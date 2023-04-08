import React from "react";
import {Routes, Route } from "react-router-dom";
import {NavbarDocente} from "./shared/components/docente/NavbarDocente";
import {Login} from "./shared/components/docente/Login";
import {NavbarAdmin} from "./shared/components/Admin/Nav-Bar/NavbarAdmin";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/loginDte" element={<NavbarDocente/>}/>
      <Route path="/loginAdm" element={<NavbarAdmin/>}/>
    </Routes>
  );
}

