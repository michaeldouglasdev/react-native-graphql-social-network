/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  fragment NotificationList_QueryFragment on Query {\n    notifications {\n      ...NotificationItem\n    }\n  }\n": types.NotificationList_QueryFragmentFragmentDoc,
    "\n  subscription Notification_ScreenSubscription {\n    notificationSubscribe {\n      ...NotificationItem\n    }\n  }\n": types.Notification_ScreenSubscriptionDocument,
    "\n  query Notification_Query {\n    ...NotificationList_QueryFragment\n  }\n": types.Notification_QueryDocument,
    "\n  query PostScreen($id: ID!, $dataReplies: FeedPostInput!) {\n    post(id: $id) {\n      id\n      content\n      author {\n        id\n        name\n        username\n      }\n      createdAt\n      replies(data: $dataReplies) {\n        edges {\n          cursor\n          node {\n            ...PostItem\n          }\n        }\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n        }\n        count\n      }\n    }\n  }\n": types.PostScreenDocument,
    "\n  fragment NotificationItem on Notification {\n    id\n    createdAt\n    fromUser {\n      id\n      name\n      username\n    }\n    ... on ReplyPostNotification {\n      post {\n        id\n        content\n      }\n    }\n  }\n": types.NotificationItemFragmentDoc,
    "\n  fragment PostItem on Post {\n    id\n    content\n    createdAt\n    author {\n      id\n      name\n      username\n    }\n    replies {\n      count\n    }\n  }\n": types.PostItemFragmentDoc,
    "mutation Login($data: LoginInput!) {\n  login(data: $data) {\n    user {\n      id\n      name\n      username\n      email\n      role\n    }\n    accessToken\n    expirationTime\n  }\n}": types.LoginDocument,
    "mutation ReplyPost($data: ReplyPostInput!) {\n  replyPost(data: $data) {\n    id\n    content\n    createdAt\n    author {\n      id\n      name\n      username\n    }\n    replies {\n      count\n    }\n    parent {\n      id\n    }\n  }\n}": types.ReplyPostDocument,
    "query Feed($data: FeedPostInput!) {\n  feed(data: $data) {\n    edges {\n      cursor\n      node {\n        id\n        content\n        author {\n          id\n          name\n          username\n        }\n        createdAt\n        replies {\n          count\n        }\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n}": types.FeedDocument,
    "query Me {\n  me {\n    id\n    name\n    username\n    email\n    role\n  }\n}": types.MeDocument,
    "query Post($id: ID!, $dataReplies: FeedPostInput!) {\n  post(id: $id) {\n    id\n    content\n    author {\n      id\n      name\n      username\n    }\n    createdAt\n    replies(data: $dataReplies) {\n      edges {\n        node {\n          id\n          content\n          author {\n            id\n            name\n            username\n          }\n          createdAt\n          replies {\n            count\n          }\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n      count\n    }\n  }\n}": types.PostDocument,
    "query Replies($data: FeedPostInput!) {\n  replies(data: $data) {\n    edges {\n      cursor\n      node {\n        id\n        content\n        createdAt\n        author {\n          id\n          name\n          username\n        }\n        parent {\n          id\n        }\n        replies {\n          count\n        }\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n    count\n  }\n}": types.RepliesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment NotificationList_QueryFragment on Query {\n    notifications {\n      ...NotificationItem\n    }\n  }\n"): (typeof documents)["\n  fragment NotificationList_QueryFragment on Query {\n    notifications {\n      ...NotificationItem\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription Notification_ScreenSubscription {\n    notificationSubscribe {\n      ...NotificationItem\n    }\n  }\n"): (typeof documents)["\n  subscription Notification_ScreenSubscription {\n    notificationSubscribe {\n      ...NotificationItem\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Notification_Query {\n    ...NotificationList_QueryFragment\n  }\n"): (typeof documents)["\n  query Notification_Query {\n    ...NotificationList_QueryFragment\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query PostScreen($id: ID!, $dataReplies: FeedPostInput!) {\n    post(id: $id) {\n      id\n      content\n      author {\n        id\n        name\n        username\n      }\n      createdAt\n      replies(data: $dataReplies) {\n        edges {\n          cursor\n          node {\n            ...PostItem\n          }\n        }\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n        }\n        count\n      }\n    }\n  }\n"): (typeof documents)["\n  query PostScreen($id: ID!, $dataReplies: FeedPostInput!) {\n    post(id: $id) {\n      id\n      content\n      author {\n        id\n        name\n        username\n      }\n      createdAt\n      replies(data: $dataReplies) {\n        edges {\n          cursor\n          node {\n            ...PostItem\n          }\n        }\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n        }\n        count\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment NotificationItem on Notification {\n    id\n    createdAt\n    fromUser {\n      id\n      name\n      username\n    }\n    ... on ReplyPostNotification {\n      post {\n        id\n        content\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment NotificationItem on Notification {\n    id\n    createdAt\n    fromUser {\n      id\n      name\n      username\n    }\n    ... on ReplyPostNotification {\n      post {\n        id\n        content\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PostItem on Post {\n    id\n    content\n    createdAt\n    author {\n      id\n      name\n      username\n    }\n    replies {\n      count\n    }\n  }\n"): (typeof documents)["\n  fragment PostItem on Post {\n    id\n    content\n    createdAt\n    author {\n      id\n      name\n      username\n    }\n    replies {\n      count\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Login($data: LoginInput!) {\n  login(data: $data) {\n    user {\n      id\n      name\n      username\n      email\n      role\n    }\n    accessToken\n    expirationTime\n  }\n}"): (typeof documents)["mutation Login($data: LoginInput!) {\n  login(data: $data) {\n    user {\n      id\n      name\n      username\n      email\n      role\n    }\n    accessToken\n    expirationTime\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ReplyPost($data: ReplyPostInput!) {\n  replyPost(data: $data) {\n    id\n    content\n    createdAt\n    author {\n      id\n      name\n      username\n    }\n    replies {\n      count\n    }\n    parent {\n      id\n    }\n  }\n}"): (typeof documents)["mutation ReplyPost($data: ReplyPostInput!) {\n  replyPost(data: $data) {\n    id\n    content\n    createdAt\n    author {\n      id\n      name\n      username\n    }\n    replies {\n      count\n    }\n    parent {\n      id\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Feed($data: FeedPostInput!) {\n  feed(data: $data) {\n    edges {\n      cursor\n      node {\n        id\n        content\n        author {\n          id\n          name\n          username\n        }\n        createdAt\n        replies {\n          count\n        }\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n}"): (typeof documents)["query Feed($data: FeedPostInput!) {\n  feed(data: $data) {\n    edges {\n      cursor\n      node {\n        id\n        content\n        author {\n          id\n          name\n          username\n        }\n        createdAt\n        replies {\n          count\n        }\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Me {\n  me {\n    id\n    name\n    username\n    email\n    role\n  }\n}"): (typeof documents)["query Me {\n  me {\n    id\n    name\n    username\n    email\n    role\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Post($id: ID!, $dataReplies: FeedPostInput!) {\n  post(id: $id) {\n    id\n    content\n    author {\n      id\n      name\n      username\n    }\n    createdAt\n    replies(data: $dataReplies) {\n      edges {\n        node {\n          id\n          content\n          author {\n            id\n            name\n            username\n          }\n          createdAt\n          replies {\n            count\n          }\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n      count\n    }\n  }\n}"): (typeof documents)["query Post($id: ID!, $dataReplies: FeedPostInput!) {\n  post(id: $id) {\n    id\n    content\n    author {\n      id\n      name\n      username\n    }\n    createdAt\n    replies(data: $dataReplies) {\n      edges {\n        node {\n          id\n          content\n          author {\n            id\n            name\n            username\n          }\n          createdAt\n          replies {\n            count\n          }\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n      count\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Replies($data: FeedPostInput!) {\n  replies(data: $data) {\n    edges {\n      cursor\n      node {\n        id\n        content\n        createdAt\n        author {\n          id\n          name\n          username\n        }\n        parent {\n          id\n        }\n        replies {\n          count\n        }\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n    count\n  }\n}"): (typeof documents)["query Replies($data: FeedPostInput!) {\n  replies(data: $data) {\n    edges {\n      cursor\n      node {\n        id\n        content\n        createdAt\n        author {\n          id\n          name\n          username\n        }\n        parent {\n          id\n        }\n        replies {\n          count\n        }\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n    count\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;