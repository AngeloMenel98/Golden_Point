import React from "react";
import { Link } from "react-router-dom";

interface BreadcrumbProps {
  path: Array<{ name: string; link: string }>;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ path }) => {
  return (
    <nav>
      <ul style={{ listStyle: "none", display: "flex", padding: 0 }}>
        {path.map((crumb, index) => (
          <li key={index} style={{ marginRight: "8px" }}>
            {index < path.length - 1 ? (
              <>
                <Link to={crumb.link}>{crumb.name}</Link>
                <span> &gt; </span>
              </>
            ) : (
              <span>{crumb.name}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
