import React, { useState, useContext, useEffect } from "react";
import { addMinutes, format } from "date-fns";

import {
  Box,
  Input,
  Button,
  Select,
  Checkbox,
  HStack,
  Heading,
  Text,
  Stack,
} from "@chakra-ui/react";
import Sidebar from "../../components/Navbar/Navbar";
import Container from "../../components/Container/Container";
import HeaderPages from "../../components/HeaderPage/HeaderPage";
import { AtendimentoContext } from "../../contexts/Atendimento";

function RegistrarAtendimento() {
  const {
    listPacotesApi,
    listProcedimentosApi,
    detalhePacoteApi,
    detalheProcedimentoApi,
  } = useContext(AtendimentoContext);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [pacotes, setPacotes] = useState([]);
  const [procedimentos, setProcedimentos] = useState([]);
  const [selectedPacote, setSelectedPacote] = useState("");
  const [selectedProcedimento, setSelectedProcedimento] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");
  const [selectedProfessional, setSelectedProfessional] = useState("");
  const [pacoteProcedimentos, setPacoteProcedimentos] = useState("");
  const [valorTotal, setValorTotal] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [hasDiscount, setHasDiscount] = useState(false);
  const [discountInput, setDiscountInput] = useState("");
  const [procedimento, setProcedimento] = useState("");

  async function getPacotes() {
    const response = await listPacotesApi();
    setPacotes(response.data?.[0] || []);
  }

  async function infoPacote(id) {
    const response = await detalhePacoteApi(id);
    setPacoteProcedimentos(response.data?.[0]?.procedimentos);
    setValorTotal(response.data?.[0]?.valor);
    console.log(response.data?.[0]?.valor);
  }

  async function getProcedimentos() {
    const response = await listProcedimentosApi(); // Adicione o ID do pacote como argumento
    setProcedimentos(response.data?.[0] || []);
  }

  async function infoProcedimento(id) {
    const response = await detalheProcedimentoApi(id); // Adicione o ID do pacote como argumento
    setProcedimento(response.data?.[0] || []);
  }

  function handleChangeService(value) {
    setSelectedService(value);
    setSelectedPacote("");
    setValorTotal(null);
  }

  function handleChangeProcedimento(value) {
    setSelectedProcedimento(value);
    infoProcedimento(value);
  }

  function handleChangePacote(value) {
    setSelectedPacote(value);
    infoPacote(value);
  }

  function calculateEndTime(startTime, duration) {
    if (startTime && duration) {
      const [startHour, startMinute] = startTime.split(":");
      const durationMinutes = parseInt(duration);
      const totalMinutes =
        parseInt(startHour) * 60 + parseInt(startMinute) + durationMinutes;

      const endHour = Math.floor(totalMinutes / 60);
      const endMinute = totalMinutes % 60;

      return `${endHour.toString().padStart(2, "0")}:${endMinute
        .toString()
        .padStart(2, "0")}`;
    }
    return ""; // ou outra mensagem de erro, se desejado
  }

  function calculateTotalWithDiscount() {
    if (hasDiscount) {
      // Limite o desconto a no máximo 7%
      const maxDiscount = 7;

      if (discount > maxDiscount) {
        // Se o desconto for maior que 7%, defina-o para o valor máximo
        setDiscount(maxDiscount);
        return valorTotal - valorTotal * (maxDiscount / 100);
      } else {
        return valorTotal - valorTotal * (discount / 100);
      }
    } else {
      return valorTotal;
    }
  }

  useEffect(() => {
    if (selectedService === "pacote") {
      getPacotes();
    }
    if (selectedService === "avulso") {
      getProcedimentos();
    }
  }, [selectedService]);

  return (
    <>
      <Sidebar />
      <Container>
        <HeaderPages namePage={"Registre um novo atendimento"} />
        <Box
          m={{ md: "0px", sm: "50px" }}
          mt={{ md: "20px", sm: "0px" }}
          bgColor={"white"}
          maxWidth={"95%"}
          borderRadius={"15px"}
          boxShadow={"md"}
          p={8}
        >
          <HStack spacing={4}>
            <Select
              placeholder="Selecione o Paciente"
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)}
              mb={4}
            >
              <option value="Paciente 1">Paciente 1</option>
              <option value="Paciente 2">Paciente 2</option>
              <option value="Paciente 3">Paciente 3</option>
            </Select>
            <Select
              placeholder="Selecione o Tipo de Serviço"
              value={selectedService}
              onChange={(e) => handleChangeService(e.target.value)}
              mb={4}
            >
              <option value="avulso">Serviço Avulso</option>
              <option value="pacote">Pacote de Procedimentos</option>
            </Select>
          </HStack>
          {/* Selecionar Pacote */}
          {selectedService === "pacote" && (
            <Select
              placeholder="Selecione um Pacote"
              value={selectedPacote}
              onChange={(e) => handleChangePacote(e.target.value)}
              mb={4}
            >
              {pacotes.map((pacote) => (
                <option key={pacote.id} value={pacote.id}>
                  {pacote.pacote}
                </option>
              ))}
            </Select>
          )}
          {/* Agendar Data, Hora de Início, Hora de Término e Profissional */}
          {selectedService === "pacote" &&
            selectedPacote &&
            pacoteProcedimentos && (
              <>
                {pacoteProcedimentos?.map((procedimento) => (
                  <div key={procedimento.id}>
                    <h3>{procedimento.nome_procedimento}</h3>
                    <p>Descrição: {procedimento.descricao}</p>
                    <p>
                      Duração da sessão: {procedimento.duracao_sessao} minutos
                    </p>
                    <Stack
                      my={5}
                      direction={{ base: "column", md: "row" }} // Empilha em coluna para telas menores, alinha em linha para telas maiores
                      spacing={4}
                    >
                      <Input
                        type="date"
                        placeholder="Data"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                      />
                      <Input
                        type="time"
                        placeholder="Hora de Início"
                        value={selectedStartTime}
                        onChange={(e) => setSelectedStartTime(e.target.value)}
                      />
                      {selectedStartTime && (
                        <Input
                          type="time"
                          placeholder="Hora de Término"
                          value={calculateEndTime(
                            selectedStartTime,
                            procedimento.duracao_sessao
                          )}
                          readOnly
                        />
                      )}
                      <Select
                        placeholder="Selecione um Profissional"
                        value={selectedProfessional}
                        onChange={(e) =>
                          setSelectedProfessional(e.target.value)
                        }
                      >
                        {/* Adicione opções de profissionais aqui */}
                      </Select>
                    </Stack>
                  </div>
                ))}
              </>
            )}

          {selectedService === "avulso" && (
            <Select
              placeholder="Selecione um Procedimento"
              value={selectedProcedimento}
              onChange={(e) => handleChangeProcedimento(e.target.value)}
              mb={4}
            >
              {procedimentos.map((procedimento) => (
                <option key={procedimento.id} value={procedimento.id}>
                  {procedimento.nome_procedimento}
                </option>
              ))}
            </Select>
          )}
          {/* Agendar Data, Hora de Início, Hora de Término e Profissional */}
          {selectedService === "avulso" &&
            selectedProcedimento &&
            procedimento && (
              <>
                <div key={procedimento.id}>
                  <h3>{procedimento.nome_procedimento}</h3>
                  <p>Descrição: {procedimento.descricao}</p>
                  <p>
                    Duração da sessão: {procedimento.duracao_sessao} minutos
                  </p>
                  <Stack
                    my={5}
                    direction={{ base: "column", md: "row" }} // Empilha em coluna para telas menores, alinha em linha para telas maiores
                    spacing={4}
                  >
                    <Input
                      type="date"
                      placeholder="Data"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                    <Input
                      type="time"
                      placeholder="Hora de Início"
                      value={selectedStartTime}
                      onChange={(e) => setSelectedStartTime(e.target.value)}
                    />
                    {selectedStartTime && (
                      <Input
                        type="time"
                        placeholder="Hora de Término"
                        value={calculateEndTime(
                          selectedStartTime,
                          procedimento.duracao_sessao
                        )}
                        readOnly
                      />
                    )}
                    <Select
                      placeholder="Selecione um Profissional"
                      value={selectedProfessional}
                      onChange={(e) => setSelectedProfessional(e.target.value)}
                    >
                      {/* Adicione opções de profissionais aqui */}
                    </Select>
                  </Stack>
                </div>
              </>
            )}
          <Box my={5}>
            <HStack>
              <Checkbox
                isChecked={hasDiscount}
                onChange={(e) => setHasDiscount(e.target.checked)}
              >
                Aplicar Desconto
              </Checkbox>
            </HStack>
            {hasDiscount && (
              <Input
                my={2}
                display={"block"}
                width={"350px"}
                type="number"
                placeholder="Desconto (até 7%)"
                value={discountInput} // Use discountInput ao invés de discount aqui
                onChange={(e) => {
                  const inputValue = e.target.value;
                  // Remova caracteres não numéricos
                  const numericValue = inputValue.replace(/[^0-9.]/g, "");
                  // Limite o desconto a no máximo 7%
                  if (numericValue <= 7) {
                    setDiscountInput(numericValue); // Atualize o estado discountInput
                  }
                }}
                onBlur={() => {
                  // Certifique-se de que o valor seja uma porcentagem válida
                  const discountValue = parseFloat(discountInput); // Use discountInput ao invés de discount aqui
                  if (!isNaN(discountValue)) {
                    // Converte a porcentagem em um valor de desconto
                    setDiscount(discountValue); // Atualize o estado discount
                  } else {
                    // Se o valor não for válido, defina-o como 0
                    setDiscount(0); // Atualize o estado discount
                  }
                }}
                mb={4}
                isDisabled={discount > 7}
              />
            )}

            {discount > 7 && (
              <Text color="red" fontSize="sm">
                O desconto máximo permitido é 7%.
              </Text>
            )}
          </Box>
          {valorTotal !== "" && valorTotal !== null && (
            <Box my={5}>
              <Heading fontSize={"20px"}> Orçamento </Heading>
              <HStack spacing={4} my={2}>
                <Text>Valor Total:</Text>
                <Text fontWeight={"bold"} fontSize={"18px"}>
                  R$ {valorTotal.toFixed(2).replace(".", ",")}
                </Text>
              </HStack>
              {hasDiscount && (
                <>
                  <HStack spacing={4} my={2}>
                    <Text>Desconto:</Text>
                    <Text fontWeight={"bold"} fontSize={"18px"}>
                      - {discount.toFixed(0).replace(".", ",") + "%"}
                    </Text>
                  </HStack>
                  <HStack spacing={4} my={2}>
                    <Text>Valor Total com Desconto:</Text>
                    <Text fontWeight={"bold"} fontSize={"18px"}>
                      R${" "}
                      {(valorTotal - valorTotal * (discount / 100))
                        .toFixed(2)
                        .replace(".", ",")}
                    </Text>
                  </HStack>
                </>
              )}
            </Box>
          )}
          <Button colorScheme="blue">Registrar</Button>
        </Box>
      </Container>
    </>
  );
}

export default RegistrarAtendimento;
