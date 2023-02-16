import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider";

const SignUp = () => {
    const [signupError, setSignupError] = useState("");

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const { createUser, updateUser, googleLogin, user } =
    useContext(AuthContext);
  
  useEffect(() => {
    if (user?.uid) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleSignup = (data) => {
    setSignupError("");
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        updateUser(data.name)
          .then(() => {
            saveUser(data.name, data.email);
          })
          .catch((error) => {
            setSignupError(error.message);
            console.log(error);
          });
        console.log(user);
        toast.success("create a new user");
      })
      .catch((error) => {
        setSignupError(error.message);
        console.log(error);
      });
  };

  const googleLoginHandaler = () => {
    const googleProvider = new GoogleAuthProvider();
    googleLogin(googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        setSignupError(error.message);
        console.log(error);
      });
  };

  const saveUser = (name, email) => {
    const user = { name, email };
    fetch(`http://localhost:7000/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        getToken(email)
  
      });
  };

  const getToken = (email) => {
    fetch(`http://localhost:7000/jwt?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken);
          navigate(from, { replace: true });
        }
      });
  };

  return (
    <div className="md:my-24 my-5 flex justify-center items-center">
      <form
        onSubmit={handleSubmit(handleSignup)}
        className="w-96 shadow-lg p-7 rounded-xl"
      >
        <h1 className="text-xl font-semibold text-center mt-5 mb-7">Sign Up</h1>

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
            <span className="label-text font-semibold">Password</span>
          </label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 7,
                message: "plz your password 7 character  must",
              },
            })}
            placeholder="Password"
            type="password"
            className="input input-bordered w-full"
          />
          {errors.password && (
            <small className="text-red-400">{errors.password.message}</small>
          )}
        </div>

        {signupError && <small className="text-red-400">{signupError}</small>}

        <div className="form-control mt-6">
          <button type="submit" className="btn btn-accent text-white ">
            Sign Up
          </button>
        </div>
        <label className="label flex justify-center">
          <small>
            Already have an account?
            <Link to="/login" className="text-secondary">
              {" "}
              Please Login{" "}
            </Link>
          </small>
        </label>
        <div className="divider">OR</div>

        <div onClick={googleLoginHandaler} className="form-control mt-6">
          <button className="btn btn-outline btn-accent text-white ">
            CONTINUE WITH GOOGLE
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
