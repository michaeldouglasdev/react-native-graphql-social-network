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
import { StorageService } from "@/services/storage.service";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import PossibleTypes from "@/graphql/__generated__/graphql";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import { MeQuery } from "@/hooks/me.query.hook";
import { createPersistedQueryLink } from "@apollo/client/link/persisted-queries";
import * as Crypto from "expo-crypto";

//@ts-ignore
import createUploadLink from "apollo-upload-client/createUploadLink";

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

const crypto = (value: string) => {
  return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, value);
};
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
      const uri = "http://localhost:4000/graphql";
      const httpLink = new HttpLink({
        uri,
      });

      const pqLink = createPersistedQueryLink({ sha256: crypto });
      const [token, me] = await Promise.all([
        StorageService.getItemString("TOKEN_AUTH"),
        StorageService.getItem<any>("ME"),
      ]);

      const wsLink = new GraphQLWsLink(
        createClient({
          url: "ws://localhost:4000/graphql",
          connectionParams: async () => {
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
        createUploadLink({ uri, isExtractableFile: customIsExtractableFile })
      );

      const cache = new InMemoryCache({
        possibleTypes: PossibleTypes.possibleTypes,
        typePolicies: {
          Query: {
            fields: {
              notifications: {
                keyArgs: false,
              },
              feed: {
                keyArgs: [
                  "data",
                  [
                    "where",
                    [
                      "content",
                      ["contains"],
                      "authorId",
                      ["equals"],
                      "parentPostId",
                      ["equals"],
                    ],
                  ],
                ],
                /*[
                  "data",
                  [
                    "where",
                    ["content", "parentPostId", ["equals"]],
                    "order",
                    ["createdAt"],
                  ],
                ],*/
                /* merge(existing = { edges: [] }, incoming) {
                  return {
                    ...incoming,
                    edges: [...existing.edges, ...incoming.edges],
                  };
                },*/
              },
              /*post: {
                keyArgs: ["id"], // The unique identifier for the post
                merge(existing = {}, incoming, { args }) {
                  // Existing replies or empty structure
                  const existingReplies = existing.replies || {
                    edges: [],
                    count: 0,
                  };
                  const incomingReplies = incoming.replies || {
                    edges: [],
                    count: 0,
                  };

                  // Merge the edges (avoiding duplicates)
                  const mergedEdges = [
                    ...(existingReplies.edges || []),
                    ...(incomingReplies.edges || []),
                  ].filter(
                    (edge, index, self) =>
                      index ===
                      self.findIndex((e) => e.node.id === edge.node.id)
                  );

                  // Use the incoming pageInfo to keep track of pagination state
                  const mergedPageInfo = incomingReplies.pageInfo;

                  return {
                    ...incoming,
                    replies: {
                      edges: mergedEdges,
                      pageInfo: mergedPageInfo,
                      count: incomingReplies.count || existingReplies.count,
                    },
                  };
                },
              },*/
              /*keyArgs: [
                  "id",
                  "data",
                  [
                    "where",
                    ["parentPostId", ["equals"]],
                    "order",
                    ["createdAt"],
                  ],
                ],
                merge(existing = {}, incoming) {
                  const existingReplies = existing.replies || { edges: [] };
                  const incomingReplies = incoming.replies || { edges: [] };

                  const mergedReplies = {
                    ...incomingReplies,
                    edges: [...existingReplies.edges, ...incomingReplies.edges],
                  };

                  return {
                    ...incoming,
                    replies: mergedReplies,
                  };
                },
            }*/
            },
          },
        },
      });

      const apolloClient = new ApolloClient({
        cache,
        link: ApolloLink.from([AuthorizationLink, pqLink, splitLink]),
      });

      if (me) {
        cache.writeQuery({
          query: MeQuery,
          data: {
            me: me,
            __typename: "Query",
          },
        });

        const meValue = cache.readQuery({
          query: MeQuery,
        });

        // write cache has failed
        if (!meValue) {
          console.log("Resetting all storage data");
          await StorageService.clearAll();
        }
      }

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

function customIsExtractableFile(value: unknown): value is ReactNativeFile {
  return value instanceof ReactNativeFile;
}

export class ReactNativeFile {
  uri: string;
  name: string;
  type: string;
  constructor({
    uri,
    name,
    type,
  }: {
    uri: string;
    name: string;
    type: string;
  }) {
    this.uri = uri;
    this.name = name;
    this.type = type;
  }
}
