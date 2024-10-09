import { StyleSheet, View } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import { TabBarItem } from "./tab-bar-item";
import { router } from "expo-router";

type TabPropsProps = BottomTabBarProps & {};
export const TabBar: React.FC<TabPropsProps> = ({
  state: { index: activeIndex, routes },
  navigation,
  descriptors,
}) => {
  const handleNavigation = (route: any) => {
    const routeName = route === "index" ? "" : route;

    // @ts-ignore
    router.navigate<string>("/" + routeName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {routes.map((route, index) => {
          const active = index === activeIndex;
          const { options } = descriptors[route.key];

          return (
            <TabBarItem
              active={active}
              options={options}
              onPress={() => handleNavigation(route.name)}
              key={route.key}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1A1919",
    width: "100%",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
});
