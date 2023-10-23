import React from "react";
import {
	Box,
	Image,
	Icon,
	Link,
	Button,
	Text,
	Flex,
	Wrap,
	WrapItem,
} from "@chakra-ui/react";
import Sidebar from "../../components/Navbar/Navbar";
import Container from "../../components/Container/Container";
import imageWelcome from "../../assets/img/morning-img-01.png";
import bgWelcome from "../../assets/img/bg-img-01.png";
import { useSpring, animated } from "react-spring";
import NextAppointmentsTable from "../../components/NewsApointments/NewsApointments";
function AnimatedNumber({ value }) {
	const animatedProps = useSpring({
		number: value,
		from: { number: 0 },
	});

	return (
		<animated.span>
			{animatedProps.number.interpolate((number) => Math.floor(number))}
		</animated.span>
	);
}

function AdminDashboard() {
	const upcomingAppointments = [
		{
			appointmentId: 1,
			patientName: "João",
			service: "Consulta Médica",
			appointmentValue: "R$ 100",
			appointmentDate: "2023-10-15",
		},
		// Adicione mais objetos de agendamento aqui
	];
	return (
		<>
			<Sidebar />
			<Container>
				<Box
					m={{ md: "0px", sm: "50px" }}
					mt={{ md: "20px", sm: "0px" }}
					display={"flex"}
					alignItems={"center"}
					bgColor={"white"}
					maxWidth={"95%"}
					height={"150px"}
					borderRadius={"15px"}
					boxShadow={"md"}
					justifyContent={"space-between"}
					p={8}
				>
					<Box width={"70%"}>
						<Text fontSize={"2xl"} fontWeight={"medium"}>
							Olá, Seja bem vindo solvetch
						</Text>
					</Box>
					<Box width={"30%"}>
						<Box backgroundImage={bgWelcome} bgSize={"cover"} maxH={"150px"}>
							<Box position={{ md: "relative", sm: "block" }} top={"-80px"}>
								<Image src={imageWelcome} width={"280px"}></Image>
							</Box>
						</Box>
					</Box>
				</Box>

				<Flex
					m={{ md: "0px", sm: "50px" }}
					mt={{ md: "20px", sm: "0px" }}
					alignItems="center"
					maxWidth="95%"
					borderRadius="15px"
					p={8}
					overflowX="auto" // Adicionando overflow horizontal
				>
					<Wrap spacing={4} w="100%">
						<WrapItem>
							<Box
								bgColor="white"
								borderRadius="15px"
								boxShadow="md"
								p={6}
								width={"300px"}
								height={"250px"}
								display="flex"
								flexDirection="column" // Botões na parte inferior
								justifyContent="space-between"
							>
								<Icon name="calendar" size="32px" color="teal.500" />
								<Text fontSize="22px" fontWeight={"600"}>
									Atendimentos Totais
								</Text>
								<Text fontSize="32px" fontWeight={"700"}>
									<AnimatedNumber value={250} />
								</Text>
								<Button as={Link} to="/agendados" colorScheme="blue" mt={4}>
									Ver Detalhes
								</Button>
							</Box>
						</WrapItem>

						<WrapItem>
							<Box
								bgColor="white"
								borderRadius="15px"
								boxShadow="md"
								p={6}
								width={"300px"}
								height={"250px"}
								display="flex"
								flexDirection="column" // Botões na parte inferior
								justifyContent="space-between"
							>
								<Icon name="calendar" size="32px" color="green.500" />
								<Text fontSize="2xl" fontWeight={"600"}>
									Atendimentos Finalizados
								</Text>
								<Text fontSize="32px" fontWeight={"700"}>
									<AnimatedNumber value={50} />
								</Text>
								<Button as={Link} to="/agendados" colorScheme="blue" mt={4}>
									Ver Detalhes
								</Button>
							</Box>
						</WrapItem>

						<WrapItem>
							<Box
								bgColor="white"
								borderRadius="15px"
								boxShadow="md"
								p={6}
								width={"300px"}
								height={"250px"}
								display="flex"
								flexDirection="column" // Botões na parte inferior
								justifyContent="space-between" // Espaço entre o conteúdo e os botões
							>
								<Icon name="calendar" size="32px" color="green.500" />
								<Text fontSize="2xl" fontWeight={"600"}>
									Clientes
								</Text>
								<Text fontSize="32px" fontWeight={"700"}>
									<AnimatedNumber value={50} />
								</Text>
								<Button as={Link} to="/agendados" colorScheme="blue" mt={4}>
									Ver Detalhes
								</Button>
							</Box>
						</WrapItem>
					</Wrap>
				</Flex>

				<NextAppointmentsTable appointments={upcomingAppointments} />
			</Container>
		</>
	);
}

export default AdminDashboard;
