import React, { useEffect, useState } from "react";
import { generateRandomAvatar } from "../utils/utils";
import ProductModal from "./ProductModal";
import { useParams } from "react-router-dom";
import { delete_icon, edit_icon } from "../../assets";
import { toast } from "react-toastify";

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
    let shopInView = currUserInfo?.shops?.[shopId];
    let productList = shopInView?.products;
    console.log("hhh", productList, p?.index);
    productList?.splice(p?.index - 1, 1);

    shopInView = {
      ...shopInView,
      products: productList,
    };

    currUserInfo.shops[shopId] = shopInView;

    localStorage.setItem("recent-login", JSON.stringify(currUserInfo));

    toast.success("Product deleted successfully!");
    setForceUpdate(!forceUpdate);
  };

  const editProduct = (p) => {
    setSelectedProduct(p);
    setProductModal(true);
    // {
    //   name: "Lifeboy Soap",
    //   desc: "This is a soap!",
    //   price: "10",
    //   tags: ["hot", "new"]?.join(", "),
    //   availability: true,
    //   count: 5,
    // }
  };

  return (
    <>
      {productModal && (
        <ProductModal
          productInfo={selectedProduct}
          closeModal={() => setProductModal(false)}
        />
      )}

      <div className="p-4 flex flex-col">
        {currUserInfo?.shops?.[shopId]?.products?.map((p) => {
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
                <div>
                  {p?.tags?.split(", ")?.map((t) => (
                    <span className="bg-black rounded-full text-white">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="w-10 bg-green-300 flex justify-between">
                  <span>-</span>
                  <span>{p?.count}</span>
                  <span>+</span>
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

        <div onClick={() => setProductModal(true)}>Add Product</div>
      </div>
    </>
  );
};

export default Shop;
