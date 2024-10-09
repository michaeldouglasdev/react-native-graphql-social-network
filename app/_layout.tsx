import "react-native-gesture-handler";
import { useState, useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { useApolloClientDevTools } from "@dev-plugins/apollo-client";
import { Routes } from "./routes";
import { AuthorizationLink } from "@/graphql/links/authorization.link";
import { persistCache } from "apollo3-cache-persist";
import { StorageService } from "@/services/storage.service";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { createFragmentRegistry } from "@apollo/client/cache";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import PossibleTypes, {
  Notification_QueryDocument,
  NotificationItemFragmentDoc,
  NotificationList_QueryFragmentFragmentDoc,
} from "@/graphql/__generated__/graphql";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

export { ErrorBoundary } from "expo-router";

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
      const httpLink = new HttpLink({
        uri: "http://localhost:4000/graphql",
      });

      const wsLink = new GraphQLWsLink(
        createClient({
          url: "ws://localhost:4000/graphql",
          connectionParams: async () => {
            const token = await StorageService.getItem("TOKEN_AUTH");
            const includesBearer = token?.startsWith("Bearer");
            return {
              headers: {
                Authorization: includesBearer ? token : `Bearer ${token}`,
              },
              Authorization: includesBearer ? token : `Bearer ${token}`,
            };
          },
        })
      );
      const splitLink = ApolloLink.split(
        ({ query }) => {
          const definition = getMainDefinition(query);

          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink,
        httpLink
      );

      const cache = new InMemoryCache({
        possibleTypes: PossibleTypes.possibleTypes,
        fragments: createFragmentRegistry(
          NotificationItemFragmentDoc,
          NotificationList_QueryFragmentFragmentDoc,
          Notification_QueryDocument
        ),

        typePolicies: {
          Post: {
            fields: {
              replies: {
                keyArgs: [
                  "data",
                  [
                    "where",
                    ["parentPostId", ["equals"]],
                    "order",
                    ["createdAt"],
                  ],
                ],
                merge: (existing = { edges: [], count: 0 }, incoming: any) => {
                  console.log("existing", existing);
                  console.log("incoming", incoming);

                  const existingEdges = existing.edges || [];
                  const incomingEdges = incoming.edges || [];

                  const existingRepliesMap = new Map(
                    existingEdges.map((edge) => [edge.node.id, edge])
                  );

                  // Add incoming replies only if they are not already in the existingRepliesMap
                  const mergedEdges = [
                    ...existingEdges,
                    ...incomingEdges.filter(
                      (edge) => !existingRepliesMap.has(edge.node.id)
                    ),
                  ];

                  // Return the merged object with the updated edges
                  return {
                    ...incoming,
                    edges: mergedEdges,
                    count: existing.count || incoming.count,
                  };
                },
              },
            },
          },
          Query: {
            fields: {
              feed: {
                keyArgs: [
                  "data",
                  [
                    "where",
                    ["parentPostId", ["equals"]],
                    "order",
                    ["createdAt"],
                  ],
                ],
                merge(existing = { edges: [] }, incoming) {
                  return {
                    ...incoming,
                    edges: [...existing.edges, ...incoming.edges],
                  };
                },
              },
              replies: {
                keyArgs: [
                  "data",
                  [
                    "where",
                    ["parentPostId", ["equals"]],
                    "order",
                    ["createdAt"],
                  ],
                ],
                merge(existing = { edges: [] }, incoming) {
                  // Merge posts for pagination
                  const existingEdges = existing.edges || [];
                  const incomingEdges = incoming.edges || [];

                  const existingRepliesMap = new Map(
                    existingEdges.map((edge) => [edge.node.id, edge])
                  );

                  // Add incoming replies only if they are not already in the existingRepliesMap
                  const mergedEdges = [
                    ...existingEdges,
                    ...incomingEdges.filter(
                      (edge) => !existingRepliesMap.has(edge.node.id)
                    ),
                  ];

                  return {
                    ...incomingEdges,
                    edges: mergedEdges,
                  };
                },
              },
            },
          },
        },
      });

      // Await persistCache
      /*await persistCache({
        cache,
        storage, // MMKV storage
      });*/

      const apolloClient = new ApolloClient({
        cache,
        link: ApolloLink.from([AuthorizationLink, splitLink]),
      });

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
