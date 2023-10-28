import React, { useEffect, useState } from "react";
import { logo, logoNoBack, menu_icon } from "../../assets";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import ShopModal from "./ShopModal";

const Dashboard = () => {
  const navigate = useNavigate();

  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
  const currUserInfo = JSON.parse(localStorage.getItem("recent-login"));

  const [shopModal, setShopModal] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  return (
    <>
      {shopModal && <ShopModal closeModal={() => setShopModal(false)} />}
      <div className="mt-4 p-4">
        {currUserInfo?.shops?.map((s) => (
          <div
            key={s?.index}
            className="bg-gray-400 mb-4 p-2 rounded-md"
            onClick={() => navigate(`/dashboard/shop/${s?.index}`)}
          >
            <h1 className="text-center text-xl">{s?.name}</h1>
            <div>
              <span>About:</span> {s?.bio}
            </div>
            <h2>
              <span>Address: </span>
              {s?.address}
            </h2>
          </div>
        ))}
        <div onClick={() => setShopModal(true)}>Add Shop</div>
      </div>
    </>
  );
};

export default Dashboard;
