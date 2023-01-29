import React from "react";
import fluoride from "../../../assets/images/fluoride.png";
import cavity from "../../../assets/images/cavity.png";
import whitening from "../../../assets/images/whitening.png";
import ServicesCard from "./ServicesCard";

const Services = () => {
  const serviceInfo = [
    {
      id: 1,
      title: "Fluoride Treatment",
      pra: "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
      img: fluoride,
    },
    {
      id: 2,
      title: "Fluoride Treatment",
      pra: "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
      img: cavity,
    },
    {
      id: 3,
      title: "Teeth Whitening",
      pra: "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
      img: whitening,
    },
  ];
  return (
    <div className="my-20">
      <div className="text-center font-semibold">
        <h3 className="text-lg text-secondary">OUR SERVICES</h3>
        <h2 className="text-4xl">Services We Provide</h2>
      </div>
     <div className="grid lg:grid-cols-3 md:grid-cols-2 mt-16 gap-8">
     {
        serviceInfo.map(info=><ServicesCard info={info} key={info.id}></ServicesCard>)
      }
     </div>
    </div>
  );
};

export default Services;
