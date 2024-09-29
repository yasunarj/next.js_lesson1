import { ReactNode } from "react";
import { styled } from "styled-components";

const SendButton = styled.button`
  background-color: #3d3939;
  padding: 4px 24px;
  color: white;
  border-radius: 4px;
  box-shadow: 0 4px black;
  transition: transform .1s, box-shadow .1s;
  &:hover {
    background-color: #615c5c;
  }

  &:active {
    transform: translateY(3px);
    box-shadow: 0 1px black;
  }
`;

interface SendButtonProps {
  children: ReactNode;
}

const CustomButton: React.FC<SendButtonProps> = ({ children }) => {
  return (
    <SendButton>{children}</SendButton>
  )
};

export default CustomButton;
