import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccbfaa;
  border-radius: 3px;
  height: 100%;
  background-color: #ccbfaa;
  padding: 2px;
`;

const Title = styled.h6`
  font-size: 0.9rem;
  font-weight: 600;
  padding: 2px 0;
  user-select: none;
`;

interface PanelLayoutProps {
  title: string;
  children: React.ReactNode;
}

export const PanelLayout: React.FC<PanelLayoutProps> = (
  props: PanelLayoutProps,
) => (
  <Root>
    <Title>{props.title}</Title>
    {props.children}
  </Root>
);
