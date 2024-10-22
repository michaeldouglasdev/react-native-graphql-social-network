import { Stack } from "expo-router";

export default function AuthenticatedLayout() {
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
