import { SafeAreaView, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { Container } from "@/components/grid/container";
import { SubmitHandler, useForm } from "react-hook-form";
import { TextInput } from "@/components/input/text-input";
import { graphql, useFragment } from "@/graphql/__generated__";
import { useLazyQuery } from "@apollo/client";
import { Feed, Feed_QueryFragment } from "@/components/feed/feed.component";
import { OrderBy } from "@/graphql/__generated__/graphql";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SearchScreen_SearchQuery = graphql(`
  query Search($data: FeedPostInput!) {
    ...Feed_QueryFragment
  }
`);
interface FormField {
  content: string;
}

export default function SearchScreen() {
  const { top } = useSafeAreaInsets();
  const { control, handleSubmit, getValues } = useForm<FormField>();
  const [searchLazy, { data, fetchMore }] = useLazyQuery(
    SearchScreen_SearchQuery
  );

  const handleSearch: SubmitHandler<FormField> = (form) => {
    searchLazy({
      variables: {
        data: {
          where: {
            content: {
              contains: form.content,
            },
          },
          connection: {
            first: 10,
          },
          order: {
            createdAt: OrderBy.Desc,
          },
        },
      },
      fetchPolicy: "network-only",
    });
  };

  const handleFetchMore = () => {
    const response = useFragment(Feed_QueryFragment, data);
    const content = getValues("content");

    fetchMore({
      variables: {
        data: {
          where: {
            content: {
              contains: content,
            },
          },
          connection: {
            first: 10,
            after: response?.feed.pageInfo.endCursor,
          },
          order: {
            createdAt: OrderBy.Desc,
          },
        },
      },
      updateQuery(previousQueryResult, { fetchMoreResult }) {
        const prev = useFragment(Feed_QueryFragment, previousQueryResult);
        const moreResult = useFragment(Feed_QueryFragment, fetchMoreResult);

        moreResult.feed.edges = [...prev.feed.edges, ...moreResult.feed.edges];

        return moreResult;
      },
    });
  };
  return (
    <Container>
      <View style={[styles.inputWrapper, { paddingTop: top }]}>
        <TextInput
          name="content"
          border="rounded"
          control={control}
          onSubmitEditing={handleSubmit(handleSearch)}
          placeholder="Type your text..."
        />
      </View>
      {data ? <Feed data={data} onFetchMore={handleFetchMore} /> : null}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
  },

  icon: {
    color: "#666",
    fontSize: 20,
  },
  iconFill: {
    color: "#F6009C",
  },
  inputWrapper: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    borderBottomColor: "#333333",
    borderBottomWidth: 1,
    backgroundColor: "transparent",
  },
});
