import React, { useState } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import styled from 'styled-components';

import { Pages } from '../../constants/Pages';
import { useRegisterMutation } from '../../generated/graphql';
import ErrorTypes from '../../ErrorTypes';
import { PUZZLE_IMAGE } from '../../../resources/styles/images/svg/svgBase64';

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #4c473f;
  background-size: cover;
  background-image: url(${PUZZLE_IMAGE});
`;

const SignupForm = styled.form`
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

const Button = styled.input`
  border: 1px solid silver;
  border-radius: 3px;
  font-size: 1rem;
  padding: 5px 10px;
  cursor: pointer;
`;

export const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register] = useRegisterMutation();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const isRegistered = await register({
      variables: {
        email,
        password,
      },
    }).catch((error) => {
      if (error.message.includes(ErrorTypes.EMAIL_IS_ALREADY_TAKEN)) {
        alert(ErrorTypes.EMAIL_IS_ALREADY_TAKEN);
      }
    });

    if (isRegistered) {
      history.push(Pages.LOGIN);
    }
  };

  return (
    <Root>
      <SignupForm onSubmit={handleSubmit}>
        <Title>Sign Up</Title>

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
          Already have an account?
          <Link to={Pages.LOGIN}>
            <br />
            Log In
          </Link>
        </SignupLink>

        <Controls>
          <Button type="submit" value="Sing Up" />
        </Controls>
      </SignupForm>
    </Root>
  );
};
