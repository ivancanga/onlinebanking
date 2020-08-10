import React, { useState } from "react";
import firebase from "../../config/firebase";
import "./index.scss";

function Login(props) {
  const [status, setStatus] = useState({});

  let dataForm = {
    dni: "",
    password: "",
  };

  const [form, setForm] = useState(dataForm);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    setLoading(!loading);
    firebase.auth
      .signInWithEmailAndPassword(
        `${form.dni}@onlinebanking.com`,
        form.password
      )
      .then((data) => {
        console.log("Logeo exitoso", data);
        props.onLogin(data.user.uid);
      })
      .catch((err) => {
        console.log(err);
        setStatus({ message: "Credenciales inválidas" });
        setLoading(loading);
      });
    e.preventDefault();
  };

  return (
    <div className="login">
      <div className="welcome-text">
        <p>
          Hola :) <br /> Bienvenido a <br /> Online Banking{" "}
        </p>
      </div>

      <form
        className="login-form"
        onSubmit={handleSubmit}
        onFocus={() => {
          setStatus({});
        }}
      >
        <h2>Ingresá desde acá para operar</h2>
        <div className="cont">
          <input
            id="dni"
            name="dni"
            type="text"
            autoComplete="off"
            onChange={handleChange}
            value={form.dni}
            placeholder="Tu número de documento"
          />
        </div>
        <div className="cont">
          <input
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
            value={form.password}
            placeholder="Tu clave"
          />
        </div>
        <div className="message">{status.message}</div>
        <button
          style={
            form.dni && form.password ? { backgroundColor: "#EC0000" } : {}
          }
          type="submit"
        >
          {loading ? <div className="loader"></div> : <span>Ingresar</span>}
        </button>
        <div className="bot-links">
          <p>Si no tenés u olvidaste tu clave y/o usuario</p>
          <a href="/register">Crear clave y usuario</a>
        </div>

        <div className="secure">
          <p>
            <span style={{ color: "#EC0000", fontWeight: "700" }}>
              Operá seguro
            </span>{" "}
            con Santander
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
