import { Pressable, StyleSheet, View } from "react-native";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { useRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Href, router } from "expo-router";

type TabBarItemProps = {
  active: boolean;
  options: BottomTabNavigationOptions;
  onPress: () => void;
};
export const TabBarItem: React.FC<TabBarItemProps> = ({
  active,
  options,
  onPress,
}) => {
  const { bottom } = useSafeAreaInsets();

  const handlePress = () => {
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      style={[styles.container, { height: 49 + bottom / 2 }]}
    >
      <View style={[styles.iconWrapper]}>
        {options.tabBarIcon
          ? options.tabBarIcon({
              focused: active,
              color: active ? "#F6009C" : "#B8B8B8",
              size: 24,
            })
          : null}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
  },
  iconWrapper: {},
  icon: {
    height: 24,
  },
});
