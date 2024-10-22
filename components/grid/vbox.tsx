import { StyleSheet, View, ViewStyle } from "react-native";

enum VBoxMarginSize {
  SMALL = 8,
  MEDIUM = 16,
  LARGE = 32,
}

const sizes = {
  small: VBoxMarginSize.SMALL,
  medium: VBoxMarginSize.MEDIUM,
  large: VBoxMarginSize.LARGE,
};

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
  vMargin?: "small" | "medium" | "large";
  hMargin?: "small" | "medium" | "large";
  vPadding?: "small" | "medium" | "large";
  hPadding?: "small" | "medium" | "large";
  style?: ViewStyle;
}
export const VBox: React.FC<VBoxProps> = ({
  noSpacing,
  justifyContent = "flex-start",
  alignItems = "stretch",
  alignSelf = "stretch",
  expanded,
  style,
  vMargin,
  hMargin,
  vPadding,
  hPadding,
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
        vMargin && { marginVertical: sizes[vMargin] },
        hMargin && { marginHorizontal: sizes[hMargin] },
        vPadding && { paddingVertical: sizes[vPadding] },
        hPadding && { paddingHorizontal: sizes[hPadding] },
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
    position: "relative",
  },
  expanded: {
    flex: 1,
  },
  noSpacing: {
    paddingHorizontal: 0,
  },
});
