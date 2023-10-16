import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
} from "@chakra-ui/react";
import Sidebar from "../../components/Navbar/Navbar";
import Container from "../../components/Container/Container";
import HeaderPages from "../../components/HeaderPage/HeaderPage";

const professionals = [
  { id: 1, name: "Profissional 1", email: "profissional1@example.com" },
  { id: 2, name: "Profissional 2", email: "profissional2@example.com" },
  { id: 3, name: "Profissional 3", email: "profissional3@example.com" },
  // Adicione mais profissionais conforme necessário
];

function Professionals() {
  return (
    <>
      <Sidebar />

      <Container>
        <HeaderPages namePage={"Lista de profissionais"} />
        <Button
          as={Link}
          to="/registrar/profissional"
          colorScheme="blue"
          mt={5}
        >
          Registrar Novo Profissional
        </Button>
        <Box
          m={{ md: "0px", sm: "50px" }}
          mt={{ md: "20px", sm: "0px" }}
          mb={{ md: "40px", sm: "20px" }}
          display={"flex"}
          alignItems={"center"}
          bgColor={"white"}
          maxWidth={"95%"}
          borderRadius={"15px"}
          boxShadow={"md"}
          justifyContent={"space-between"}
          p={8}
          overflowX="auto" // Adicionando overflow horizontal
        >
          <Table variant="simple" minW="100%">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Nome do Profissional</Th>
                <Th>Email</Th>
              </Tr>
            </Thead>
            <Tbody>
              {professionals.map((professional) => (
                <Tr key={professional.id}>
                  <Td>{professional.id}</Td>
                  <Td>{professional.name}</Td>
                  <Td>{professional.email}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Container>
    </>
  );
}

export default Professionals;
