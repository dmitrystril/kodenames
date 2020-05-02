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
};

export type Query = {
   __typename?: 'Query';
  currentUser?: Maybe<User>;
  games: Array<Game>;
  currentGame?: Maybe<Game>;
};

export type User = {
   __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  userName: Scalars['String'];
  game: Game;
};

export type Game = {
   __typename?: 'Game';
  id: Scalars['ID'];
  no: Scalars['Int'];
  users: Array<User>;
};

export type Mutation = {
   __typename?: 'Mutation';
  register: Scalars['Boolean'];
  login: LoginResponse;
  revokeRefreshTokensForUser: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  createGame: Game;
  joinGame: Game;
  quitGame: Scalars['Boolean'];
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


export type MutationJoinGameArgs = {
  gameId: Scalars['String'];
};


export type MutationQuitGameArgs = {
  gameId: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  userName?: Maybe<Scalars['String']>;
};

export type LoginResponse = {
   __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  user: User;
};

export type CreateGameMutationVariables = {};


export type CreateGameMutation = (
  { __typename?: 'Mutation' }
  & { createGame: (
    { __typename?: 'Game' }
    & Pick<Game, 'id'>
  ) }
);

export type CurrentGameQueryVariables = {};


export type CurrentGameQuery = (
  { __typename?: 'Query' }
  & { currentGame?: Maybe<(
    { __typename?: 'Game' }
    & Pick<Game, 'id'>
    & { users: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'userName'>
    )> }
  )> }
);

export type CurrentGameIdQueryVariables = {};


