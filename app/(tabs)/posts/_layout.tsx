import { router, Stack } from "expo-router";

import { Container } from "@/components/grid/container";
import { Post, PostData } from "@/components/post/post.component";
import {
  FeedDocument,
  FeedQuery,
  FeedQueryVariables,
} from "@/graphql/__generated__/graphql";
import { useQuery } from "@apollo/client";
import { FlatList, ListRenderItemInfo } from "react-native";
import { Header } from "@/components/header/header.component";

const Index: React.FC = () => {
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
    </Stack>
  );
};

export default Index;
