import styled from "styled-components";

// screen sizes
const sm = "576px";
const md = "768px";
const lg = "1024px";
// font
// const font = "12px";
const fontSm = "14px";
const fontMd = "18px";
// paddings
// const padding = "8px";
const paddingSm = "16px";
const paddingMd = "24px";
// margins
const margin = "16px";
const marginSm = "32px";
const marginMd = "48px";

export const Row = styled.section`
  display: flex;
  justify-content: center;

  @media (min-width: ${sm}) {
    justify-content: space-between;
  }

  @media (min-width: ${md}) {
    justify-content: space-between;
  }
`;

export const Col = styled.div`
  flex: 1 1 auto;
  text-align: ${props => (props.right ? "right" : null)};
`;

export const ColMb = styled.div`
  margin-bottom: ${margin};

  @media (min-width: ${sm}) {
    margin-bottom: ${margin};
  }

  @media (min-width: ${md}) {
    margin-bottom: ${margin};
  }
`;

export const Header = Row.extend`
  background: #1da57a;
  margin-bottom: ${marginSm};

  @media (min-width: ${sm}) {
    margin-bottom: ${marginSm};
  }

  @media (min-width: ${md}) {
    margin-bottom: ${marginMd};
  }
`;

export const SubHeader = styled.div`
  font-size: ${fontSm};
  padding: ${paddingSm};
  letter-spacing: 1px;
  color: white;

  @media (min-width: ${sm}) {
    font-size: ${fontSm};
    padding: ${paddingSm};
    justify-content: flex-start;
  }

  @media (min-width: ${md}) {
    font-size: ${fontMd};
    padding: ${paddingMd};
    justify-content: flex-start;
  }
`;

export const SubHeaderRight = SubHeader.extend`
  display: none;

  @media (min-width: ${sm}) {
    display: flex;
  }

  @media (min-width: ${md}) {
    display: flex;
  }
`;

export const ToolBarWrapper = Row.extend`
  margin-left: ${margin};
  margin-right: ${margin};
  margin-bottom: ${marginSm};

  @media (min-width: ${sm}) {
    margin-left: ${marginSm};
    margin-right: ${marginSm};
    margin-bottom: ${marginSm};
  }

  @media (min-width: ${md}) {
    margin-left: ${marginMd};
    margin-right: ${marginMd};
    margin-bottom: ${marginMd};
  }
`;

export const Main = styled.section`
  display: flex;
  flex-direction: column;
  margin-left: ${margin};
  margin-right: ${margin};

  @media (min-width: ${sm}) {
    margin-left: ${marginSm};
    margin-right: ${marginSm};
  }

  @media (min-width: ${md}) {
    margin-left: ${marginMd};
    margin-right: ${marginMd};
  }

  @media (min-width: ${lg}) {
    margin: ${marginSm} auto;
    max-width: ${lg};
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${margin};

  @media (min-width: ${sm}) {
    margin-bottom: ${marginSm};
  }

  @media (min-width: ${md}) {
    margin-bottom: ${marginSm};
  }

  @media (min-width: ${lg}) {
    margin-bottom: ${marginMd};
  }
`;

export const SectionMap = Section.extend`
  width: 100%;
  height: 25vh;

  @media (min-width: ${sm}) {
    height: 30vh;
  }

  @media (min-width: ${md}) {
    height: 35vh;
  }

  @media (min-width: ${lg}) {
    height: 35vh;
  }
`;

export const BlockWrapper = Section.extend`
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 8px;
`;

export const BHeader = styled.div`
  background: #4ea27d;
  color: #fff;
  padding: 8px 16px;
  border-radius: 4px;
  margin-bottom: ${margin};
`;

export const RowCentered = styled.div`
  display: flex;
  flex-direction: ${props => (props.column ? "column" : "row")};
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const BlockBodyWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${sm}) {
    flex-direction: row;
  }

  @media (min-width: ${md}) {
    flex-direction: row;
  }

  @media (min-width: ${lg}) {
    flex-direction: row;
  }
`;
