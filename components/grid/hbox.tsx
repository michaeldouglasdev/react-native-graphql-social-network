import React from "react";
import {
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";

enum HBoxMarginSize {
  SMALL = 8,
  MEDIUM = 16,
  LARGE = 32,
}

const sizes = {
  small: HBoxMarginSize.SMALL,
  medium: HBoxMarginSize.MEDIUM,
  large: HBoxMarginSize.LARGE,
};

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
  vMargin?: "small" | "medium" | "large";
  hMargin?: "small" | "medium" | "large";
};

export const HBox: React.FC<HBoxProps> = ({
  noSpacing,
  justifyContent = "flex-start",
  alignItems = "stretch",
  alignSelf = "stretch",
  expanded,
  children,
  style,
  hMargin,
  vMargin,
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
        vMargin && { marginVertical: sizes[vMargin] },
        hMargin && { marginHorizontal: sizes[hMargin] },
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
});
