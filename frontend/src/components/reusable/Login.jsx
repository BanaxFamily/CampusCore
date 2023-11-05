// import { useState } from 'react'
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import campusCoreImg from "../../assets/CAMPUSCORE.png";
import * as UserApi from "../../network/user_api";
import Footer from "./Footer";

const Login = () => {
  // eslint-disable-next-line no-unused-vars
  const userType = 'admin'
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  if (localStorage.getItem('token')) {
    return <Navigate to="/" replace={true} />;
  }
  async function onSubmit(credentials) {
    const user = await UserApi.signIn(credentials);
    // if (user == 200) {
    //   const data = await user.json();
      const token = user.token; // Adjust this to match your backend response structure
      // Store the JWT token in localStorage
      localStorage.setItem('token', token);
    // } else {
    //   // Handle login failure, e.g., show an error message
    //   console.error("Login failed.");
    // }

  }


  return (
    <>
      <div className="mx-auto max-w-7xl h-screen flex flex-col md:flex-row mb-10">
        <div className="md:w-1/2 ">
          <img
            className=" max-h-screen w-auto block md:m-auto "
            src={campusCoreImg}
            alt="Campus Core Logo"
          />
        </div>

        <div className="md:w-1/2 md:mt-5">
          <div
            className=" w-[95%] m-auto border border-slate-600 overflow-hidden 
                  bg-white h-auto md:mt-14 md:h-fit md:w-[65%] flex flex-col rounded-md "
          >
            <div className="p-2 ">
              <h1 className=" text-black font-bold tracking-wide text-[25px]">
                Sign in
              </h1>
              <p className="text-neutral-400 text-sm">
                Sign in to your account
              </p>

              <form onSubmit={handleSubmit(onSubmit)} action="">
                <div className="w-full flex flex-col mt-2 gap-3">
                  <label
                    className="text-[18px] md:text-[15px] font-[200]"
                    htmlFor="email"
                  >
                    Email address
                  </label>
                  <input
                    className=" w-full bg-gray-300 rounded-lg mr-2 py-2 px-4 md:py-1"
                    type="text"
                    name="username"
                    placeholder="juan"
                    id="username"
                    {...register("username", { required: true })}
                  />

                  <label
                    className="text-[18px] md:text-[15px] font-[200]"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="w-full bg-gray-300 rounded-lg  mr-2 py-2 px-4 md:py-1"
                    type="password"
                    name="password"
                    placeholder="***********"
                    id="password"
                    {...register("password", { required: true })}
                  />
                </div>

                <div className="w-full relative">
                  <a
                    className="absolute top-0 right-0 text-[12px] text-blue-400 mt-2 hover:text-blue-500"
                    href=""
                  >
                    Forgot your password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-mainBlueColor my-10 hover:bg-blue-900 text-white font-bold w-full rounded-lg py-4 tracking-wider md:py-2"
                >
                  Log in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

Login.propTypes = {
  session_user: PropTypes.any,
  isLoginSuccessful: PropTypes.func,
};

export default Login;
