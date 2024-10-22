import { StyleSheet, View } from "react-native";
import { Avatar } from "../avatar/avatar.component";
import { VBox } from "../grid/vbox";
import { Container } from "../grid/container";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const Header = () => {
  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: 30 + top / 2 }]}>
      <VBox>
        <Avatar size="large" />
      </VBox>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1A1919",
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
});
