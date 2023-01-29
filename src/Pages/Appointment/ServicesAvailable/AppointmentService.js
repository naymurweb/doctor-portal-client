import React from "react";

const AppointmentService = ({ service, setTreatment }) => {
  const { name, slots } = service;

  return (
    <div className="card shadow-xl">
      <div className="card-body text-center">
        <h2 className=" text-secondary text-xl">{name}</h2>
        <p>{slots.length > 0 ? slots[0] : "Try Another Day"}</p>
        <p>
          {slots.length} {slots.length > 1 ? "Spaces" : "Space"} Available
        </p>

        <div className="card-actions justify-center">
          <label
            disabled={slots.length === 0}
            onClick={() => setTreatment(service)}
            htmlFor="booking-modal"
            className={`btn ${
              slots.length === 0
                ? "bg-accent"
                : "bg-gradient-to-r from-primary to-secondary text-white border-none"
            }  `}
          >
            Book Appointment
          </label>
        </div>
      </div>
    </div>
  );
};

export default AppointmentService;
