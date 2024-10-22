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
 */
const documents = {
    "\n  mutation LikePost($postId: ID!) {\n    likePost(id: $postId)\n  }\n": types.LikePostDocument,
    "\n  mutation UnlikePost($postId: ID!) {\n    unlikePost(id: $postId)\n  }\n": types.UnlikePostDocument,
    "\n  query PostScreen($id: ID!, $dataReplies: FeedPostInput!) {\n    ...PostDetail_QueryFragment\n  }\n": types.PostScreenDocument,
    "\n  mutation ReplyPost($data: ReplyPostInput!) {\n    replyPost(data: $data) {\n      ...PostItem\n    }\n  }\n": types.ReplyPostDocument,
    "\n  query HomeScreen($data: FeedPostInput!) {\n    ...Feed_QueryFragment\n  }\n": types.HomeScreenDocument,
    "\n  query User(\n    $id: ID!\n    $dataFeed: FeedPostInput!\n    $includeUser: Boolean = true\n  ) {\n    ...UserDetail_QueryFragment\n    ...ProfileDetailListPost_QueryFragment\n  }\n": types.UserDocument,
    "\n  fragment NotificationSubscribe_SubscriptionFragment on Subscription {\n    notificationSubscribe {\n      ...NotificationItem\n    }\n  }\n": types.NotificationSubscribe_SubscriptionFragmentFragmentDoc,
    "\n  subscription Notification_ScreenSubscription {\n    notificationSubscribe {\n      ...NotificationItem\n    }\n  }\n": types.Notification_ScreenSubscriptionDocument,
    "\n  query Notifications($data: NotificationsInput!) {\n    ...NotificationList_QueryFragment\n  }\n": types.NotificationsDocument,
    "\n  query Search($data: FeedPostInput!) {\n    ...Feed_QueryFragment\n  }\n": types.SearchDocument,
    "\n  mutation CreatePost($data: CreatePostInput!) {\n    createPost(data: $data) {\n      ...PostItem\n    }\n  }\n": types.CreatePostDocument,
    "\n  mutation Login($data: LoginInput!) {\n    login(data: $data) {\n      user {\n        id\n        name\n        username\n        email\n        role\n      }\n      accessToken\n      expirationTime\n    }\n  }\n": types.LoginDocument,
    "\n  fragment UserAvatar on User {\n    id\n    name\n  }\n": types.UserAvatarFragmentDoc,
    "\n  fragment Feed_QueryFragment on Query {\n    feed(data: $data) {\n      edges {\n        cursor\n        node {\n          ...PostItem\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n": types.Feed_QueryFragmentFragmentDoc,
    "\n  fragment NotificationList_QueryFragment on Query {\n    notifications(data: $data) {\n      edges {\n        cursor\n        node {\n          ...NotificationItem\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n": types.NotificationList_QueryFragmentFragmentDoc,
    "\n  fragment NotificationItem on Notification {\n    id\n    createdAt\n    fromUser {\n      id\n      name\n      username\n    }\n    ... on ReplyPostNotification {\n      post {\n        id\n        content\n      }\n    }\n  }\n": types.NotificationItemFragmentDoc,
    "\n  fragment ReplyPostNotificationItem on ReplyPostNotification {\n    id\n    createdAt\n    fromUser {\n      id\n      name\n      username\n    }\n    post {\n      id\n      content\n    }\n  }\n": types.ReplyPostNotificationItemFragmentDoc,
    "\n  fragment PostDetail_QueryFragment on Query {\n    post(id: $id) {\n      id\n      content\n      author {\n        id\n        name\n        username\n      }\n      createdAt\n      replies(data: $dataReplies) {\n        edges {\n          cursor\n          node {\n            ...PostItem\n          }\n        }\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n        }\n        count\n      }\n      likes {\n        count\n        byCurrentUser\n      }\n    }\n  }\n": types.PostDetail_QueryFragmentFragmentDoc,
    "\n  fragment PostItem on Post {\n    id\n    content\n    createdAt\n    author {\n      id\n      name\n      username\n    }\n    replies {\n      count\n    }\n    likes {\n      count\n      byCurrentUser\n    }\n  }\n": types.PostItemFragmentDoc,
    "\n  fragment ProfileDetailListPost_QueryFragment on Query {\n    feed(data: $dataFeed) {\n      edges {\n        cursor\n        node {\n          ...PostItem\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n": types.ProfileDetailListPost_QueryFragmentFragmentDoc,
    "\n  mutation FollowUser($id: ID!) {\n    followUser(id: $id)\n  }\n": types.FollowUserDocument,
    "\n  mutation UnfollowUser($id: ID!) {\n    unfollowUser(id: $id)\n  }\n": types.UnfollowUserDocument,
    "\n  fragment UserDetail_QueryFragment on Query {\n    user(id: $id) @include(if: $includeUser) {\n      id\n      name\n      username\n      createdAt\n      followers {\n        count\n        byCurrentUser\n      }\n      following {\n        count\n        byCurrentUser\n      }\n    }\n  }\n": types.UserDetail_QueryFragmentFragmentDoc,
    "\n  query Me {\n    me {\n      id\n      name\n      username\n      email\n      role\n    }\n  }\n": types.MeDocument,
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
export function graphql(source: "\n  mutation LikePost($postId: ID!) {\n    likePost(id: $postId)\n  }\n"): (typeof documents)["\n  mutation LikePost($postId: ID!) {\n    likePost(id: $postId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UnlikePost($postId: ID!) {\n    unlikePost(id: $postId)\n  }\n"): (typeof documents)["\n  mutation UnlikePost($postId: ID!) {\n    unlikePost(id: $postId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query PostScreen($id: ID!, $dataReplies: FeedPostInput!) {\n    ...PostDetail_QueryFragment\n  }\n"): (typeof documents)["\n  query PostScreen($id: ID!, $dataReplies: FeedPostInput!) {\n    ...PostDetail_QueryFragment\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ReplyPost($data: ReplyPostInput!) {\n    replyPost(data: $data) {\n      ...PostItem\n    }\n  }\n"): (typeof documents)["\n  mutation ReplyPost($data: ReplyPostInput!) {\n    replyPost(data: $data) {\n      ...PostItem\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query HomeScreen($data: FeedPostInput!) {\n    ...Feed_QueryFragment\n  }\n"): (typeof documents)["\n  query HomeScreen($data: FeedPostInput!) {\n    ...Feed_QueryFragment\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query User(\n    $id: ID!\n    $dataFeed: FeedPostInput!\n    $includeUser: Boolean = true\n  ) {\n    ...UserDetail_QueryFragment\n    ...ProfileDetailListPost_QueryFragment\n  }\n"): (typeof documents)["\n  query User(\n    $id: ID!\n    $dataFeed: FeedPostInput!\n    $includeUser: Boolean = true\n  ) {\n    ...UserDetail_QueryFragment\n    ...ProfileDetailListPost_QueryFragment\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment NotificationSubscribe_SubscriptionFragment on Subscription {\n    notificationSubscribe {\n      ...NotificationItem\n    }\n  }\n"): (typeof documents)["\n  fragment NotificationSubscribe_SubscriptionFragment on Subscription {\n    notificationSubscribe {\n      ...NotificationItem\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription Notification_ScreenSubscription {\n    notificationSubscribe {\n      ...NotificationItem\n    }\n  }\n"): (typeof documents)["\n  subscription Notification_ScreenSubscription {\n    notificationSubscribe {\n      ...NotificationItem\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Notifications($data: NotificationsInput!) {\n    ...NotificationList_QueryFragment\n  }\n"): (typeof documents)["\n  query Notifications($data: NotificationsInput!) {\n    ...NotificationList_QueryFragment\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Search($data: FeedPostInput!) {\n    ...Feed_QueryFragment\n  }\n"): (typeof documents)["\n  query Search($data: FeedPostInput!) {\n    ...Feed_QueryFragment\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreatePost($data: CreatePostInput!) {\n    createPost(data: $data) {\n      ...PostItem\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePost($data: CreatePostInput!) {\n    createPost(data: $data) {\n      ...PostItem\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($data: LoginInput!) {\n    login(data: $data) {\n      user {\n        id\n        name\n        username\n        email\n        role\n      }\n      accessToken\n      expirationTime\n    }\n  }\n"): (typeof documents)["\n  mutation Login($data: LoginInput!) {\n    login(data: $data) {\n      user {\n        id\n        name\n        username\n        email\n        role\n      }\n      accessToken\n      expirationTime\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment UserAvatar on User {\n    id\n    name\n  }\n"): (typeof documents)["\n  fragment UserAvatar on User {\n    id\n    name\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Feed_QueryFragment on Query {\n    feed(data: $data) {\n      edges {\n        cursor\n        node {\n          ...PostItem\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment Feed_QueryFragment on Query {\n    feed(data: $data) {\n      edges {\n        cursor\n        node {\n          ...PostItem\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment NotificationList_QueryFragment on Query {\n    notifications(data: $data) {\n      edges {\n        cursor\n        node {\n          ...NotificationItem\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment NotificationList_QueryFragment on Query {\n    notifications(data: $data) {\n      edges {\n        cursor\n        node {\n          ...NotificationItem\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment NotificationItem on Notification {\n    id\n    createdAt\n    fromUser {\n      id\n      name\n      username\n    }\n    ... on ReplyPostNotification {\n      post {\n        id\n        content\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment NotificationItem on Notification {\n    id\n    createdAt\n    fromUser {\n      id\n      name\n      username\n    }\n    ... on ReplyPostNotification {\n      post {\n        id\n        content\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ReplyPostNotificationItem on ReplyPostNotification {\n    id\n    createdAt\n    fromUser {\n      id\n      name\n      username\n    }\n    post {\n      id\n      content\n    }\n  }\n"): (typeof documents)["\n  fragment ReplyPostNotificationItem on ReplyPostNotification {\n    id\n    createdAt\n    fromUser {\n      id\n      name\n      username\n    }\n    post {\n      id\n      content\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PostDetail_QueryFragment on Query {\n    post(id: $id) {\n      id\n      content\n      author {\n        id\n        name\n        username\n      }\n      createdAt\n      replies(data: $dataReplies) {\n        edges {\n          cursor\n          node {\n            ...PostItem\n          }\n        }\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n        }\n        count\n      }\n      likes {\n        count\n        byCurrentUser\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment PostDetail_QueryFragment on Query {\n    post(id: $id) {\n      id\n      content\n      author {\n        id\n        name\n        username\n      }\n      createdAt\n      replies(data: $dataReplies) {\n        edges {\n          cursor\n          node {\n            ...PostItem\n          }\n        }\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n        }\n        count\n      }\n      likes {\n        count\n        byCurrentUser\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PostItem on Post {\n    id\n    content\n    createdAt\n    author {\n      id\n      name\n      username\n    }\n    replies {\n      count\n    }\n    likes {\n      count\n      byCurrentUser\n    }\n  }\n"): (typeof documents)["\n  fragment PostItem on Post {\n    id\n    content\n    createdAt\n    author {\n      id\n      name\n      username\n    }\n    replies {\n      count\n    }\n    likes {\n      count\n      byCurrentUser\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ProfileDetailListPost_QueryFragment on Query {\n    feed(data: $dataFeed) {\n      edges {\n        cursor\n        node {\n          ...PostItem\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment ProfileDetailListPost_QueryFragment on Query {\n    feed(data: $dataFeed) {\n      edges {\n        cursor\n        node {\n          ...PostItem\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation FollowUser($id: ID!) {\n    followUser(id: $id)\n  }\n"): (typeof documents)["\n  mutation FollowUser($id: ID!) {\n    followUser(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UnfollowUser($id: ID!) {\n    unfollowUser(id: $id)\n  }\n"): (typeof documents)["\n  mutation UnfollowUser($id: ID!) {\n    unfollowUser(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment UserDetail_QueryFragment on Query {\n    user(id: $id) @include(if: $includeUser) {\n      id\n      name\n      username\n      createdAt\n      followers {\n        count\n        byCurrentUser\n      }\n      following {\n        count\n        byCurrentUser\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment UserDetail_QueryFragment on Query {\n    user(id: $id) @include(if: $includeUser) {\n      id\n      name\n      username\n      createdAt\n      followers {\n        count\n        byCurrentUser\n      }\n      following {\n        count\n        byCurrentUser\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Me {\n    me {\n      id\n      name\n      username\n      email\n      role\n    }\n  }\n"): (typeof documents)["\n  query Me {\n    me {\n      id\n      name\n      username\n      email\n      role\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;