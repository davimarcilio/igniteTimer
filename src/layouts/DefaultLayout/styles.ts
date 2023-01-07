import styled from "styled-components";
export const LayoutContainer = styled.div`
  ::-webkit-scrollbar-track {
    margin: 0.5rem 0.5rem;
    background-color: ${(props) => props.theme["gray-600"]};
  }
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: ${(props) => props.theme["green-500"]};
  }

  max-width: 74rem;
  height: calc(100vh - 10rem);
  overflow: auto;
  margin: 5rem auto;
  padding: 2.5rem;
  background: ${(props) => props.theme["gray-800"]};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;
