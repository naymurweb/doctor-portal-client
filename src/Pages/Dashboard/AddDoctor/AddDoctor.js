import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";

const AddDoctor = () => {
  const [signupError, setSignupError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  


  const imageHostKey=process.env.REACT_APP_imgbb_key
  const navigate=useNavigate()


  const {data:specialtys,isLoading}=useQuery({
    queryKey:['specialty'],
    queryFn:async ()=>{
        const res=await fetch('http://localhost:7000/appointmentSpecialty')
        const data=await res.json()
        return data
    }
  })
  if(isLoading){
    return<Loading></Loading>
 
  }

  const handleAddDoctor = (data) => {
    const photo =data.photo[0]
   
    const formData=new FormData()
    formData.append('image',photo )
    const url=`https://api.imgbb.com/1/upload?key=${imageHostKey}`
    fetch(url,{
      method:'POST',
      body:formData
    })
    .then(res=>res.json())
    .then(imgData=>{
        const doctor={
        name:data.name,
        email:data.email,
        specialty:data.specialty,
        image:imgData.data.url
      }
      fetch('http://localhost:7000/doctors',{
          method:'POST',
          headers:{
            'content-type':'application/json',
            authorization:`bearer ${localStorage.getItem('accessToken')}`
          },
          body:JSON.stringify(doctor)
      })
      .then(res=>res.json())
      .then(result=>{
        console.log(result)
        toast.success(`${data.name} is added successfully`)
        navigate('/dashboard/managedoctors')
      })
    })
    
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold my-5">Add Doctor</h1>

      <div className="my-5">
        <form
          onSubmit={handleSubmit(handleAddDoctor)}
          className="w-96 shadow-lg p-7 rounded-xl"
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold ">Name</span>
            </label>
            <input
              {...register("name")}
              placeholder="Name"
              type="text"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold ">Email</span>
            </label>
            <input
              {...register("email", { required: "Email Address is required" })}
              placeholder="Email"
              type="email"
              className="input input-bordered w-full"
            />
            {errors.email && (
              <small className="text-red-400">{errors.email.message}</small>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Specialty</span>
            </label>
            <select {...register("specialty")} className="select select-bordered w-full max-w-xs">
       
              {
                specialtys.map(specialty=><option key={specialty._id}>{specialty.name}</option>)
              }
              
              
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold ">Upload your photo</span>
            </label>
            <input
              {...register("photo")}
              placeholder="photo"
              type="file"
              className="input input-bordered w-full"
            />
          </div>

          {signupError && <small className="text-red-400">{signupError}</small>}

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-accent text-white ">
              add Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
