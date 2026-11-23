import styled from 'styled-components';

export const VisuallyHiddenRoot = styled.span`
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;