export type CurrentGameIdQuery = (
  { __typename?: 'Query' }
  & { currentGame?: Maybe<(
    { __typename?: 'Game' }
    & Pick<Game, 'id'>
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

export type GamesQueryVariables = {};


export type GamesQuery = (
  { __typename?: 'Query' }
  & { games: Array<(
    { __typename?: 'Game' }
    & Pick<Game, 'id' | 'no'>
    & { users: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'userName' | 'email'>
    )> }
  )> }
);

export type JoinGameMutationVariables = {
  gameId: Scalars['String'];
};


export type JoinGameMutation = (
  { __typename?: 'Mutation' }
  & { joinGame: (
    { __typename?: 'Game' }
    & Pick<Game, 'id'>
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

export type QuitGameMutationVariables = {
  gameId: Scalars['String'];
};


export type QuitGameMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'quitGame'>
);

export type RegisterMutationVariables = {
  input: RegisterInput;
};


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'register'>
);


export const CreateGameDocument = gql`
    mutation createGame {
  createGame {
    id
  }
}
    `;
export type CreateGameMutationFn = ApolloReactCommon.MutationFunction<CreateGameMutation, CreateGameMutationVariables>;

/**
 * __useCreateGameMutation__
 *
 * To run a mutation, you first call `useCreateGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGameMutation, { data, loading, error }] = useCreateGameMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateGameMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateGameMutation, CreateGameMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateGameMutation, CreateGameMutationVariables>(CreateGameDocument, baseOptions);
      }
export type CreateGameMutationHookResult = ReturnType<typeof useCreateGameMutation>;
export type CreateGameMutationResult = ApolloReactCommon.MutationResult<CreateGameMutation>;
export type CreateGameMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateGameMutation, CreateGameMutationVariables>;
export const CurrentGameDocument = gql`
    query currentGame {
  currentGame {
    id
    users {
      id
      email
      userName
    }
  }
}
    `;

/**
 * __useCurrentGameQuery__
 *
 * To run a query within a React component, call `useCurrentGameQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentGameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentGameQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentGameQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CurrentGameQuery, CurrentGameQueryVariables>) {
        return ApolloReactHooks.useQuery<CurrentGameQuery, CurrentGameQueryVariables>(CurrentGameDocument, baseOptions);
      }
export function useCurrentGameLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CurrentGameQuery, CurrentGameQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CurrentGameQuery, CurrentGameQueryVariables>(CurrentGameDocument, baseOptions);
        }
export type CurrentGameQueryHookResult = ReturnType<typeof useCurrentGameQuery>;
export type CurrentGameLazyQueryHookResult = ReturnType<typeof useCurrentGameLazyQuery>;
export type CurrentGameQueryResult = ApolloReactCommon.QueryResult<CurrentGameQuery, CurrentGameQueryVariables>;
export const CurrentGameIdDocument = gql`
    query currentGameId {
  currentGame {
    id
  }
}
    `;

/**
 * __useCurrentGameIdQuery__
 *
 * To run a query within a React component, call `useCurrentGameIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentGameIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentGameIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentGameIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CurrentGameIdQuery, CurrentGameIdQueryVariables>) {
        return ApolloReactHooks.useQuery<CurrentGameIdQuery, CurrentGameIdQueryVariables>(CurrentGameIdDocument, baseOptions);
      }
export function useCurrentGameIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CurrentGameIdQuery, CurrentGameIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CurrentGameIdQuery, CurrentGameIdQueryVariables>(CurrentGameIdDocument, baseOptions);
        }
export type CurrentGameIdQueryHookResult = ReturnType<typeof useCurrentGameIdQuery>;
export type CurrentGameIdLazyQueryHookResult = ReturnType<typeof useCurrentGameIdLazyQuery>;
export type CurrentGameIdQueryResult = ApolloReactCommon.QueryResult<CurrentGameIdQuery, CurrentGameIdQueryVariables>;
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
export const GamesDocument = gql`
    query Games {
  games {
    id
    no
    users {
      id
      userName
      email
    }
  }
}
    `;

/**
 * __useGamesQuery__
 *
 * To run a query within a React component, call `useGamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGamesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGamesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GamesQuery, GamesQueryVariables>) {
        return ApolloReactHooks.useQuery<GamesQuery, GamesQueryVariables>(GamesDocument, baseOptions);
      }
export function useGamesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GamesQuery, GamesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GamesQuery, GamesQueryVariables>(GamesDocument, baseOptions);
        }
export type GamesQueryHookResult = ReturnType<typeof useGamesQuery>;
export type GamesLazyQueryHookResult = ReturnType<typeof useGamesLazyQuery>;
export type GamesQueryResult = ApolloReactCommon.QueryResult<GamesQuery, GamesQueryVariables>;
export const JoinGameDocument = gql`
    mutation joinGame($gameId: String!) {
  joinGame(gameId: $gameId) {
    id
  }
}
    `;
export type JoinGameMutationFn = ApolloReactCommon.MutationFunction<JoinGameMutation, JoinGameMutationVariables>;

/**
 * __useJoinGameMutation__
 *
 * To run a mutation, you first call `useJoinGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinGameMutation, { data, loading, error }] = useJoinGameMutation({
 *   variables: {
 *      gameId: // value for 'gameId'
 *   },
 * });
 */
export function useJoinGameMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<JoinGameMutation, JoinGameMutationVariables>) {
        return ApolloReactHooks.useMutation<JoinGameMutation, JoinGameMutationVariables>(JoinGameDocument, baseOptions);
      }
export type JoinGameMutationHookResult = ReturnType<typeof useJoinGameMutation>;
export type JoinGameMutationResult = ApolloReactCommon.MutationResult<JoinGameMutation>;
export type JoinGameMutationOptions = ApolloReactCommon.BaseMutationOptions<JoinGameMutation, JoinGameMutationVariables>;
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
export const QuitGameDocument = gql`
    mutation quitGame($gameId: String!) {
  quitGame(gameId: $gameId)
}
    `;
export type QuitGameMutationFn = ApolloReactCommon.MutationFunction<QuitGameMutation, QuitGameMutationVariables>;

/**
 * __useQuitGameMutation__
 *
 * To run a mutation, you first call `useQuitGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useQuitGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [quitGameMutation, { data, loading, error }] = useQuitGameMutation({
 *   variables: {
 *      gameId: // value for 'gameId'
 *   },
 * });
 */
export function useQuitGameMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<QuitGameMutation, QuitGameMutationVariables>) {
        return ApolloReactHooks.useMutation<QuitGameMutation, QuitGameMutationVariables>(QuitGameDocument, baseOptions);
      }
export type QuitGameMutationHookResult = ReturnType<typeof useQuitGameMutation>;
export type QuitGameMutationResult = ApolloReactCommon.MutationResult<QuitGameMutation>;
export type QuitGameMutationOptions = ApolloReactCommon.BaseMutationOptions<QuitGameMutation, QuitGameMutationVariables>;
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