import { graphql } from "@/graphql/__generated__";
import { useQuery } from "@apollo/client";

export const MeQuery = graphql(`
  query Me {
    me {
      id
      name
      username
      email
      role
    }
  }
`);

export const useMeQuery = () => {
  const data = useQuery(MeQuery, {
    fetchPolicy: "cache-only",
  });

  return data;
};
