import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logo } from "../../assets";
import { setCurrUser } from "../../redux/slices/userSlice";

const Home = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
  const recentUserInfo = JSON.parse(localStorage.getItem("recent-login"));

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
      dispatch(setCurrUser(recentUserInfo));
    }
  });

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-32">
      <img className="rounded-full" src={logo} alt="e-dukaan-logo" />
      <div className="text-xl">E-Dukaan Website Information...</div>
      <div
        onClick={() => navigate("/login")}
        className="cursor-pointer text-center text-white px-4 py-2 rounded-lg text-2xl bg-gray-700"
      >
        Login
      </div>
    </div>
  );
};

export default Home;
