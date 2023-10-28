import React, { useEffect, useRef } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { styles, uid } from "../utils/utils";
import { toast } from "react-toastify";
import { shopSchema } from "../validation/shopSchema";

const ShopModal = ({ shopInfo, closeModal, modeIsAdd }) => {
  const handleSaveShop = (values) => {
    const currUserInfo = JSON.parse(localStorage.getItem("recent-login"));

    const index = uid();

    if (modeIsAdd) {
      localStorage.setItem(
        "recent-login",
        JSON.stringify({
          ...currUserInfo,
          shops: currUserInfo?.shops
            ? [...currUserInfo?.shops, { ...values, index }]
            : [{ ...values, index }],
        })
      );

      closeModal();
      toast.success("Shop added successfully!");
    } else {
      let shopList = currUserInfo?.shops;

      const shopInd = shopList.findIndex((p) => p?.index === shopInfo?.index);

      shopList[shopInd] = values;

      currUserInfo.shops = shopList;

      localStorage.setItem("recent-login", JSON.stringify(currUserInfo));

      closeModal();
      toast.success("Shop edited successfully!");
    }
  };

  return (
    <>
      <div className="absolute w-screen h-screen bg-slate-500 opacity-50"></div>
      <div className="absolute top-32 w-full flex justify-center">
        <div className="bg-gray-100 p-4 rounded-lg shadow-lg w-3/4">
          <div className="flex justify-between">
            <h3 className="text-xl text-center">Shop Details</h3>
            <div className="cursor-pointer" onClick={() => closeModal()}>
              X
            </div>
          </div>
          <Formik
            initialValues={shopInfo}
            validationSchema={shopSchema}
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

              <label className={styles.label} htmlFor="bio">
                Bio/about
              </label>
              <Field className={styles.field} id="bio" name="bio" />
              <ErrorMessage
                component="a"
                className={styles.errorMsg}
                name="bio"
              />

              <label className={styles.label} htmlFor="address">
                Address
              </label>
              <Field className={styles.field} id="address" name="address" />
              <ErrorMessage
                component="a"
                className={styles.errorMsg}
                name="address"
              />

              <label className={styles.label} htmlFor="lat">
                Latitude
              </label>
              <Field className={styles.field} id="lat" name="lat" />
              <ErrorMessage
                component="a"
                className={styles.errorMsg}
                name="lat"
              />

              <label className={styles.label} htmlFor="long">
                Longitude
              </label>
              <Field className={styles.field} id="long" name="long" />
              <ErrorMessage
                component="a"
                className={styles.errorMsg}
                name="long"
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

export default ShopModal;
