import React, { useState } from "react";
import { NumericFormat } from "react-number-format";
import {
  Box,
  Input,
  Button,
  Text,
  Checkbox,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import Sidebar from "../../components/Navbar/Navbar";
import Container from "../../components/Container/Container";
import HeaderPages from "../../components/HeaderPage/HeaderPage";

function RegistrarProfissional() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCPF] = useState("");
  const [hasConvenio, setHasConvenio] = useState(false);
  const [convenios, setConvenios] = useState([]);
  const [selectedConvenio, setSelectedConvenio] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [services, setServices] = useState([
    { id: 1, name: "Serviço 1" },
    { id: 2, name: "Serviço 2" },
    { id: 3, name: "Serviço 3" },
  ]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  const handleRegister = () => {
    // Valide se um serviço foi selecionado e outros campos obrigatórios.
    if (!name || !email || !cpf || !whatsapp) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    // Valide se os valores dos serviços estão vazios.
    const isServicesValid = selectedServices.every(
      (service) => service.value !== ""
    );
    if (!isServicesValid) {
      setIsInvalid(true);
      return;
    }

    // Aqui você pode enviar os dados do profissional para o seu servidor/API para registro.
    // Certifique-se de validar os dados antes de enviar.
  };

  const handleAddConvenio = () => {
    if (selectedConvenio) {
      setConvenios([...convenios, selectedConvenio]);
      setSelectedConvenio("");
    }
  };

  const handleRemoveConvenio = (convenioToRemove) => {
    setConvenios(convenios.filter((convenio) => convenio !== convenioToRemove));
  };

  const handleServiceSelect = (selected) => {
    if (selected !== "") {
      const serviceToAdd = services.find((s) => s.id === parseInt(selected));

      // Verifique se o serviço já foi selecionado
      const isServiceSelected = selectedServices.some(
        (service) => service.service.id === serviceToAdd.id
      );

      if (!isServiceSelected) {
        setSelectedServices((prevServices) => [
          ...prevServices,
          { service: serviceToAdd, value: "" },
        ]);
        setSelectedService(""); // Limpa a seleção atual no Select
      }
    }
  };

  const handleRemoveService = (index) => {
    setSelectedServices((prevServices) =>
      prevServices.filter((_, i) => i !== index)
    );
  };

  return (
    <>
      <Sidebar />
      <Container>
        <HeaderPages namePage={"Registre um novo profissional"} />
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
            placeholder="Nome do Profissional"
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
            Atende Convênio
          </Checkbox>
          {hasConvenio && (
            <>
              <Select
                placeholder="Selecione um convênio"
                value={selectedConvenio}
                onChange={(e) => {
                  setSelectedConvenio(e.target.value);
                }}
                mb={4}
              >
                <option value="Convenio 1">Convenio 1</option>
                <option value="Convenio 2">Convenio 2</option>
                <option value="Convenio 3">Convenio 3</option>
              </Select>
              {convenios.map((convenio) => (
                <div key={convenio}>
                  {convenio}
                  <Button
                    onClick={() => handleRemoveConvenio(convenio)}
                    colorScheme="red"
                  >
                    Remover
                  </Button>
                </div>
              ))}
            </>
          )}

          <Select
            value={selectedService}
            onChange={(e) => handleServiceSelect(e.target.value)}
            mb={4}
          >
            <option value="">Selecione um serviço</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </Select>
          {selectedServices.length > 0 && (
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>Serviço</Th>
                  <Th>Valor</Th>
                  <Th>Ações</Th>
                </Tr>
              </Thead>
              <Tbody>
                {selectedServices.map((service, index) => (
                  <Tr key={index}>
                    <Td>{service.service.name}</Td>
                    <Td>
                      <NumericFormat
                        value={service.value}
                        onValueChange={(values) => {
                          const updatedServices = [...selectedServices];
                          updatedServices[index].value = values.value;
                          setSelectedServices(updatedServices);
                        }}
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix={"R$"}
                        customInput={Input}
                      />
                    </Td>
                    <Td>
                      <Button
                        onClick={() => handleRemoveService(index)}
                        colorScheme="red"
                      >
                        Remover
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
          <Button colorScheme="blue" onClick={handleRegister} mt={5}>
            Registrar
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default RegistrarProfissional;
