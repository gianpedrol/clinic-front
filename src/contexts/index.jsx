import React from "react";

import { AuthProvider } from "./Auth";
import { AtendimentoProvider } from "./Atendimento";

export const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <AtendimentoProvider>{children}</AtendimentoProvider>
    </AuthProvider>
  );
};
