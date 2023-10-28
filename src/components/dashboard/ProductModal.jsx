import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { styles, uid } from "../utils/utils";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { productSchema } from "../validation/productSchema";

const ProductModal = ({ productInfo, closeModal, modeIsAdd }) => {
  const { shopId } = useParams();

  const handleSaveProduct = (values) => {
    let currUserInfo = JSON.parse(localStorage.getItem("recent-login"));

    const index = uid();

    let shopList = currUserInfo?.shops;
    const shopInd = shopList?.findIndex((s) => s?.index === shopId);

    if (modeIsAdd) {
      shopList[shopInd] = {
        ...shopList[shopInd],
        products: shopList[shopInd]?.products
          ? [...shopList[shopInd]?.products, { ...values, index }]
          : [{ ...values, index }],
      };

      currUserInfo.shops = shopList;
      localStorage.setItem("recent-login", JSON.stringify(currUserInfo));

      closeModal();
      toast.success("Product added successfully!");
    } else {
      let productList = shopList[shopInd]?.products;

      const productInd = productList.findIndex(
        (p) => p?.index === productInfo?.index
      );
      productList[productInd] = values;

      shopList[shopInd] = {
        ...shopList[shopInd],
        products: productList,
      };

      currUserInfo.shops = shopList;

      localStorage.setItem("recent-login", JSON.stringify(currUserInfo));

      closeModal();
      toast.success("Product updated successfully!");
    }
  };

  return (
    <>
      <div className="absolute w-screen h-screen bg-slate-500 opacity-50"></div>
      <div className="absolute top-32 w-full flex justify-center">
        <div className="bg-gray-100 p-4 rounded-lg shadow-lg w-3/4">
          <div className="flex justify-between">
            <h3 className="text-xl text-center">Product Details</h3>
            <div className="cursor-pointer" onClick={() => closeModal()}>
              X
            </div>
          </div>
          <Formik
            initialValues={productInfo}
            validationSchema={productSchema}
            onSubmit={handleSaveProduct}
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
