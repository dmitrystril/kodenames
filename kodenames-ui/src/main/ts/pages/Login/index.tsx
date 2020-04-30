import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { Pages } from '../../constants/Pages';
import {
  useLoginMutation,
  CurrentUserDocument,
  CurrentUserQuery,
} from '../../generated/graphql';
import { setAccessToken } from '../../../../accessToken';
import ErrorTypes from '../../ErrorTypes';
import { PUZZLE_IMAGE } from '../../../resources/styles/images/svg/svgBase64';
import { Button } from '../../components/shared/Button';

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #4c473f;
  background-size: cover;
  background-image: url(${PUZZLE_IMAGE});
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 3px;
  padding: 2em;
  box-shadow: 0px 0px 27px 4px rgba(0, 0, 0, 0.75);
  border: 1px solid black;
  min-width: 350px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const InputLabel = styled.label`
  font-size: 1rem;
  margin-bottom: 5px;
`;

const TextInput = styled.input`
  border: 1px solid silver;
  border-radius: 3px;
  padding: 7px;
  outline: 0;
  font-size: 1rem;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 15px;
`;

const SignupLink = styled.div`
  font-size: 0.9rem;
  text-align: right;
  margin-top: 20px;
`;

const Controls = styled.div`
  margin-top: 10px;
`;

const CustomButton = styled(Button)`
  background-color: rgb(128, 120, 107, 0.3);
`;

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useLoginMutation();
  const history = useHistory();

  const handleSumbit = async (event: any) => {
    event.preventDefault();
    const response = await login({
      variables: {
        email,
        password,
      },
      update: (store, { data }) => {
        if (!data) {
          return null;
        }

        store.writeQuery<CurrentUserQuery>({
          query: CurrentUserDocument,
          data: {
            currentUser: data.login.user,
          },
        });
      },
    }).catch((error) => {
      if (error.message.includes(ErrorTypes.USER_NOT_FOUND)) {
        alert(ErrorTypes.USER_NOT_FOUND);
      } else if (error.message.includes(ErrorTypes.PASSWORD_IS_INCORRECT)) {
        alert(ErrorTypes.PASSWORD_IS_INCORRECT);
      }
    });

    if (response && response.data) {
      setAccessToken(response.data!.login.accessToken);
      history.push(Pages.LOBBY);
    }
  };

  return (
    <Root>
      <LoginForm onSubmit={handleSumbit}>
        <Title>Log In</Title>

        <InputGroup>
          <InputLabel htmlFor="email">Email:</InputLabel>
          <TextInput
            name="email"
            type="email"
            placeholder="jane@mail.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <InputLabel htmlFor="password">Password:</InputLabel>
          <TextInput
            name="password"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>

        <SignupLink>
          Don't have an account?
          <Link to={Pages.REGISTER}>
            <br />
            Sign Up
          </Link>
        </SignupLink>

        <Controls>
          <CustomButton type="submit">Log in</CustomButton>
        </Controls>
      </LoginForm>
    </Root>
  );
};
