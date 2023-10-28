import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import ShopModal from "./ShopModal";
import { delete_icon, edit_icon } from "../../assets";

const Dashboard = () => {
  const navigate = useNavigate();

  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
  let currUserInfo = JSON.parse(localStorage.getItem("recent-login"));

  const initialShopSate = {
    name: "",
    bio: "",
    address: "",
    lat: "",
    long: "",
  };
  const [shopModal, setShopModal] = useState(false);
  const [selectedShop, setSelectedShop] = useState(initialShopSate);
  const [modeIsAdd, setModeIsAdd] = useState(true);
  const [forceUpdate, setForceUpdate] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  const deleteShop = (s) => {
    let shopList = currUserInfo?.shops;
    shopList?.splice(s?.index, 1);

    currUserInfo = { ...currUserInfo, shops: shopList };

    localStorage.setItem("recent-login", JSON.stringify(currUserInfo));

    toast.success("Shop deleted successfully!");
    setForceUpdate(!forceUpdate);
  };

  const editShop = (s) => {
    setSelectedShop(s);
    setShopModal(true);
    setModeIsAdd(false);
  };

  return (
    <>
      {shopModal && (
        <ShopModal
          shopInfo={selectedShop}
          closeModal={() => setShopModal(false)}
          modeIsAdd={modeIsAdd}
        />
      )}
      <div className="mt-4 p-4">
        {currUserInfo?.shops?.map((s) => (
          <div
            key={s?.index}
            className="cursor-pointer bg-gray-200 mb-4 p-2 rounded-md"
            onClick={() => navigate(`/dashboard/shop/${s?.index}`)}
          >
            <h1 className="text-center text-xl">{s?.name}</h1>
            <div>
              <span className="text-lg">About:</span> {s?.bio}
            </div>
            <h2>
              <span className="text-lg">Address: </span>
              {s?.address}
            </h2>
            <div className="flex items-start justify-end p-2">
              <div className="flex items-center gap-4">
                <img
                  src={edit_icon}
                  alt="edit-icon"
                  className="w-8 cursor-pointer"
                  onClick={(e) => {
                    editShop(s);
                    e.stopPropagation();
                  }}
                />
                <img
                  src={delete_icon}
                  alt="delete-icon"
                  className="w-8 cursor-pointer"
                  onClick={(e) => {
                    deleteShop(s);
                    e.stopPropagation();
                  }}
                />
              </div>
            </div>
          </div>
        ))}
        <div
          onClick={() => {
            setModeIsAdd(true);
            setSelectedShop(initialShopSate);
            setShopModal(true);
          }}
          className="p-2 text-center rounded-md bg-slate-700 text-white cursor-pointer"
        >
          + Add Shop
        </div>
      </div>
    </>
  );
};

export default Dashboard;
