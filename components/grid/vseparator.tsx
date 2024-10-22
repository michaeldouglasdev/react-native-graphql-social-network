import { StyleSheet, View } from "react-native";

enum VSeparatorSize {
  SMALL = 8,
  MEDIUM = 16,
  LARGE = 32,
  XLARGE = 48,
}

interface VSeparatorProps {
  size?: "small" | "medium" | "large" | "xlarge";
  divider?: boolean;
}

const sizes = {
  small: VSeparatorSize.SMALL,
  medium: VSeparatorSize.MEDIUM,
  large: VSeparatorSize.LARGE,
  xlarge: VSeparatorSize.XLARGE,
};
interface VSeparatorProps {}

export const VSeparator: React.FC<VSeparatorProps> = ({
  size = "medium",
  divider,
}) => {
  return (
    <View
      style={[divider && styles.divider, { marginVertical: sizes[size] / 2 }]}
    ></View>
  );
};

const styles = StyleSheet.create({
  divider: {
    backgroundColor: "#333333",
    height: 1,
  },
});
