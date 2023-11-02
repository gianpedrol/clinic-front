import React, { useContext, useState } from "react";
// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

// Assets
import signInImage from "../../assets/img/signInImage.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth";

function SignIn() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = () => {
    login(email, password);
  };
  return (
    <Flex position="relative" mb="40px">
      <Flex
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        mb="30px"
        pt={{ sm: "100px", md: "0px" }}
      >
        <Flex
          alignItems="center"
          justifyContent="start"
          style={{ userSelect: "none" }}
          w={{ base: "100%", md: "50%", lg: "42%" }}
        >
          <Flex
            direction="column"
            w="100%"
            background="transparent"
            p="48px"
            mt={{ md: "150px", lg: "80px" }}
            color="#3c91df"
          >
            <Heading fontSize="32px" mb="10px" color="#3c91df">
              Bem vindo !
            </Heading>
            <FormControl>
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                E-mail
              </FormLabel>
              <Input
                borderRadius="15px"
                mb="24px"
                fontSize="sm"
                type="text"
                placeholder="digite seu e-mail"
                onChange={(e) => setEmail(e.target.value)}
                size="lg"
              />
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                Senha
              </FormLabel>
              <Input
                borderRadius="15px"
                mb="36px"
                fontSize="sm"
                type="password"
                placeholder="Digite sua senha"
                onChange={(e) => setPassword(e.target.value)}
                size="lg"
              />
              <FormControl display="flex" alignItems="center">
                <Switch id="remember-login" colorScheme="blue" me="10px" />
                <FormLabel
                  htmlFor="remember-login"
                  mb="0"
                  ms="1"
                  fontWeight="normal"
                >
                  Lembrar-me
                </FormLabel>
              </FormControl>
              <Button
                fontSize="16px"
                type="submit"
                colorScheme="blue"
                w="100%"
                h="45"
                mb="20px"
                color="white"
                mt="20px"
                onClick={() => handleSubmit()}
              >
                ENTRAR
              </Button>
            </FormControl>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              maxW="100%"
              mt="0px"
              color="#3c91df"
            >
              <Text fontWeight="medium">
                Não tem um login?
                <Link as="span" ms="5px" fontWeight="bold">
                  Cadastre-se
                </Link>
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Box
          display={{ base: "none", md: "block" }}
          overflowX="hidden"
          h="100%"
          w="40vw"
          position="absolute"
          right="0px"
        >
          <Box
            bgImage={signInImage}
            w="100%"
            h="100%"
            bgSize="cover"
            bgPosition="50%"
            position="absolute"
            borderBottomLeftRadius="20px"
          ></Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default SignIn;
