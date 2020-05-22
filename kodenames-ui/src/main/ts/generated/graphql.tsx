import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
   __typename?: 'Query';
  user?: Maybe<User>;
  rooms: Array<Room>;
};

export type User = {
   __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  userName: Scalars['String'];
  player: Player;
  room?: Maybe<Room>;
};

export type Player = {
   __typename?: 'Player';
  id: Scalars['ID'];
  game: Game;
  team?: Maybe<TeamType>;
};

export type Game = {
   __typename?: 'Game';
  id: Scalars['ID'];
  cards: Array<Card>;
  players: Array<Player>;
  dateCreated: Scalars['DateTime'];
};

export type Card = {
   __typename?: 'Card';
  id: Scalars['ID'];
  no: Scalars['Int'];
  word: Scalars['String'];
  type: CardType;
  game: Game;
  isOpen: Scalars['Boolean'];
  isActive: Scalars['Boolean'];
};

export enum CardType {
  Red = 'RED',
  Blue = 'BLUE',
  White = 'WHITE',
  Black = 'BLACK'
}


export enum TeamType {
  Red = 'RED',
  Blue = 'BLUE'
}

export type Room = {
   __typename?: 'Room';
  id: Scalars['ID'];
  no: Scalars['Int'];
  users?: Maybe<Array<User>>;
  game: Game;
};

export type Mutation = {
   __typename?: 'Mutation';
  register: Scalars['Boolean'];
  login: LoginResponse;
  revokeRefreshTokensForUser: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  createRoom: Room;
  joinRoom: Room;
  quitRoom: Scalars['Boolean'];
  createGame: Scalars['Boolean'];
  openCard: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationRevokeRefreshTokensForUserArgs = {
  userId: Scalars['String'];
};


export type MutationJoinRoomArgs = {
  roomId: Scalars['String'];
};


export type MutationQuitRoomArgs = {
  roomId: Scalars['String'];
};


export type MutationOpenCardArgs = {
  cardId: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  userName: Scalars['String'];
};

export type LoginResponse = {
   __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  user: User;
};

export type Subscription = {
   __typename?: 'Subscription';
  subscribeToGameChange: GameChangeNotification;
};

export type GameChangeNotification = {
   __typename?: 'GameChangeNotification';
  changeType: GameChangeType;
  change: GameChange;
};

export enum GameChangeType {
  CardOpen = 'CARD_OPEN',
  LogEntryAdd = 'LOG_ENTRY_ADD'
}

export type GameChange = CardOpen | LogEntryAdd;

export type CardOpen = {
   __typename?: 'CardOpen';
  cardId: Scalars['String'];
};

export type LogEntryAdd = {
   __typename?: 'LogEntryAdd';
  logEntry: Scalars['String'];
};

export type Dictionary = {
   __typename?: 'Dictionary';
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  words: Scalars['String'];
};

export type CreateRoomMutationVariables = {};


export type CreateRoomMutation = (
  { __typename?: 'Mutation' }
  & { createRoom: (
    { __typename?: 'Room' }
    & Pick<Room, 'id'>
  ) }
);

export type FullUserQueryVariables = {};


export type FullUserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'userName'>
    & { player: (
      { __typename?: 'Player' }
      & Pick<Player, 'id' | 'team'>
    ), room?: Maybe<(
      { __typename?: 'Room' }
      & Pick<Room, 'id' | 'no'>
      & { users?: Maybe<Array<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'email' | 'userName'>
        & { player: (
          { __typename?: 'Player' }
          & Pick<Player, 'id' | 'team'>
        ) }
      )>>, game: (
        { __typename?: 'Game' }
        & Pick<Game, 'id' | 'dateCreated'>
        & { cards: Array<(
          { __typename?: 'Card' }
          & Pick<Card, 'id' | 'no' | 'word' | 'type' | 'isOpen' | 'isActive'>
        )> }
      ) }
    )> }
  )> }
);

export type JoinRoomMutationVariables = {
  roomId: Scalars['String'];
};


export type JoinRoomMutation = (
  { __typename?: 'Mutation' }
  & { joinRoom: (
    { __typename?: 'Room' }
    & Pick<Room, 'id'>
  ) }
);

export type LoginMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'userName'>
    ) }
  ) }
);

export type LogoutMutationVariables = {};


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type OpenCardMutationVariables = {
  cardId: Scalars['String'];
};


export type OpenCardMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'openCard'>
);

export type QuitRoomMutationVariables = {
  roomId: Scalars['String'];
};


