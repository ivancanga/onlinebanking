import React, { useState } from "react";
import firebase from "../../config/firebase";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import "./index.scss";

function Register() {
  const history = useHistory();
  let dataForm = {
    dni: "",
    password: "",
    name: "",
    phone: "",
  };

  const [form, setForm] = useState(dataForm);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({});

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
      .createUserWithEmailAndPassword(
        `${form.dni}@onlinebanking.com`,
        form.password
      )
      .then((data) => {
        console.log("Usuario creado", data.user.uid);
        form.userId = data.user.uid;
        form.accounts = {
          ars: {
            balance: 10000,
            cbu: `${form.dni}-001`,
          },
          usd: {
            balance: 300,
            cbu: `${form.dni}-002`,
          },
        };
        delete form.password;
        firebase.db
          .collection("users")
          .doc(data.user.uid)
          .set({
            ...form,
          })
          .then((data) => {
            console.log("Registro añadido a la db");
            handleRedirect();
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        setStatus({
          message: "Hubo un error. Quizá ya exista un registro con ese DNI.",
        });
        setLoading(loading);
        console.log(status);
      });
    e.preventDefault();
  };

  function handleRedirect() {
    history.push("/");
  }

  return (
    <div>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="cont">
          <input
            id="dni"
            name="dni"
            type="number"
            onChange={handleChange}
            value={form.dni}
            placeholder="Tu número de DNI"
          />
        </div>
        <div className="cont">
          <input
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
            value={form.password}
            placeholder="Una contraseña"
          />
        </div>
        <div className="cont">
          <input
            id="name"
            name="name"
            type="text"
            onChange={handleChange}
            value={form.name}
            placeholder="Tu nombre y apellido"
          />
        </div>
        <div className="cont">
          <input
            id="phone"
            name="phone"
            type="text"
            onChange={handleChange}
            value={form.phone}
            placeholder="Un teléfono de contacto"
          />
        </div>
        <div className="message">{status.message}</div>
        <button
          style={
            form.dni && form.password ? { backgroundColor: "#EC0000" } : {}
          }
          type="submit"
        >
          {loading ? <div className="loader"></div> : <span>Registrarse</span>}
        </button>

        <Link className="return" to={"/"}>
          <span>Volver a home</span>
        </Link>
      </form>
    </div>
  );
}

export default Register;
