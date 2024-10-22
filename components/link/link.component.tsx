import { Link as ExpoLink, Href } from "expo-router";
import { Button, StyleSheet } from "react-native";

type LinkProps = {
  title: string;
  href: Href;
};
export const Link: React.FC<LinkProps> = ({ href, title }) => {
  return (
    <ExpoLink style={styles.link} href={href}>
      {title}
    </ExpoLink>
  );
};

const styles = StyleSheet.create({
  link: {
    height: 44,
    fontFamily: "InterBold",
    color: "#FFF",
  },
});
