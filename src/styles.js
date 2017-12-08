import styled from "styled-components";
import { Row, Col } from "antd";

export const Header = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 85px;
  padding: 16px;
  background: #8ec9f2;
  & > div {
    color: white;
    font-size: 1.2rem;
    letter-spacing: 1px;
  }
  @media (max-width: 481px) {
    flex-direction: column;
    & > div {
      color: white;
      font-size: 0.9rem;
      letter-spacing: 1px;
      margin-bottom: 8px;
    }
    & > img {
      display: none;
    }
  }
`;

export const NewaIcon = styled.img`
  fill: white !important;
  font-size: 1rem;
  height: 30px;
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
