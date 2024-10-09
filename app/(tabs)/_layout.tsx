import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";

import { Link, Tabs } from "expo-router";
import { Pressable, Text } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { TabBar } from "@/components/tab-bar/tab-bar";
import { Header } from "@/components/header/header.component";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,

        headerTitle: () => {
          return (
            <Text
              style={{
                fontSize: 20,
                fontFamily: "InterBold",
                color: "#F6009C",
              }}
            >
              Post
            </Text>
          );
        },
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen
        name="posts"
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Tab Two",
          tabBarIcon: ({ color, size }) => (
            <Feather name="search" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome
              name={focused ? "envelope" : "envelope-o"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome
              name={focused ? "bell" : "bell-o"}
              color={color}
              size={size}
            />
          ),
          headerShown: true,
          header: () => {
            return <Header />;
          },
        }}
      />
    </Tabs>
  );
}
