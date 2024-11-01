import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
export const ClubContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1rem 1rem;

  @media (min-width: 900px) {
    grid-template-columns: repeat(4, 1fr); // 4 columnas
  }

  @media (min-width: 600px) and (max-width: 899px) {
    grid-template-columns: repeat(3, 1fr); // 3 columnas
  }

  @media (max-width: 599px) {
    grid-template-columns: repeat(2, 1fr); // 2 columnas
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr; // 1 columna
  }
`;
