import { StyleSheet, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ContainerProps {
  children: React.ReactNode;
  safe?: boolean;
  border?: boolean;
  style?: ViewStyle;
}

export const Container: React.FC<ContainerProps> = ({
  border = true,
  safe,
  style,
  children,
}) => {
  return (
    <>
      {safe ? (
        <SafeAreaView
          style={[styles.container, border && styles.border, { ...style }]}
        >
          {children}
        </SafeAreaView>
      ) : (
        <View style={[styles.container, border && styles.border, { ...style }]}>
          {children}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1A1919",
    flex: 1,
  },

  border: {
    borderBottomColor: "#333333",
    borderBottomWidth: 1,
  },
});
