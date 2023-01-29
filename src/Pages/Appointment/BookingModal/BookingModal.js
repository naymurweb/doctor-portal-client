import { format } from "date-fns/esm";
import React from "react";

const BookingModal = ({ treatment, selected,setTreatment }) => {
  const { name, slots } = treatment;
  const selectData = format(selected, "PP");
  const handleBooking = (event) => {
    event.preventDefault();
    const from = event.target;
    const slot = from.slot.value;
    const name = from.name.value;
    const email = from.email.value;
    const phone = from.phone.value;
    const booking={
        appointmentDate:selectData  ,
        treatment:treatment.name,
        patient:name,
        slot,
        email,phone  
    }
        
    console.log(booking);
    setTreatment(null)
  };
  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{name}</h3>

          <form
            onSubmit={handleBooking}
            className="grid grid-cols-1 gap-5 my-5 "
          >
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full
              "
              value={selectData}
              disabled
            />

            <select name="slot" className="select select-bordered w-full ">
              {slots.map((slot, id) => (
                <option key={id} value={slot}>
                  {slot}
                </option>
              ))}
            </select>

            <input
              name="name"
              type="text"
              placeholder="Full Name"
              className="input input-bordered w-full "
            />

            <input
              name="phone"
              type="number"
              placeholder="Phone Number"
              className="input input-bordered w-full "
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="input input-bordered w-full "
            />
            <button type="submit" className="btn w-full bg-accent text-white">
              Submit
            </button>
            {/* <div className="modal-action w-full">
              <label htmlFor="booking-modal" className="btn w-full">
                <button type="submit">SUBMIT</button>
              </label>
            </div> */}
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
