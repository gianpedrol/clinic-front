import React, { useState } from "react";
import {
	Box,
	Button,
	Input,
	Text,
	Textarea,
	Image,
	Avatar,
} from "@chakra-ui/react";
import Sidebar from "../../components/Navbar/Navbar";
import Container from "../../components/Container/Container";
import HeaderPages from "../../components/HeaderPage/HeaderPage";

function Perfil() {
	const [isEditing, setIsEditing] = useState(false);
	const [userInfo, setUserInfo] = useState({
		name: "Seu Nome",
		email: "seuemail@example.com",
		bio: "Sua biografia vai aqui.",
		avatar: "url-para-o-avatar",
	});

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleSave = () => {
		// Salvar as informações do usuário, você pode enviar para o servidor/API aqui
		// Certifique-se de adicionar validações necessárias

		setIsEditing(false);
	};

	const handleCancel = () => {
		setIsEditing(false);
		// Reverter as alterações não salvas
	};

	return (
		<>
			<Sidebar />
			<Container>
				<HeaderPages namePage={"Perfil"} />
				<Box
					m={{ md: "0px", sm: "50px" }}
					mt={{ md: "20px", sm: "0px" }}
					mb={{ md: "40px", sm: "20px" }}
					display="flex"
					alignItems="center"
					bgColor="white"
					maxWidth="95%"
					borderRadius="15px"
					boxShadow="md"
					p={8}
				>
					<Box flex="1">
						{isEditing ? (
							<Input
								value={userInfo.name}
								onChange={(e) =>
									setUserInfo({ ...userInfo, name: e.target.value })
								}
							/>
						) : (
							<Text>{userInfo.name}</Text>
						)}
						{isEditing ? (
							<Input
								value={userInfo.email}
								onChange={(e) =>
									setUserInfo({ ...userInfo, email: e.target.value })
								}
							/>
						) : (
							<Text>{userInfo.email}</Text>
						)}
						{isEditing ? (
							<Textarea
								value={userInfo.bio}
								onChange={(e) =>
									setUserInfo({ ...userInfo, bio: e.target.value })
								}
							/>
						) : (
							<Text>{userInfo.bio}</Text>
						)}
						{isEditing ? (
							<Button colorScheme="blue" onClick={handleSave}>
								Salvar
							</Button>
						) : (
							<Button colorScheme="teal" onClick={handleEdit}>
								Editar
							</Button>
						)}
						{isEditing && (
							<Button colorScheme="red" onClick={handleCancel}>
								Cancelar
							</Button>
						)}
					</Box>
					<Box flex="1" ml={8}>
						<Text>Avatar</Text>
						{isEditing ? (
							<Image src={userInfo.avatar} alt="Avatar" />
						) : (
							<Avatar name={userInfo.name} src={userInfo.avatar} />
						)}
						{/* Adicione um componente de upload de imagem para permitir a edição do avatar */}
					</Box>
				</Box>
			</Container>
		</>
	);
}

export default Perfil;
