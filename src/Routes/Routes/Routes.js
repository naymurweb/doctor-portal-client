import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import Appointment from "../../Pages/Appointment/Appointment/Appointment";
import AllUsers from "../../Pages/Dashboard/AllUsers/AllUsers";
import AddDoctor from "../../Pages/Dashboard/AddDoctor/AddDoctor";
import ManageDoctors from "../../Pages/Dashboard/ManageDoctors/ManageDoctors";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import SignUp from "../../Pages/SignUp/SignUp";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import MyAppointments from "../../Pages/Dashboard/MyAppointments/MyAppointments";
import Payment from "../../Pages/Dashboard/Payment/Payment";
import DisplayError from "../../Pages/Shared/DisplayError/DisplayError";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement:<DisplayError></DisplayError>,
    children: [
      { path: "/", element: <Home></Home> },
      { path: "/home", element: <Home></Home> },
      { path: "/login", element: <Login></Login> },
      {
        path: "/appointment",
        element: (
          <PrivateRoute>
            <Appointment></Appointment>
          </PrivateRoute>
        ),
      },
      { path: "/signup", element: <SignUp> </SignUp> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    errorElement:<DisplayError></DisplayError>,
    children: [
      { path: "/dashboard", element: <MyAppointments></MyAppointments> },
      { path: "/dashboard/users", element: <AllUsers></AllUsers> },
      { path: "/dashboard/addoctor", element: <AddDoctor></AddDoctor> },
      {
        path: "/dashboard/managedoctors",
        element: <ManageDoctors></ManageDoctors>,
      },
      {
        path: "/dashboard/payment/:id",
        element: <Payment></Payment>,
        loader:({params})=>fetch(`http://localhost:7000/bookings/${params.id}`)  
      },
    ],
  },
]);

export default router;
