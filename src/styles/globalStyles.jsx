import styled from "styled-components"

export const Flex = styled.div`
  display: flex;

  ${(props) =>
        props.spaceBetween &&
        css`
      justify-content: space-between;
    `}

  ${(props) =>
        props.alignCenter &&
        css`
      align-items: center;
    `}

    ${(props) =>
        props.column &&
        css`
      flex-direction: column;
    `}
        
    ${(props) =>
        props.justifyCenter &&
        css`
      justify-content: center;
    `}
    gap:${(props) => props.gap};
    padding:${props => props.padding}
`;