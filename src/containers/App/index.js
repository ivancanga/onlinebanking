import React, { useState, useEffect } from "react";

import Home from "../Home";
import Register from "../Register";
import Login from "../Login";
import Header from "../Header";

import firebase from "../../config/firebase";

import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  const [auth, setAuth] = useState({ isAuth: false });

  const onLogin = (id) => {
    console.log("hola");
    firebase.db
      .doc(`users/${id}`)
      .get()
      .then((doc) => {
        setAuth({ isAuth: true, dataUser: doc.data() });
      });
  };

  return (
    <div>
      <Router>
        <Header auth={auth} />

        {auth.isAuth ? (
          <Route path="/" exact component={() => <Home dataUser={auth.dataUser} refreshData={onLogin} />} />
        ) : (
          <Route path="/" exact component={() => <Login onLogin={onLogin} />} />
        )}

        <Route path="/register" exact component={Register} />
      </Router>
    </div>
  );
};

export default App;
