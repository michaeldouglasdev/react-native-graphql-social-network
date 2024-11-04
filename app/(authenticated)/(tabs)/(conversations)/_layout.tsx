import { Header } from "@/components/header/header.component";
import { Stack } from "expo-router";

const ConversationsLayout: React.FC = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="details/[id]"
        options={{
          headerBackTitleVisible: false,
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#1A1919",
          },
          headerTintColor: "#F6009C",
        }}
      />
      <Stack.Screen
        name="create/index"
        options={{
          presentation: "modal",
        }}
      />
    </Stack>
  );
};

export default ConversationsLayout;
