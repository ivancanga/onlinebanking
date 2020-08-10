import React, { useState } from "react";
import firebase from "../../config/firebase";
import "./index.scss";

function TransferModal({ dniOrigen, data, close, refreshData, userId }) {
  const [status, setStatus] = useState(true);
  const [message, setMessage] = useState("");

  let dataForm = {
    dni: "",
    importe: "",
  };

  const [form, setForm] = useState(dataForm);
  const [selected, setSelected] = useState("ars");
  const [loading, setLoading] = useState(false);

  const updateBalance = (dni, operator) => {
    // Voy a buscar el id del registro por numero de documento
    firebase.db
      .collection("users")
      .where("dni", "==", dni)
      .get()
      .then((querySnapshot) => {
        // Si encuentra algun registro go ahead, si no rechazo transaccion
        if (querySnapshot.size) {
          querySnapshot.forEach((doc) => {
            // Llamo al registro por el id, balance actual + el importe transferido y mergeo
            firebase.db
              .collection("users")
              .doc(doc.id)
              .set(
                {
                  accounts: {
                    [selected]: {
                      balance: operator(
                        doc.data().accounts[selected].balance,
                        parseInt(form.importe)
                      ),
                    },
                  },
                },
                { merge: true }
              );
            setLoading(loading);
            setMessage("Transacción exitosa.");
          });
        } else {
          setStatus(!status);
          setMessage("DNI de destino incorrecto, vuelta a intentar");
          setLoading(loading);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(loading);
      });
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
    setLoading(!loading);
    if (form.dni !== dniOrigen) {
      updateBalance(form.dni, (a, b) => a + b);
      status && updateBalance(dniOrigen, (a, b) => a - b);
      refreshData(userId);
    } else {
      setMessage("No podes realizar transferencias a tu propia cuenta.");
      setLoading(loading);
    }
    e.preventDefault();
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
              <span class="step">1</span>Seleccioná la cuenta de orígen
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
                <span>{data.ars.cbu}</span>
                <p className="account_balance">$ {data.ars.balance}</p>
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
                <span>{data.usd.cbu}</span>
                <p className="account_balance">u$s {data.usd.balance}</p>
              </label>
            </div>
          </div>

          <div>
            <h4>
              <span class="step">2</span>Ingresá el DNI de cuenta destino y el
              importe
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
          <p class="message">{message}</p>
        </form>
      </div>
    </div>
  );
}

export default TransferModal;
