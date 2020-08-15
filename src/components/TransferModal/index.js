import React, { useState } from "react";
import firebase from "../../config/firebase";
import "./index.scss";

function TransferModal({ data, close, refreshData }) {
  const { accounts, dni, userId } = data;
  let dniOrigen = dni;

  const [message, setMessage] = useState("");

  let dataForm = {
    dni: "",
    importe: "",
  };

  const [form, setForm] = useState(dataForm);
  const [selected, setSelected] = useState("ars");
  const [loading, setLoading] = useState(false);

  const verifyAccount = (dni) => {
    return firebase.db.collection("users").where("dni", "==", dni).get();
  };

  const updateBalance = (id, actualBalance, operator) => {
    firebase.db
      .collection("users")
      .doc(id)
      .set(
        {
          accounts: {
            [selected]: {
              balance: operator(actualBalance, parseInt(form.importe)),
            },
          },
        },
        { merge: true }
      );
  };

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOption = (e) => {
    setSelected(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(!loading);

    // Verificación datos vacíos
    if (form.dni === "" || form.importe === "") {
      setLoading(loading);
      setMessage("Por favor ingrese datos válidos.");
      return;
    }

    // Verificación mismo DNI orígen
    if (form.dni === dniOrigen) {
      setLoading(loading);
      setMessage("No podes realizar transferencias a tu propia cuenta.");
      return;
    }

    // Verificación fondos suficientes
    if (form.importe > accounts[selected].balance) {
      setLoading(loading);
      setMessage("No posee fondos suficientes para realizar la transacción.");
      return;
    }

    // Verifico que existe una cuenta de destino

    verifyAccount(form.dni).then((querySnapshot) => {
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          // Update balance cuenta destino
          updateBalance(
            doc.id,
            doc.data().accounts[selected].balance,
            (a, b) => a + b
          );
          // Update balance cuenta origen
          updateBalance(userId, accounts[selected].balance, (a, b) => a - b);
          setLoading(loading);
          setMessage("Transferencia realizada con éxito.");
          refreshData(userId);
          return;
        });
      } else {
        setLoading(loading);
        setMessage("DNI de destino no encontrado, vuelta a intentar.");
        return;
      }
    });
  };

  return (
    <div className="wrapper-modal">
      <div className="modal cont_transfer">
        <span
          className="close"
          onClick={() => {
            close();
          }}
        >
          x
        </span>

        <form
          onSubmit={handleSubmit}
          onFocus={() => {
            setMessage("");
          }}
        >
          <div className="form-wrapper">
            <h4>
              <span className="step">1</span>Seleccioná la cuenta de orígen
            </h4>
            <div className="my_accounts">
              <label
                style={selected === "ars" ? { borderColor: "#EC0000" } : {}}
              >
                <p className="account_title">Cuenta ARS</p>
                <input
                  type="radio"
                  name="ars"
                  value="ars"
                  checked={selected === "ars"}
                  onChange={handleOption}
                />
                <span>{accounts.ars.cbu}</span>
                <p className="account_balance">$ {accounts.ars.balance}</p>
              </label>

              <label
                style={selected === "usd" ? { borderColor: "#EC0000" } : {}}
              >
                <p className="account_title">Cuenta USD</p>
                <input
                  type="radio"
                  name="usd"
                  value="usd"
                  checked={selected === "usd"}
                  onChange={handleOption}
                />
                <span>{accounts.usd.cbu}</span>
                <p className="account_balance">u$s {accounts.usd.balance}</p>
              </label>
            </div>
          </div>

          <div>
            <h4>
              <span className="step">2</span>Ingresá el DNI de cuenta destino y
              el importe
            </h4>
            <div className="input_container">
              <input
                id="dni"
                name="dni"
                type="text"
                autoComplete="off"
                onChange={handleChange}
                value={form.dni}
                placeholder="Nro. DNI destinatario"
              />
              <input
                id="importe"
                name="importe"
                type="text"
                autoComplete="off"
                onChange={handleChange}
                value={form.importe}
                placeholder="Importe a transferir"
              />
            </div>
            <button
              style={
                form.dni && form.importe ? { backgroundColor: "#EC0000" } : {}
              }
              type="submit"
            >
              {loading ? (
                <div className="loader"></div>
              ) : (
                <span>Transferir</span>
              )}
            </button>
          </div>
          <p className="message">{message}</p>
        </form>
      </div>
    </div>
  );
}

export default TransferModal;
