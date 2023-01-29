import React from "react";
import quote from "../../../assets/icons/quote.svg";
import profile1 from "../../../assets/images/people1.png";
import profile2 from "../../../assets/images/people2.png";
import profile3 from "../../../assets/images/people3.png";
import ProfileCard from "./ProfileCard/ProfileCard";

const Testimonial = () => {
  const profileInfo = [
    {
      id: 1,
      massage:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
      img: profile1,
      name: "Winson Herry",
      city: "London",
    },
    {
      id: 2,
      massage:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
      img: profile2,
      name: "Raisa moni",
      city: "bangladesh",
    },
    {
      id: 3,
      massage:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
      img: profile3,
      name: "Prova moni",
      city: "singapur",
    },
  ];
  return (
    <div className="my-20">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-secondary text-lg font-semibold">Testimonial</h3>
          <h2 className="text-4xl">What Our Patients Says</h2>
        </div>
        <div className="flex justify-end">
          <img src={quote} alt="" className="lg:w-48 w-24" />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-12 mt-20">
        {profileInfo.map((info) => (
          <ProfileCard key={info.id} info={info}></ProfileCard>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
