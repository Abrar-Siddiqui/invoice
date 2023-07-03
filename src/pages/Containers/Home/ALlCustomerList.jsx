import React from "react";
import { useGetUserDataQuery } from "../../../store/redux-toolkit/Slices/GetDataSlice";
import "./../Home/homeCustomer.css";
import { Link } from "react-router-dom";
const ALlCustomerList = () => {
  const { data, isLoading } = useGetUserDataQuery();

  const customer =
    " flex justify-between items-center mx-1 bg-slate-200 px-2 py-0 rounded-lg border-b-2 shadow-md border-black my-2";
  const users = "flex text-sm gap-2 items-center";
  const btn =
    " text-sm bg-white text-black px-2 py-[2px] my-2  hover:bg-black hover:text-white hover:shadow-xl hover:shadow-sky-200 rounded-full border-[1px] border-black";
  const btn1 = "hover:text-white text-[10px] ";
  return (
    <div className="scroller md:h-[55vh] h-[34vh]">
      {isLoading ? (
        <h3 className="text-sm">Data is Lodding..</h3>
      ) : (
        data &&
        data.result.map((item, i) => (
          <div className={customer} key={i}>
            <ul className={users}>
              <li className="text-[12px]">{item.party_name}</li>
            </ul>
            <button className={btn}>
              <Link to={`viewsingledata/${item.id}`} className={btn1}>
                View Details
              </Link>
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ALlCustomerList;
