import React from "react";
import { Link } from "react-router-dom";

import "./index.scss";

function Header(props) {
  return (
    <header>
      <nav
        style={
          props.auth.isAuth
            ? { borderBottom: "2px solid rgba(216, 237, 242, 0.644)" }
            : {}
        }
      >
        <div className="nav-container">
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
