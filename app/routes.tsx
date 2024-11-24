import { useMeQuery } from "@/hooks/me.query.hook";
import { Redirect, Slot, Stack, useRouter } from "expo-router";

import { Header } from "@/components/header/header.component";
import { useEffect } from "react";

export const Routes: React.FC = () => {
  const { data } = useMeQuery();
  const router = useRouter();

  console.log("data route", data);

  useEffect(() => {
    if (data?.me.id) {
      if (router.canGoBack()) {
        router.dismissAll();
      }

      router.replace("/(authenticated)/(posts)/");
    }
  }, [data?.me.id]);
  return (
    <Stack>
      <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen
        name="create-account"
        options={{
          header: () => <Header avatar={false} title="Create Account" />,
        }}
      />
    </Stack>
  );
};
