import React, { useContext } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthProvider";
import Loading from "../../Shared/Loading/Loading";

const MyAppointments = () => {
  const { user } = useContext(AuthContext);

  const url = `http://localhost:7000/bookings?email=${user.email}`;

  const { data: bookings = [] ,isLoading} = useQuery({
    queryKey: ["bookings", user.email],
    queryFn: async () => {
      const res = await fetch(url,{
        headers:{
          authorization:`bearer ${localStorage.getItem('accessToken')}`
        }
      });
      const data = await res.json();
      return data;
    },
  });
 if(isLoading){
  return <Loading></Loading>
 }
  return (
    <div className="overflow-x-auto">
      <h1 className="my-5 text-3xl font-semibold">My Appointments</h1>
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Treatment</th>
            <th>Date</th>
            <th>Time</th>
            <th>Payment</th>
          </tr>
        </thead>
        <tbody>
          {bookings?.map((book, i) => (
            <tr className="hover" key={i}>
              <th>{i + 1}</th>
              <td>{book.patient}</td>
              <td>{book.treatment}</td>
              <td>{book.appointmentDate}</td>
              <td>{book.slot}</td>
              <td>{book.price&& !book.paid&&<Link to={`/dashboard/payment/${book._id}`}><button className="btn btn-primary btn-sm">Pay</button></Link>}
              {book.price&&book.paid&& <span className="text-green-500 ">Paid</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyAppointments;
