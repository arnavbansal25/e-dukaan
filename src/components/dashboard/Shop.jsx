import { toast } from "react-toastify";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import ProductModal from "./ProductModal";
import { delete_icon, edit_icon } from "../../assets";

const combinations = [
  { color: "#00539C", text: "#EEA47F" },
  { color: "#2F3C7E", text: "#FFFFFF" },
  { color: "#101820", text: "#FEE715" },
  { color: "#F96167", text: "#F9E795" },
  { color: "#CCF381", text: "#4831D4" },
  { color: "#E2D1F9", text: "#317773" },
  { color: "#990011", text: "#FCF6F5" },
  { color: "#8AAAE5", text: "#FFFFFF" },
  { color: "#ADD8E6", text: "#00008B" },
  { color: "#2BAE66", text: "#FCF6F5" },
];

const Shop = () => {
  const [productModal, setProductModal] = useState(false);
  const [modeIsAdd, setModeIsAdd] = useState(true);
  const currUserInfo = JSON.parse(localStorage.getItem("recent-login"));
  const { shopId } = useParams();

  const initialProductState = {
    name: "",
    desc: "",
    price: 10,
    tags: [],
    availability: false,
    count: 0,
  };

  const [selectedProduct, setSelectedProduct] = useState(initialProductState);
  const [forceUpdate, setForceUpdate] = useState(false);

  const deleteProduct = (p) => {
    let shopList = currUserInfo?.shops;
    const shopInd = shopList?.findIndex((s) => s?.index === shopId);

    let productList = shopList[shopInd]?.products;
    productList?.splice(p?.index, 1);

    shopList[shopInd] = {
      ...shopList[shopInd],
      products: productList,
    };

    currUserInfo.shops = shopList;

    localStorage.setItem("recent-login", JSON.stringify(currUserInfo));

    toast.success("Product deleted successfully!");
    setForceUpdate(!forceUpdate);
  };

  const editProduct = (p) => {
    setSelectedProduct(p);
    setProductModal(true);
    setModeIsAdd(false);
  };

  return (
    <>
      {productModal && (
        <ProductModal
          productInfo={selectedProduct}
          closeModal={() => setProductModal(false)}
          modeIsAdd={modeIsAdd}
        />
      )}

      <div className="p-4 flex flex-col">
        {currUserInfo?.shops
          ?.filter((s) => s?.index === shopId)[0]
          ?.products?.map((p) => {
            const avatar = combinations[Math.floor(Math.random() * 10)];
            return (
              <div
                key={p?.index}
                className="mb-4 rounded-lg flex gap-2 shadow-lg border-gray-200 border-double border-2 justify-between"
              >
                <div
                  style={{
                    backgroundColor: avatar.color,
                    color: avatar.text,
                  }}
                  className="w-1/4 rounded-lg flex justify-center items-center"
                >
                  <span>{p?.name?.split(" ")?.map((item) => item[0])}</span>
                </div>
                <div className="flex-grow p-2">
                  <div>{p?.name}</div>
                  <div>{p?.desc}</div>
                  <div>Price: {p?.price}</div>
                  <div className="flex gap-2 my-2">
                    {p?.tage &&
                      p?.tage.length >= 1 &&
                      p?.tags
                        ?.split(", ")
                        ?.map((t) => (
                          <span className="bg-black rounded-full text-white px-2">
                            {t}
                          </span>
                        ))}
                  </div>
                  <div className="w-10 flex justify-between gap-2 items-center">
                    <span className="bg-red-300 py-1 px-2 rounded-lg">-</span>
                    <span>{p?.count}</span>
                    <span className="bg-green-300 py-1 px-2 rounded-lg">+</span>
                  </div>
                </div>
                <div className="flex items-start p-2">
                  <div className="flex items-center gap-4">
                    <img
                      src={edit_icon}
                      alt="edit-icon"
                      className="w-8 cursor-pointer"
                      onClick={() => editProduct(p)}
                    />
                    <img
                      src={delete_icon}
                      alt="delete-icon"
                      className="w-8 cursor-pointer"
                      onClick={() => deleteProduct(p)}
                    />
                  </div>
                </div>
              </div>
            );
          })}

        <div
          className="p-2 text-center rounded-md bg-slate-700 text-white cursor-pointer"
          onClick={() => {
            setSelectedProduct(initialProductState);
            setModeIsAdd(true);
            setProductModal(true);
          }}
        >
          + Add Product
        </div>
      </div>
    </>
  );
};

export default Shop;
