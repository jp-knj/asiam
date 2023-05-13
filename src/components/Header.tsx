import React from "react";
import "./header.css";
const Header = () => {
  return (
    <header className="header">
      <nav>
        <ul className="navigation">
          <li className="list-item">
            <a href="">GitHub</a>
          </li>
          <li className="list-item">
            <a href="">Twitter</a>
          </li>
          <li className="list-item">
            <a href="">Zenn</a>
          </li>
          <li className="list-item">
            <a href="">Note</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
