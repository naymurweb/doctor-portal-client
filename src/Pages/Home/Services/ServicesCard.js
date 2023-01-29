import React from "react";

const ServicesCard = ({ info }) => {
  const { img, title, pra } = info;
  return (
    <div className="card shadow-xl">
      <figure className="px-10 pt-10">
        <img src={img} alt="Shoes" className="rounded-xl w-28" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        <p>{pra}</p>
      </div>
    </div>
  );
};

export default ServicesCard;
