import React, { useState } from "react";
import {
	Box,
	Input,
	Button,
	Checkbox,
	Select,
	HStack,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Text,
} from "@chakra-ui/react";
import Sidebar from "../../components/Navbar/Navbar";
import Container from "../../components/Container/Container";
import HeaderPages from "../../components/HeaderPage/HeaderPage";

// Suponhamos que você tenha uma lista de profissionais e seus horários disponíveis.
const professionals = [
	{
		name: "Profissional 1",
		id: 1,
		availableTimes: [
			{ date: "2023-10-15", times: ["09:00", "10:00", "14:00", "15:00"] },
			{ date: "2023-10-16", times: ["10:00", "11:00", "16:00", "17:00"] },
		],
	},
	{
		name: "Profissional 2",
		id: 2,
		availableTimes: [
			{ date: "2023-10-15", times: ["09:00", "10:00", "15:00"] },
			{ date: "2023-10-16", times: ["11:00", "16:00", "17:00"] },
		],
	},
];

function RegistrarAtendimento() {
	const [selectedDate, setSelectedDate] = useState("");
	const [selectedTime, setSelectedTime] = useState("");
	const [patientName, setPatientName] = useState("");
	const [service, setService] = useState("");
	const [selectedProfessional, setSelectedProfessional] = useState("");
	const [hasConvenio, setHasConvenio] = useState(false);
	const [convenioName, setConvenioName] = useState("");
	const [serviceValue, setServiceValue] = useState(0);
	const [discount, setDiscount] = useState(0);
	const [isProfessionaDetailsOpen, setIsProfessionalDetailsOpen] =
		useState(false);
	const [professionalAvailableTimes, setProfessionalAvailableTimes] = useState(
		[]
	);
	const [noAvailableTimes, setNoAvailableTimes] = useState(false);

	const getAvailableTimes = () => {
		if (selectedProfessional && selectedDate) {
			const professional = professionals.find(
				(p) => p.id === parseInt(selectedProfessional)
			);

			if (professional) {
				const availableTimesForDate = professional.availableTimes.find(
					(item) => item.date === selectedDate
				);

				if (availableTimesForDate) {
					setProfessionalAvailableTimes(availableTimesForDate.times);
					setNoAvailableTimes(false);
				} else {
					setProfessionalAvailableTimes([]);
					setNoAvailableTimes(true);
				}
			}
		}
	};

	const openProfessionalDetails = () => {
		setIsProfessionalDetailsOpen(true);
	};

	const handleRegister = () => {
		// Aqui você pode enviar os dados do atendimento para o seu servidor/API para registro.
		// Certifique-se de validar os dados antes de enviar.
	};

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
						<Input
							type="date"
							placeholder="Data"
							value={selectedDate}
							onChange={(e) => setSelectedDate(e.target.value)}
							mb={4}
						/>
						<Select
							placeholder="Horário"
							value={selectedTime}
							onChange={(e) => setSelectedTime(e.target.value)}
							mb={4}
						>
							{professionalAvailableTimes.map((availableTime) => (
								<option key={availableTime} value={availableTime}>
									{availableTime}
								</option>
							))}
						</Select>
					</HStack>
					<HStack spacing={4}>
						<Select
							placeholder="Selecione o Paciente"
							value={patientName}
							onChange={(e) => setPatientName(e.target.value)}
							mb={4}
						>
							<option value="Paciente 1">Paciente 1</option>
							<option value="Paciente 2">Paciente 2</option>
							<option value="Paciente 3">Paciente 3</option>
						</Select>
						<Select
							placeholder="Selecione o Serviço"
							value={service}
							onChange={(e) => {
								setService(e.target.value);
								if (e.target.value === "Serviço A") {
									setServiceValue(100);
								} else if (e.target.value === "Serviço B") {
									setServiceValue(150);
								}
							}}
							mb={4}
						>
							<option value="Serviço A">Serviço A</option>
							<option value="Serviço B">Serviço B</option>
							<option value="Serviço C">Serviço C</option>
						</Select>
					</HStack>
					<HStack spacing={4}>
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
					</HStack>
					<HStack spacing={4}>
						<Input
							placeholder="Valor do Serviço"
							value={serviceValue}
							onChange={(e) => setServiceValue(e.target.value)}
							type="number"
							step="0.01"
							mb={4}
						/>
						<Input
							placeholder="Desconto (opcional)"
							value={discount}
							onChange={(e) => setDiscount(e.target.value)}
							type="number"
							step="0.01"
							mb={4}
						/>
					</HStack>
					<Button colorScheme="blue" onClick={handleRegister}>
						Registrar
					</Button>
				</Box>
			</Container>
			<ProfessionalDetailsModal
				isOpen={isProfessionaDetailsOpen}
				onClose={() => setIsProfessionalDetailsOpen(false)}
				professional={professionals.find(
					(p) => p.id === parseInt(selectedProfessional)
				)}
				getAvailableTimes={getAvailableTimes} // Adicione esta propriedade
				noAvailableTimes={noAvailableTimes} // Adicione esta propriedade
			/>
		</>
	);
}

function ProfessionalDetailsModal({
	isOpen,
	onClose,
	professional,
	getAvailableTimes,
	noAvailableTimes,
}) {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Horários Disponíveis do Profissional</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					{professional && (
						<>
							<Text>
								{professional.name} possui os seguintes horários disponíveis:
							</Text>
							<Button colorScheme="blue" onClick={getAvailableTimes} mb={2}>
								Atualizar Horários
							</Button>
							{noAvailableTimes ? (
								<Text>Sem horários disponíveis para a data selecionada</Text>
							) : (
								<ul>
									{professional.availableTimes.map((item) => (
										<li key={item.date}>
											{item.date}:
											<ul>
												{item.times.map((availableTime, index) => (
													<li key={index}>{availableTime}</li>
												))}
											</ul>
										</li>
									))}
								</ul>
							)}
						</>
					)}
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}

export default RegistrarAtendimento;
