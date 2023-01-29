import React from "react";

const ProfileCard = ({info}) => {
    const {massage,img,name,city}=info
  return (
    <div className="card shadow-xl">
      <div className="card-body">
        <p>{massage}</p>
        <div className="card-actions justify-start mt-8">

        <div className="avatar">
    <div className="w-12 rounded-full ring ring-secondary p-[2px]">
      <img src={img} alt='' />
    </div>
    

    </div>
    <div className="ml-3 ">
    <h4 className="text-base font-semibold">{name}</h4>
    <small className="font-semibold">{city}</small>
    </div>
          
        </div>  
      </div>
    </div>
  );
};

export default ProfileCard;