export type QuitRoomMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'quitRoom'>
);

export type RegisterMutationVariables = {
  input: RegisterInput;
};


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'register'>
);

export type RoomsQueryVariables = {};


export type RoomsQuery = (
  { __typename?: 'Query' }
  & { rooms: Array<(
    { __typename?: 'Room' }
    & Pick<Room, 'id' | 'no'>
    & { users?: Maybe<Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'userName' | 'email'>
      & { player: (
        { __typename?: 'Player' }
        & Pick<Player, 'id'>
      ) }
    )>> }
  )> }
);

export type SubscribeToGameChangeSubscriptionVariables = {};


export type SubscribeToGameChangeSubscription = (
  { __typename?: 'Subscription' }
  & { subscribeToGameChange: (
    { __typename?: 'GameChangeNotification' }
    & Pick<GameChangeNotification, 'changeType'>
    & { change: (
      { __typename: 'CardOpen' }
      & Pick<CardOpen, 'cardId'>
    ) | (
      { __typename: 'LogEntryAdd' }
      & Pick<LogEntryAdd, 'logEntry'>
    ) }
  ) }
);

export type UserQueryVariables = {};


export type UserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'userName'>
  )> }
);


export const CreateRoomDocument = gql`
    mutation createRoom {
  createRoom {
    id
  }
}
    `;
export type CreateRoomMutationFn = ApolloReactCommon.MutationFunction<CreateRoomMutation, CreateRoomMutationVariables>;

/**
 * __useCreateRoomMutation__
 *
 * To run a mutation, you first call `useCreateRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRoomMutation, { data, loading, error }] = useCreateRoomMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateRoomMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateRoomMutation, CreateRoomMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateRoomMutation, CreateRoomMutationVariables>(CreateRoomDocument, baseOptions);
      }
export type CreateRoomMutationHookResult = ReturnType<typeof useCreateRoomMutation>;
export type CreateRoomMutationResult = ApolloReactCommon.MutationResult<CreateRoomMutation>;
export type CreateRoomMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateRoomMutation, CreateRoomMutationVariables>;
export const FullUserDocument = gql`
    query fullUser {
  user {
    id
    email
    userName
    player {
      id
      team
    }
    room {
      id
      no
      users {
        id
        email
        userName
        player {
          id
          team
        }
      }
      game {
        id
        cards {
          id
          no
          word
          type
          isOpen
          isActive
        }
        dateCreated
      }
    }
  }
}
    `;

/**
 * __useFullUserQuery__
 *
 * To run a query within a React component, call `useFullUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFullUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFullUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useFullUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FullUserQuery, FullUserQueryVariables>) {
        return ApolloReactHooks.useQuery<FullUserQuery, FullUserQueryVariables>(FullUserDocument, baseOptions);
      }
export function useFullUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FullUserQuery, FullUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<FullUserQuery, FullUserQueryVariables>(FullUserDocument, baseOptions);
        }
export type FullUserQueryHookResult = ReturnType<typeof useFullUserQuery>;
export type FullUserLazyQueryHookResult = ReturnType<typeof useFullUserLazyQuery>;
export type FullUserQueryResult = ApolloReactCommon.QueryResult<FullUserQuery, FullUserQueryVariables>;
export const JoinRoomDocument = gql`
    mutation joinRoom($roomId: String!) {
  joinRoom(roomId: $roomId) {
    id
  }
}
    `;
export type JoinRoomMutationFn = ApolloReactCommon.MutationFunction<JoinRoomMutation, JoinRoomMutationVariables>;

/**
 * __useJoinRoomMutation__
 *
 * To run a mutation, you first call `useJoinRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinRoomMutation, { data, loading, error }] = useJoinRoomMutation({
 *   variables: {
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useJoinRoomMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<JoinRoomMutation, JoinRoomMutationVariables>) {
        return ApolloReactHooks.useMutation<JoinRoomMutation, JoinRoomMutationVariables>(JoinRoomDocument, baseOptions);
      }
export type JoinRoomMutationHookResult = ReturnType<typeof useJoinRoomMutation>;
export type JoinRoomMutationResult = ApolloReactCommon.MutationResult<JoinRoomMutation>;
export type JoinRoomMutationOptions = ApolloReactCommon.BaseMutationOptions<JoinRoomMutation, JoinRoomMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
    user {
      id
      email
      userName
    }
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const OpenCardDocument = gql`
    mutation openCard($cardId: String!) {
  openCard(cardId: $cardId)
}
    `;
export type OpenCardMutationFn = ApolloReactCommon.MutationFunction<OpenCardMutation, OpenCardMutationVariables>;

/**
 * __useOpenCardMutation__
 *
 * To run a mutation, you first call `useOpenCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOpenCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [openCardMutation, { data, loading, error }] = useOpenCardMutation({
 *   variables: {
 *      cardId: // value for 'cardId'
 *   },
 * });
 */
