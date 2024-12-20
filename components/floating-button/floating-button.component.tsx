import { StyleSheet, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type FloatingButtonProps = {
  onPress: () => void;
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
};

export const FloatingButton: React.FC<FloatingButtonProps> = ({
  iconName,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.container}
    >
      <MaterialCommunityIcons name={iconName} style={styles.icon} size={24} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 10,
    right: 12,
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: "#F6009C",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    color: "#FFF",
  },
});
