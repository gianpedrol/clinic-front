import React, { useState } from "react";
import {
	Box,
	Flex,
	Heading,
	Text,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Input,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	Select,
	Checkbox,
} from "@chakra-ui/react";
import Sidebar from "../../components/Navbar/Navbar";
import Container from "../../components/Container/Container";
import HeaderPages from "../../components/HeaderPage/HeaderPage";

function Atendimento() {
	// Estados para o modal
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [formaPagamento, setFormaPagamento] = useState("dinheiro");
	const [parcelas, setParcelas] = useState(1);
	const [desconto, setDesconto] = useState(0);

	// Dados do atendimento (substitua pelos dados reais)
	const atendimento = {
		nomePaciente: "Nome do Paciente",
		dataNascimento: "01/01/1990",
		email: "paciente@email.com",
		whatsapp: "123-456-7890",
		servico: "Serviço X",
		profissional: "Dr. Profissional",
		valorServico: "R$ 100,00",
		dataServico: "01/02/2023",
		tempoRealizacao: "1 hora",
		servicoFinalizado: false, // Altere para true se o serviço estiver finalizado
	};

	// Função para finalizar o serviço e atualizar os dados
	const finalizarServico = () => {
		// Realize os cálculos com base nas informações e atualize os estados
		const valorSemDesconto = atendimento.valorServico;
		const valorComDesconto = valorSemDesconto - desconto;
		// Atualize os estados conforme os cálculos
		// ...
		setIsModalOpen(false); // Feche o modal
	};

	return (
		<>
			<Sidebar />
			<Container>
				<HeaderPages namePage={"Detalhes Atendimento"} />
				<Flex flexDirection="column">
					<Box
						m={{ md: "0px", sm: "50px" }}
						mt={{ md: "20px", sm: "0px" }}
						bgColor={"white"}
						maxWidth={"95%"}
						borderRadius={"15px"}
						boxShadow={"md"}
						p={8}
					>
						<Heading size="lg" mb={4}>
							Sobre o Paciente
						</Heading>
						<Text>
							<strong>Nome do Paciente:</strong> {atendimento.nomePaciente}
						</Text>
						<Text>
							<strong>Data de Nascimento:</strong> {atendimento.dataNascimento}
						</Text>
						<Text>
							<strong>E-mail:</strong> {atendimento.email}
						</Text>
						<Text>
							<strong>WhatsApp:</strong> {atendimento.whatsapp}
						</Text>
					</Box>
					<Box
						m={{ md: "0px", sm: "50px" }}
						mt={{ md: "20px", sm: "0px" }}
						bgColor={"white"}
						maxWidth={"95%"}
						borderRadius={"15px"}
						boxShadow={"md"}
						p={8}
					>
						<Heading size="lg" mb={4}>
							Sobre o Serviço
						</Heading>
						<Text>
							<strong>Serviço:</strong> {atendimento.servico}
						</Text>
						<Text>
							<strong>Profissional:</strong> {atendimento.profissional}
						</Text>
						<Text>
							<strong>Valor do Serviço:</strong> {atendimento.valorServico}
						</Text>
						<Text>
							<strong>Data do Serviço:</strong> {atendimento.dataServico}
						</Text>
						<Text>
							<strong>Tempo de Realização:</strong>{" "}
							{atendimento.tempoRealizacao}
						</Text>
					</Box>
					<Box
						m={{ md: "0px", sm: "50px" }}
						mt={{ md: "20px", sm: "0px" }}
						bgColor={"white"}
						maxWidth={"95%"}
						borderRadius={"15px"}
						boxShadow={"md"}
						p={8}
					>
						<Heading size="lg" mb={4}>
							Serviço Finalizado
						</Heading>
						{!atendimento.servicoFinalizado && (
							<Button
								my={2}
								colorScheme="blue"
								onClick={() => setIsModalOpen(true)}
							>
								Finalizar Serviço
							</Button>
						)}
						<Text>
							<strong>Serviço Finalizado:</strong>{" "}
							{atendimento.servicoFinalizado ? "Sim" : "Não"}
						</Text>
						{atendimento.servicoFinalizado && (
							<>
								<Text>
									<strong>Forma de Pagamento:</strong> {formaPagamento}
								</Text>
								{desconto > 0 && (
									<>
										<Text>
											<strong>Desconto:</strong> R$ {desconto}
										</Text>
										<Text>
											<strong>Valor Sem Desconto:</strong> R${" "}
											{atendimento.valorServico}
										</Text>
									</>
								)}
								<Text>
									<strong>Valor Total:</strong> R${" "}
									{atendimento.valorServico - desconto}
								</Text>
							</>
						)}
					</Box>
				</Flex>
			</Container>

			{/* Modal de Finalização de Serviço */}
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Finalizar Serviço</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Text>Valor do Serviço: {atendimento.valorServico}</Text>
						<Input
							placeholder="Desconto"
							value={desconto}
							onChange={(e) => setDesconto(e.target.value)}
							my={5}
						/>
						<Select
							placeholder="Forma de Pagamento"
							value={formaPagamento}
							onChange={(e) => setFormaPagamento(e.target.value)}
						>
							<option value="dinheiro">Dinheiro</option>
							<option value="Pix">Pix</option>
							<option value="cartao">Cartão de Crédito</option>
						</Select>
						{formaPagamento === "cartao" && (
							<NumberInput
								my={5}
								defaultValue={parcelas}
								min={1}
								max={12}
								onChange={(value) => setParcelas(value)}
							>
								<NumberInputField />
								<NumberInputStepper>
									<NumberIncrementStepper />
									<NumberDecrementStepper />
								</NumberInputStepper>
							</NumberInput>
						)}
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="blue" onClick={finalizarServico}>
							Confirmar
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

export default Atendimento;
