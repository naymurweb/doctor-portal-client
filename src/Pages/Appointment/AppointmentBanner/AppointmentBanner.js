import React from "react";
import chair from "../../../assets/images/chair.png";
import bg from "../../../assets/images/bg.png";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";

const AppointmentBanner = ({ selected, setSelected }) => {
  return (
    <section
      className="my-20 bg-cover lg:py-32"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row-reverse justify-between">
          <img src={chair} className=" lg:w-1/2 rounded-lg shadow-2xl" alt="" />
          <div>
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={setSelected}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentBanner;
