import React, { useState, useEffect } from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { useGetUserDataQuery } from "../../../store/redux-toolkit/Slices/GetDataSlice";

const Home = () => {
  const { data, isLoading } = useGetUserDataQuery();
  const [len, setLen] = useState(0);
  useEffect(() => {
    if (!data) {
      console.log("Not Data");
    } else {
      const datalenght = data.result.map((item) => {
        return item;
      });
      setLen(datalenght.length);
    }
  });
  return (
    <div>
      <div className="md:flex md:w-[99.5%] items-center shadow-lg py-0 justify-between mx-auto mb-5 rounded-lg md:bg-white px-4 gap-2">
        <div className="flex md:w-[50%] w-[100%] gap-2 justify-between">
          <div className="bg-green-200  md:w-[50%] w-[50%] my-3  md:h-[80px] h-[50px] md:py-3  rounded-lg shadow-sm  shadow-black items-start px-3 justify-center cursor-pointer">
            <div className="flex justify-between mx-auto items-center ">
              <div>
                <p className="md:text-md text-[13px] font-semibold">Sales</p>
                <p className="flex items-center gap-1 text-green-700 font-semibold text-[10px]    md:mt-2">
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
          <div className="px-4 bg-red-200 md:w-[50%] w-[50%] my-3  md:h-[80px] h-[50px] md:py-3  rounded-lg shadow-sm  shadow-black items-start justify-center cursor-pointer">
            <div className="flex justify-between items-center">
              <div>
                <p className="md:text-md text-[13px] font-semibold">Purchase</p>
                <p className="flex items-center gap-1 text-red-700 font-semibold text-[10px] md:mt-2   ">
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
        <div className="flex md:w-[50%] w-[100%] gap-2">
          <div className="px-4 bg-slate-300 md:w-[50%] w-[50%] my-3  md:h-[80px] h-[50px] md:py-3 py-2  rounded-lg shadow-sm  shadow-black items-start justify-center cursor-pointer">
            <div className="flex justify-between items-center">
              <div>
                <p className="md:text-md text-[13px] font-semibold">Revenue</p>
                <p className="items-center gap-1 text-black font-normal text-[10px] md:mt-2">
                  Value of Items
                </p>
              </div>
              <div>
                <p>
                  <IoIosArrowForward />
                </p>
              </div>
            </div>
          </div>
          <div className="px-4 bg-slate-300 md:w-[50%] w-[50%] my-3  md:h-[80px] h-[50px] md:py-3  rounded-lg shadow-sm  shadow-black items-start justify-center cursor-pointer">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold">Total Users</p>
                <p className="items-center gap-1 text-black font-normal text-[10px] md:mt-2">
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
