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
    "\n  query SearchUsers($dataUsers: UsersInput!) {\n    ...Users_QueryFragment\n  }\n": types.SearchUsersDocument,
    "\n  mutation CreateConversation(\n    $data: CreateConversationInput!\n    $dataMessages: MessagesInput!\n  ) {\n    createConversation(data: $data) {\n      id\n      createdAt\n      participants {\n        id\n        name\n        username\n      }\n      messages(data: $dataMessages) {\n        edges {\n          cursor\n          node {\n            id\n            content\n            createdAt\n            sender {\n              id\n              name\n              username\n              avatar\n            }\n          }\n        }\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n        }\n      }\n    }\n  }\n": types.CreateConversationDocument,
    "\n  mutation SendMessage($data: SendMessageInput!) {\n    sendMessage(data: $data) {\n      id\n      content\n      sender {\n        id\n        name\n        username\n        avatar\n      }\n      createdAt\n    }\n  }\n": types.SendMessageDocument,
    "\n  query ConversationDetailScreen($id: ID!, $dataMessages: MessagesInput!) {\n    ...ConversationDetail\n  }\n": types.ConversationDetailScreenDocument,
    "\n  subscription ConversationSubscription($dataMessages: MessagesInput!) {\n    conversationSubscribe {\n      id\n      messages(data: $dataMessages) {\n        edges {\n          cursor\n          node {\n            ...MessageItem\n          }\n        }\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n        }\n      }\n    }\n  }\n": types.ConversationSubscriptionDocument,
    "\n  query ConversationsScreen(\n    $dataConversations: ConversationsInput!\n    $dataMessages: MessagesInput!\n  ) {\n    ...Conversations_QueryFragment\n  }\n": types.ConversationsScreenDocument,
    "\n  query PostScreen($id: ID!, $dataReplies: FeedPostInput!) {\n    ...PostDetail_QueryFragment\n  }\n": types.PostScreenDocument,
    "\n  mutation ReplyPost($data: ReplyPostInput!) {\n    replyPost(data: $data) {\n      ...PostItem\n    }\n  }\n": types.ReplyPostDocument,
    "\n  query HomeScreen($data: FeedPostInput!) {\n    ...Feed_QueryFragment\n  }\n": types.HomeScreenDocument,
    "\n  query User(\n    $id: ID!\n    $dataFeed: FeedPostInput!\n    $includeUser: Boolean = true\n  ) {\n    ...UserDetail_QueryFragment\n    ...ProfileDetailListPost_QueryFragment\n  }\n": types.UserDocument,
    "\n  fragment NotificationSubscribe_SubscriptionFragment on Subscription {\n    notificationSubscribe {\n      ...NotificationItem\n    }\n  }\n": types.NotificationSubscribe_SubscriptionFragmentFragmentDoc,
    "\n  subscription Notification_ScreenSubscription {\n    notificationSubscribe {\n      ...NotificationItem\n    }\n  }\n": types.Notification_ScreenSubscriptionDocument,
    "\n  query Notifications($data: NotificationsInput!) {\n    ...NotificationList_QueryFragment\n  }\n": types.NotificationsDocument,
    "\n  query Search($data: FeedPostInput!) {\n    ...Feed_QueryFragment\n  }\n": types.SearchDocument,
    "\n  mutation CreatePost($data: CreatePostInput!) {\n    createPost(data: $data) {\n      ...PostItem\n    }\n  }\n": types.CreatePostDocument,
    "\n  mutation Login($data: LoginInput!) {\n    login(data: $data) {\n      user {\n        id\n        name\n        username\n        email\n        role\n        avatar\n      }\n      accessToken\n      expirationTime\n    }\n  }\n": types.LoginDocument,
    "\n  fragment UserAvatar on User {\n    id\n    avatar\n  }\n": types.UserAvatarFragmentDoc,
    "\n  fragment Conversations_QueryFragment on Query {\n    conversations(data: $dataConversations) {\n      edges {\n        cursor\n        node {\n          ...ConversationItem\n          messages(data: $dataMessages) {\n            pageInfo {\n              hasPreviousPage\n              hasNextPage\n              startCursor\n              endCursor\n            }\n          }\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n": types.Conversations_QueryFragmentFragmentDoc,
    "\n  fragment ConversationItem on Conversation {\n    id\n    participants {\n      id\n      name\n      username\n      ...UserAvatar\n    }\n    messages(data: $dataMessages) {\n      edges {\n        cursor\n        node {\n          id\n          content\n          sender {\n            id\n            name\n            username\n            ...UserAvatar\n          }\n          createdAt\n        }\n      }\n    }\n  }\n": types.ConversationItemFragmentDoc,
    "\n  fragment Feed_QueryFragment on Query {\n    feed(data: $data) {\n      edges {\n        cursor\n        node {\n          ...PostItem\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n": types.Feed_QueryFragmentFragmentDoc,
    "\n  fragment ConversationDetail on Query {\n    conversation(id: $id) {\n      id\n      participants {\n        id\n        name\n        username\n        ...UserAvatar\n      }\n      messages(data: $dataMessages) {\n        edges {\n          cursor\n          node {\n            ...MessageItem\n          }\n        }\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n        }\n      }\n    }\n  }\n": types.ConversationDetailFragmentDoc,
    "\n  query ConversationMessages($dataMessages: MessagesInput!) {\n    messages(data: $dataMessages) {\n      edges {\n        cursor\n        node {\n          ...MessageItem\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n": types.ConversationMessagesDocument,
    "\n  fragment MessageItem on Message {\n    id\n    content\n    createdAt\n    sender {\n      id\n      name\n      username\n      ...UserAvatar\n    }\n  }\n": types.MessageItemFragmentDoc,
    "\n  fragment NotificationList_QueryFragment on Query {\n    notifications(data: $data) {\n      edges {\n        cursor\n        node {\n          ...NotificationItem\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n": types.NotificationList_QueryFragmentFragmentDoc,
    "\n  fragment NotificationItem on Notification {\n    id\n    createdAt\n    fromUser {\n      id\n      name\n      username\n      ...UserAvatar\n    }\n    ... on ReplyPostNotification {\n      post {\n        id\n        content\n      }\n    }\n  }\n": types.NotificationItemFragmentDoc,
    "\n  fragment ReplyPostNotificationItem on ReplyPostNotification {\n    id\n    createdAt\n    fromUser {\n      id\n      name\n      username\n    }\n    post {\n      id\n      content\n    }\n  }\n": types.ReplyPostNotificationItemFragmentDoc,
    "\n  mutation LikePost($postId: ID!) {\n    likePost(id: $postId)\n  }\n": types.LikePostDocument,
    "\n  mutation UnlikePost($postId: ID!) {\n    unlikePost(id: $postId)\n  }\n": types.UnlikePostDocument,
    "\n  fragment PostDetail_QueryFragment on Query {\n    post(id: $id) {\n      id\n      content\n      author {\n        id\n        name\n        username\n        ...UserAvatar\n      }\n      createdAt\n      replies(data: $dataReplies) {\n        edges {\n          cursor\n          node {\n            ...PostItem\n          }\n        }\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n        }\n        count\n      }\n      likes {\n        count\n        byCurrentUser\n      }\n    }\n  }\n": types.PostDetail_QueryFragmentFragmentDoc,
    "\n  fragment PostItem on Post {\n    id\n    content\n    createdAt\n    author {\n      id\n      name\n      username\n      ...UserAvatar\n    }\n    replies {\n      count\n    }\n    likes {\n      count\n      byCurrentUser\n    }\n  }\n": types.PostItemFragmentDoc,
    "\n  fragment ProfileDetailListPost_QueryFragment on Query {\n    feed(data: $dataFeed) {\n      edges {\n        cursor\n        node {\n          ...PostItem\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n": types.ProfileDetailListPost_QueryFragmentFragmentDoc,
    "\n  mutation FollowUser($id: ID!) {\n    followUser(id: $id)\n  }\n": types.FollowUserDocument,
    "\n  mutation UnfollowUser($id: ID!) {\n    unfollowUser(id: $id)\n  }\n": types.UnfollowUserDocument,
    "\n  fragment UserDetail_QueryFragment on Query {\n    user(id: $id) @include(if: $includeUser) {\n      id\n      name\n      username\n      ...UserAvatar\n      createdAt\n      followers {\n        count\n        byCurrentUser\n      }\n      following {\n        count\n        byCurrentUser\n      }\n    }\n  }\n": types.UserDetail_QueryFragmentFragmentDoc,
    "\n  mutation UploadAvatar($file: File!) {\n    uploadAvatar(file: $file)\n  }\n": types.UploadAvatarDocument,
    "\n  fragment Users_QueryFragment on Query {\n    users(data: $dataUsers) {\n      edges {\n        cursor\n        node {\n          ...UserItem\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n": types.Users_QueryFragmentFragmentDoc,
    "\n  fragment UserItem on User {\n    id\n    name\n    username\n    ...UserAvatar\n  }\n": types.UserItemFragmentDoc,
    "\n  query Me {\n    me {\n      id\n      name\n      username\n      email\n      role\n      ...UserAvatar\n    }\n  }\n": types.MeDocument,
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
export function graphql(source: "\n  query SearchUsers($dataUsers: UsersInput!) {\n    ...Users_QueryFragment\n  }\n"): (typeof documents)["\n  query SearchUsers($dataUsers: UsersInput!) {\n    ...Users_QueryFragment\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateConversation(\n    $data: CreateConversationInput!\n    $dataMessages: MessagesInput!\n  ) {\n    createConversation(data: $data) {\n      id\n      createdAt\n      participants {\n        id\n        name\n        username\n      }\n      messages(data: $dataMessages) {\n        edges {\n          cursor\n          node {\n            id\n            content\n            createdAt\n            sender {\n              id\n              name\n              username\n              avatar\n            }\n          }\n        }\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateConversation(\n    $data: CreateConversationInput!\n    $dataMessages: MessagesInput!\n  ) {\n    createConversation(data: $data) {\n      id\n      createdAt\n      participants {\n        id\n        name\n        username\n      }\n      messages(data: $dataMessages) {\n        edges {\n          cursor\n          node {\n            id\n            content\n            createdAt\n            sender {\n              id\n              name\n              username\n              avatar\n            }\n          }\n        }\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SendMessage($data: SendMessageInput!) {\n    sendMessage(data: $data) {\n      id\n      content\n      sender {\n        id\n        name\n        username\n        avatar\n      }\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation SendMessage($data: SendMessageInput!) {\n    sendMessage(data: $data) {\n      id\n      content\n      sender {\n        id\n        name\n        username\n        avatar\n      }\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ConversationDetailScreen($id: ID!, $dataMessages: MessagesInput!) {\n    ...ConversationDetail\n  }\n"): (typeof documents)["\n  query ConversationDetailScreen($id: ID!, $dataMessages: MessagesInput!) {\n    ...ConversationDetail\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription ConversationSubscription($dataMessages: MessagesInput!) {\n    conversationSubscribe {\n      id\n      messages(data: $dataMessages) {\n        edges {\n          cursor\n          node {\n            ...MessageItem\n          }\n        }\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription ConversationSubscription($dataMessages: MessagesInput!) {\n    conversationSubscribe {\n      id\n      messages(data: $dataMessages) {\n        edges {\n          cursor\n          node {\n            ...MessageItem\n          }\n        }\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ConversationsScreen(\n    $dataConversations: ConversationsInput!\n    $dataMessages: MessagesInput!\n  ) {\n    ...Conversations_QueryFragment\n  }\n"): (typeof documents)["\n  query ConversationsScreen(\n    $dataConversations: ConversationsInput!\n    $dataMessages: MessagesInput!\n  ) {\n    ...Conversations_QueryFragment\n  }\n"];
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
export function graphql(source: "\n  mutation Login($data: LoginInput!) {\n    login(data: $data) {\n      user {\n        id\n        name\n        username\n        email\n        role\n        avatar\n      }\n      accessToken\n      expirationTime\n    }\n  }\n"): (typeof documents)["\n  mutation Login($data: LoginInput!) {\n    login(data: $data) {\n      user {\n        id\n        name\n        username\n        email\n        role\n        avatar\n      }\n      accessToken\n      expirationTime\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment UserAvatar on User {\n    id\n    avatar\n  }\n"): (typeof documents)["\n  fragment UserAvatar on User {\n    id\n    avatar\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Conversations_QueryFragment on Query {\n    conversations(data: $dataConversations) {\n      edges {\n        cursor\n        node {\n          ...ConversationItem\n          messages(data: $dataMessages) {\n            pageInfo {\n              hasPreviousPage\n              hasNextPage\n              startCursor\n              endCursor\n            }\n          }\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment Conversations_QueryFragment on Query {\n    conversations(data: $dataConversations) {\n      edges {\n        cursor\n        node {\n          ...ConversationItem\n          messages(data: $dataMessages) {\n            pageInfo {\n              hasPreviousPage\n              hasNextPage\n              startCursor\n              endCursor\n            }\n          }\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ConversationItem on Conversation {\n    id\n    participants {\n      id\n      name\n      username\n      ...UserAvatar\n    }\n    messages(data: $dataMessages) {\n      edges {\n        cursor\n        node {\n          id\n          content\n          sender {\n            id\n            name\n            username\n            ...UserAvatar\n          }\n          createdAt\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment ConversationItem on Conversation {\n    id\n    participants {\n      id\n      name\n      username\n      ...UserAvatar\n    }\n    messages(data: $dataMessages) {\n      edges {\n        cursor\n        node {\n          id\n          content\n          sender {\n            id\n            name\n            username\n            ...UserAvatar\n          }\n          createdAt\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Feed_QueryFragment on Query {\n    feed(data: $data) {\n      edges {\n        cursor\n        node {\n          ...PostItem\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment Feed_QueryFragment on Query {\n    feed(data: $data) {\n      edges {\n        cursor\n        node {\n          ...PostItem\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ConversationDetail on Query {\n    conversation(id: $id) {\n      id\n      participants {\n        id\n        name\n        username\n        ...UserAvatar\n      }\n      messages(data: $dataMessages) {\n        edges {\n          cursor\n          node {\n            ...MessageItem\n          }\n        }\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment ConversationDetail on Query {\n    conversation(id: $id) {\n      id\n      participants {\n        id\n        name\n        username\n        ...UserAvatar\n      }\n      messages(data: $dataMessages) {\n        edges {\n          cursor\n          node {\n            ...MessageItem\n          }\n        }\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ConversationMessages($dataMessages: MessagesInput!) {\n    messages(data: $dataMessages) {\n      edges {\n        cursor\n        node {\n          ...MessageItem\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n"): (typeof documents)["\n  query ConversationMessages($dataMessages: MessagesInput!) {\n    messages(data: $dataMessages) {\n      edges {\n        cursor\n        node {\n          ...MessageItem\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MessageItem on Message {\n    id\n    content\n    createdAt\n    sender {\n      id\n      name\n      username\n      ...UserAvatar\n    }\n  }\n"): (typeof documents)["\n  fragment MessageItem on Message {\n    id\n    content\n    createdAt\n    sender {\n      id\n      name\n      username\n      ...UserAvatar\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment NotificationList_QueryFragment on Query {\n    notifications(data: $data) {\n      edges {\n        cursor\n        node {\n          ...NotificationItem\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment NotificationList_QueryFragment on Query {\n    notifications(data: $data) {\n      edges {\n        cursor\n        node {\n          ...NotificationItem\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment NotificationItem on Notification {\n    id\n    createdAt\n    fromUser {\n      id\n      name\n      username\n      ...UserAvatar\n    }\n    ... on ReplyPostNotification {\n      post {\n        id\n        content\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment NotificationItem on Notification {\n    id\n    createdAt\n    fromUser {\n      id\n      name\n      username\n      ...UserAvatar\n    }\n    ... on ReplyPostNotification {\n      post {\n        id\n        content\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ReplyPostNotificationItem on ReplyPostNotification {\n    id\n    createdAt\n    fromUser {\n      id\n      name\n      username\n    }\n    post {\n      id\n      content\n    }\n  }\n"): (typeof documents)["\n  fragment ReplyPostNotificationItem on ReplyPostNotification {\n    id\n    createdAt\n    fromUser {\n      id\n      name\n      username\n    }\n    post {\n      id\n      content\n    }\n  }\n"];
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
export function graphql(source: "\n  fragment PostDetail_QueryFragment on Query {\n    post(id: $id) {\n      id\n      content\n      author {\n        id\n        name\n        username\n        ...UserAvatar\n      }\n      createdAt\n      replies(data: $dataReplies) {\n        edges {\n          cursor\n          node {\n            ...PostItem\n          }\n        }\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n        }\n        count\n      }\n      likes {\n        count\n        byCurrentUser\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment PostDetail_QueryFragment on Query {\n    post(id: $id) {\n      id\n      content\n      author {\n        id\n        name\n        username\n        ...UserAvatar\n      }\n      createdAt\n      replies(data: $dataReplies) {\n        edges {\n          cursor\n          node {\n            ...PostItem\n          }\n        }\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n        }\n        count\n      }\n      likes {\n        count\n        byCurrentUser\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PostItem on Post {\n    id\n    content\n    createdAt\n    author {\n      id\n      name\n      username\n      ...UserAvatar\n    }\n    replies {\n      count\n    }\n    likes {\n      count\n      byCurrentUser\n    }\n  }\n"): (typeof documents)["\n  fragment PostItem on Post {\n    id\n    content\n    createdAt\n    author {\n      id\n      name\n      username\n      ...UserAvatar\n    }\n    replies {\n      count\n    }\n    likes {\n      count\n      byCurrentUser\n    }\n  }\n"];
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
export function graphql(source: "\n  fragment UserDetail_QueryFragment on Query {\n    user(id: $id) @include(if: $includeUser) {\n      id\n      name\n      username\n      ...UserAvatar\n      createdAt\n      followers {\n        count\n        byCurrentUser\n      }\n      following {\n        count\n        byCurrentUser\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment UserDetail_QueryFragment on Query {\n    user(id: $id) @include(if: $includeUser) {\n      id\n      name\n      username\n      ...UserAvatar\n      createdAt\n      followers {\n        count\n        byCurrentUser\n      }\n      following {\n        count\n        byCurrentUser\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UploadAvatar($file: File!) {\n    uploadAvatar(file: $file)\n  }\n"): (typeof documents)["\n  mutation UploadAvatar($file: File!) {\n    uploadAvatar(file: $file)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Users_QueryFragment on Query {\n    users(data: $dataUsers) {\n      edges {\n        cursor\n        node {\n          ...UserItem\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment Users_QueryFragment on Query {\n    users(data: $dataUsers) {\n      edges {\n        cursor\n        node {\n          ...UserItem\n        }\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment UserItem on User {\n    id\n    name\n    username\n    ...UserAvatar\n  }\n"): (typeof documents)["\n  fragment UserItem on User {\n    id\n    name\n    username\n    ...UserAvatar\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Me {\n    me {\n      id\n      name\n      username\n      email\n      role\n      ...UserAvatar\n    }\n  }\n"): (typeof documents)["\n  query Me {\n    me {\n      id\n      name\n      username\n      email\n      role\n      ...UserAvatar\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;