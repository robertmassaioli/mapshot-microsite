import React from 'react';
import styled from '@emotion/styled';

export const AppContainer = styled.div`
   padding-left: ${props => (props.theme as any).spacing(3)};
   padding-right: ${props => (props.theme as any).spacing(3)};
`;