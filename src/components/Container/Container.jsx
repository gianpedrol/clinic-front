import { Box, useBreakpointValue } from "@chakra-ui/react";

const Container = ({ children }) => {
  const left = useBreakpointValue({ base: "0", lg: "270px" });

  return (
    <Box
      marginLeft={left}
      // Adicionando overflowX: hidden para evitar overflow horizontal
    >
      {children}
    </Box>
  );
};

export default Container;
