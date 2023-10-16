import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

function PageNotFound() {
  const toast = useToast();
  const navigate = useNavigate();

  toast({
    title: "Página não encontrada",
    description: "A página que você está tentando acessar não existe.",
    status: "error",
    duration: 2000, // 5 segundos
    isClosable: true,
  });

  navigate("/dashboard");

  return <></>;
}

export default PageNotFound;
