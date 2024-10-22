import { useMeQuery } from "@/hooks/me.query.hook";
import { Stack } from "expo-router";

import LoginScreen from "./login";

export const Routes: React.FC = () => {
  const { data } = useMeQuery();
  console.log("user data", data);

  if (data) {
    return (
      <Stack>
        <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />

        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack>
    );
  }

  return <LoginScreen />;
};
