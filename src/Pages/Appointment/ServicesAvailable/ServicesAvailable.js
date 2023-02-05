import { format } from "date-fns";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Loading from "../../Shared/Loading/Loading";
import BookingModal from "../BookingModal/BookingModal";
import AppointmentService from "./AppointmentService";

const ServicesAvailable = ({ selected }) => {
  const [treatment, setTreatment] = useState(null);
  const date = format(selected, "PP");

  const {
    data: services = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["appointmentOptions", date],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:7000/appointmentOptions?date=${date}`
      );
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

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
        {treatment && (
          <BookingModal
            setTreatment={setTreatment}
            treatment={treatment}
            selected={selected}
            refetch={refetch}
          ></BookingModal>
        )}
      </div>
    </div>
  );
};

export default ServicesAvailable;
