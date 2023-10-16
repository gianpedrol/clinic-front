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

const clients = [
  { id: 1, name: "Cliente 1", email: "cliente1@example.com" },
  { id: 2, name: "Cliente 2", email: "cliente2@example.com" },
  { id: 3, name: "Cliente 3", email: "cliente3@example.com" },
  // Adicione mais clientes conforme necessário
];

function Clients() {
  return (
    <>
      <Sidebar />

      <Container>
        <HeaderPages namePage={"Lista de clientes"} />
        <Button as={Link} to="/registrar/cliente" colorScheme="blue" mt={5}>
          Registrar Novo Cliente
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
                <Th>Nome do Cliente</Th>
                <Th>Email</Th>
              </Tr>
            </Thead>
            <Tbody>
              {clients.map((client) => (
                <Tr key={client.id}>
                  <Td>{client.id}</Td>
                  <Td>{client.name}</Td>
                  <Td>{client.email}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Container>
    </>
  );
}

export default Clients;
