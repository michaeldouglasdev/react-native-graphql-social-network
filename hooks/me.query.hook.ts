import { graphql } from "@/graphql/__generated__";
import { useQuery, WatchQueryFetchPolicy } from "@apollo/client";

export const MeQuery = graphql(`
  query Me {
    me {
      id
      name
      username
      email
      role
      ...UserAvatar
    }
  }
`);

type UseMeQueryOptions = {
  fetchPolicy?: WatchQueryFetchPolicy;
};
export const useMeQuery = (options?: UseMeQueryOptions) => {
  const data = useQuery(MeQuery, {
    fetchPolicy: options?.fetchPolicy ?? "cache-only",
  });

  return data;
};
