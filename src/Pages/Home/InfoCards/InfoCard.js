import React from "react";

const InfoCard = ({data}) => {
    const{title,color,img,pra}=data
  return (
    <div className={`card md:card-side shadow-xl p-5 text-white ${color}`}>
      <figure className="p-4">
        <img src={img} alt=""  className="w-16"/>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{pra}</p>
      
      </div>
    </div>
  );
};

export default InfoCard;
