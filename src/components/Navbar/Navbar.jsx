import {
	IconButton,
	Avatar,
	Box,
	CloseButton,
	Flex,
	HStack,
	VStack,
	Icon,
	useColorModeValue,
	Text,
	Drawer,
	DrawerContent,
	useDisclosure,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
} from "@chakra-ui/react";
import {
	FiHome,
	FiSettings,
	FiMenu,
	FiBell,
	FiChevronDown,
	FiCalendar,
	FiUsers,
} from "react-icons/fi";
import { FaWallet, FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // Importe o componente Link do React Router

const LinkItems = [
	{ name: "Home", icon: FiHome, path: "/dashboard" },
	{
		name: "Usuários",
		icon: FiUsers,
		submenu: [
			{ name: "Clientes", path: "/lista/clientes" },
			{ name: "Profissionais", path: "/lista/profissionais" },
		],
	},
	{ name: "Atendimentos", icon: FiCalendar, path: "/lista/atendimentos" },
	{ name: "Serviços", icon: FaEdit, path: "/lista/servicos" },
	{ name: "Financeiro", icon: FaWallet, path: "/lista/pagamentos" },
	{ name: "Settings", icon: FiSettings, path: "/perfil" },
];

const SidebarContent = ({ onClose, ...rest }) => {
	const navigate = useNavigate();
	return (
		<Box
			transition="3s ease"
			bg={"#3C91DF"}
			color={"white"}
			borderRight="1px"
			borderRightColor={useColorModeValue("gray.200", "gray.700")}
			w={{ base: "full", md: 60 }}
			pos="fixed"
			h="full"
			{...rest}
		>
			<Flex
				h="20"
				alignItems="center"
				mx="8"
				justifyContent="space-between"
				mt={5}
				mb={5}
			>
				<Text fontSize="38px" fontWeight="bold">
					solvetech.
				</Text>
				<CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
			</Flex>
			{LinkItems.map((link) => (
				<Link to={link.path}>
					<NavItem key={link.name} icon={link.icon}>
						{link.name}
						{link.submenu && (
							<Menu>
								<MenuButton
									as={IconButton}
									size="xs"
									ml={4}
									icon={<FiChevronDown />}
									_focus={{ boxShadow: "none" }}
								/>
								<MenuList>
									{link.submenu.map((submenuItem) => (
										<Link to={submenuItem.path}>
											<MenuItem
												key={submenuItem.name}
												onClick={() => navigate(submenuItem.path)}
											>
												{submenuItem.name}
											</MenuItem>
										</Link>
									))}
								</MenuList>
							</Menu>
						)}
					</NavItem>
				</Link>
			))}
		</Box>
	);
};

const NavItem = ({ icon, children, ...rest }) => {
	return (
		<Box
			as="a"
			href="#"
			style={{ textDecoration: "none" }}
			_focus={{ boxShadow: "none" }}
		>
			<Flex
				align="center"
				p="4"
				mx="4"
				borderRadius="lg"
				role="group"
				cursor="pointer"
				_hover={{
					bg: "white",
					color: "#3C91DF",
				}}
				{...rest}
			>
				{icon && (
					<Icon
						mr="4"
						fontSize="16"
						_groupHover={{
							color: "#3C91DF",
						}}
						as={icon}
					/>
				)}
				{children}
			</Flex>
		</Box>
	);
};

const MobileNav = ({ onOpen, ...rest }) => {
	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 4 }}
			height="20"
			alignItems="center"
			bg={useColorModeValue("white", "gray.900")}
			borderBottomWidth="1px"
			borderBottomColor={useColorModeValue("gray.200", "gray.700")}
			justifyContent={{ base: "space-between", md: "flex-end" }}
			{...rest}
		>
			<IconButton
				display={{ base: "flex", md: "none" }}
				onClick={onOpen}
				variant="outline"
				aria-label="open menu"
				icon={<FiMenu />}
			/>

			<HStack spacing={{ base: "0", md: "6" }}>
				<IconButton
					size="lg"
					variant="ghost"
					aria-label="open menu"
					icon={<FiBell />}
				/>
				<Flex alignItems={"center"}>
					<Menu>
						<MenuButton
							py={2}
							transition="all 0.3s"
							_focus={{ boxShadow: "none" }}
						>
							<HStack>
								<VStack
									display={{ base: "none", md: "flex" }}
									alignItems="flex-start"
									spacing="1px"
									ml="2"
								>
									<Text fontSize="sm">Justina Clark</Text>
								</VStack>
								<Box display={{ base: "none", md: "flex" }}>
									<FiChevronDown />
								</Box>
							</HStack>
						</MenuButton>
						<MenuList
							bg={useColorModeValue("white", "gray.900")}
							borderColor={useColorModeValue("gray.200", "gray.700")}
						>
							<Link to="/perfil">
								<MenuItem>Profile</MenuItem>
							</Link>

							<MenuDivider />
							<Link to="/">
								<MenuItem>Sair</MenuItem>
							</Link>
						</MenuList>
					</Menu>
				</Flex>
			</HStack>
		</Flex>
	);
};

const Sidebar = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Box>
			<SidebarContent
				onClose={() => onClose}
				display={{ base: "none", md: "block" }}
			/>
			<Drawer
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size="full"
			>
				<DrawerContent>
					<SidebarContent onClose={onClose} />
				</DrawerContent>
			</Drawer>
			{/* mobilenav */}
			<MobileNav onOpen={onOpen} />
			<Box ml={{ base: 0, md: 60 }} p="4">
				{/* Content */}
			</Box>
		</Box>
	);
};

export default Sidebar;
