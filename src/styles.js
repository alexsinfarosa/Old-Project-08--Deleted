import styled from "styled-components";
import { Icon, Row, Col } from "antd";

export const MenuFold = styled(Icon)`
  font-size: 1.1rem;
  margin-right: 16px;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: #17b890;
  }
`;

export const TableIcons = styled(Icon)`
  width: 100%;
  margin: 0 auto;
  font-size: 1.2em;
  color: #08c;
`;

export const CellWrapper = styled.div`
  display: flex;
  height: 25px;
  align-items: center;
`;

export const CellHeader = styled.div`
  display: flex;
  height: 25px;
  align-items: center;
  justify-content: ${props => (props.center ? "center" : null)};
`;

export const Block = styled.div`
  background: white;
  border-radius: 5px;
  padding: 16px 8px;
`;

export const MBRow = styled(Row)`
  margin-bottom: 16px;
`;

export const MBCol = styled(Col)`
  margin-bottom: 32px;
`;
