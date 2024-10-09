import { StyleSheet, View, ViewStyle } from "react-native";

interface VBoxProps {
  children: React.ReactNode;
  noSpacing?: boolean;
  justifyContent?:
    | "center"
    | "space-between"
    | "flex-start"
    | "flex-end"
    | "space-around"
    | "space-evenly";
  alignItems?: "center" | "flex-start" | "flex-end" | "stretch" | "baseline";
  alignSelf?: "center" | "flex-start" | "flex-end" | "stretch" | "baseline";
  expanded?: boolean;
  style?: ViewStyle;
}
export const VBox: React.FC<VBoxProps> = ({
  noSpacing,
  justifyContent = "flex-start",
  alignItems = "stretch",
  alignSelf = "stretch",
  expanded,
  style,
  children,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          justifyContent,
          alignItems,
          alignSelf,
        },
        expanded && styles.expanded,
        noSpacing && styles.noSpacing,
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    justifyContent: "flex-start",
    alignItems: "stretch",
    alignSelf: "stretch",
  },
  expanded: {
    flex: 1,
  },
  noSpacing: {
    paddingHorizontal: 0,
  },
});
