import React from "react";
import doctor from "../../../assets/images/doctor-small.png";
import a from "../../../assets/images/appointment.png";
import PrimaryButton from "../../../Components/PrimaryButton/PrimaryButton";

const MakeAppointment = () => {
  return (
    <section className="my-20 bg-no-repeat bg-cover" style={{ backgroundImage: `url(${a})` }}>
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row lg:py-0 lg:px-8">
          <img
            src={doctor}
            className="lg:w-1/2 hidden md:block rounded-lg -mt-20"
            alt=""
          />
          <div>
            <h3 className="text-secondary font-semibold text-lg">Appointment</h3>
            <h1 className="text-4xl font-bold text-white">
              Make an appointment Today
            </h1>
            <p className="py-6 text-white">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsumis that it has a more-or-less normal
              distribution of letters,as opposed to using 'Content here, content
              here', making it look like readable English. Many desktop
              publishing packages and web page
            </p>
            <PrimaryButton>Get Started</PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MakeAppointment;
