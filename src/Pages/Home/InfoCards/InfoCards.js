import React from "react";
import InfoCard from "./InfoCard";
import clockIcon from "../../../assets/icons/clock.svg";
import location from "../../../assets/icons/marker.svg";
import phone from "../../../assets/icons/phone.svg";
const InfoCards = () => {
  const info = [
    {
      id: 1,
      title: "Opening Hours",
      pra: "Lorem Ipsum is simply dummy text of the pri",
      color: "bg-gradient-to-r from-primary to-secondary",
      img: clockIcon,
    },
    {
      id: 2,
      title: "Visit our location",
      pra: "Brooklyn, NY 10036, United States",
      color: "bg-accent",
      img: location,
    },
    {
      id: 3,
      title: "Contact us now",
      pra: "+000 123 456789",
      color: "bg-gradient-to-r from-primary to-secondary",
      img: phone,
    },
  ];
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {info.map((data) => (
        <InfoCard data={data} key={data.id}></InfoCard>
      ))}
    </div>
  );
};

export default InfoCards;
