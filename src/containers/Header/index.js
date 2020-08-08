import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./index.scss";

function Header(props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header>
      <nav>
        <div className="nav-container">
          <div className="nav-container__left">
            <Link to={"/"}>
              <div className="logo" />
            </Link>
            {props.auth.isAuth ? (
              <div className="items">
                <Link to={"/publish"}>Cargar producto</Link>
              </div>
            ) : null}
          </div>
          {props.auth.isAuth ? (
            <div className="nav-container__right">
              <div className="user_info">
                <li>
                  Hola, <b>{props.auth.dataUser.name}</b>
                </li>
                <li>
                  <a className="logout" href="/">
                    Logout
                  </a>
                </li>
              </div>
            </div>
          ) : null}
        </div>
      </nav>
    </header>
  );
}

export default Header;
