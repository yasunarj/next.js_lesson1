"use client";
import { ReactNode } from "react";
import StyledComponentsRegistry from "@/lib/registry";
import { Provider } from "react-redux";
import store from "@/store";
import { ChakraWrapper } from "./ChakraProviders";

interface ClientLayoutProps {
  children: ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  return (
    <StyledComponentsRegistry>
      <Provider store={store}>
        <ChakraWrapper>{children}</ChakraWrapper>
      </Provider>
    </StyledComponentsRegistry>
  );
};

export default ClientLayout;
