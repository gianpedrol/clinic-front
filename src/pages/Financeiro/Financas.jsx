import React, { useState } from "react";
import {
	Box,
	Button,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	Input,
	Select,
	Text,
} from "@chakra-ui/react";
import Sidebar from "../../components/Navbar/Navbar";
import Container from "../../components/Container/Container";
import HeaderPages from "../../components/HeaderPage/HeaderPage";

const financeRecords = [
	{
		id: 1,
		appointmentId: 1,
		patientName: "Paciente 1",
		serviceName: "Serviço A",
		professionalName: "Profissional 1",
		receivedAmount: 100,
		isReceived: true,
	},
	{
		id: 2,
		appointmentId: 2,
		patientName: "Paciente 2",
		serviceName: "Serviço B",
		professionalName: "Profissional 2",
		receivedAmount: 150,
		isReceived: false,
	},
	{
		id: 3,
		appointmentId: 3,
		patientName: "Paciente 3",
		serviceName: "Serviço C",
		professionalName: "Profissional 3",
		receivedAmount: 200,
		isReceived: true,
	},
	// Adicione mais registros financeiros conforme necessário
];

function Financas() {
	const [filterDate, setFilterDate] = useState("");
	const [filterMonth, setFilterMonth] = useState("");
	const [filterYear, setFilterYear] = useState("");
	const [filteredRecords, setFilteredRecords] = useState(financeRecords);

	const handleFilter = () => {
		// Aplicar lógica de filtragem com base nas datas selecionadas
		// Atualize o estado `filteredRecords` com os resultados do filtro
	};

	const handleGenerateInvoice = (record) => {
		// Lógica para gerar cobrança via WhatsApp para o registro financeiro
		// Você pode usar APIs de mensagens para implementar essa funcionalidade
		console.log(
			`Gerar cobrança via WhatsApp para o atendimento ID ${record.appointmentId}`
		);
	};

	return (
		<>
			<Sidebar />
			<Container>
				<HeaderPages namePage={"Registros Financeiros"} />
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
					overflowX="auto"
				>
					<Box mb={4}>
						<Input
							type="date"
							placeholder="Filtrar por Data"
							value={filterDate}
							onChange={(e) => setFilterDate(e.target.value)}
						/>
					</Box>
					<Box mb={4}>
						<Select
							placeholder="Filtrar por Mês"
							value={filterMonth}
							onChange={(e) => setFilterMonth(e.target.value)}
						>
							{/* Opções de mês */}
						</Select>
					</Box>
					<Box mb={4}>
						<Input
							type="number"
							placeholder="Filtrar por Ano"
							value={filterYear}
							onChange={(e) => setFilterYear(e.target.value)}
						/>
					</Box>
					<Button colorScheme="blue" onClick={handleFilter}>
						Filtrar
					</Button>
				</Box>
				<Table variant="simple" minW="100%">
					<Thead>
						<Tr>
							<Th>Atendimento ID</Th>
							<Th>Paciente</Th>
							<Th>Serviço</Th>
							<Th>Profissional</Th>
							<Th>Valor Recebido</Th>
							<Th>Forma de Pagamento</Th>
							<Th>Recebido</Th>
							<Th>Ações</Th>
						</Tr>
					</Thead>
					<Tbody>
						{filteredRecords.map((record) => (
							<Tr key={record.id}>
								<Td>{record.appointmentId}</Td>
								<Td>{record.patientName}</Td>
								<Td>{record.serviceName}</Td>
								<Td>{record.professionalName}</Td>
								<Td>{record.receivedAmount}</Td>
								<Td>{/* Adicione a forma de pagamento aqui */}</Td>
								<Td>{record.isReceived ? "Sim" : "Não"}</Td>
								<Td>
									{!record.isReceived && (
										<Button
											colorScheme="teal"
											onClick={() => handleGenerateInvoice(record)}
										>
											Gerar Cobrança
										</Button>
									)}
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</Container>
		</>
	);
}

export default Financas;
