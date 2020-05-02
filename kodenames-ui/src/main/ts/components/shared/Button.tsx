import React from 'react';
import styled from 'styled-components';

const Root = styled.button`
  border: 0;
  border-radius: 3px;
  padding: 0.3em 1em;
  font-size: 0.9rem;
  cursor: pointer;
  box-shadow: inset 0px 0px 1px 1px rgba(76, 71, 63, 0.5);
  :hover {
    box-shadow: inset 0px 0px 2px 2px rgba(76, 71, 63, 0.5);
  }
`;

interface IButtonProps {}

export const Button: React.FC<
  IButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, ...props }) => <Root {...props}>{children} </Root>;
