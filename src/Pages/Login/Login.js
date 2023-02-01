import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider";

const Login = () => {
  const [loginError, setLoginError] = useState("");
  const [email,setEmail]=useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const { signIn, googleLogin,forgetPassword,} = useContext(AuthContext);

  const handleLogin = (data) => {
    setLoginError("");
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        toast.success("login user");
        console.log(user);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setLoginError(error.message);
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
        setLoginError(error.message);
        console.log(error);
      });
  };

  const forgotPasswordHandaler=()=>{
    forgetPassword(email)
    .then(()=>{
      toast.success("forgot this password please chack your email");
    })
    .then(error=>console.log(error))
  }
  
  const emailGanared=(e)=>{
    setEmail(e.target.value);
  }
  return (
    <div className="md:my-24 my-5 flex justify-center items-center">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="w-96 shadow-lg p-7 rounded-xl"
      >
        <h1 className="text-xl font-semibold text-center mt-5 mb-7">Login</h1>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold ">Email</span>
          </label>
          <input
            {...register("email", { required: "Email Address is required" })}
            placeholder="Email"
            type="email"
            className="input input-bordered w-full"
            onChange={emailGanared}
          />
          {errors.email && (
            <small className="text-red-400" role="alert">
              {errors.email?.message}
            </small>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Password</span>
          </label>
          <input
            {...register("password", {
              required: "password Address is required",
              minLength: {
                value: 7,
                message: "plz your password 7 character must",
              },
            })}
            placeholder="Password"
            type="password"
            className="input input-bordered w-full"
          />
          {errors.password && (
            <small className="text-red-400" role="alert">
              {errors.password?.message}
            </small>
          )}
        </div>

        <label className="label">
          <small onClick={forgotPasswordHandaler} className="label-text-alt link link-hover">
            Forgot password?
          </small>
        </label>

        {loginError && <small className="text-red-400">{loginError}</small>}

        <div className="form-control mt-6">
          <button type="submit" className="btn btn-accent text-white ">
            Login
          </button>
        </div>
        <label className="label flex justify-center">
          <small>
            New to Doctors Portal?
            <Link to="/signup" className="text-secondary ">
              {" "}
              Create new account
            </Link>
          </small>
        </label>
        <div className="divider">OR</div>

        <div className="form-control mt-6">
          <button
            onClick={googleLoginHandaler}
            className="btn btn-outline btn-accent text-white "
          >
            CONTINUE WITH GOOGLE
          </button>
        </div>  
      </form>
    </div>
  );
};

export default Login;
