import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { styles } from "../utils/utils";
import { toast } from "react-toastify";

const ShopModal = ({ closeModal }) => {
  const handleSaveShop = (values) => {
    const currUser = JSON.parse(localStorage.getItem("recent-login"));

    const index = currUser?.shops ? currUser?.shops?.length + 1 : 1;

    localStorage.setItem(
      "recent-login",
      JSON.stringify({
        ...currUser,
        shops: currUser?.shops
          ? [...currUser?.shops, { ...values, index }]
          : [{ ...values, index }],
      })
    );

    closeModal();
    toast.success("Shop added successfully!");
  };

  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  // useEffect(() => {
  //   const location = window.navigator && window.navigator.geolocation;

  //   if (location) {
  //     location.getCurrentPosition(
  //       (position) => {
  //         setLat(position.coords.latitude.toString());
  //         setLong(position.coords.longitude.toString());
  //         console.log("ggg", position);
  //       },
  //       (error) => {
  //         setLat("err-latitude");
  //         setLong("err-longitude");
  //       }
  //     );
  //   }
  // }, []);

  return (
    <>
      <div className="absolute w-screen h-screen bg-slate-500 opacity-50"></div>
      <div className="absolute top-32 w-full flex justify-center">
        <div className="bg-gray-100 p-4 rounded-lg shadow-lg w-3/4">
          <h3 className="text-xl text-center">Shop Details</h3>
          <Formik
            initialValues={{
              name: "a",
              bio: "A",
              address: "D",
              lat: "1",
              long: "2",
            }}
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
