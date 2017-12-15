import styled from "styled-components";
import { Flex, Box } from "rebass";

export const Header = styled(Flex)`
  min-height: 60px;
  color: white;
  letter-spacing: 2px;
  background: #1da57a;
`;

export const SubHeader = styled(Box)`
  display: flex;
  align-items: center;
  letter-spacing: 2px;
`;

export const RightSubHeader = SubHeader.extend`
  justify-content: flex-end;
`;

export const Container = styled(Box)`
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
`;

export const ToolBarWrapper = styled(Flex)`
  min-height: 32px;
`;
