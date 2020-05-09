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
  currentUser?: Maybe<User>;
  rooms: Array<Room>;
  currentRoom?: Maybe<Room>;
  toBeDeleted: Scalars['String'];
};

export type User = {
   __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  userName: Scalars['String'];
  player: Player;
  room: Room;
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
  users: Array<User>;
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

export type CurrentRoomQueryVariables = {};


export type CurrentRoomQuery = (
  { __typename?: 'Query' }
  & { currentRoom?: Maybe<(
    { __typename?: 'Room' }
    & Pick<Room, 'id' | 'no'>
    & { game: (
      { __typename?: 'Game' }
      & Pick<Game, 'id' | 'dateCreated'>
      & { cards: Array<(
        { __typename?: 'Card' }
        & Pick<Card, 'id' | 'type' | 'word' | 'isOpen' | 'isActive'>
      )>, players: Array<(
        { __typename?: 'Player' }
        & Pick<Player, 'id' | 'team'>
      )> }
    ) }
  )> }
);

export type CurrentUserQueryVariables = {};


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'userName'>
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
    & { users: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'userName' | 'email'>
      & { player: (
        { __typename?: 'Player' }
        & Pick<Player, 'id'>
      ) }
    )> }
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
export const CurrentRoomDocument = gql`
    query currentRoom {
  currentRoom {
    id
    no
    game {
      id
      cards {
        id
        type
        word
        isOpen
        isActive
      }
      players {
        id
        team
      }
      dateCreated
    }
  }
}
    `;

/**
 * __useCurrentRoomQuery__
 *
 * To run a query within a React component, call `useCurrentRoomQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentRoomQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentRoomQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentRoomQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CurrentRoomQuery, CurrentRoomQueryVariables>) {
        return ApolloReactHooks.useQuery<CurrentRoomQuery, CurrentRoomQueryVariables>(CurrentRoomDocument, baseOptions);
      }
export function useCurrentRoomLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CurrentRoomQuery, CurrentRoomQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CurrentRoomQuery, CurrentRoomQueryVariables>(CurrentRoomDocument, baseOptions);
        }
export type CurrentRoomQueryHookResult = ReturnType<typeof useCurrentRoomQuery>;
export type CurrentRoomLazyQueryHookResult = ReturnType<typeof useCurrentRoomLazyQuery>;
export type CurrentRoomQueryResult = ApolloReactCommon.QueryResult<CurrentRoomQuery, CurrentRoomQueryVariables>;
export const CurrentUserDocument = gql`
    query currentUser {
  currentUser {
    id
    email
    userName
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        return ApolloReactHooks.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
      }
export function useCurrentUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = ApolloReactCommon.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
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