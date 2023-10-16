import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/login";
import Dashboard from "./pages/Dashboard/dashboard";
import Clients from "./pages/Clientes/Clientes";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import RegistrarCliente from "./pages/Clientes/RegistrarCliente";
import Profissionais from "./pages/Profissionais/Profissionais";
import RegistrarProfissional from "./pages/Profissionais/RegistrarProfissionais";
import Atendimentos from "./pages/Atendimento/Atendimentos";
import RegistrarAtendimento from "./pages/Atendimento/RegistrarAtendimento";
function Router() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route exact path="/dashboard" element={<Dashboard />} />
      <Route path="/lista/clientes" element={<Clients />} />
      <Route path="/registrar/cliente" element={<RegistrarCliente />} />
      <Route path="/lista/profissionais" element={<Profissionais />} />
      <Route path="/lista/atendimentos" element={<Atendimentos />} />
      <Route path="/registrar/atendimento" element={<RegistrarAtendimento />} />
      <Route
        path="/registrar/profissional"
        element={<RegistrarProfissional />}
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Router;
