import { Button as ButtonRN, ButtonProps as ButtonPropsRN } from "react-native";

type ButtonProps = ButtonPropsRN;

export const Button: React.FC<ButtonProps> = (props) => {
  return <ButtonRN {...props} />;
};
