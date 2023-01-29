import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import BookingModal from "../BookingModal/BookingModal";
import AppointmentService from "./AppointmentService";

const ServicesAvailable = ({ selected }) => {
  const [services, setSerices] = useState([]);
  const [treatment,setTreatment]=useState(null)
  useEffect(() => {
    fetch("AppointmentServices.json")
      .then((res) => res.json())
      .then((data) => setSerices(data));
  }, []);
  return (
    <div className="my-20">
      <div>
        <div className="text-center">
          <h3 className="text-secondary text-2xl ">
            Available Services on {format(selected, "PP")}
          </h3>
          <h3 className="text-accent text-2xl text-[#939393]">
            Please select a service.
          </h3>
        </div>
      </div>
      <div className="my-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {services.map((service) => (
          <AppointmentService
            key={service._id}
            service={service}
            setTreatment={setTreatment}
          ></AppointmentService>
        ))}
        {
          treatment&&<BookingModal setTreatment={setTreatment} treatment={treatment} selected={selected}></BookingModal>
        }
      </div>
    </div>
  );
};

export default ServicesAvailable;
