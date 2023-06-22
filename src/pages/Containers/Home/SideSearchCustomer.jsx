import React from "react";
import { TbSearch } from "react-icons/tb";
import ALlCustomerList from "./ALlCustomerList";

const SideSearchCustomer = () => {
  const container = "flex justify-between items-center relative";
  const inputField =
    "w-[100%] border-[0px] border-black py-[5px] text-left px-3 text-md rounded-lg mx-1 shadow-lg bg-slate-300";
  const Seacrh = "text-sky-600 text-xl absolute right-3";
  return (
    <div className="snap-y h-[50vh]">
      <h1 className="text-lg py-2 px-3">All Customers</h1>
      <div className={container}>
        <input className={inputField} placeholder="Search by name.." />
        <TbSearch className={Seacrh} />
      </div>
      <div className="mt-3 w-[100%] snap-start   ">
        <ALlCustomerList />
      </div>
    </div>
  );
};

export default SideSearchCustomer;
