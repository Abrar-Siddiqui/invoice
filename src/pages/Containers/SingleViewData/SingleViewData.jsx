import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetSingleDataQuery } from "../../../store/redux-toolkit/Slices/GetDataSlice";
import { AiTwotoneDelete } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { useDeletePostMutation } from "../../../store/redux-toolkit/Slices/GetDataSlice";

const SingleViewData = () => {
  const params = useParams();
  const { id } = params;

  const { data, isLodding } = useGetSingleDataQuery(id);
  const [deletePost, response] = useDeletePostMutation();

  const [data1, setData] = useState("");

  useEffect(() => {
    if (!data) {
      console.log("No Data");
    } else {
      setData(data.result);
      console.log(data1);
    }
  }, [data]);

  const container =
    "w-[100%] h-[80vh] bg-white rounded-lg shadow-xl shadow-black ";
  const btn = "bg-sky-800 px-3 py-1  rounded-full shadow-md shadow-black";
  const text = "text-white";
  const childContainer =
    "flex mx-auto items-center place-items-center h-[70vh] justify-center ";
  const card =
    "bg-slate-200 md:w-[70%] w-[98%] md:h-[50vh] h-[70vh] justify-center items-center p-5 rounded-lg shadow-sm shadow-black flex px-5";
  const btn1 = "flex justify-between mx-auto items-center mx-4 px-5 m-5";
  const grid1 = "md:text-xl text-black font-semibold";
  const btn2 = "md:flex md:w-[100%] justify-center  gap-4 mt-12 mx-auto";
  const btn3 =
    "flex gap-2 bg-sky-800 text-white mx-auto rounded-full px-4 items-center py-1 hover:text-black hover:bg-sky-400 shadow-sm shadow-black hover:shadow-xl hover:shadow-black hover:font-semibold";
  return (
    <div className={container}>
      <div>
        <div className={btn1}>
          <button className={btn}>
            <Link to={"/"} className={text}>
              Back
            </Link>
          </button>
          <p>User Details</p>
        </div>
        <div className={childContainer}>
          <div className={card}>
            {isLodding
              ? "Lodding data"
              : data && (
                  <div>
                    <div className="grid grid-cols-2 gap-4">
                      <p className={grid1}>GST-IN-No. : {data1.gst_in_no}</p>
                      <p className={grid1}>Party Name : {data1.party_name} </p>
                      <p className={grid1}>Phone No. : {data1.phone_no}</p>
                      <p className={grid1}>Bank A/c No. : {data1.account_no}</p>
                      <p>
                        Date and Time :{" "}
                        {new Date(data1.createdAt).toUTCString()}
                      </p>
                    </div>
                  </div>
                )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleViewData;
