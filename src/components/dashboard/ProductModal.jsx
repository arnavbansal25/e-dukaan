import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { styles } from "../utils/utils";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const ProductModal = ({ productInfo, closeModal }) => {
  const { shopId } = useParams();

  const handleSaveShop = (values) => {
    let currUser = JSON.parse(localStorage.getItem("recent-login"));

    const index = currUser?.shops?.[shopId]?.products
      ? currUser?.shops?.[shopId]?.products?.length + 1
      : 1;

    // const updatedShopProducts = currUser?.shops?.[shopId]?.products
    //   ? [...currUser?.shops?.[shopId]?.products, values]
    //   : [values];

    let shopInView = currUser?.shops?.[shopId];
    shopInView = {
      ...shopInView,
      products: shopInView?.products
        ? [...shopInView?.products, { ...values, index }]
        : [{ ...values, index }],
    };

    currUser.shops[shopId] = shopInView;

    console.log("bbb", currUser);
    localStorage.setItem("recent-login", JSON.stringify(currUser));

    closeModal();
    toast.success("Product added successfully!");
  };

  return (
    <>
      <div className="absolute w-screen h-screen bg-slate-500 opacity-50"></div>
      <div className="absolute top-32 w-full flex justify-center">
        <div className="bg-gray-100 p-4 rounded-lg shadow-lg w-3/4">
          <h3 className="text-xl text-center">Product Details</h3>
          <Formik
            initialValues={productInfo}
            // validationSchema={loginSchema}
            onSubmit={handleSaveShop}
          >
            <Form>
              <label className={styles.label} htmlFor="name">
                Name
              </label>
              <Field className={styles.field} id="name" name="name" />
              <ErrorMessage
                component="a"
                className={styles.errorMsg}
                name="name"
              />

              <label className={styles.label} htmlFor="desc">
                Description
              </label>
              <Field className={styles.field} id="desc" name="desc" />
              <ErrorMessage
                component="a"
                className={styles.errorMsg}
                name="desc"
              />

              <label className={styles.label} htmlFor="price">
                Price
              </label>
              <Field
                type="number"
                className={styles.field}
                id="price"
                name="price"
              />
              <ErrorMessage
                component="a"
                className={styles.errorMsg}
                name="price"
              />

              <label className={styles.label} htmlFor="tags">
                Tags
              </label>
              <Field
                className={styles.field}
                placeholder="Eg: tag1, tag2..."
                id="tags"
                name="tags"
              />
              <ErrorMessage
                component="a"
                className={styles.errorMsg}
                name="tags"
              />

              <label className={styles.label} htmlFor="count">
                Stock
              </label>
              <Field className={styles.field} id="count" name="count" />
              <ErrorMessage
                component="a"
                className={styles.errorMsg}
                name="count"
              />

              <div className="mt-8">
                <button type="submit" className={styles.button}>
                  Save
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default ProductModal;
