import {
  FragmentType,
  graphql,
  getFragmentData,
} from "@/graphql/__generated__";
import { FlatList, ListRenderItemInfo } from "react-native";
import { UserItem, UserItemFragment } from "../user.component";

export const Users_QueryFragment = graphql(`
  fragment Users_QueryFragment on Query {
    users(data: $dataUsers) {
      edges {
        cursor
        node {
          ...UserItem
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`);
type UserListProps = {
  data: FragmentType<typeof Users_QueryFragment>;
  onPress: (id: string) => void;
};
export const UserList: React.FC<UserListProps> = ({ onPress, ...props }) => {
  const data = getFragmentData(Users_QueryFragment, props.data);

  if (!data) {
    return null;
  }

  const renderItem = (
    data: ListRenderItemInfo<{ node: FragmentType<typeof UserItemFragment> }>
  ) => {
    const user = getFragmentData(UserItemFragment, data.item.node);

    return <UserItem data={data.item.node} key={user.id} onPress={onPress} />;
  };

  return (
    <FlatList
      data={data.users.edges}
      renderItem={renderItem}
      keyExtractor={(item) => item.cursor}
    />
  );
};
