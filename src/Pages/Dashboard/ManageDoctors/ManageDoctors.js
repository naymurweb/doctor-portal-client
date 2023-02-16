import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";
import Loading from "../../Shared/Loading/Loading";

const ManageDoctors = () => {
  const [delateDoctor, setDeleteDoctor] = useState(null);
  const {
    data: doctors = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      try {
        const res = await fetch("http://localhost:7000/doctors", {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        const data = await res.json();
        return data;
      } catch (error) {}
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }
  const closeModal = () => {
    setDeleteDoctor(null);
  };
  const handaleDelate = (doctor) => {
    fetch(`http://localhost:7000/doctors/${doctor._id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
          toast.success(`Doctor ${data.name} deleted successfully`);
        }
      });
  };
  return (
    <div>
      <h1 className="my-5 text-3xl font-semibold">
        Manage Doctors: {doctors?.length}
      </h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>avatar</th>
              <th>name</th>
              <th>email</th>
              <th>specialty</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, i) => (
              <tr key={doctor._id}>
                <th>{i + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="w-16 rounded-full">
                      <img src={doctor.image} alt="" />
                    </div>
                  </div>
                </td>
                <td>{doctor.name}</td>
                <td>{doctor.email}</td>
                <td>{doctor.specialty}</td>
                <td>
                  <label
                    onClick={() => setDeleteDoctor(doctor)}
                    htmlFor="confirmation-modal"
                    className="btn btn-sm btn-error"
                  >
                    Delate
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {delateDoctor && (
        <ConfirmationModal
          title={`Are you sure you want to delate?`}
          message={`if you delate ${delateDoctor.name} it can be undone`}
          modalData={delateDoctor}
          closeModal={closeModal}
          successModal={handaleDelate}
          successModalButtonName={"Delate"}
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default ManageDoctors;
