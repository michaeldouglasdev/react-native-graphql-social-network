import React from "react";
import {
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";

type HBoxProps = {
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
};

export const HBox: React.FC<HBoxProps> = ({
  noSpacing,
  justifyContent = "flex-start",
  alignItems = "stretch",
  alignSelf = "stretch",
  expanded,
  children,
  style,
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
    flexDirection: "row",
    paddingHorizontal: 0,
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
