import React from "react";
import {
	Box,
	Button,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	HStack,
} from "@chakra-ui/react";
import { FaWhatsapp, FaExternalLinkAlt } from "react-icons/fa";

function NextAppointmentsTable({ appointments }) {
	function sendConfirmationViaWhatsApp(patientName) {
		console.log(`Enviando confirmação para ${patientName} via WhatsApp.`);
	}

	function goToAppointmentDetails(appointmentId) {
		console.log(`Acessando detalhes do atendimento ID ${appointmentId}.`);
	}

	return (
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
			<Table variant="simple" minW="100%">
				<Thead>
					<Tr>
						<Th>Nome do Paciente</Th>
						<Th>Profissional</Th>
						<Th>Serviço</Th>
						<Th>Valor do Atendimento</Th>
						<Th>Data Agendada</Th>
						<Th>Ações</Th>
					</Tr>
				</Thead>
				<Tbody>
					{appointments.map((appointment, index) => (
						<Tr key={index}>
							<Td>{appointment.patientName}</Td>
							<Td>{appointment.professionalName}</Td>
							<Td>{appointment.service}</Td>
							<Td>{appointment.appointmentValue}</Td>
							<Td>{appointment.appointmentDate}</Td>
							<Td>
								<HStack spacing={2}>
									<Button
										leftIcon={<FaWhatsapp />}
										colorScheme="green"
										onClick={() =>
											sendConfirmationViaWhatsApp(appointment.patientName)
										}
									>
										Enviar Confirmação
									</Button>
									<Button
										leftIcon={<FaExternalLinkAlt />}
										colorScheme="teal"
										onClick={() =>
											goToAppointmentDetails(appointment.appointmentId)
										}
									>
										Detalhes
									</Button>
								</HStack>
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</Box>
	);
}

export default NextAppointmentsTable;
