import React, { useState, useEffect } from "react";

import ProductCard from "../../components/ProductCard";
import TransferModal from "../../components/TransferModal";

import "./index.scss";

function Home({ dataUser, refreshData }) {
  const [isShow, setIsShow] = useState(false);

  const openPopUp = () => {
    setIsShow(!isShow);
  };

  return (
    <div className="Home">
      <section className="info-top">
        <div className="info-top__wrapper">
          <div className="text__wrapper">
            <p className="title">Pagá online y ganá en comodidad</p>
            <p className="subtitle">
              Pagá tus servicios e impuestos en un solo lugar, accedé a tus
              comprobantes y recibí recordatorios por mail antes del
              vencimiento.
            </p>
            <button>Consultar</button>
          </div>
        </div>
      </section>
      <section className="info-main">
        <h3>Tus productos</h3>
        <div className="cont__products">
          <ProductCard
            openPopUp={openPopUp}
            data={dataUser.accounts}
            title={"Cuentas"}
            text={"Saldos totales"}
          />
        </div>
      </section>

      {isShow && <TransferModal data={dataUser} close={setIsShow} refreshData={refreshData}/>}
    </div>
  );
}

export default Home;
