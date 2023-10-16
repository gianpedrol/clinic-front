import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";
import bgImage from "../../assets/img/bg-img-01.png";

function HeaderPages({ namePage }) {
  return (
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
          {namePage}
        </Text>
      </Box>
      <Box width={"30%"}>
        <Box
          backgroundImage={bgImage}
          bgSize={"cover"}
          minHeight={"150px"}
          minWidth={"400px"}
        ></Box>
      </Box>
    </Box>
  );
}

export default HeaderPages;
