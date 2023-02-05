import { format } from "date-fns/esm";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../Contexts/AuthProvider";

const BookingModal = ({ treatment, selected, setTreatment,refetch  }) => {
  const { user } = useContext(AuthContext);
  const { name, slots } = treatment;
  const selectData = format(selected, "PP");
  const handleBooking = (event) => {
    event.preventDefault();
    const from = event.target;
    const slot = from.slot.value;
    const name = from.name.value;
    const email = from.email.value;
    const phone = from.phone.value;
    const booking = {
      appointmentDate: selectData,
      treatment: treatment.name,
      patient: name,
      slot,
      email,
      phone,
    };

    fetch("http://localhost:7000/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {          
          console.log(data);
          setTreatment(null);
          toast.success("Booking Confirm");
          refetch()
        }
        else{
          toast.error(data.message) 
        }
      });

    // console.log(booking);
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
              defaultValue={selectData}
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
              defaultValue={user?.displayName}
              disabled
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              className="input input-bordered w-full "
              defaultValue={user?.email}
              disabled
            />

            <input
              name="phone"
              type="number"
              placeholder="Phone Number"
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
