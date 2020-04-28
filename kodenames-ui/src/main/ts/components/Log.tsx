import React from 'react';
import styled from 'styled-components';

import { PanelLayout } from './PanelLayout';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 170px;
  margin-right: 10px;
  flex-basis: 25%;
`;

const LogList = styled.div`
  width: 100%;
  flex: 1;
  border: 1px solid #332f2a;
  background-color: #fdfbf4;
  overflow-y: scroll;
`;

export const Log = () => {
  return (
    <Root>
      <PanelLayout title="Game Log">
        <LogList />
      </PanelLayout>
    </Root>
  );
};
