import { StyleSheet } from "react-native";
import { Avatar } from "../avatar/avatar";
import { VBox } from "../grid/vbox";
import { Container } from "../grid/container";

export const Header = () => {
  return (
    <Container safe style={styles.container}>
      <VBox>
        <Avatar size="large" />
      </VBox>
    </Container>
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
