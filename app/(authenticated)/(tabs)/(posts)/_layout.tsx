import { Stack } from "expo-router";
import { Header } from "@/components/header/header.component";

const TabsLayout: React.FC = () => {
  console.log("TabLayout");
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => {
            return <Header />;
          },
        }}
      />
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
        name="profile/[id]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default TabsLayout;
