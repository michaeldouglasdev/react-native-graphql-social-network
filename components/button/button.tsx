import {
  Button as ButtonRN,
  ButtonProps as ButtonPropsRN,
  TouchableOpacity,
  StyleSheet,
  Text,
  ViewStyle,
  TextStyle,
} from "react-native";

type ButtonSize = "xsmall" | "small" | "medium" | "large";
type ButtonBorderRadius = "small" | "medium" | "large" | "rounded";
type ButtonVariant = "primary" | "white";
type ButtonProps = {
  onPress: () => void;
  title: string;
  variant: ButtonVariant;
  size?: ButtonSize;
  borderRadius?: ButtonBorderRadius;
  outline?: boolean;
  outlineGhost?: boolean;
  width?: number;
  disabled?: boolean;
};

const variants = {
  primary: {
    backgroundColor: "#F6009C",
    color: "#FFF",
  },
  white: {
    backgroundColor: "#FFF",
    color: "#1A1919",
  },
};

const borders: Record<ButtonBorderRadius, { borderRadius: number }> = {
  small: {
    borderRadius: 4,
  },
  medium: {
    borderRadius: 8,
  },
  large: {
    borderRadius: 12,
  },
  rounded: {
    borderRadius: 24,
  },
};
const sizes: Record<ButtonSize, ViewStyle & TextStyle> = {
  xsmall: {
    height: 28,
    paddingHorizontal: 24,
    fontSize: 12,
  },
  small: {
    height: 36,
    paddingHorizontal: 24,
    fontSize: 14,
  },
  medium: {
    height: 44,
    paddingHorizontal: 24,
    fontSize: 16,
  },
  large: {
    height: 48,
    paddingHorizontal: 24,
    fontSize: 18,
  },
};
export const Button: React.FC<ButtonProps> = ({
  onPress,
  variant = "white",
  title,
  size = "medium",
  borderRadius = "medium",
  outline = false,
  outlineGhost = false,
  width,
  disabled = false,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: variants[variant].backgroundColor },
        { ...sizes[size] },
        { borderRadius: borders[borderRadius].borderRadius },
        !!width && { width },
        outline && outlineViewStyle(variant, outlineGhost),
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          styles.title,
          { color: variants[variant].color },
          { fontSize: sizes[size].fontSize },
          outline && outlineTextStyle(variant),
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
  },
  title: {
    fontFamily: "InterBold",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 2,
  },
  disabled: {
    opacity: 0.8,
  },
});

const outlineViewStyle = (
  variant: ButtonVariant,
  outlineGhost: boolean
): ViewStyle => {
  return {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: outlineGhost ? "#555" : variants[variant].backgroundColor,
  };
};

const outlineTextStyle = (variant: ButtonVariant): TextStyle => {
  return {
    color: variants[variant].backgroundColor,
  };
};
