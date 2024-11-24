import { useMeQuery } from "@/hooks/me.query.hook";
import { Redirect } from "expo-router";

const Index = () => {
  const data = useMeQuery();
  if (data.data?.me.id) {
    return <Redirect href="/(authenticated)/(tabs)/(posts)/" />;
  }

  return <Redirect href="/login" />;
};
export default Index;
