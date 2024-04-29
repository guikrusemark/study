import React from "react";
import { Link } from "react-router-dom";

const MenuItem = ({ link }) => {
  return (
    <li className="nav-item">
      <Link className="nav-link" to={link.path} aria-current="page">
        {link.name}
      </Link>
    </li>
  );
};

export default MenuItem;
