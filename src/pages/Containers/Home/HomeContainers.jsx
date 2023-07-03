import React, { useState, useEffect } from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import {
  useGetUserDataQuery,
  useGetALlSuplierQuery,
} from "../../../store/redux-toolkit/Slices/GetDataSlice";

const Home = () => {
  const { data, isLoading } = useGetUserDataQuery();
  const data1 = useGetALlSuplierQuery();

  const [len, setLen] = useState(0);
  const [lenSup, setLensupplier] = useState(0);

  useEffect(() => {
    if (!data1.data) {
      console.log("Not Data here ?");
    } else {
      const sup = data1.data && data1.data ? data1.data.length : 0;
      setLensupplier(sup);
    }
    if (!data) {
      console.log("Not Data");
    } else {
      const d1 = data.result && data.result ? data.result.length : 0;
      console.log(d1);
      const datalenght = data.result.map((item) => {
        return item;
      });
      setLen(datalenght.length);
    }
  });
  return (
    <div>
      <div className="mx-auto mb-5 items-center justify-between gap-2 rounded-lg px-4 py-0 shadow-lg md:flex md:w-[99.5%] md:bg-white">
        <div className="flex w-[100%] justify-between gap-2 md:w-[70%]">
          <Link
            to={"/invoicegenrator"}
            className=" my-3 flex  h-[50px] w-[100%] cursor-pointer  items-center justify-center rounded-lg  bg-green-200 px-3  shadow-sm shadow-black md:h-[80px] md:w-[100%] md:py-3 "
          >
            <button className="text-[20px] font-semibold text-black">
              Invoice Genrator
            </button>
          </Link>
        </div>
        <div className="flex w-[100%] justify-between gap-2  md:w-[100%]">
          <div className="my-3 h-[60px]  w-[50%] cursor-pointer items-center  justify-center rounded-lg  bg-green-200 px-3  shadow-sm shadow-black md:h-[80px] md:w-[50%] md:py-3">
            <div className="mx-auto flex items-center justify-between  ">
              <div className="">
                <p className="md:text-md text-[13px] font-semibold">Sales</p>
                <p className="flex items-center gap-1 text-[10px] font-semibold text-green-700    md:mt-2">
                  23k <AiOutlineArrowDown />
                </p>
              </div>
              <div>
                <p>
                  <IoIosArrowForward />
                </p>
              </div>
            </div>
          </div>
          <div className="my-3 h-[60px] w-[50%] cursor-pointer items-start  justify-center rounded-lg bg-red-200  px-4 shadow-sm  shadow-black md:h-[80px] md:w-[50%] md:py-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="md:text-md text-[13px] font-semibold">Purchase</p>
                <p className="flex items-center gap-1 text-[10px] font-semibold text-red-700 md:mt-2   ">
                  10k
                  <AiOutlineArrowUp />
                </p>
              </div>
              <div>
                <p>
                  <IoIosArrowForward />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-[100%] gap-2 md:w-[100%]">
          <div className="my-3 h-auto w-[50%] cursor-pointer items-start  justify-center rounded-lg bg-slate-300 px-4  py-2 shadow-sm  shadow-black md:h-[80px] md:w-[50%] md:py-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="md:text-md text-[13px] font-semibold">
                  Total Suppliers
                </p>
                <p className="items-center gap-1 text-[10px] font-normal text-black md:mt-2">
                  {lenSup}
                </p>
              </div>
              <div>
                <p>
                  <IoIosArrowForward />
                </p>
              </div>
            </div>
          </div>
          <div className="my-3 h-auto w-[50%] cursor-pointer items-start justify-center  rounded-lg bg-slate-300 px-4  py-2 shadow-sm  shadow-black md:h-[80px] md:w-[50%] md:py-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">Total Customers</p>
                <p className="items-center gap-1 text-[10px] font-normal text-black md:mt-2">
                  {len}
                </p>
              </div>
              <div>
                <p>
                  <IoIosArrowForward />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
