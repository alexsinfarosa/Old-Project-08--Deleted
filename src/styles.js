import styled from "styled-components";
import { Box } from "rebass";
import { Icon } from "antd";

export const MenuFold = styled(Icon)`
  font-size: 1.1rem;
  margin-right: 16px;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: #108ee9;
  }
`;
