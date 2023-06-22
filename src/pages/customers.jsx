import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DropDown from "../components/Form/DropDown.jsx";
import DropDownButton from "../components/Form/DropDownButton.jsx";
import AddIcon from "../components/Icons/AddIcon.jsx";
import DeleteIcon from "../components/Icons/DeleteIcon.jsx";
import PencilIcon from "../components/Icons/PencilIcon.jsx";
import Pagination from "../components/Layout/Pagination.jsx";
import { datetimeFormatter } from "../lib/formatter.js";
import { useIndexedDB } from "react-indexed-db";
import { NoData } from "../styles/customerStyle.jsx";
import { useGetUserDataQuery } from "../store/redux-toolkit/Slices/GetDataSlice.js";
import "./Containers/Home/homeCustomer.css";
import { useDeletePostMutation } from "../store/redux-toolkit/Slices/GetDataSlice.js";

export default function Customers() {
  const { data, isLodding, refetch } = useGetUserDataQuery();
  const [deleteData, response] = useDeletePostMutation();

  const DeleteHandler = (id) => {
    deleteData(id).then(() => {
      refetch("/");
    });
  };

  const [data1, setData] = useState();
  const [len, setLen] = useState();

  const [sorting, setSorting] = useState("name");

  useEffect(() => {
    // const { indexId } = JSON.parse(localStorage.getItem("authUser"));
    // const { getByID } = useIndexedDB("userData");
    // getByID(indexId).then((userFromDB) => {
    //   console.log(indexId);
    // });

    if (!data) {
      console.log("No Data Read ?");
    } else {
      setData(data.result);

      setLen(data.result.length);

      // setTime(
      // new Intl.DateTimeFormat("en-US", {
      //   dateStyle: "medium",
      //   timeStyle: "short",
      // }).format(data.result.createdAt)
      // );
    }
  }, [data]);

  // console.log(new Intl.DateTimeFormat("en-US").format(data1.createdAt));

  // const sortParties = useCallback(
  //   (a, b) => {
  //     if (sorting === "name") {
  //       if (a.name < b.name) {
  //         return -1;
  //       }

  //       if (a.name > b.name) {
  //         return 1;
  //       }

  //       return 0;
  //     }

  //     if (sorting === "date_added") {
  //       return a.date - b.date;
  //     }

  //     if (sorting === "last_transaction") {
  //       return a.date - b.date;
  //     }
  //   },
  //   [sorting]
  // );

  return (
    <div className="bg-slate-300 h-auto rounded-lg shadow-lg  shadow-slate-500 ">
      <div className="flex mx-auto justify-between items-center px-5 text-xl md:text-[2.2rem]  py-6">
        <h4 className="text-xl md:text-[2.2rem] ">Customers</h4>
        <Link
          to="/add-party/customer"
          className="button is-small has-icon is-primary w-max-content hover:bg-slate-500"
        >
          <AddIcon />
          Add Customer
        </Link>
      </div>
      {/* ----------------Show Customer data ---------------------- */}
      {/* <div className=" md:flex justify-between md:w-[90%] w-[88%] mx-auto gap-2">
        <div className="bg-slate-100 p-4 md:w-[30%] rounded-lg shadow-lg  h-[45vh] mb-2">
          <h1 className="text-sm">All Customers List</h1>
          <div className="scroller md:h-[35vh] my-2 h-[34vh]">
            {!data1
              ? "Lodding data"
              : data1.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between  my-2 mx-auto bg-slate-300 px-3 py-2 rounded-lg items-center shadow-lg"
                  >
                    <div className="">
                      <p className="text-[14px] font-semibold">
                        {item.party_name}
                      </p>
                    </div>
                    <div>
                      <Link
                        to={`/viewsingledata/${item.id}`}
                        className="bg-slate-700  hover:bg-slate-900 hover:shadow-2xl hover:shadow-black text-[12px] px-2 py-1 rounded-md text-white"
                      >
                        Go To Detail
                      </Link>
                    </div>
                  </div>
                ))}
          </div>
        </div>

        <div className="bg-white p-4 md:w-[78%] rounded-lg shadow-lg h-[45vh]">
          <h1 className="text-sm">List All Customers</h1>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={pdata}
              width="100%"
              height="auto"
              margin={{
                top: 5,
                right: 5,
                left: 5,
                bottom: 5,
              }}
            >
              <YAxis activeDot={{ r: 8 }} interval={"preserveStartEnd"} />
              <Tooltip />
              <Legend />
              <XAxis dataKey="Name" interval={"preserveStartEnd"} />
              <Line dataKey="rollno" />
              <CartesianGrid />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div> */}

      {/* -----------------------Add Customer Data----------------------- */}
      <div className="flex   justify-center place-content-center ">
        <div className="my-4 bg-white shadow-2xl mt-[27px] shadow-slate-400 border-[2px]  border-dashed border-black rounded-lg w-[90%] ">
          {data1 && len > 0 ? (
            <>
              <div className="elevated">
                {/* <div className="flex ai-center p-1rem">
                  <DropDown
                    onChange={(value) => setSorting(value)}
                    defaultValue="name"
                    options={[
                      { text: "Name", value: "name" },
                      { text: "Date Added", value: "date_added" },
                      { text: "Last Transaction", value: "last_transaction" },
                    ]}
                  />
                </div> */}
                <div className="scroller md:h-[50vh] h-[34vh]">
                  <table>
                    <thead>
                      <tr>
                        <th>GSTIN_No</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Date Added</th>

                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="scroller">
                      {data &&
                        data1.map((customer) => {
                          return (
                            <tr key={customer.id}>
                              <td>{customer.gst_in_no}</td>
                              <td>{customer.party_name}</td>
                              <td>{customer.phone_no}</td>
                              <td>{customer.createdAt}</td>
                              <td>
                                <DropDownButton text="Actions">
                                  <button
                                    onClick={() => DeleteHandler(customer.id)}
                                    className="button block-button is-small has-icon text-danger"
                                  >
                                    <DeleteIcon />
                                    Delete
                                  </button>
                                  <Link to={`/viewsingledata/${customer.id}`}>
                                    <button className="button block-button is-small has-icon">
                                      View
                                    </button>
                                  </Link>
                                  <Link to={`/customerupdate/${customer.id}`}>
                                    <button className="button block-button is-small has-icon">
                                      <PencilIcon />
                                      Edit
                                    </button>
                                  </Link>
                                </DropDownButton>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* <Pagination /> */}
            </>
          ) : (
            <NoData transform="translate(0,-50%)">
              Looks like you have no Customers...
              <Link
                to="/add-party/customer"
                className="button is-small has-icon is-primary w-max-content hover:bg-slate-500 hover:shadow-2xl hover:shadow-black"
              >
                <AddIcon />
                Add Customer
              </Link>
            </NoData>
          )}
        </div>
      </div>
    </div>

    // --------------Old Code-------------------------
    // <div className="flex dir-col g-1rem bg-slate-300">
    //   <div className="flex jc-between ai-top ">
    //     <h4>Customers</h4>
    //     <Link
    //       to="/add-party/customer"
    //       className="button is-small has-icon is-primary w-max-content"
    //     >
    //       <AddIcon />
    //       Add Customer
    //     </Link>
    //   </div>
    //   {data && data.customer.length > 0 ? (
    //     <>
    //       {" "}
    //       <div className="elevated">
    //         <div className="flex ai-center p-1rem">
    //           <DropDown
    //             onChange={(value) => setSorting(value)}
    //             defaultValue="name"
    //             options={[
    //               { text: "Name", value: "name" },
    //               { text: "Date Added", value: "date_added" },
    //               { text: "Last Transaction", value: "last_transaction" },
    //             ]}
    //           />
    //         </div>
    //         <div className="scrollable">
    //           <table>
    //             <thead>
    //               <tr>
    //                 <th>Name</th>
    //                 <th>Phone</th>
    //                 <th>Date Added</th>
    //                 <th>Last Transaction</th>
    //                 <th>Actions</th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               {data.customer.sort(sortParties).map((customer) => {
    //                 return (
    //                   <tr key={customer.id}>
    //                     <td>{customer.name}</td>
    //                     <td>{customer.phone}</td>
    //                     <td>{datetimeFormatter.format(customer.date)}</td>
    //                     <td>{datetimeFormatter.format(customer.date)}</td>
    //                     <td>
    //                       <DropDownButton text="Actions">
    //                         <button className="button block-button is-small has-icon text-danger">
    //                           <DeleteIcon />
    //                           Delete
    //                         </button>
    //                         <button className="button block-button is-small has-icon">
    //                           <PencilIcon />
    //                           Edit
    //                         </button>
    //                       </DropDownButton>
    //                     </td>
    //                   </tr>
    //                 );
    //               })}
    //             </tbody>
    //           </table>
    //         </div>
    //       </div>
    //       <Pagination />
    //     </>
    //   ) : (
    //     <NoData transform="translate(0,-50%)">
    //       Looks like you have no Customers...
    //       <Link
    //         to="/add-party/customer"
    //         className="button is-small has-icon is-primary w-max-content"
    //       >
    //         <AddIcon />
    //         Add Customer
    //       </Link>
    //     </NoData>
    //   )}
    // </div>
  );
}
