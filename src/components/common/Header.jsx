import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { logoNoBack, menu_icon } from "../../assets";

const Header = () => {
  const navigate = useNavigate();

  const ref1 = useRef();
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const { shopId } = useParams();

  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
  const currUserInfo = JSON.parse(localStorage.getItem("recent-login"));

  const handleClickOutside = (e) => {
    if (!ref1?.current?.contains(e.target)) {
      setIsMenuVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const logOut = () => {
    const users = localStorage.getItem("users");
    const updatedUser = users.filter(u => u?.email === currUserInfo?.email);



    localStorage.setItem("users", [...users, ])

    localStorage.setItem("isLoggedIn", false);
    localStorage.setItem("recent-login", null);
    navigate("/login");
  };

  if (!isLoggedIn) {
    return (
      <div className="absolute top-0 left-0 w-full bg-gray-700 flex justify-between items-center p-4"></div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full bg-gray-700 flex justify-between items-center p-4">
        <div className="flex gap-1 items-center">
          <div className="hover:bg-hoverGrayBG hover:rounded-full">
            <img
              src={menu_icon}
              className="cursor-pointer w-5 z-10"
              onClick={() => setIsMenuVisible(!isMenuVisible)}
              alt="toggle-menu"
            />
          </div>
          <a href="/">
            <img
              className="w-20 h-6 mx-6 object-cover"
              alt="e-dukaan-logo"
              src={logoNoBack}
            />
          </a>
        </div>
        <div>
          <div className="text-white">{currUserInfo?.name}'s e-dukaan</div>
        </div>
      </div>
      {isMenuVisible && (
        <div className="absolute flex w-full h-full">
          <div
            ref={ref1}
            className="pt-4 bg-gray-200 absolute min-w-min w-1/3 h-full flex flex-col"
          >
            {currUserInfo?.shops?.map((s) => (
              <div
                key={s?.index}
                className="pl-4 py-2 border-b-2 hover:bg-gray-300"
                style={{
                  backgroundColor:
                    Number(shopId) === s?.index ? "rgb(209 213 219)" : "",
                }}
                onClick={() => {
                  setIsMenuVisible(false);
                  navigate(`/dashboard/shop/${s?.index}`);
                }}
              >
                <div>{s?.name}</div>
              </div>
            ))}
            <div className="pl-4 mt-8" onClick={logOut}>
              Logout
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
