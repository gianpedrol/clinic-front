import React, { useState } from "react";
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
	Input,
	Select,
} from "@chakra-ui/react";
import Sidebar from "../../components/Navbar/Navbar";
import Container from "../../components/Container/Container";
import HeaderPages from "../../components/HeaderPage/HeaderPage";

const appointments = [
	{
		id: 1,
		patientName: "Paciente 1",
		professionalName: "Profissional 1",
		service: "Serviço A",
		value: 100,
		date: "2023-10-15",
		status: "Agendado",
	},
	{
		id: 2,
		patientName: "Paciente 2",
		professionalName: "Profissional 2",
		service: "Serviço B",
		value: 150,
		date: "2023-10-16",
		status: "Concluído",
	},
	{
		id: 3,
		patientName: "Paciente 3",
		professionalName: "Profissional 3",
		service: "Serviço C",
		value: 120,
		date: "2023-10-17",
		status: "Agendado",
	},
	// Adicione mais atendimentos conforme necessário
];

function Atendimentos() {
	const [filters, setFilters] = useState({
		patientName: "",
		professionalName: "",
		service: "",
		status: "",
	});

	const filteredAppointments = appointments.filter((appointment) => {
		const patientNameMatches =
			appointment.patientName
				.toLowerCase()
				.includes(filters.patientName.toLowerCase()) ||
			filters.patientName === "";

		const professionalNameMatches =
			appointment.professionalName
				.toLowerCase()
				.includes(filters.professionalName.toLowerCase()) ||
			filters.professionalName === "";

		const serviceMatches =
			appointment.service
				.toLowerCase()
				.includes(filters.service.toLowerCase()) || filters.service === "";

		const statusMatches =
			appointment.status.toLowerCase().includes(filters.status.toLowerCase()) ||
			filters.status === "";

		return (
			patientNameMatches &&
			professionalNameMatches &&
			serviceMatches &&
			statusMatches
		);
	});

	return (
		<>
			<Sidebar />

			<Container>
				<HeaderPages namePage={"Lista de Atendimentos"} />
				<Button as={Link} to="/registrar/atendimento" colorScheme="blue" mt={5}>
					Registrar Novo Atendimento
				</Button>
				<Box
					m={{ md: "0px", sm: "50px" }}
					mt={{ md: "15px", sm: "15px" }}
					mb={5}
					display="flex"
					flexDirection={{ md: "row", sm: "column" }}
					justifyContent="space-between"
					alignItems="center"
					bgColor="white"
					maxWidth="95%"
					borderRadius="15px"
					boxShadow="md"
					p={8}
					overflowX="auto"
				>
					<Input
						mr={5}
						placeholder="Filtrar por Paciente"
						value={filters.patientName}
						onChange={(e) =>
							setFilters({ ...filters, patientName: e.target.value })
						}
						mb={4}
					/>
					<Input
						placeholder="Filtrar por Profissional"
						mr={5}
						value={filters.professionalName}
						onChange={(e) =>
							setFilters({ ...filters, professionalName: e.target.value })
						}
						mb={4}
					/>
					<Input
						placeholder="Filtrar por Serviço"
						mr={5}
						value={filters.service}
						onChange={(e) =>
							setFilters({ ...filters, service: e.target.value })
						}
						mb={4}
					/>
					<Select
						placeholder="Filtrar por Status"
						value={filters.status}
						onChange={(e) => setFilters({ ...filters, status: e.target.value })}
						mb={4}
					>
						<option value="">Todos</option>
						<option value="Agendado">Agendado</option>
						<option value="Concluído">Concluído</option>
						<option value="Cancelado">Cancelado</option>
					</Select>
				</Box>

				<Box
					m={{ md: "0px", sm: "50px" }}
					mt={{ md: "15px", sm: "15px" }}
					mb={5}
					display="flex"
					flexDirection={{ md: "row", sm: "column" }}
					justifyContent="space-between"
					alignItems="center"
					bgColor="white"
					maxWidth="95%"
					borderRadius="15px"
					boxShadow="md"
					p={8}
					overflowX="auto"
				>
					<Table variant="simple" minW="100%">
						<Thead>
							<Tr>
								<Th>ID</Th>
								<Th>Paciente</Th>
								<Th>Profissional</Th>
								<Th>Serviço</Th>
								<Th>Valor</Th>
								<Th>Data</Th>
								<Th>Status</Th>
								<Th>Ações</Th>
							</Tr>
						</Thead>
						<Tbody>
							{filteredAppointments.map((appointment) => (
								<Tr key={appointment.id}>
									<Td>{appointment.id}</Td>
									<Td>{appointment.patientName}</Td>
									<Td>{appointment.professionalName}</Td>
									<Td>{appointment.service}</Td>
									<Td>{appointment.value}</Td>
									<Td>{appointment.date}</Td>
									<Td>{appointment.status}</Td>
									<Td>
										<Button
											as={Link}
											to={`/atendimento/${appointment.id}`}
											colorScheme="blue"
										>
											Detalhes
										</Button>
									</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</Box>
			</Container>
		</>
	);
}

export default Atendimentos;
