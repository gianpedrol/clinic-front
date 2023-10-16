import React, { useState } from "react";
import { Box, Input, Button, Checkbox } from "@chakra-ui/react";
import Sidebar from "../../components/Navbar/Navbar";
import Container from "../../components/Container/Container";
import HeaderPages from "../../components/HeaderPage/HeaderPage";
function RegistrarCliente() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCPF] = useState("");
  const [hasConvenio, setHasConvenio] = useState(false);
  const [convenioName, setConvenioName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const handleRegister = () => {
    // Aqui você pode enviar os dados do cliente para o seu servidor/API para registro.
    // Certifique-se de validar os dados antes de enviar.
  };

  return (
    <>
      <Sidebar />
      <Container>
        <HeaderPages namePage={"Registre um novo cliente"} />
        <Box
          m={{ md: "0px", sm: "50px" }}
          mt={{ md: "20px", sm: "0px" }}
          bgColor={"white"}
          maxWidth={"95%"}
          borderRadius={"15px"}
          boxShadow={"md"}
          p={8}
        >
          <Input
            placeholder="Nome do Cliente"
            value={name}
            onChange={(e) => setName(e.target.value)}
            mb={4}
          />
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            mb={4}
          />
          <Input
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCPF(e.target.value)}
            mb={4}
          />
          <Input
            placeholder="Número de WhatsApp"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            mb={4}
          />
          <Checkbox
            width={"100%"}
            isChecked={hasConvenio}
            onChange={(e) => setHasConvenio(e.target.checked)}
            mb={4}
          >
            Possui Convênio
          </Checkbox>
          {hasConvenio && (
            <Input
              placeholder="Nome do Convênio"
              value={convenioName}
              onChange={(e) => setConvenioName(e.target.value)}
              mb={4}
            />
          )}

          <Button colorScheme="blue" onClick={handleRegister}>
            Registrar
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default RegistrarCliente;
