import { Link as ExpoLink, Href } from "expo-router";
import { Button, StyleSheet } from "react-native";

type LinkProps = {
  title: string;
  href: Href;
  underscore?: boolean;
};
export const Link: React.FC<LinkProps> = ({ href, title, underscore }) => {
  return (
    <ExpoLink
      style={[styles.link, underscore && styles.underscore]}
      href={href}
    >
      {title}
    </ExpoLink>
  );
};

const styles = StyleSheet.create({
  link: {
    height: 44,
    fontFamily: "InterBold",
    //color: "#ffafff",
    color: "#aaaaff",
  },
  underscore: {
    textDecorationColor: "#aaaaff",
    textDecorationLine: "underline",
  },
});
