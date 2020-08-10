import React from "react";
import "./index.scss";

function ProductCard({ data, title, text, openPopUp }) {
  return (
    <div className="cont__product_card" onClick={() => openPopUp()}>
      <p className="title">{title}</p>
      <p className="subtitle">{text}</p>
      <div className="balance-wrapper">
        <p>
          $ <span className="balance">{data.ars.balance}</span>
        </p>
        <p>
          u$s <span className="balance">{data.usd.balance}</span>
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
