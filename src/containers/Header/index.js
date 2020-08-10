import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./index.scss";

function Header(props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header>
      <nav>
        <div className="nav-container">
          {props.auth.isAuth && (
            <div className="nav-container__left menu">
              Menú
            </div>
          )}
          <div className="nav-container__logo">
            <Link to={"/"}>
              <div className="logo" />
            </Link>
          </div>
          {props.auth.isAuth && (
            <div className="nav-container__right">
              <div className="user_info">
                <li className="user_info__name">
                  <b>{props.auth.dataUser.name}</b>
                </li>
                <li>
                  <a className="logout" href="/"></a>
                </li>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
