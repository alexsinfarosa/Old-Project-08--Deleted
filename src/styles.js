import styled from "styled-components";
import { Row, Col } from "antd";
import { Flex, Box } from "rebass";

export const Header2 = styled.section`
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
  margin-bottom: 16px;
`;

export const Header = styled(Flex)`
  min-height: 60px;
  color: white;
  letter-spacing: 2px;
  background: teal;
`;

export const SubHeader = styled(Box)`
  display: flex;
  justify-content: ${prop => (prop.right ? "flex-end" : "flex-start")};
  align-items: center;
  letter-spacing: 2px;
`;

export const Container = styled(Box)`
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  background: #eee;
`;
