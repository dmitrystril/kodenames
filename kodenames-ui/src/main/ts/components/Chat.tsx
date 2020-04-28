import React from 'react';
import styled from 'styled-components';

import { PanelLayout } from './PanelLayout';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MessageList = styled.div`
  width: 100%;
  flex: 1;
  border: 1px solid #332f2a;
  background-color: #fdfbf4;
  overflow-y: scroll;
`;

const InputMessage = styled.textarea`
  height: 45px;
  min-height: 45px;
  border: 1px solid #332f2a;
  resize: none;
  outline: 0;
  margin-top: 3px;
`;

export const Chat = () => {
  return (
    <Root>
      <PanelLayout title="Global Chat">
        <MessageList />
        <InputMessage placeholder="Enter message ..."/>
      </PanelLayout>
    </Root>
  );
};
