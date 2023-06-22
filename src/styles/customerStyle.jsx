import styled from "styled-components";

export const NoData = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.5rem;
  color: #2a275c;
  gap: 0.5rem;
  top: 50%;
  padding: 1.5rem;
  background-color: #eeeeff;
  border-radius: 1rem;
  transform: ${(props) => props.transform};
`;
