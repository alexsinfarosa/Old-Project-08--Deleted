import styled from "styled-components";
import { Icon, Row, Col } from "antd";

export const Header = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 85px;
  padding: 16px;
  background: #8ecec1;
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
