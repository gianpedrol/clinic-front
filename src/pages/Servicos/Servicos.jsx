import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
	Box,
	Input,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	Textarea,
	Button,
} from "@chakra-ui/react";
import Sidebar from "../../components/Navbar/Navbar";
import Container from "../../components/Container/Container";
import HeaderPages from "../../components/HeaderPage/HeaderPage";

const services = [
	{
		id: 1,
		name: "Serviço 1",
		percentage: 10,
		details: "Detalhes do Serviço 1",
	},
	{
		id: 2,
		name: "Serviço 2",
		percentage: 15,
		details: "Detalhes do Serviço 2",
	},
	{
		id: 3,
		name: "Serviço 3",
		percentage: 20,
		details: "Detalhes do Serviço 3",
	},
	// Adicione mais serviços conforme necessário
];

function Servicos() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [serviceName, setServiceName] = useState("");
	const [percentage, setPercentage] = useState("");
	const [details, setDetails] = useState("");

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const handleServiceRegistration = () => {
		// Lógica para registrar o serviço
		// Você pode enviar os dados para o servidor/API aqui
		// Certifique-se de adicionar validações necessárias

		// Após o registro, você pode redirecionar para a página de serviços
		// history.push("/servicos");
		closeModal();
	};
	return (
		<>
			<Sidebar />

			<Container>
				<HeaderPages namePage={"Lista de Serviços"} />
				<Button onClick={openModal} colorScheme="blue" mt={5}>
					Registrar Novo Serviço
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
								<Th>Nome do Serviço</Th>
								<Th>Porcentagem da Clínica</Th>
								<Th>Detalhes</Th>
							</Tr>
						</Thead>
						<Tbody>
							{services.map((service) => (
								<Tr key={service.id}>
									<Td>{service.id}</Td>
									<Td>{service.name}</Td>
									<Td>{service.percentage}%</Td>
									<Td>{service.details}</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</Box>
			</Container>

			{/* Modal de Registro de Serviço */}
			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Registrar Novo Serviço</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Input
							placeholder="Nome do Serviço"
							value={serviceName}
							onChange={(e) => setServiceName(e.target.value)}
							mb={4}
						/>
						<Input
							placeholder="Porcentagem da Clínica"
							value={percentage}
							onChange={(e) => setPercentage(e.target.value)}
							mb={4}
						/>
						<Textarea
							placeholder="Detalhes"
							value={details}
							onChange={(e) => setDetails(e.target.value)}
						/>
					</ModalBody>
					<Box p={4} display="flex" justifyContent="flex-end">
						<Button onClick={handleServiceRegistration} colorScheme="blue">
							Registrar
						</Button>
					</Box>
				</ModalContent>
			</Modal>
		</>
	);
}

export default Servicos;
