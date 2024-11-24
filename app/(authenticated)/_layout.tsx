import { useMeQuery } from "@/hooks/me.query.hook";
import { Stack } from "expo-router";

export default function AuthenticatedLayout() {
  const { data } = useMeQuery();

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="create-post"
        options={{ presentation: "fullScreenModal", headerShown: false }}
      />
    </Stack>
  );
}
