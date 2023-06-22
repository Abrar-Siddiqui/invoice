import React from "react";
import { useFormik } from "formik";
import { useAddNewPostDataMutation } from "../store/redux-toolkit/Slices/GetDataSlice";
import { useParams } from "react-router-dom";

export default function AddParty() {
  const { partyType } = useParams();
  const [addNewPost, response] = useAddNewPostDataMutation();
  const formik = useFormik({
    initialValues: {
      party_name: "",
      gst_in_no: "",
      phone_no: "",
      address: "",
    },
    onSubmit: (values) => {
      values.preventDefault();
      addNewPost(values, null, 2).then((res) => console.log(res));
      console.log(values);
      values.target.reset();
    },
  });
  const container =
    "md:w-[90%] h-auto bg-white rounded-lg shadow-lg shadow-black";
  const heading = "text-black text-md mx-5 mt-4";
  const card = "w-[95%] mx-auto my-4";
  const inputField =
    "py-2 px-3 border-2 border-slate-300 rounded-lg shadow-sm shadow-black";
  const btn =
    "bg-sky-800 md:w-[20%] w-[50%] mx-auto py-3 my-5 rounded-full text-white text-xl hover:bg-sky-600";
  return (
    <div className={container}>
      <h4 className={heading}>
        Add {partyType === "customer" ? "Customer" : "Supplier"}
      </h4>
      <div className={card}>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="gst_in_no">GST IN</label>
          <input
            className={inputField}
            id="gst_in_no"
            name="gst_in_no"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.gst_in_no}
          />

          <label htmlFor="party_name">Party Name</label>
          <input
            className={inputField}
            id="party_name"
            name="party_name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.party_name}
          />

          <label htmlFor="phone_no">Phone No.</label>
          <input
            className={inputField}
            id="phone_no"
            name="phone_no"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.phone_no}
          />
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.address}
          ></textarea>
          <button type="submit" className={btn}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
