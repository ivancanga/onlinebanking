import React from "react";
import "./index.scss";

function AlertModal() {
  return (
    <div className="cont__alertmodal">
      <p className="title">Para realizar pruebas</p>
      <p>
        Sugiero que generes un registro con datos falsos y luego te loguees para
        hacer las pruebas de transferencias al DNI: <strong>10123123</strong>.
      </p>
    </div>
  );
}

export default AlertModal;
