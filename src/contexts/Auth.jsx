import api from "../services/api";
import { createContext, useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const toast = useToast();
  const [user, setUser] = useState();
  const [authenticated, setAuthenticated] = useState();

  useEffect(() => {
    const recoveredUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (recoveredUser && token) {
      setUser(JSON.parse(recoveredUser));
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post("auth/login", { email, password });
      console.log(response);

      if (response.status === 200) {
        const loggedUser = response.data.user;
        const token = response.data.token;

        localStorage.setItem("user", JSON.stringify(loggedUser));
        localStorage.setItem("token", token);

        setUser(loggedUser);

        if (loggedUser.role_id === 2) {
          window.location.pathname = `/dashboard/${loggedUser.name}`;
        }
        if (loggedUser.role_id === 1) {
          window.location.pathname = "/dashboard";
        }
        setAuthenticated(true);
        toast({
          title: "Usuário Logado!",
          description: "Aproveite nosso sistema.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });

        if (token) {
          window.onload = function () {
            authenticated = true;
          };
        }
      }
      return response;
    } catch (error) {
      JSON.stringify(error);
      console.log(error.data);
      toast({
        title: "Deu algo errado",
        status: "error",
        isClosable: true,
      });
      //window.location.pathname = "/";
      //return error;
    }
  };

  const logout = () => {
    console.log("logout");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.clear();
    api.defaults.headers.Authorization = null;
    setUser(null);
    setAuthenticated(false);
    window.location.pathname = "/";
  };

  return (
    <AuthContext.Provider
      value={{ user, authenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
