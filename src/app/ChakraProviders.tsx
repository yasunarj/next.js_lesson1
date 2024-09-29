"use client";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ChakraProvidersProps {
  children: ReactNode;
}

const ChakraWrapper: React.FC<ChakraProvidersProps> = ({ children }) => {
  return (
    <CacheProvider>
      <ChakraProvider>{children}</ChakraProvider>
    </CacheProvider>
  );
};

export { ChakraWrapper };