export function useOpenCardMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<OpenCardMutation, OpenCardMutationVariables>) {
        return ApolloReactHooks.useMutation<OpenCardMutation, OpenCardMutationVariables>(OpenCardDocument, baseOptions);
      }
export type OpenCardMutationHookResult = ReturnType<typeof useOpenCardMutation>;
export type OpenCardMutationResult = ApolloReactCommon.MutationResult<OpenCardMutation>;
export type OpenCardMutationOptions = ApolloReactCommon.BaseMutationOptions<OpenCardMutation, OpenCardMutationVariables>;
export const QuitRoomDocument = gql`
    mutation quitRoom($roomId: String!) {
  quitRoom(roomId: $roomId)
}
    `;
export type QuitRoomMutationFn = ApolloReactCommon.MutationFunction<QuitRoomMutation, QuitRoomMutationVariables>;

/**
 * __useQuitRoomMutation__
 *
 * To run a mutation, you first call `useQuitRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useQuitRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [quitRoomMutation, { data, loading, error }] = useQuitRoomMutation({
 *   variables: {
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useQuitRoomMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<QuitRoomMutation, QuitRoomMutationVariables>) {
        return ApolloReactHooks.useMutation<QuitRoomMutation, QuitRoomMutationVariables>(QuitRoomDocument, baseOptions);
      }
export type QuitRoomMutationHookResult = ReturnType<typeof useQuitRoomMutation>;
export type QuitRoomMutationResult = ApolloReactCommon.MutationResult<QuitRoomMutation>;
export type QuitRoomMutationOptions = ApolloReactCommon.BaseMutationOptions<QuitRoomMutation, QuitRoomMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($input: RegisterInput!) {
  register(input: $input)
}
    `;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const RoomsDocument = gql`
    query Rooms {
  rooms {
    id
    no
    users {
      id
      userName
      email
      player {
        id
      }
    }
  }
}
    `;

/**
 * __useRoomsQuery__
 *
 * To run a query within a React component, call `useRoomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRoomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoomsQuery({
 *   variables: {
 *   },
 * });
 */
export function useRoomsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RoomsQuery, RoomsQueryVariables>) {
        return ApolloReactHooks.useQuery<RoomsQuery, RoomsQueryVariables>(RoomsDocument, baseOptions);
      }
export function useRoomsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RoomsQuery, RoomsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<RoomsQuery, RoomsQueryVariables>(RoomsDocument, baseOptions);
        }
export type RoomsQueryHookResult = ReturnType<typeof useRoomsQuery>;
export type RoomsLazyQueryHookResult = ReturnType<typeof useRoomsLazyQuery>;
export type RoomsQueryResult = ApolloReactCommon.QueryResult<RoomsQuery, RoomsQueryVariables>;
export const SubscribeToGameChangeDocument = gql`
    subscription subscribeToGameChange {
  subscribeToGameChange {
    changeType
    change {
      __typename
      ... on CardOpen {
        cardId
      }
      ... on LogEntryAdd {
        logEntry
      }
    }
  }
}
    `;

/**
 * __useSubscribeToGameChangeSubscription__
 *
 * To run a query within a React component, call `useSubscribeToGameChangeSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeToGameChangeSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeToGameChangeSubscription({
 *   variables: {
 *   },
 * });
 */
export function useSubscribeToGameChangeSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<SubscribeToGameChangeSubscription, SubscribeToGameChangeSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<SubscribeToGameChangeSubscription, SubscribeToGameChangeSubscriptionVariables>(SubscribeToGameChangeDocument, baseOptions);
      }
export type SubscribeToGameChangeSubscriptionHookResult = ReturnType<typeof useSubscribeToGameChangeSubscription>;
export type SubscribeToGameChangeSubscriptionResult = ApolloReactCommon.SubscriptionResult<SubscribeToGameChangeSubscription>;
export const UserDocument = gql`
    query user {
  user {
    id
    email
    userName
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserQuery, UserQueryVariables>) {
        return ApolloReactHooks.useQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
      }
export function useUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = ApolloReactCommon.QueryResult<UserQuery, UserQueryVariables>;