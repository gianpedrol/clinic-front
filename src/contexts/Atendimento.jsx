import React, { useState } from "react";
import api from "../services/api";

export const AtendimentoContext = React.createContext({});

export const AtendimentoProvider = ({ children }) => {
  const listPacotesApi = async () => {
    const token = localStorage.getItem("token");
    const response = await api.get("/lista/pacotes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  };

  const listProcedimentosApi = async () => {
    const token = localStorage.getItem("token");
    const response = await api.get("/lista/procedimentos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  };

  const detalhePacoteApi = async (id) => {
    const token = localStorage.getItem("token");
    const response = await api.get(`detalhe/pacote/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  };

  const detalheProcedimentoApi = async (id) => {
    const token = localStorage.getItem("token");
    const response = await api.get(`detalhe/procedimento/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  };

  return (
    <AtendimentoContext.Provider
      value={{
        listPacotesApi,
        listProcedimentosApi,
        detalhePacoteApi,
        detalheProcedimentoApi,
      }}
    >
      {children}
    </AtendimentoContext.Provider>
  );
};
