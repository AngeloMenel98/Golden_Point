import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { darkGreen, pastelGreen } from "../../utils/colors";

// Styled component para el Link con hover
const StyledLink = styled(Link)`
  font-weight: bold;
  color: ${pastelGreen};

  &:hover {
    color: ${darkGreen};
  }
`;

const Breadcrumb: React.FC<{ path: Array<{ name: string; link: string }> }> = ({
  path,
}) => {
  return (
    <nav>
      <ul style={{ listStyle: "none", display: "flex", padding: 0 }}>
        {path.map((crumb, index) => (
          <li key={index} style={{ marginRight: "8px" }}>
            {index < path.length - 1 ? (
              <>
                <StyledLink to={crumb.link}>{crumb.name}</StyledLink>
                <span style={{ fontWeight: "bold", color: darkGreen }}>
                  {" "}
                  &gt;{" "}
                </span>
              </>
            ) : (
              <span style={{ fontWeight: "bold", color: pastelGreen }}>
                {crumb.name}
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
