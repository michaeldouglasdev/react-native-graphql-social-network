import { StyleSheet, View } from "react-native";

enum AvatarSize {
  SMALL = 24,
  MEDIUM = 36,
  LARGE = 48,
}

interface AvatarProps {
  size?: "small" | "medium" | "large";
}

const sizes = {
  small: AvatarSize.SMALL,
  medium: AvatarSize.MEDIUM,
  large: AvatarSize.LARGE,
};
export const Avatar: React.FC<AvatarProps> = ({ size = "medium" }) => {
  return (
    <View
      style={[
        styles.container,
        {
          height: sizes[size],
          width: sizes[size],
          borderRadius: sizes[size],
        },
      ]}
    ></View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#444",
  },
});
