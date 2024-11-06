import "react-native-gesture-handler";
import { useState, useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import { ApolloClient, ApolloProvider } from "@apollo/client";
import { useApolloClientDevTools } from "@dev-plugins/apollo-client";
import { Routes } from "./routes";

import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { getApolloClient } from "@/graphql/client/client";

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [client, setClient] = useState<ApolloClient<any> | null>(null);
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Inter: require("../assets/fonts/Inter_400Regular.ttf"),
    InterLight: require("../assets/fonts/Inter_300Light.ttf"),
    InterBold: require("../assets/fonts/Inter_700Bold.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    async function initializeApolloClient() {
      const apolloClient = await getApolloClient();
      setClient(apolloClient);
    }

    initializeApolloClient();
  }, []);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded || !client) {
    return null;
  }

  return <RootLayoutNav client={client} />;
}

function RootLayoutNav({ client }: { client: ApolloClient<any> }) {
  const colorScheme = useColorScheme();
  useApolloClientDevTools(client);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <StatusBar style="light" />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Routes />
        </GestureHandlerRootView>
      </ThemeProvider>
    </ApolloProvider>
  );
}
