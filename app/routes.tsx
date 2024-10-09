import { MeDocument } from "@/graphql/__generated__/graphql";
import { useQuery } from "@apollo/client";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

export const Routes: React.FC = () => {
  const { data } = useQuery(MeDocument);
  const isAuthenticated = data?.me;

  const router = useRouter();

  // Redirect based on authentication status
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/(tabs)/posts");
    } else {
      router.replace("/");
    }
  }, [isAuthenticated]);

  return (
    <Stack
      initialRouteName={true ? "(tabs)" : "index"}
      screenOptions={{
        headerStyle: {
          backgroundColor: "red",
        },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />

      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};
